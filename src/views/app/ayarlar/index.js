import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const KullaniciTanimi = React.lazy(() =>
    import('./kullanici-tanimi')
);
const RolTanimi = React.lazy(() =>
    import('./rol-tanimi')
);
const Yetkilendirme = React.lazy(() =>
    import('./yetkilendirme')
);
const SayfaTanimi = React.lazy(() =>
    import('./sayfa-tanimi')
);
const KolonListesi = React.lazy(() =>
    import('./kolon-listesi')
);


const Dashboard = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/kullanici-tanimi`} />
            <Route
                path={`${match.url}/kullanici-tanimi`}
                render={(props) => <KullaniciTanimi {...props} />}
            />
            <Route
                path={`${match.url}/rol-tanimi`}
                render={(props) => <RolTanimi {...props} />}
            />
            <Route
                path={`${match.url}/yetkilendirme`}
                render={(props) => <Yetkilendirme {...props} />}
            />
            <Route
                path={`${match.url}/sayfa-tanimi`}
                render={(props) => <SayfaTanimi {...props} />}
            />
            <Route
                path={`${match.url}/kolon-listesi`}
                render={(props) => <KolonListesi {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default observer(Dashboard);
