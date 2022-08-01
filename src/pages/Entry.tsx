import {
  IonBackButton, IonButtons,
  IonContent,
  IonHeader,
  IonPage, IonTitle,
  IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router';
import { entries } from '../data';
import './Home.css';

interface RouteParams {
  id: string;
}

const Home: React.FC = () => {
  // Get id from url params
  const id = useParams<RouteParams>().id;
  const entry = entries.find(entry => entry.id === id);

  if (!entry) {
    throw new Error(`No entry found with id ${id}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
          <IonTitle>{entry.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{entry.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          {entry.description}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
