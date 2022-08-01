import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage, IonText, IonTitle,
  IonToolbar
} from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../context/auth';
import { auth } from '../firebase';
import './Home.css';

interface LoginProps {
  loggedIn: boolean;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({isLoading: false, error: false});

  const { loggedIn } = useAuth();

  const handleLogin = async () => {
    try {
      setStatus({isLoading: true, error: false});
      await auth.signInWithEmailAndPassword(email, password);
      onLogin();
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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
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
          {status.error && <IonText color="danger">Invalid email or password</IonText>}
          <IonButton expand='block' onClick={handleLogin}>Login</IonButton>
          <IonLoading isOpen={status.isLoading} />
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Login;
