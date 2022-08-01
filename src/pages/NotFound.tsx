import {
  IonContent, IonPage
} from '@ionic/react';

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        The page you are looking for does not exist or has been moved.
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
