import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import { useStore } from '../../../app/stores/store';
import SkyTable from '../../../app/utils/SkyTable/SkyTable';
import SkyTableColumnBuilder from '../../../app/utils/SkyTable/SkyTableColumnBuilder';
import TreeHelper from '../../../app/utils/TreeManagement/TreeHelper';

const GenericMenuContent = ({ match }) => {

    const { genericMenuContentStore } = useStore();
    const { columnList, data, loading, loadContent } = genericMenuContentStore;

    useEffect(() => autorun(() => {
        loadContent(match.params.Level1Menu, match.params.Level2Menu, match.params.Level3Menu);
    }), [loadContent, match]);

    // const data = [{
    //     "id": 1,
    //     "name": "Martie",
    //     "description": "Annice",
    //     "ipaddress": "213.0.1.125",
    //     "memory": 56,
    //     "organizationUnit": "Luigi",
    //     "operatingSystem": "Bigtax",
    //     "status": "Tres-Zap",
    //     "critically": "Ronstring",
    //     "environment": "Wrapsafe",
    //     "location": "Keylex"
    // }, {
    //     "id": 2,
    //     "name": "Maurene",
    //     "description": "Wemm",
    //     "ipaddress": "114.31.187.95",
    //     "memory": 4,
    //     "organizationUnit": "Yorke",
    //     "operatingSystem": "Gembucket",
    //     "status": "Zathin",
    //     "critically": "Bytecard",
    //     "environment": "Fixflex",
    //     "location": "Cardify"
    // }, {
    //     "id": 3,
    //     "name": "Eldridge",
    //     "description": "Ikringill",
    //     "ipaddress": "69.82.107.219",
    //     "memory": 49,
    //     "organizationUnit": "Emanuel",
    //     "operatingSystem": "Hatity",
    //     "status": "Ronstring",
    //     "critically": "Domainer",
    //     "environment": "Gembucket",
    //     "location": "Alpha"
    // }, {
    //     "id": 4,
    //     "name": "Ranice",
    //     "description": "MacCardle",
    //     "ipaddress": "93.19.187.145",
    //     "memory": 42,
    //     "organizationUnit": "Lanny",
    //     "operatingSystem": "Aerified",
    //     "status": "Voyatouch",
    //     "critically": "Andalax",
    //     "environment": "It",
    //     "location": "Flowdesk"
    // }, {
    //     "id": 5,
    //     "name": "Tabbitha",
    //     "description": "Colliar",
    //     "ipaddress": "108.122.55.139",
    //     "memory": 41,
    //     "organizationUnit": "Gaspard",
    //     "operatingSystem": "Bitwolf",
    //     "status": "Tin",
    //     "critically": "Zaam-Dox",
    //     "environment": "Wrapsafe",
    //     "location": "Sonair"
    // }, {
    //     "id": 6,
    //     "name": "Cynthy",
    //     "description": "Stock",
    //     "ipaddress": "112.153.64.126",
    //     "memory": 58,
    //     "organizationUnit": "Ephrem",
    //     "operatingSystem": "Hatity",
    //     "status": "Redhold",
    //     "critically": "Viva",
    //     "environment": "Span",
    //     "location": "Overhold"
    // }, {
    //     "id": 7,
    //     "name": "Morris",
    //     "description": "Comi",
    //     "ipaddress": "175.117.129.119",
    //     "memory": 41,
    //     "organizationUnit": "Louis",
    //     "operatingSystem": "Regrant",
    //     "status": "Cardify",
    //     "critically": "Hatity",
    //     "environment": "Subin",
    //     "location": "Quo Lux"
    // }, {
    //     "id": 8,
    //     "name": "Babara",
    //     "description": "Syphus",
    //     "ipaddress": "251.91.222.2",
    //     "memory": 25,
    //     "organizationUnit": "Jonah",
    //     "operatingSystem": "Treeflex",
    //     "status": "Cardguard",
    //     "critically": "Zathin",
    //     "environment": "Holdlamis",
    //     "location": "Voyatouch"
    // }, {
    //     "id": 9,
    //     "name": "Porter",
    //     "description": "Whiston",
    //     "ipaddress": "206.60.69.167",
    //     "memory": 55,
    //     "organizationUnit": "Jamey",
    //     "operatingSystem": "Zamit",
    //     "status": "Alpha",
    //     "critically": "Greenlam",
    //     "environment": "Hatity",
    //     "location": "Tin"
    // }, {
    //     "id": 10,
    //     "name": "Dawn",
    //     "description": "Drust",
    //     "ipaddress": "32.74.167.129",
    //     "memory": 85,
    //     "organizationUnit": "Merwin",
    //     "operatingSystem": "Vagram",
    //     "status": "Job",
    //     "critically": "Y-Solowarm",
    //     "environment": "Tres-Zap",
    //     "location": "Stim"
    // }, {
    //     "id": 11,
    //     "name": "Waylen",
    //     "description": "Levermore",
    //     "ipaddress": "6.230.31.246",
    //     "memory": 77,
    //     "organizationUnit": "Isadore",
    //     "operatingSystem": "Bitwolf",
    //     "status": "Sonair",
    //     "critically": "Trippledex",
    //     "environment": "Konklab",
    //     "location": "Regrant"
    // }, {
    //     "id": 12,
    //     "name": "Malchy",
    //     "description": "Barnwill",
    //     "ipaddress": "38.95.233.21",
    //     "memory": 2,
    //     "organizationUnit": "Kristos",
    //     "operatingSystem": "Aerified",
    //     "status": "Mat Lam Tam",
    //     "critically": "Alpha",
    //     "environment": "Quo Lux",
    //     "location": "Zontrax"
    // }, {
    //     "id": 13,
    //     "name": "Ainslee",
    //     "description": "Heskins",
    //     "ipaddress": "240.186.68.204",
    //     "memory": 29,
    //     "organizationUnit": "Martie",
    //     "operatingSystem": "Voltsillam",
    //     "status": "Home Ing",
    //     "critically": "Lotlux",
    //     "environment": "Redhold",
    //     "location": "Keylex"
    // }, {
    //     "id": 14,
    //     "name": "Deidre",
    //     "description": "Haddington",
    //     "ipaddress": "62.120.238.242",
    //     "memory": 76,
    //     "organizationUnit": "Ricky",
    //     "operatingSystem": "Zathin",
    //     "status": "Ronstring",
    //     "critically": "Mat Lam Tam",
    //     "environment": "Zontrax",
    //     "location": "Veribet"
    // }, {
    //     "id": 15,
    //     "name": "Fayette",
    //     "description": "Rosenwald",
    //     "ipaddress": "233.160.72.115",
    //     "memory": 61,
    //     "organizationUnit": "Tally",
    //     "operatingSystem": "Zontrax",
    //     "status": "Prodder",
    //     "critically": "Lotstring",
    //     "environment": "Zamit",
    //     "location": "Alpha"
    // }, {
    //     "id": 16,
    //     "name": "Martino",
    //     "description": "Sparham",
    //     "ipaddress": "239.149.220.11",
    //     "memory": 64,
    //     "organizationUnit": "Christoforo",
    //     "operatingSystem": "Overhold",
    //     "status": "Konklux",
    //     "critically": "Daltfresh",
    //     "environment": "Alphazap",
    //     "location": "Span"
    // }, {
    //     "id": 17,
    //     "name": "Neron",
    //     "description": "Kepe",
    //     "ipaddress": "227.81.66.135",
    //     "memory": 14,
    //     "organizationUnit": "Rich",
    //     "operatingSystem": "Domainer",
    //     "status": "Namfix",
    //     "critically": "Span",
    //     "environment": "Keylex",
    //     "location": "Voyatouch"
    // }, {
    //     "id": 18,
    //     "name": "Franni",
    //     "description": "Fairpool",
    //     "ipaddress": "199.33.39.250",
    //     "memory": 26,
    //     "organizationUnit": "Vinny",
    //     "operatingSystem": "Holdlamis",
    //     "status": "Transcof",
    //     "critically": "Alpha",
    //     "environment": "Voltsillam",
    //     "location": "Bitchip"
    // }, {
    //     "id": 19,
    //     "name": "Datha",
    //     "description": "Jaukovic",
    //     "ipaddress": "162.36.245.96",
    //     "memory": 42,
    //     "organizationUnit": "Caspar",
    //     "operatingSystem": "Bitchip",
    //     "status": "Andalax",
    //     "critically": "Prodder",
    //     "environment": "Tin",
    //     "location": "Cookley"
    // }, {
    //     "id": 20,
    //     "name": "Layton",
    //     "description": "Hastwell",
    //     "ipaddress": "167.72.87.129",
    //     "memory": 5,
    //     "organizationUnit": "Guthrey",
    //     "operatingSystem": "Rank",
    //     "status": "Job",
    //     "critically": "Greenlam",
    //     "environment": "Ronstring",
    //     "location": "Subin"
    // }];

    const menu = {
        "value": [
            {
                "pageId": 1,
                "parentId": 0,
                "pageName": "İş Kataloğu",
                "pageIcon": null,
                "pageUrl": "is-katalogu"
            },
            {
                "pageId": 2,
                "parentId": 0,
                "pageName": "Uygulama Kataloğu",
                "pageIcon": null,
                "pageUrl": "uygulama-katalogu"
            },
            {
                "pageId": 3,
                "parentId": 0,
                "pageName": "Veri Kataloğu",
                "pageIcon": null,
                "pageUrl": "veri-katalogu"
            },
            {
                "pageId": 4,
                "parentId": 0,
                "pageName": "Teknoloji Kataloğu",
                "pageIcon": null,
                "pageUrl": "teknoloji-katalogu"
            },
            {
                "pageId": 5,
                "parentId": 0,
                "pageName": "Strateji Kataloğu",
                "pageIcon": null,
                "pageUrl": "strateji-katalogu"
            },
            {
                "pageId": 6,
                "parentId": 0,
                "pageName": "Portföy Kataloğu",
                "pageIcon": null,
                "pageUrl": "portfoy-katalogu"
            },
            {
                "pageId": 7,
                "parentId": 0,
                "pageName": "Süreç Kataloğu",
                "pageIcon": null,
                "pageUrl": "surec-katalogu"
            },
            {
                "pageId": 8,
                "parentId": 0,
                "pageName": "Risk Kataloğu",
                "pageIcon": null,
                "pageUrl": "risk-katalogu"
            },
            {
                "pageId": 9,
                "parentId": 0,
                "pageName": "Diyagramlar",
                "pageIcon": null,
                "pageUrl": "diyagramlar"
            },
            {
                "pageId": 10,
                "parentId": 1,
                "pageName": "İş Kabiliyetleri",
                "pageIcon": null,
                "pageUrl": "is-kabiliyetleri"
            },
            {
                "pageId": 11,
                "parentId": 1,
                "pageName": "Ürünler",
                "pageIcon": null,
                "pageUrl": "urunler"
            },
            {
                "pageId": 12,
                "parentId": 1,
                "pageName": "Kanallar",
                "pageIcon": null,
                "pageUrl": "kanallar"
            },
            {
                "pageId": 13,
                "parentId": 1,
                "pageName": "Organizasyon Şeması",
                "pageIcon": null,
                "pageUrl": "organizasyon-semasi"
            },
            {
                "pageId": 14,
                "parentId": 2,
                "pageName": "Uygulamalar",
                "pageIcon": null,
                "pageUrl": "uygulamalar"
            },
            {
                "pageId": 15,
                "parentId": 2,
                "pageName": "Uygulama Modülleri",
                "pageIcon": null,
                "pageUrl": "uygulama-modulleri"
            },
            {
                "pageId": 16,
                "parentId": 2,
                "pageName": "Uygulama Bileşenleri",
                "pageIcon": null,
                "pageUrl": "uygulama-bilesenleri"
            },
            {
                "pageId": 17,
                "parentId": 2,
                "pageName": "Uygulama Servisleri",
                "pageIcon": null,
                "pageUrl": "uygulama-servisleri"
            },
            {
                "pageId": 18,
                "parentId": 2,
                "pageName": "Uygulama Alanları",
                "pageIcon": null,
                "pageUrl": "uygulama-alanlari"
            },
            {
                "pageId": 19,
                "parentId": 3,
                "pageName": "Fiziksel Veri Modelleme",
                "pageIcon": null,
                "pageUrl": "fiziksel-veri-modelleme"
            },
            {
                "pageId": 20,
                "parentId": 3,
                "pageName": "Raporlar",
                "pageIcon": null,
                "pageUrl": "raporlar"
            },
            {
                "pageId": 21,
                "parentId": 3,
                "pageName": "İş Sözlüğü",
                "pageIcon": null,
                "pageUrl": "is-sozlugu"
            },
            {
                "pageId": 22,
                "parentId": 4,
                "pageName": "Fiziksel Teknoloji Varlıkları",
                "pageIcon": null,
                "pageUrl": "fiziksel-teknoloji-varliklari"
            },
            {
                "pageId": 23,
                "parentId": 4,
                "pageName": "Altyapı Teknoloji Varlıkları",
                "pageIcon": null,
                "pageUrl": "altyapi-teknoloji-varliklari"
            },
            {
                "pageId": 24,
                "parentId": 4,
                "pageName": "Teknoloji Portföyü",
                "pageIcon": null,
                "pageUrl": "teknoloji-portfoyu"
            },
            {
                "pageId": 25,
                "parentId": 5,
                "pageName": "Vizyon",
                "pageIcon": null,
                "pageUrl": "vizyon"
            },
            {
                "pageId": 26,
                "parentId": 5,
                "pageName": "Misyon",
                "pageIcon": null,
                "pageUrl": "misyon"
            },
            {
                "pageId": 27,
                "parentId": 5,
                "pageName": "Stratejik Dönemler",
                "pageIcon": null,
                "pageUrl": "stratejik-donemler"
            },
            {
                "pageId": 28,
                "parentId": 5,
                "pageName": "Odak Alanları",
                "pageIcon": null,
                "pageUrl": "odak-alanlari"
            },
            {
                "pageId": 29,
                "parentId": 5,
                "pageName": "Stratejik Perspektifler",
                "pageIcon": null,
                "pageUrl": "stratejik-perspektifler"
            },
            {
                "pageId": 30,
                "parentId": 5,
                "pageName": "Stratejik Hedefler",
                "pageIcon": null,
                "pageUrl": "stratejik-hedefler"
            },
            {
                "pageId": 31,
                "parentId": 6,
                "pageName": "Programlar",
                "pageIcon": null,
                "pageUrl": "programlar"
            },
            {
                "pageId": 32,
                "parentId": 6,
                "pageName": "Projeler",
                "pageIcon": null,
                "pageUrl": "projeler"
            },
            {
                "pageId": 33,
                "parentId": 6,
                "pageName": "Talepler",
                "pageIcon": null,
                "pageUrl": "talepler"
            },
            {
                "pageId": 34,
                "parentId": 6,
                "pageName": "Portföy Hizalama",
                "pageIcon": null,
                "pageUrl": "portfoy-hizalama"
            },
            {
                "pageId": 35,
                "parentId": 7,
                "pageName": "Ana Süreç Grupları",
                "pageIcon": null,
                "pageUrl": "ana-surec-gruplari"
            },
            {
                "pageId": 36,
                "parentId": 7,
                "pageName": "Süreç Grupları",
                "pageIcon": null,
                "pageUrl": "surec-gruplari"
            },
            {
                "pageId": 37,
                "parentId": 7,
                "pageName": "Alt Süreç Grupları",
                "pageIcon": null,
                "pageUrl": "alt-surec-gruplari"
            },
            {
                "pageId": 38,
                "parentId": 7,
                "pageName": "Süreçler",
                "pageIcon": null,
                "pageUrl": "surecler"
            },
            {
                "pageId": 39,
                "parentId": 7,
                "pageName": "Görevler",
                "pageIcon": null,
                "pageUrl": "gorevler"
            },
            {
                "pageId": 40,
                "parentId": 7,
                "pageName": "Havuzlar",
                "pageIcon": null,
                "pageUrl": "havuzlar"
            },
            {
                "pageId": 41,
                "parentId": 7,
                "pageName": "Kulvarlar",
                "pageIcon": null,
                "pageUrl": "kulvarlar"
            },
            {
                "pageId": 42,
                "parentId": 8,
                "pageName": "BT Riskleri",
                "pageIcon": null,
                "pageUrl": "bt-riskleri"
            },
            {
                "pageId": 43,
                "parentId": 8,
                "pageName": "İş Riskleri",
                "pageIcon": null,
                "pageUrl": "is-riskleri"
            },
            {
                "pageId": 44,
                "parentId": 9,
                "pageName": "Altyapı Mimarisi",
                "pageIcon": null,
                "pageUrl": "altyapi-mimarisi"
            },
            {
                "pageId": 45,
                "parentId": 9,
                "pageName": "Uygulama Mimarisi",
                "pageIcon": null,
                "pageUrl": "uygulama-mimarisi"
            },
            {
                "pageId": 46,
                "parentId": 13,
                "pageName": "Kişiler",
                "pageIcon": null,
                "pageUrl": "kisiler"
            },
            {
                "pageId": 47,
                "parentId": 13,
                "pageName": "Roller",
                "pageIcon": null,
                "pageUrl": "roller"
            },
            {
                "pageId": 48,
                "parentId": 13,
                "pageName": "Ortamlar",
                "pageIcon": null,
                "pageUrl": "ortamlar"
            },
            {
                "pageId": 49,
                "parentId": 13,
                "pageName": "Lokasyonlar",
                "pageIcon": null,
                "pageUrl": "lokasyonlar"
            },
            {
                "pageId": 50,
                "parentId": 13,
                "pageName": "Organizasyon Birimleri",
                "pageIcon": null,
                "pageUrl": "organizasyon-birimleri"
            },
            {
                "pageId": 51,
                "parentId": 19,
                "pageName": "Veri Öğeleri",
                "pageIcon": null,
                "pageUrl": "veri-ogeleri"
            },
            {
                "pageId": 52,
                "parentId": 19,
                "pageName": "Veritabanları",
                "pageIcon": null,
                "pageUrl": "veritabanlari"
            },
            {
                "pageId": 53,
                "parentId": 19,
                "pageName": "Şemalar",
                "pageIcon": null,
                "pageUrl": "semalar"
            },
            {
                "pageId": 54,
                "parentId": 19,
                "pageName": "Tablolar",
                "pageIcon": null,
                "pageUrl": "tablolar"
            },
            {
                "pageId": 55,
                "parentId": 19,
                "pageName": "Veri Sözlüğü",
                "pageIcon": null,
                "pageUrl": "veri-sozlugu"
            },
            {
                "pageId": 56,
                "parentId": 19,
                "pageName": "Veri Tipleri",
                "pageIcon": null,
                "pageUrl": "veri-tipleri"
            },
            {
                "pageId": 57,
                "parentId": 21,
                "pageName": "Veri Politikaları",
                "pageIcon": null,
                "pageUrl": "veri-politikalari"
            },
            {
                "pageId": 58,
                "parentId": 21,
                "pageName": "Terimler",
                "pageIcon": null,
                "pageUrl": "terimler"
            },
            {
                "pageId": 59,
                "parentId": 21,
                "pageName": "Mevuzatlar",
                "pageIcon": null,
                "pageUrl": "mevuzatlar"
            },
            {
                "pageId": 60,
                "parentId": 21,
                "pageName": "Veri Standartları",
                "pageIcon": null,
                "pageUrl": "veri-standartlari"
            },
            {
                "pageId": 61,
                "parentId": 21,
                "pageName": "İş Kuralları",
                "pageIcon": null,
                "pageUrl": "is-kurallari"
            },
            {
                "pageId": 62,
                "parentId": 21,
                "pageName": "Kısaltmalar",
                "pageIcon": null,
                "pageUrl": "kisaltmalar"
            },
            {
                "pageId": 63,
                "parentId": 22,
                "pageName": "Sunucular",
                "pageIcon": null,
                "pageUrl": "sunucular"
            },
            {
                "pageId": 64,
                "parentId": 22,
                "pageName": "Sunucu Grupları",
                "pageIcon": null,
                "pageUrl": "sunucu-gruplari"
            },
            {
                "pageId": 65,
                "parentId": 22,
                "pageName": "Switch",
                "pageIcon": null,
                "pageUrl": "switch"
            },
            {
                "pageId": 66,
                "parentId": 22,
                "pageName": "Router",
                "pageIcon": null,
                "pageUrl": "router"
            },
            {
                "pageId": 67,
                "parentId": 22,
                "pageName": "Depolama Aygıtları",
                "pageIcon": null,
                "pageUrl": "depolama-aygitlari"
            },
            {
                "pageId": 68,
                "parentId": 22,
                "pageName": "İstemciler",
                "pageIcon": null,
                "pageUrl": "istemciler"
            },
            {
                "pageId": 69,
                "parentId": 22,
                "pageName": "Sertifikalar",
                "pageIcon": null,
                "pageUrl": "sertifikalar"
            },
            {
                "pageId": 70,
                "parentId": 23,
                "pageName": "IPAC",
                "pageIcon": null,
                "pageUrl": "ipac"
            },
            {
                "pageId": 71,
                "parentId": 23,
                "pageName": "TIPA",
                "pageIcon": null,
                "pageUrl": "tipa"
            },
            {
                "pageId": 72,
                "parentId": 23,
                "pageName": "Altyapı Platform Bileşenleri",
                "pageIcon": null,
                "pageUrl": "altyapi-platform-bilesenleri"
            },
            {
                "pageId": 73,
                "parentId": 23,
                "pageName": "Teknolojik Altyapı Platformları",
                "pageIcon": null,
                "pageUrl": "teknolojik-altyapi-platformlari"
            },
            {
                "pageId": 74,
                "parentId": 24,
                "pageName": "Mantıksal Teknoloji Bileşenleri",
                "pageIcon": null,
                "pageUrl": "mantiksal-teknoloji-bilesenleri"
            },
            {
                "pageId": 75,
                "parentId": 24,
                "pageName": "Fiziksel Teknoloji Bileşenleri",
                "pageIcon": null,
                "pageUrl": "fiziksel-teknoloji-bilesenleri"
            },
            {
                "pageId": 76,
                "parentId": 24,
                "pageName": "Standart Teknoloji Bileşenleri",
                "pageIcon": null,
                "pageUrl": "standart-teknoloji-bilesenleri"
            },
            {
                "pageId": 77,
                "parentId": 24,
                "pageName": "FTB - Yaşam Döngüsü Yönetimi",
                "pageIcon": null,
                "pageUrl": "ftb---yasam-dongusu-yonetimi"
            }
        ],
        "success": true,
        "infoMessage": null,
        "errorMessage": null
    };

    const columnDefinitions =
        columnList.map(column => {
            return new SkyTableColumnBuilder(column.columnName, column.columnName).withSelectFilter().build()
        })

    return (

        <Suspense fallback={<div className="loading" />}>
            {JSON.stringify(match)}
            <Card>
                <CardBody>

                    {/* <pre>
                    {JSON.stringify(TreeHelper.transformToTree(menu.value, 'pageId', 'parentId'), null, 4)}
                </pre> */}

                    <h1>{columnList[0]?.tableName}!</h1>
                    {/* <pre>
                    <h2>
                        {JSON.stringify(match, null, 4)}
                    </h2>
                </pre> */}

                    <SkyTable
                        columns={columnDefinitions}
                        data={data}
                    />


                    {/* <SkyTable
                    columns={[
                        new SkyTableColumnBuilder('id', 'ID').isIdColumn().withTextFilter().build(),
                        new SkyTableColumnBuilder('name', 'Name').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('description', 'Desc').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('ipaddress', 'IP').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('memory', 'memory').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('organizationUnit', 'Organization Unit').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('operatingSystem', 'Operating System').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('status', 'Status').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('critically', 'Critically').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('environment', 'Environment').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('location', 'Location').isIdColumn().withSelectFilter().build(),
                        new SkyTableColumnBuilder('type', 'Type').isIdColumn().withSelectFilter().build(),
                    ]}
                    data={data}
                /> */}

                </CardBody>

            </Card>
        </Suspense>
    )
};
export default observer(GenericMenuContent);