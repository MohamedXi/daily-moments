import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage, IonRow, IonText, IonTitle,
  IonToolbar
} from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../context/auth';
import { auth } from '../firebase';
import './Home.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({isLoading: false, error: false});

  const { loggedIn } = useAuth();
  
  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setStatus({isLoading: false, error: true});
    }
  }
  
  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              required
              name='email'
              type="email"
              value={email}
              placeholder='john.doe@example.com'
              onIonChange={(event) => {
                setStatus({isLoading: false, error: false});
                setEmail(event.detail.value!)
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              required
              name='password'
              type="password"
              value={password}
              placeholder='••••••••••••••••'
              onIonChange={(event) => {
                setStatus({isLoading: false, error: false});
                setPassword(event.detail.value!)
              }}
            />
          </IonItem>
        </IonList>
        {status.error && 
          <IonText color="danger">
            An error occurred. Please try again.
          </IonText>
        }
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-sm="3">
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
            </IonCol>
            <IonCol size="12" size-sm="3">
              <IonButton fill='clear' expand="block" href="/register">Register</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading isOpen={status.isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
