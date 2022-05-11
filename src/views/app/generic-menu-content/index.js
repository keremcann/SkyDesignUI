import { Field, Form, Formik } from 'formik';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Breadcrumb, Button, Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Row } from 'reactstrap';
import { useStore } from '../../../app/stores/store';
import SkyTable from '../../../app/utils/SkyTable/SkyTable';
import SkyTableColumnBuilder from '../../../app/utils/SkyTable/SkyTableColumnBuilder';
import TreeHelper from '../../../app/utils/TreeManagement/TreeHelper';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import SkyModal from '../../../components/common/SkyModal';
import IntlMessages from '../../../helpers/IntlMessages';
import AddOrUpdateModal from './AddOrUpdateModal';

const GenericMenuContent = ({ match }) => {

  const { genericMenuContentStore } = useStore();
  const {
    columnList, data, loading,
    loadContent, createContent, updateContent, deleteContent,

    updateModalOpen, toggleUpdateModal,
    addModalOpen, toggleAddModal,
    deleteModalOpen, toggleDeleteModal
  } = genericMenuContentStore;

  const loadAllContent = async () => {
    await loadContent(match.params.Level1Menu, match.params.Level2Menu, match.params.Level3Menu);
  }

  useEffect(() => autorun(() => {
    loadAllContent();
  }), [match, loadContent]);

  const [selectedRow, setSelectedRow] = useState(null);

  const columnDefinitions =
    columnList
      .filter(column =>
        column.columnName != 'CreateUser' &&
        column.columnName != 'CreateDate' &&
        column.columnName != 'UpdateUser' &&
        column.columnName != 'UpdateDate' &&
        column.columnName != 'DeleteUser' &&
        column.columnName != 'DeleteDate' &&
        column.columnName != 'IsActive'
        // column.columnName != columnList[0]?.tableName + 'Id'
      )
      .map((column, index, array) => {
        return new SkyTableColumnBuilder(column.columnName, column.columnName).withSelectFilter().build()
      })
      .concat(
        new SkyTableColumnBuilder('actions', 'Actions').withFormat((row) => {
          return (
            <div style={{ display: 'flex', marginRight: '10px', textAlign: 'right' }}>
              <button className='form-control' onClick={(e) => {
                setSelectedRow(row.row.values);
                toggleUpdateModal();
              }}>Edit</button>

              <button className='form-control' onClick={(e) => {
                setSelectedRow(row.row.values);
                toggleDeleteModal();
              }} style={{ color: 'red', marginLeft: '6px' }}>Delete</button>
            </div>
          )
        }).build())

  return (
    <Suspense fallback={<div className="loading" />}>

      <SkyModal
        headerText={'Yeni kayıt'}
        modalOpen={addModalOpen}
        toggleModal={toggleAddModal}
      >
        <AddOrUpdateModal match={match} columnDefinitions={columnDefinitions} />
      </SkyModal>

      <SkyModal
        headerText={'Güncelleme'}
        modalOpen={updateModalOpen}
        toggleModal={toggleUpdateModal}
      >
        <AddOrUpdateModal selectedRow={selectedRow} match={match} columnDefinitions={columnDefinitions} />
      </SkyModal>

      <SkyModal
        headerText={'Silme işlemi onayı'}
        modalOpen={deleteModalOpen}
        toggleModal={toggleDeleteModal}
      >
        <SkyModal.Body>

          <p><b>{selectedRow?.Name}</b> isimli kayıt silinmek üzere. İşlemi onaylıyor musunuz?</p>

        </SkyModal.Body>
        <SkyModal.Footer>
          <Button style={{ backgroundColor: 'red' }} color="secondary" type="button" onClick={async () => {
            await deleteContent(selectedRow[Object.keys(selectedRow)[0]], columnList[0].tableName);
            toggleDeleteModal();
            await loadAllContent();
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

      <Row>
        <Colxx className="mb-12">

          <h1>{columnList[0]?.tableName}</h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => {
                setSelectedRow(null);
                toggleAddModal();
              }}
            >
              <IntlMessages id="pages.add-new" />
            </Button>
          </div>

          <Separator className="mb-5" />

          <Card className="mb-4">
            <CardBody>

              {<SkyTable
                columns={columnDefinitions}
                data={data}
              />
              }
            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </Suspense >
  )
};
export default observer(GenericMenuContent);