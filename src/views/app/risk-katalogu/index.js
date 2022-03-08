import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const BtRiskleri = React.lazy(() =>
    import('./bt-riskleri')
);
const IsRiskleri = React.lazy(() =>
    import('./is-riskleri')
);

const RiskKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/portfoy-hizalama`} />
            <Route
                path={`${match.url}/bt-riskleri`}
                render={(props) => <BtRiskleri {...props} />}
            />
            <Route
                path={`${match.url}/is-riskleri`}
                render={(props) => <IsRiskleri {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default RiskKatalogu;