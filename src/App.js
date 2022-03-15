import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive, isDemo } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { useStore } from './app/stores/store';

const ViewMain = React.lazy(() =>
  import('./views')
);

const ViewUser = React.lazy(() =>
  import('./views/user')
);

const ViewApp = React.lazy(() =>
  import('./views/app')
);

const ViewError = React.lazy(() =>
  import('./views/error')
);

const AuthRoute = ({ component: Component, ...rest }) => {
  const { commonStore } = useStore();
  const { token } = commonStore;
  return (
    <Route
      {...rest}
      render={(props) =>
        token || isDemo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale, loginUser } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>

                  <AuthRoute
                    path="/app"
                    authUser={loginUser}
                    component={ViewApp}
                  />

                  <Route
                    path="/user"
                    render={(props) => <ViewUser {...props} />}
                  />

                  <Route
                    path="/app"
                    render={(props) => <ViewApp {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={(props) => <ViewMain {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
