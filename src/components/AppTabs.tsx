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
import AddEntryPage from '../pages/AddEntry';
import EntryPage from '../pages/Entry';
import HomePage from '../pages/Home';
import SettingsPage from '../pages/Settings';

setupIonicReact();

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries" component={HomePage} />
        <Route exact path="/my/entries/add" component={AddEntryPage} />
        <Route exact path="/my/entries/:id/see" component={EntryPage} />
        <Route exact path="/my/settings" component={SettingsPage} />
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
