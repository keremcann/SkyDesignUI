import React from 'react'
import GlobalPage from '../../../custom/GlobalPage';

const UygulamaAlanlari = ({ match }) => {
    return <GlobalPage
        heading='menu.uygulama-katalogu.uygulama-alanlari'
        match={match}
        subCatalogId={5} />
};

export default UygulamaAlanlari;