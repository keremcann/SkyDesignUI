import React from 'react'
import GlobalPage from '../../../custom/GlobalPage';

const Uygulamalar = ({ match }) => {
    return <GlobalPage
        heading='menu.uygulama-katalogu.uygulamalar'
        match={match}
        subCatalogId={1} />
}

export default Uygulamalar;