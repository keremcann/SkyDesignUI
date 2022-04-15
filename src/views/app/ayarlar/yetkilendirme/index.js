import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const RolYetkilendirme = React.lazy(() =>
    import('./rol-yetkilendirme')
);
const SayfaYetkilendirme = React.lazy(() =>
    import('./sayfa-yetkilendirme')
);

const Dashboard = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/rol-yetkilendirme`} />
            <Route
                path={`${match.url}/rol-yetkilendirme`}
                render={(props) => <RolYetkilendirme {...props} />}
            />
            <Route
                path={`${match.url}/sayfa-yetkilendirme`}
                render={(props) => <SayfaYetkilendirme {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default observer(Dashboard);
