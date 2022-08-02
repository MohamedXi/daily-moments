import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage, IonTitle,
  IonToolbar
} from '@ionic/react';
import { auth } from '../firebase';
import './Home.css';

const SettingsPage: React.FC = () => {
  const handleLogout = async () => {
    await auth.signOut();
  }

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
          <IonButton
            expand="block"
            onClick={handleLogout}
          >Logout</IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
