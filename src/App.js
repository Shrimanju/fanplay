import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
// components import
import InfluencerProfile from './pages/influencerProfile';
import SelectQuestions from './pages/selectQuestions';
import CreateQuiz from './pages/createQuiz';
import LoginPage from './pages/loginPage';
import setAuthToken from './utils/setAuthToken';
// redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { loadUser } from './actions/auth';
// import PrivateRoute from './components/routing/PrivateRoute';
import PreviewQuiz from './pages/previewQuiz';
import RunningQuiz from './pages/runningQuiz';
import CountdownTimer from './pages/countdownTimer';
import ViewProfile from './pages/viewProfile';
import PreviousShows from './pages/previousShows';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <Fragment>
            <Switch>
              <Route exact path='/' component={LoginPage} />
              <PrivateRoute
                exact
                path='/influencerProfile'
                component={InfluencerProfile}
              />
              <PrivateRoute exact path='/viewProfile' component={ViewProfile} />
              <PrivateRoute
                exact
                path='/previousShows'
                component={PreviousShows}
              />
              <PrivateRoute exact path='/createQuiz' component={CreateQuiz} />
              <PrivateRoute
                exact
                path='/selectQuestions/:eventId'
                component={SelectQuestions}
              />
              {/* <PrivateRoute
                exact
                path='/influencrProfile'
                component={InfluencerProfile}
              /> */}
              <PrivateRoute
                exact
                path='/countdownTimer/:eventId'
                component={CountdownTimer}
              />

              <PrivateRoute exact path='/previewQuiz' component={PreviewQuiz} />
              <PrivateRoute exact path='/runningQuiz' component={RunningQuiz} />
            </Switch>
          </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
};

export default App;
