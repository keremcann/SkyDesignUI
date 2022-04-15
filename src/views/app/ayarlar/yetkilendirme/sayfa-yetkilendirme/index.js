import React, { useState } from 'react'
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from 'reactstrap';
import { Colxx, Separator } from './../../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../../helpers/IntlMessages';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { ColumnBuilder } from '../../../../../app/utils/ColumnBuilder';
import _ from 'lodash';

const SayfaYetkilendirme = ({ match }) => {

    const [level1Menu, setLevel1Menu] = useState(
        [
            {
                id: 1,
                menuAdi: 'Teknoloji kataloğu'
            },
        ]
    )
    const roleColumnDefinitions = [
        new ColumnBuilder('id', 'ID').sortable().isHidden().build(),
        new ColumnBuilder('rolAdi', 'Rol adı').sortable().withTextFilter().build(),

    ]

    const levelColumnDefinitions = [
        new ColumnBuilder('id', 'ID').sortable().isHidden().build(),
        new ColumnBuilder('menuAdi', 'Adı').sortable().withTextFilter().build(),

    ]

    return (

        <>
            <Row>
                <Colxx className="mb-12">

                    <Breadcrumb heading={'menu.ayarlar.yetkilendirme.sayfa-yetkilendirme'} match={match} />

                    <div className="text-zero top-right-button-container">
                        <Button
                            color="primary"
                            size="lg"
                            className="top-right-button"
                            onClick={() => {

                            }}
                        >
                            <IntlMessages id="pages.add-new" />
                        </Button>
                    </div>

                    <Separator className="mb-5" />

                    <Card className="mb-4">
                        <CardBody>

                            <Row>
                                <Colxx lg="3" md="6" className="mb-3">
                                    <h2 style={{
                                        textAlign: 'center',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        margin: '15px 0 25px 0'
                                    }}>Rol listesi</h2>
                                    <BootstrapTable
                                        keyField='id'
                                        data={[
                                            {
                                                id: 1,
                                                rolAdi: 'Admin'
                                            },
                                            {
                                                id: 2,
                                                rolAdi: 'Solution Arc.'
                                            },
                                            {
                                                id: 3,
                                                rolAdi: 'Technical Arc.'
                                            }
                                        ]}
                                        columns={roleColumnDefinitions}
                                        filter={filterFactory()}
                                        selectRow={{
                                            mode: 'radio',
                                            clickToSelect: true,
                                            hideSelectColumn: true,
                                            bgColor: 'orange',
                                            onSelect: (row) => {
                                                alert(JSON.stringify(row))
                                                setLevel1Menu([
                                                    {
                                                        id: 3,
                                                        menuAdi: 'BLABLA'
                                                    },
                                                    {
                                                        id: 4,
                                                        menuAdi: 'BLABLA 22222'
                                                    },
                                                ])
                                            }
                                        }}
                                    />
                                </Colxx>
                                <Colxx lg="3" md="6" className="mb-3">
                                    <h2 style={{
                                        textAlign: 'center',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        margin: '15px 0 25px 0'
                                    }}>Level 1 Menü</h2>
                                    <BootstrapTable
                                        keyField='id'
                                        data={level1Menu}
                                        columns={levelColumnDefinitions}
                                        filter={filterFactory()} />
                                </Colxx>
                                <Colxx lg="3" md="6" className="mb-3">
                                    <h2 style={{
                                        textAlign: 'center',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        margin: '15px 0 25px 0'
                                    }}>Level 2 Menü</h2>
                                    <BootstrapTable
                                        keyField='id'
                                        data={[
                                            {
                                                id: 1,
                                                menuAdi: 'Fiziksel'
                                            },
                                            {
                                                id: 2,
                                                menuAdi: 'Mantiksal'
                                            }
                                        ]}
                                        columns={levelColumnDefinitions}
                                        filter={filterFactory()} />
                                </Colxx>
                                <Colxx lg="3" md="6" className="mb-3">
                                    <h2 style={{
                                        textAlign: 'center',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        margin: '15px 0 25px 0'
                                    }}>Level 3 Menü</h2>
                                    <BootstrapTable
                                        keyField='id'
                                        data={[
                                            {
                                                id: 1,
                                                menuAdi: 'Sunucular'
                                            },
                                            {
                                                id: 2,
                                                menuAdi: 'Sunucu grupları'
                                            }
                                        ]}
                                        columns={levelColumnDefinitions}
                                        filter={filterFactory()} />
                                </Colxx>
                            </Row>




                        </CardBody>
                    </Card>

                </Colxx>
            </Row>
        </>
    )

};

export default SayfaYetkilendirme;