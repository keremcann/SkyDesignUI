import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const IsKabiliyetleri = React.lazy(() =>
    import('./is-kabiliyetleri')
);
const Kanallar = React.lazy(() =>
    import('./kanallar')
);
const Urunler = React.lazy(() =>
    import('./urunler')
);
const OrganizasyonMimarisi = React.lazy(() =>
    import('./organizasyon-mimarisi')
);

const IsKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/is-kabiliyetleri`} />
            <Route
                path={`${match.url}/is-kabiliyetleri`}
                render={(props) => <IsKabiliyetleri {...props} />}
            />
            <Route
                path={`${match.url}/kanallar`}
                render={(props) => <Kanallar {...props} />}
            />
            <Route
                path={`${match.url}/urunler`}
                render={(props) => <Urunler {...props} />}
            />
            <Route
                path={`${match.url}/organizasyon-mimarisi`}
                render={(props) => <OrganizasyonMimarisi {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default IsKatalogu;
