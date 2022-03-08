import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DepolamaAygitlari = React.lazy(() =>
    import('./depolama-aygitlari')
);
const Istemciler = React.lazy(() =>
    import('./istemciler')
);
const Router = React.lazy(() =>
    import('./router')
);
const Sertifikalar = React.lazy(() =>
    import('./sertifikalar')
);
const SunucuGruplari = React.lazy(() =>
    import('./sunucu-gruplari')
);
const Sunucular = React.lazy(() =>
    import('./sunucular')
);
const SwitchPage = React.lazy(() =>
    import('./switch')
);

const FizikselTeknolojiVarliklari = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/fiziksel-teknoloji-varliklari`} />
            <Route
                path={`${match.url}/depolama-aygitlari`}
                render={(props) => <DepolamaAygitlari {...props} />}
            />
            <Route
                path={`${match.url}/istemciler`}
                render={(props) => <Istemciler {...props} />}
            />
            <Route
                path={`${match.url}/router`}
                render={(props) => <Router {...props} />}
            />
            <Route
                path={`${match.url}/sertifikalar`}
                render={(props) => <Sertifikalar {...props} />}
            />
            <Route
                path={`${match.url}/sunucu-gruplari`}
                render={(props) => <SunucuGruplari {...props} />}
            />
            <Route
                path={`${match.url}/sunucular`}
                render={(props) => <Sunucular {...props} />}
            />
            <Route
                path={`${match.url}/switch`}
                render={(props) => <SwitchPage {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default FizikselTeknolojiVarliklari;