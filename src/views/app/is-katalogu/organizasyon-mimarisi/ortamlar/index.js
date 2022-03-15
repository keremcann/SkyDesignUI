import React from 'react'
import GlobalPage from '../../../../custom/GlobalPage';

const Ortamlar = ({ match }) => {
    return <GlobalPage
        heading='menu.is-katalogu.organizasyon-mimarisi.ortamlar'
        match={match}
        subCatalogId={1019} />
};

export default Ortamlar;