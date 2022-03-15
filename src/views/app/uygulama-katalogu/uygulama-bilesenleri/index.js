import React from 'react'
import GlobalPage from '../../../custom/GlobalPage';

const UygulamaBilesenleri = ({ match }) => {
    return <GlobalPage
        heading='menu.uygulama-katalogu.uygulama-bilesenleri'
        match={match}
        subCatalogId={3} />
};

export default UygulamaBilesenleri;