import React from 'react'
import GlobalPage from '../../../../custom/GlobalPage';

const Terimler = ({ match }) => {
    return <GlobalPage
        heading='menu.veri-katalogu.is-sozlugu.terimler'
        match={match}
        subCatalogId={1050} />
};

export default Terimler;