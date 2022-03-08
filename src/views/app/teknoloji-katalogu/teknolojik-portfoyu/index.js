import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FizikselTeknolojiBilesenleri = React.lazy(() =>
    import('./fiziksel-teknoloji-bilesenleri')
);
const FtbYasamDongusuYonetimi = React.lazy(() =>
    import('./ftb-yasam-dongusu-yonetimi')
);
const MantiksalTeknolojiBilesenleri = React.lazy(() =>
    import('./mantiksal-teknoloji-bilesenleri')
);
const StandartTeknolojiBilesenleri = React.lazy(() =>
    import('./standart-teknoloji-bilesenleri')
);

const TeknolojikPortfoyu = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/fiziksel-teknoloji-varliklari`} />
            <Route
                path={`${match.url}/fiziksel-teknoloji-bilesenleri`}
                render={(props) => <FizikselTeknolojiBilesenleri {...props} />}
            />
            <Route
                path={`${match.url}/fiziksel-teknoloji-bilesenleri`}
                render={(props) => <FizikselTeknolojiBilesenleri {...props} />}
            />
            <Route
                path={`${match.url}/ftb-yasam-dongusu-yonetimi`}
                render={(props) => <FtbYasamDongusuYonetimi {...props} />}
            />
            <Route
                path={`${match.url}/mantiksal-teknoloji-bilesenleri`}
                render={(props) => <MantiksalTeknolojiBilesenleri {...props} />}
            />
            <Route
                path={`${match.url}/mantiksal-teknoloji-bilesenleri`}
                render={(props) => <MantiksalTeknolojiBilesenleri {...props} />}
            />
            <Route
                path={`${match.url}/standart-teknoloji-bilesenleri`}
                render={(props) => <StandartTeknolojiBilesenleri {...props} />}
            />

            <Redirect to="/error" />
        </Switch>
    </Suspense>
);

export default TeknolojikPortfoyu;