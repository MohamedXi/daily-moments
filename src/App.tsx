import {
  IonApp, IonLoading, IonRouterOutlet, setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppTabs from './components/AppTabs';
import { AuthContext, useAuthInit } from './context/auth';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

setupIonicReact();

const App: React.FC = () => {
  const { isLoading, auth } = useAuthInit();

  if (isLoading) {
    return <IonLoading isOpen />;
  }

  console.log(`rendering App with auth: ${auth.loggedIn}`);

  return (
  <IonApp>
    <AuthContext.Provider value={auth}>
      <IonReactRouter>
        <Switch>
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
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
