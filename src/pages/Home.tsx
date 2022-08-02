import {
  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem,
  IonLabel,
  IonList,
  IonPage, IonText, IonThumbnail, IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import './Home.css';

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const { userId } = useAuth();

  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    return entriesRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
      const newEntries = snapshot.docs.map(doc => toEntry(doc));
      setEntries(newEntries);
    })
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {entries.length > 0 ? (
          <IonList>
            {entries.map((entry: any) => (
              <IonItem
                button
                key={entry.id}
                routerLink={`/my/entries/${entry.id}/see`}
                >
                <IonThumbnail slot="start">
                  {entry.pictureUrl ? (
                    <IonImg src={entry.pictureUrl} alt={entry.title} />
                  ) : <IonImg src='assets/no-image.jpeg' alt='placeholder' />}
                </IonThumbnail>
                <IonLabel>
                  <IonText>
                    <h2>{entry.title}</h2>
                  </IonText>
                  <IonText color='dark'>
                    <p>{entry.description}</p>
                  </IonText>
                  <IonText color='medium'>
                    <h6>{new Date(entry.createdAt).toLocaleDateString()}</h6>
                  </IonText>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonText color='medium' className='ion-text-center'>No entries yet</IonText>
        )}
        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink='/my/entries/add'>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
