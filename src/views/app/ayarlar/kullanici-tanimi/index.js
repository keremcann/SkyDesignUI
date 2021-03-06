import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from 'reactstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { useStore } from '../../../../app/stores/store';
import SkyTable from '../../../../app/utils/SkyTable/SkyTable';
import SkyTableColumnBuilder from '../../../../app/utils/SkyTable/SkyTableColumnBuilder';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import SkyModal from '../../../../components/common/SkyModal';
import { Field, Form, Formik } from 'formik';

import Select, { components } from 'react-select';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
import * as Yup from 'yup';
import AddOrUpdateModal from './AddOrUpdateModal';
const { Option } = components;

const KullaniciTanimi = ({ match }) => {

  const { userStore, roleStore } = useStore();

  const {
    userList,

    loadUsers, createUser, updateUser, deleteUserById,

    addModalOpen, toggleAddModal,
    updateModalOpen, toggleUpdateModal,
    deleteModalOpen, toggleDeleteModal
  } = userStore;

  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers])

  const columnDefinitions = [
    new SkyTableColumnBuilder('userId', 'User ID').withTextFilter(true).build(),
    new SkyTableColumnBuilder('fullName', 'Name').withSelectFilter().build(),
    new SkyTableColumnBuilder('userName', 'Description').withTextFilter().build(),
    new SkyTableColumnBuilder('actions', 'Actions').withFormat((row) => {
      return <div style={{ display: 'flex' }}>
        <button className='form-control' onClick={() => {
          toggleUpdateModal();
        }}>Edit</button>
        <button className='form-control' onClick={() => {
          toggleDeleteModal();
        }}>Delete</button>
      </div>
    }).build()
  ]

  return (
    <>

      <Row>
        <Colxx className="mb-12">

          <Breadcrumb heading={'menu.ayarlar.kullanici-tanimi'} match={match} />

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

          <Separator className="mb-5" />

          <Card className="mb-4">
            <CardBody>
              <Row>
                <Colxx className="mb-12">
                  <SkyTable
                    columns={columnDefinitions}
                    data={userList}
                    onRowSelected={(row) => {
                      setSelectedRow(row);
                    }} />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>


      <SkyModal
        headerText={'Yeni kay??t'}
        modalOpen={addModalOpen}
        toggleModal={toggleAddModal}
      >
        <AddOrUpdateModal />
      </SkyModal>

      <SkyModal
        headerText={'G??ncelleme'}
        modalOpen={updateModalOpen}
        toggleModal={toggleUpdateModal}
      >
        <AddOrUpdateModal data={selectedRow} />
      </SkyModal>

      <SkyModal
        headerText={'Silme i??lemi onay??'}
        modalOpen={deleteModalOpen}
        toggleModal={toggleDeleteModal}
      >
        <SkyModal.Body>

          <p><b>{selectedRow?.roleName}</b> isimli kay??t silinmek ??zere. ????lemi onayl??yor musunuz?</p>

        </SkyModal.Body>
        <SkyModal.Footer>
          <Button style={{ backgroundColor: 'red' }} color="secondary" type="button" onClick={async () => {
            await deleteUserById(selectedRow?.userId);
            toggleDeleteModal();
            await loadUsers();
          }}>
            Sil
          </Button>

          <Button color="secondary" type="button" onClick={async () => {
            toggleDeleteModal();
          }}>
            ??ptal
          </Button>

        </SkyModal.Footer>
      </SkyModal>

    </>
  )

};

export default observer(KullaniciTanimi);