import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Start = React.lazy(() =>
  import('./start')
);

const Dashboard = observer(({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
      <Route
        path={`${match.url}/start`}
        render={(props) => <Start {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
));
export default Dashboard;
