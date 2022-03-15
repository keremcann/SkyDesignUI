import React from 'react'
import GlobalPage from '../../../../custom/GlobalPage';

const Sunucular = ({ match }) => {
    return <GlobalPage
        heading='menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.sunucular'
        match={match}
        subCatalogId={3} />
};

export default Sunucular;