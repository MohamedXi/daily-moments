import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonTitle,
  IonToolbar
} from '@ionic/react';
import { entries } from '../data';
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
          <IonList>
            {entries.map(entry => (
              <IonItem
                button
                key={entry.id}
                routerLink={`/my/entries/${entry.id}`}
                >
                <IonLabel>{entry.title}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
