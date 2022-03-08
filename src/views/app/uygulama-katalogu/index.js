import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const UygulamaAlanlari = React.lazy(() =>
    import('./uygulama-alanlari')
);
const UygulamaBilesenleri = React.lazy(() =>
    import('./uygulama-bilesenleri')
);
const UygulamaModulleri = React.lazy(() =>
    import('./uygulama-modulleri')
);
const UygulamaServisleri = React.lazy(() =>
    import('./uygulama-servisleri')
);
const Uygulamalar = React.lazy(() =>
    import('./uygulamalar')
);

const UygulamaKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/uygulama-katalogu`} />
            <Route
                path={`${match.url}/uygulama-alanlari`}
                render={(props) => <UygulamaAlanlari {...props} />}
            />
            <Route
                path={`${match.url}/uygulama-bilesenleri`}
                render={(props) => <UygulamaBilesenleri {...props} />}
            />
            <Route
                path={`${match.url}/uygulama-modulleri`}
                render={(props) => <UygulamaModulleri {...props} />}
            />
            <Route
                path={`${match.url}/uygulama-servisleri`}
                render={(props) => <UygulamaServisleri {...props} />}
            />
            <Route
                path={`${match.url}/uygulamalar`}
                render={(props) => <Uygulamalar {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default UygulamaKatalogu;