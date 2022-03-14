import React from 'react'
import { observer } from "mobx-react-lite";
import GlobalPage from '../../../../custom/GlobalPage';

const StandartTeknolojiBilesenleri = ({ match }) => {
    return <GlobalPage heading={'menu.sertifikalar'} match={match} subCatalogId={1012} />
};

export default StandartTeknolojiBilesenleri;