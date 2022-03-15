import React from 'react'
import GlobalPage from '../../../custom/GlobalPage';

const Urunler = ({ match }) => {
    return <GlobalPage
        heading='menu.is-katalogu.urunler'
        match={match}
        subCatalogId={1021} />
};

export default Urunler;