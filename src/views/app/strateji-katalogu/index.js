import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Misyon = React.lazy(() =>
    import('./misyon')
);
const OdakAlanlari = React.lazy(() =>
    import('./odak-alanlari')
);
const StratejikDonem = React.lazy(() =>
    import('./stratejik-donem')
);
const StratejikHedefler = React.lazy(() =>
    import('./stratejik-hedefler')
);
const StratejikPerspektif = React.lazy(() =>
    import('./stratejik-perspektif')
);
const Vizyon = React.lazy(() =>
    import('./vizyon')
);

const RiskKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/strateji-katalogu`} />
            <Route
                path={`${match.url}/misyon`}
                render={(props) => <Misyon {...props} />}
            />
            <Route
                path={`${match.url}/odak-alanlari`}
                render={(props) => <OdakAlanlari {...props} />}
            />
            <Route
                path={`${match.url}/stratejik-donem`}
                render={(props) => <StratejikDonem {...props} />}
            />
            <Route
                path={`${match.url}/stratejik-hedefler`}
                render={(props) => <StratejikHedefler {...props} />}
            />
            <Route
                path={`${match.url}/stratejik-perspektif`}
                render={(props) => <StratejikPerspektif {...props} />}
            />
            <Route
                path={`${match.url}/vizyon`}
                render={(props) => <Vizyon {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default RiskKatalogu;