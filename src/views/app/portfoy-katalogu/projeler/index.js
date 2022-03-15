import React from 'react'
import GlobalPage from '../../../custom/GlobalPage';

const Projeler = ({ match }) => {
    return <GlobalPage
        heading='menu.portfoy-katalogu.projeler'
        match={match}
        subCatalogId={1024} />
};

export default Projeler;