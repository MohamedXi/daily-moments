import {
  IonApp, IonRouterOutlet, setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppTabs from './components/AppTabs';
import { AuthContext } from './context/auth';
import Login from './pages/Login';
import NotFound from './pages/NotFound';


setupIonicReact();

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(`rendering App with isLoggedIn: ${loggedIn}`);

  return (
  <IonApp>
    <AuthContext.Provider value={{ loggedIn }}>
      <IonReactRouter>
        <Switch>
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login loggedIn={loggedIn} onLogin={() => setLoggedIn(true)} />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path='/' to="/my/entries" />
            <Route component={NotFound} />
          </IonRouterOutlet>
        </Switch>
      </IonReactRouter>
    </AuthContext.Provider>
  </IonApp>
  );
};

export default App;
