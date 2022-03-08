import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const IsKabiliyetleri = React.lazy(() =>
    import('./is-kabiliyetleri')
);

const Gogo = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/is-kabiliyetleri`} />
            <Route
                path={`${match.url}/is-kabiliyetleri`}
                render={(props) => <IsKabiliyetleri {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Gogo;
