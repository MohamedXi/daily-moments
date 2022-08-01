import {
  IonContent,
  IonHeader,
  IonPage, IonTitle,
  IonToolbar
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          This is the settings page.
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
