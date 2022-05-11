import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from 'reactstrap';
import { Colxx, Separator } from './../../../../components/common/CustomBootstrap';
import { useStore } from '../../../../app/stores/store';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { ColumnBuilder } from '../../../../app/utils/ColumnBuilder';
import IntlMessages from '../../../../helpers/IntlMessages';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import Notifier from '../../../../app/utils/Notifier';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import SkyModal from '../../../../components/common/SkyModal';
import _ from 'lodash'
import TreeHelper from '../../../../app/utils/TreeManagement/TreeHelper';
import TreeBuilder from '../../../../app/utils/TreeManagement/TreeBuilder';
import SkyTable from '../../../../app/utils/SkyTable/SkyTable';
import SkyTableColumnBuilder from '../../../../app/utils/SkyTable/SkyTableColumnBuilder';
import Select, { components } from 'react-select';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
import { menuIconData } from '../../../../app/constants/menu-icon-data';
import AddOrUpdateModal from './AddOrUpdateModal';
import DefineColumnModal from './DefineColumnModal';
const { Option } = components;

const SayfaTanimi = ({ match }) => {
  const { pageStore } = useStore();
  const {
    data,
    loading,
    loadPages, createPage,

    updateModalOpen, toggleUpdateModal,
    addModalOpen, toggleAddModal,
    deleteModalOpen, toggleDeleteModal,
    addColumnModalOpen, toggleAddColumnModal,

    selectedItem, setSelectedItem
  } = pageStore;

  const [selectedMenuItem, setSelectedMenuItem] = useState(null)
  const [secondLevelMenu, setSecondLevelMenu] = useState([])
  const [thirdLevelMenu, setThirdLevelMenu] = useState([])

  useEffect(() => {
    loadPages();
  }, [loadPages])

  const columns = React.useMemo(() => [
    new ColumnBuilder('pageId', 'Page ID').isIdField().sortable().withTextFilter(true).build(),
    new ColumnBuilder('pageName', 'Page Name').isIdField().sortable().withTextFilter().build(),
    new ColumnBuilder('pageIcon', 'Page Icon').isIdField().sortable().withSelectFilter(data).build(),
    new ColumnBuilder('pageUrl', 'Page URL').isIdField().sortable().withTextFilter().build(),
    new ColumnBuilder('operations', 'Operations').isDummyField().withFormat((cell, row, rowIndex) => {
      return <>
        <button
          type='button'
          className="btn-sd iconsminds-folder-edit"
          onClick={(e) => {
            setSelectedItem(row);
            toggleUpdateModal();
          }}> Düzenle</button>


        <button
          type='button'
          className="btn-sd iconsminds-folder-delete"
          onClick={(e) => {
            setSelectedItem(row);
            toggleDeleteModal();
          }}> Sil</button>
      </>
    }).build()

  ], []);

  function getAllRelatedDataFromTreeByPageId(pageId) {
    return _.filter(data, (val) => {
      return val.parentId === pageId;
    })
  }


  const firstLevelMenuRef = useRef();
  const secondLevelMenuRef = useRef();
  const thirdLevelMenuRef = useRef();

  const treeColumnDefinition = (level, filterData) => [
    new ColumnBuilder('pageId', 'Sayfa').isHidden().isIdField().build(),
    new ColumnBuilder('pageName', level + '. Seviye').build(),

  ];

  let treeBuilder = TreeBuilder(data, 'pageId', 'parentId');

  const [selectedOption, setSelectedOption] = useState({ "label": "iconsminds-cursor-select", "value": "iconsminds-cursor-select", "key": 698, "icon": "iconsminds-cursor-select" });
  pageStore.refreshedValue = pageStore.refreshedValue + 1
  return (
    <>
      <SkyModal
        headerText={'Yeni kayıt'}
        modalOpen={addModalOpen}
        toggleModal={toggleAddModal}
      >
        <AddOrUpdateModal />
      </SkyModal>

      <SkyModal
        headerText={`Kolon tanımlama (${selectedMenuItem?.pageName})`}
        modalOpen={addColumnModalOpen}
        toggleModal={toggleAddColumnModal}
      >
        <DefineColumnModal selectedItem={selectedMenuItem} />
      </SkyModal>

      <SkyModal
        headerText={'Güncelleme'}
        modalOpen={updateModalOpen}
        toggleModal={toggleUpdateModal}
      >
        <AddOrUpdateModal data={selectedItem} />
      </SkyModal>

      <SkyModal
        headerText={'Silme işlemi onayı'}
        modalOpen={deleteModalOpen}
        toggleModal={toggleDeleteModal}
      >
        <SkyModal.Body>

          <p><b>{selectedItem?.name}</b> isimli kayıt silinmek üzere. İşlemi onaylıyor musunuz?</p>

        </SkyModal.Body>
        <SkyModal.Footer>
          <Button style={{ backgroundColor: 'red' }} color="secondary" type="button" onClick={async () => {
            alert('deleted id: ' + selectedItem.subCatalogDetailId);
            toggleDeleteModal();
            await loadPages();
          }}>
            Sil
          </Button>

          <Button color="secondary" type="button" onClick={async () => {
            toggleDeleteModal();
          }}>
            İptal
          </Button>

        </SkyModal.Footer>
      </SkyModal>
      {/* <Row>
        <Col>
          <Select
            components={{
              Input: CustomSelectInput,
              Option: (props) => {
                return <Option {...props}>
                  <i
                    className={props.data.icon}
                    style={{ fontSize: 24 }}
                  />
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  {props.data.label}
                </Option>
              }
            }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            value={selectedOption}
            onChange={setSelectedOption}
            options={menuIconData}
          />
          <br/>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ display: 'contents' }}>Selected icon:</label> <span>&nbsp;&nbsp;</span> <i className={selectedOption?.value} style={{ fontSize: 36 }} />
          </div>
        </Col>

      </Row> */}
      <Row>
        <Colxx className="mb-12">

          <Breadcrumb heading={'menu.ayarlar.sayfa-tanimi'} match={match} />

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => {
                toggleAddModal();
              }}
            >
              <IntlMessages id="pages.add-new" />
            </Button>
          </div>


          <div className="text-zero top-right-button-container mr-2">
            <Button
              disabled={selectedMenuItem == null}
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => {
                toggleAddColumnModal();
              }}
            >
              {selectedMenuItem != null ? selectedMenuItem?.pageName + ' - ' : ''}Kolon tanımlama
            </Button>
          </div>

          <Separator className="mb-5" />

          <Card className="mb-4">
            <CardBody>

              {/* <Row>
                                <Colxx xs='12'>
                                    <pre>
                                        first level tree: {JSON.stringify(getAllFirstLevelTree(), null, 4)}
                                        <br />
                                        <br />
                                        selected tree: {JSON.stringify(getAllRelatedDataFromTreeByPageId(13), null, 4)}
                                        transformed: {JSON.stringify(transformToTree(getAllRelatedDataFromTreeByPageId(13)), null, 4)}
                                        data: {JSON.stringify(transformToTree(data), null, 4)}
                                    </pre>
                                </Colxx>
                            </Row> */}
              {/* <Row>
                <button onClick={async () => {
                  setSecondLevelMenu([
                    ...secondLevelMenu,
                    {
                      isCustom: false,
                      pageId: 99,
                      pageName: 'different-name',
                      pageUrl: "ftb---yasam-dongusu-yonetimi",
                      parentId: 9,
                      description: 'bla',
                      tableName: 'TABLE_NAME!'
                    }
                  ])
                }}>Click here</button>
              </Row> */}
              <Row>
                <Colxx style={{ textAlign: 'right' }}>
                  {<button
                    disabled={selectedMenuItem == null}
                    className='btn btn-primary'
                    style={{ marginRight: '14px' }}
                    onClick={() => {
                      firstLevelMenuRef.current.selectionContext.selected = [];
                      secondLevelMenuRef.current.selectionContext.selected = [];
                      thirdLevelMenuRef.current.selectionContext.selected = [];
                      setSecondLevelMenu([]);
                      setThirdLevelMenu([]);
                      setSelectedMenuItem(null);
                    }}>

                    Seçimleri temizle</button>}
                  {<button
                    className='btn btn-primary'
                    style={{ marginRight: '14px' }}
                    disabled={selectedMenuItem?.level == 3 || selectedMenuItem == null}
                  >{(selectedMenuItem?.level == 3 || selectedMenuItem == null) && 'Ekle'}{selectedMenuItem?.level != 3 && selectedMenuItem != null && `${selectedMenuItem?.pageName} altına ${selectedMenuItem?.level + 1}. seviye sayfa ekle`}
                  </button>}
                  {<button className='btn btn-primary' disabled={selectedMenuItem == null}>Sil - {selectedMenuItem?.pageName}</button>}
                </Colxx>
              </Row>
              <br></br>
              <Row>
                <Colxx xs='4'>

                  {/* <SkyTable
                                        columns={[
                                            new SkyTableColumnBuilder('pageId', 'ID').isIdColumn(true).build(),
                                            new SkyTableColumnBuilder('pageName', '1. Seviye').build()
                                        ]}
                                        data={treeBuilder.getAllRelatedDataFromTreeById(null)}
                                        onRowSelected={(row) => {
                                            row = {
                                                ...row,
                                                level: 1
                                            }

                                            secondLevelMenuRef.current.selectionContext.selected = [];
                                            setThirdLevelMenu([])
                                            setSelectedMenuItem(row);
                                            setSecondLevelMenu(getAllRelatedDataFromTreeByPageId(row.pageId))
                                        }}
                                    /> */}

                  <BootstrapTable
                    keyField='pageId'
                    ref={firstLevelMenuRef}
                    data={treeBuilder.getAllRelatedDataFromTreeByParentId(null)}
                    columns={treeColumnDefinition(1, treeBuilder.getAllRelatedDataFromTreeByParentId(null))}
                    filter={filterFactory()}
                    selectRow={{
                      mode: 'radio',
                      clickToSelect: true,
                      hideSelectColumn: true,
                      classes: 'btn-primary',
                      onSelect: (row) => {
                        row = {
                          ...row,
                          level: 1
                        }

                        secondLevelMenuRef.current.selectionContext.selected = [];
                        setThirdLevelMenu([])
                        setSelectedMenuItem(row);
                        setSecondLevelMenu(getAllRelatedDataFromTreeByPageId(row.pageId))
                      }
                    }}
                  />

                </Colxx>
                <Colxx xs='4'>
                  <BootstrapTable
                    keyField='pageId'
                    ref={secondLevelMenuRef}
                    data={secondLevelMenu}
                    columns={treeColumnDefinition(2, secondLevelMenu)}
                    filter={filterFactory()}
                    selectRow={{
                      mode: 'radio',
                      clickToSelect: true,
                      hideSelectColumn: true,
                      classes: 'btn-primary',
                      onSelect: (row) => {

                        row = {
                          ...row,
                          level: 2
                        }
                        thirdLevelMenuRef.current.selectionContext.selected = [];
                        setSelectedMenuItem(row);
                        setThirdLevelMenu(getAllRelatedDataFromTreeByPageId(row.pageId))
                      }
                    }}
                  />

                </Colxx>
                <Colxx xs='4'>
                  <BootstrapTable
                    keyField='pageId'
                    ref={thirdLevelMenuRef}
                    data={thirdLevelMenu}
                    columns={treeColumnDefinition(3, thirdLevelMenu)}
                    filter={filterFactory()}
                    selectRow={{
                      mode: 'radio',
                      clickToSelect: true,
                      hideSelectColumn: true,
                      classes: 'btn-primary',
                      onSelect: (row) => {
                        row = {
                          ...row,
                          level: 3
                        }
                        setSelectedMenuItem(row);
                      }
                    }} />
                </Colxx>
              </Row>
              <Row>

                <Colxx>
                  <pre className='btn-primary'>
                    Selected menu item: {JSON.stringify(selectedMenuItem, null, 4)}
                  </pre>
                </Colxx>
              </Row>
            </CardBody>
          </Card>

        </Colxx>
      </Row>
    </>
  )

};

export default observer(SayfaTanimi);