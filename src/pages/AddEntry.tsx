import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonTextarea, IonTitle,
  IonToolbar,
  isPlatform
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../context/auth';
import { firestore, storage } from '../firebase';
import './Home.css';

const AddEntryPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [pictureUrl, setPictureUrl] = useState<any>('/assets/no-image.jpeg');

  const { userId } = useAuth();
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => {
    if (pictureUrl.startsWith('blob:')) {
      URL.revokeObjectURL(pictureUrl);
    }

  }, [pictureUrl]);

  async function savePicture(blobUrl: string, userId: any) {
    const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);    
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const snapshot = await pictureRef.put(blob);
    const url = await snapshot.ref.getDownloadURL();    

    return url;
  }

  const addEntry = async () => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    const entryData = {
      title,
      description,
      link,
      tags,
      createdAt: Date.now(),
      pictureUrl
    };

    if (!pictureUrl.startsWith('/assets')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }

    await entriesRef.add(entryData);

    history.goBack();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
    }
  }

  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600,
        });
    
        setPictureUrl(photo.webPath);
      } catch (error) {
        console.error(error);
      }
    } else {
      fileInputRef.current!.click();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          <IonItem>
            <IonLabel position='stacked'>Title</IonLabel>
            <IonInput type='text' value={title} onIonChange={e => setTitle(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Description</IonLabel>
            <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Link</IonLabel>
            <IonInput type='text' value={link} onIonChange={e => setLink(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Tags</IonLabel>
            <IonInput
              type='text'
              value={tags.join(', ')}
              onIonChange={e => setTags(e.detail.value!.split(','))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Picture</IonLabel>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
            <img
              src={pictureUrl}
              alt='placeholder'
              onClick={handlePictureClick}
            />
          </IonItem>
        </IonList>
        <IonButton expand='block' onClick={addEntry}>Add Entry</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
