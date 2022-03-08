import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboard = React.lazy(() =>
  import('./dashboard')
);
const BlankPage = React.lazy(() =>
  import('./blank-page')
);
const IsKatalogu = React.lazy(() =>
  import('./is-katalogu')
);
const PortfoyKatalogu = React.lazy(() =>
  import('./portfoy-katalogu')
);
const RiskKatalogu = React.lazy(() =>
  import('./risk-katalogu')
);
const StratejiKatalogu = React.lazy(() =>
  import('./strateji-katalogu')
);
const SurecKatalogu = React.lazy(() =>
  import('./surec-katalogu')
);
const TeknolojiKatalogu = React.lazy(() =>
  import('./teknoloji-katalogu')
);
const UygulamaKatalogu = React.lazy(() =>
  import('./uygulama-katalogu')
);
const VeriKatalogu = React.lazy(() =>
  import('./veri-katalogu')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />

            <Route
              path={`${match.url}/is-katalogu`}
              render={(props) => <IsKatalogu {...props} />}
            />
            <Route
              path={`${match.url}/portfoy-katalogu`}
              render={(props) => <PortfoyKatalogu {...props} />}
            />
            <Route
              path={`${match.url}/risk-katalogu`}
              render={(props) => <RiskKatalogu {...props} />}
            />
            <Route
              path={`${match.url}/strateji-katalogu`}
              render={(props) => <StratejiKatalogu {...props} />}
            />
            <Route
              path={`${match.url}/surec-katalogu`}
              render={(props) => <SurecKatalogu {...props} />}
            />
            <Route
              path={`${match.url}/teknoloji-katalogu`}
              render={(props) => <TeknolojiKatalogu {...props} />}
            />
            <Route
              path={`${match.url}/uygulama-katalogu`}
              render={(props) => <UygulamaKatalogu {...props} />}
            />
            <Route
              path={`${match.url}/veri-katalogu`}
              render={(props) => <VeriKatalogu {...props} />}
            />

            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
