import {
  IonBackButton, IonButton, IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonText, IonTitle,
  IonToolbar
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../context/auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import './Home.css';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const [entry, setEntry] = useState<Entry>();

  const id = useParams<RouteParams>().id;
  const { userId } = useAuth();
  const history = useHistory();
  
  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId).collection('entries').doc(id);
    entryRef.get().then(doc => setEntry(toEntry(doc)))
  }, [userId, id]);

  const deleteEntry = async () => {
    await firestore.collection('users').doc(userId).collection('entries').doc(id).delete();
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={deleteEntry}>
              <IonIcon icon={trash} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {entry?.pictureUrl ? (
          <img src={entry?.pictureUrl} alt={entry?.title} />
        ) : <img width='100%' src='assets/no-image.jpeg' alt='placeholder' />}
        <IonList lines='none'>
          <IonItem>
            <IonLabel position='stacked' color='medium'>Title</IonLabel>
            <IonText>{entry?.title}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked' color='medium'>Description</IonLabel>
            <IonText>{entry?.description}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked' color='medium'>Link</IonLabel>
            <IonText>{entry?.link}</IonText>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked' color='medium'>Tags</IonLabel>
            <IonText>{entry?.tags.join(', ')}</IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
