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
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          This is the home page.
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
