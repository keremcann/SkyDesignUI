import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const IsKurallari = React.lazy(() =>
    import('./is-kurallari')
);
const Kisaltmalar = React.lazy(() =>
    import('./kisaltmalar')
);
const Mevzuatlar = React.lazy(() =>
    import('./mevzuatlar')
);
const Terimler = React.lazy(() =>
    import('./terimler')
);
const VeriPolitikalari = React.lazy(() =>
    import('./veri-politikalari')
);
const VeriStandartlari = React.lazy(() =>
    import('./veri-standartlari')
);

const FizikselVeriModelleme = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/fiziksel-veri-modelleme`} />
            <Route
                path={`${match.url}/is-kurallari`}
                render={(props) => <IsKurallari {...props} />}
            />
            <Route
                path={`${match.url}/kisaltmalar`}
                render={(props) => <Kisaltmalar {...props} />}
            />
            <Route
                path={`${match.url}/mevzuatlar`}
                render={(props) => <Mevzuatlar {...props} />}
            />
            <Route
                path={`${match.url}/terimler`}
                render={(props) => <Terimler {...props} />}
            />
            <Route
                path={`${match.url}/veri-politikalari`}
                render={(props) => <VeriPolitikalari {...props} />}
            />
            <Route
                path={`${match.url}/veri-standartlari`}
                render={(props) => <VeriStandartlari {...props} />}
            />


            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default FizikselVeriModelleme;