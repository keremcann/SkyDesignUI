import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FizikselVeriModelleme = React.lazy(() =>
    import('./fiziksel-veri-modelleme')
);
const IsSozlugu = React.lazy(() =>
    import('./is-sozlugu')
);
const Raporlar = React.lazy(() =>
    import('./raporlar')
);

const VeriKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/veri-katalogu`} />
            <Route
                path={`${match.url}/fiziksel-veri-modelleme`}
                render={(props) => <FizikselVeriModelleme {...props} />}
            />
            <Route
                path={`${match.url}/is-sozlugu`}
                render={(props) => <IsSozlugu {...props} />}
            />
            <Route
                path={`${match.url}/raporlar`}
                render={(props) => <Raporlar {...props} />}
            />


            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default VeriKatalogu;