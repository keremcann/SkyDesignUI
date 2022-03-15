import React from 'react'
import GlobalPage from '../../../../custom/GlobalPage';

const Lokasyonlar = ({ match }) => {
    return <GlobalPage
        heading='menu.is-katalogu.organizasyon-mimarisi.lokasyonlar'
        match={match}
        subCatalogId={1017} />
};

export default Lokasyonlar;