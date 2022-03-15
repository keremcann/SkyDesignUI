import React from 'react'
import GlobalPage from '../../../custom/GlobalPage';

const Programlar = ({ match }) => {
    return <GlobalPage
        heading='menu.portfoy-katalogu.programlar'
        match={match}
        subCatalogId={1023} />
};

export default Programlar;