import React from 'react'
import GlobalPage from '../../../../custom/GlobalPage';

const OrganizasyonBirimleri = ({ match }) => {
    return <GlobalPage
        heading='menu.is-katalogu.organizasyon-mimarisi.organizasyon-birimleri'
        match={match}
        subCatalogId={1018} />
};

export default OrganizasyonBirimleri;