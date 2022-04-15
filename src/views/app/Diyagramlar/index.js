import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const UygulamaMimarisi = React.lazy(() =>
    import('./uygulama-mimarisi')
);
const AltyapiMimarisi = React.lazy(() =>
    import('./altyapi-mimarisi')
);


const Dashboard = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/uygulama-mimarisi`} />
            <Route
                path={`${match.url}/uygulama-mimarisi`}
                render={(props) => <UygulamaMimarisi {...props} />}
            />
            <Route
                path={`${match.url}/altyapi-mimarisi`}
                render={(props) => <AltyapiMimarisi {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default observer(Dashboard);
