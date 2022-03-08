import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const PortfoyHizalama = React.lazy(() =>
    import('./portfoy-hizalama')
);
const Programlar = React.lazy(() =>
    import('./programlar')
);
const Projeler = React.lazy(() =>
    import('./projeler')
);
const Talepler = React.lazy(() =>
    import('./talepler')
);

const PortfoyKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/portfoy-hizalama`} />
            <Route
                path={`${match.url}/portfoy-hizalama`}
                render={(props) => <PortfoyHizalama {...props} />}
            />
            <Route
                path={`${match.url}/programlar`}
                render={(props) => <Programlar {...props} />}
            />
            <Route
                path={`${match.url}/projeler`}
                render={(props) => <Projeler {...props} />}
            />
            <Route
                path={`${match.url}/talepler`}
                render={(props) => <Talepler {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default PortfoyKatalogu;