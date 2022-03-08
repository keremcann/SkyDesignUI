import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AltyapiPlatformBilesenleri = React.lazy(() =>
    import('./altyapi-platform-bilesenleri')
);
const IPAC = React.lazy(() =>
    import('./ipac')
);
const TeknolojikAltyapiPlatformlari = React.lazy(() =>
    import('./teknolojik-altyapi-platformlari')
);
const Tipa = React.lazy(() =>
    import('./tipa')
);

const AltyapiTeknolojiVarliklari = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/surec-katalogu`} />
            <Route
                path={`${match.url}/altyapi-platform-bilesenleri`}
                render={(props) => <AltyapiPlatformBilesenleri {...props} />}
            />
            <Route
                path={`${match.url}/ipac`}
                render={(props) => <IPAC {...props} />}
            />
            <Route
                path={`${match.url}/teknolojik-altyapi-platformlari`}
                render={(props) => <TeknolojikAltyapiPlatformlari {...props} />}
            />
            <Route
                path={`${match.url}/tipa`}
                render={(props) => <Tipa {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default AltyapiTeknolojiVarliklari;