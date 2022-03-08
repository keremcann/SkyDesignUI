import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Semalar = React.lazy(() =>
    import('./semalar')
);
const Tablolar = React.lazy(() =>
    import('./tablolar')
);
const VeriOgeleri = React.lazy(() =>
    import('./veri-ogeleri')
);
const VeriSozlugu = React.lazy(() =>
    import('./veri-sozlugu')
);
const VeriTipleri = React.lazy(() =>
    import('./veri-tipleri')
);
const Veritabanlari = React.lazy(() =>
    import('./veritabanlari')
);

const FizikselVeriModelleme = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/fiziksel-veri-modelleme`} />
            <Route
                path={`${match.url}/semalar`}
                render={(props) => <Semalar {...props} />}
            />
            <Route
                path={`${match.url}/tablolar`}
                render={(props) => <Tablolar {...props} />}
            />
            <Route
                path={`${match.url}/veri-ogeleri`}
                render={(props) => <VeriOgeleri {...props} />}
            />
            <Route
                path={`${match.url}/veri-sozlugu`}
                render={(props) => <VeriSozlugu {...props} />}
            />
            <Route
                path={`${match.url}/veri-tipleri`}
                render={(props) => <VeriTipleri {...props} />}
            />
            <Route
                path={`${match.url}/veritabanlari`}
                render={(props) => <Veritabanlari {...props} />}
            />


            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default FizikselVeriModelleme;