import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AltSurecGruplari = React.lazy(() =>
    import('./alt-surec-gruplari')
);
const AnaSurecGruplari = React.lazy(() =>
    import('./ana-surec-gruplari')
);
const Gorevler = React.lazy(() =>
    import('./gorevler')
);
const Havuzlar = React.lazy(() =>
    import('./havuzlar')
);
const Kulvarlar = React.lazy(() =>
    import('./kulvarlar')
);
const SurecGruplari = React.lazy(() =>
    import('./surec-gruplari')
);
const Surecler = React.lazy(() =>
    import('./surecler')
);

const SurecKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/surec-katalogu`} />
            <Route
                path={`${match.url}/alt-surec-gruplari`}
                render={(props) => <AltSurecGruplari {...props} />}
            />
            <Route
                path={`${match.url}/ana-surec-gruplari`}
                render={(props) => <AnaSurecGruplari {...props} />}
            />
            <Route
                path={`${match.url}/gorevler`}
                render={(props) => <Gorevler {...props} />}
            />
            <Route
                path={`${match.url}/havuzlar`}
                render={(props) => <Havuzlar {...props} />}
            />
            <Route
                path={`${match.url}/kulvarlar`}
                render={(props) => <Kulvarlar {...props} />}
            />
            <Route
                path={`${match.url}/surec-gruplari`}
                render={(props) => <SurecGruplari {...props} />}
            />
            <Route
                path={`${match.url}/surecler`}
                render={(props) => <Surecler {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default SurecKatalogu;