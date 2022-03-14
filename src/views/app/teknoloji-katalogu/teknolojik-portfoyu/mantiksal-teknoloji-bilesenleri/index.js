import React from 'react'
import { observer } from "mobx-react-lite";
import GlobalPage from '../../../../custom/GlobalPage';

const MantiksalTeknolojiBilesenleri = ({ match }) => {
    return <GlobalPage heading={'menu.sertifikalar'} match={match} subCatalogId={1010} />
};

export default MantiksalTeknolojiBilesenleri;