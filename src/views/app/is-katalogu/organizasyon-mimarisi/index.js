import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Kisiler = React.lazy(() =>
    import('./kisiler')
);
const Roller = React.lazy(() =>
    import('./roller')
);
const Ortamlar = React.lazy(() =>
    import('./ortamlar')
);
const Lokasyonlar = React.lazy(() =>
    import('./lokasyonlar')
);
const OrganizasyonBirimleri = React.lazy(() =>
    import('./organizasyon-birimleri')
);

const OrganizasyonMimarisi = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/organizasyon-mimarisi`} />
            <Route
                path={`${match.url}/kisiler`}
                render={(props) => <Kisiler {...props} />}
            />
            <Route
                path={`${match.url}/roller`}
                render={(props) => <Roller {...props} />}
            />
            <Route
                path={`${match.url}/ortamlar`}
                render={(props) => <Ortamlar {...props} />}
            />
            <Route
                path={`${match.url}/lokasyonlar`}
                render={(props) => <Lokasyonlar {...props} />}
            />
            <Route
                path={`${match.url}/organizasyon-birimleri`}
                render={(props) => <OrganizasyonBirimleri {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default OrganizasyonMimarisi;
