import React from 'react'
import GlobalPage from '../../../custom/GlobalPage';

const Kanallar = ({ match }) => {
    return <GlobalPage
        heading='menu.is-katalogu.kanallar'
        match={match}
        subCatalogId={1015} />
};

export default Kanallar;