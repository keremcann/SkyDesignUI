import React from 'react'
import GlobalPage from '../../../../custom/GlobalPage';

const Router = ({ match }) => {
    return <GlobalPage heading={'menu.sertifikalar'} match={match} subCatalogId={1003} />
};

export default Router;