import React from 'react'
import GlobalPage from '../../../../custom/GlobalPage';

const SunucuGruplari = ({ match }) => {
    return <GlobalPage
        heading='menu.teknoloji-katalogu.fiziksel-teknoloji-varliklari.sunucu-gruplari'
        match={match}
        subCatalogId={1002} />
};

export default SunucuGruplari;