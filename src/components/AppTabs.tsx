import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { homeOutline, settingsOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Entry from '../pages/Entry';
import Home from '../pages/Home';
import Settings from '../pages/Settings';

setupIonicReact();

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries" component={Home} />
        <Route exact path="/my/entries/:id" component={Entry} />
        <Route exact path="/my/settings" component={Settings} />
        <Redirect exact path='/' to="/my/entries" />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab="entries" href="/my/entries">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
