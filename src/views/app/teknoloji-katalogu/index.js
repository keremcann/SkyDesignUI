import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AltyapiTeknolojiVarliklari = React.lazy(() =>
    import('./altyapi-teknoloji-varliklari')
);
const FizikselTeknolojiVarliklari = React.lazy(() =>
    import('./fiziksel-teknoloji-varliklari')
);
const TeknolojikPortfoyu = React.lazy(() =>
    import('./teknolojik-portfoyu')
);

const TeknolojiKatalogu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/surec-katalogu`} />
            <Route
                path={`${match.url}/altyapi-teknoloji-varliklari`}
                render={(props) => <AltyapiTeknolojiVarliklari {...props} />}
            />
            <Route
                path={`${match.url}/fiziksel-teknoloji-varliklari`}
                render={(props) => <FizikselTeknolojiVarliklari {...props} />}
            />
            <Route
                path={`${match.url}/teknolojik-portfoyu`}
                render={(props) => <TeknolojikPortfoyu {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default TeknolojiKatalogu;