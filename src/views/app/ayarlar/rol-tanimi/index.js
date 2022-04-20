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

const RolTanimi = ({ match }) => {
    const { roleStore } = useStore();

    const {
        data, loading,

        loadRoles, createRole, deleteRoleById, updateRole,

        addModalOpen, toggleAddModal,
        updateModalOpen, toggleUpdateModal,
        deleteModalOpen, toggleDeleteModal
    } = roleStore;

    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        loadRoles();
    }, [loadRoles])

    const columnDefinitions = [
        new SkyTableColumnBuilder('roleId', 'Role ID').withTextFilter(true).build(),
        new SkyTableColumnBuilder('roleName', 'Name').withSelectFilter().build(),
        new SkyTableColumnBuilder('description', 'Description').withTextFilter().build(),
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

    const AddOrUpdateModal = (data) => {
        return <Formik
            initialValues={
                data.data != null
                    ? data.data
                    : {
                        roleName: '',
                        description: ''
                    }
            }
            onSubmit={async (e) => {
                if (data.data == null) {
                    await createRole(e);
                    toggleAddModal();
                } else {
                    await updateRole(e);
                    toggleUpdateModal();
                }
                await loadRoles();
            }}
        >
            {({
                errors,
                touched,
            }) => (
                <>
                    <Form className="av-tooltip tooltip-label-bottom">
                        <SkyModal.Body>
                            <FormGroup row>

                                <Colxx sm={12}>
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            Rol adı
                                        </Label>
                                        <Field isClearable={true} className="form-control" name={'roleName'} />
                                    </FormGroup>
                                </Colxx>


                                <Colxx sm={12}>
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            Açıklama
                                        </Label>
                                        <Field isClearable={true} className="form-control" name={'description'} />
                                    </FormGroup>
                                </Colxx>

                            </FormGroup>
                        </SkyModal.Body>
                        <SkyModal.Footer>
                            <Button color="primary" type="submit">
                                Kaydet
                            </Button>
                        </SkyModal.Footer>
                    </Form>
                </>

            )}

        </Formik >
    }


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
                headerText={'Güncelleme'}
                modalOpen={updateModalOpen}
                toggleModal={toggleUpdateModal}
            >
                <AddOrUpdateModal data={selectedRow} />
            </SkyModal>

            <SkyModal
                headerText={'Silme işlemi onayı'}
                modalOpen={deleteModalOpen}
                toggleModal={toggleDeleteModal}
            >
                <SkyModal.Body>

                    <p><b>{selectedRow?.roleName}</b> isimli kayıt silinmek üzere. İşlemi onaylıyor musunuz?</p>

                </SkyModal.Body>
                <SkyModal.Footer>
                    <Button style={{ backgroundColor: 'red' }} color="secondary" type="button" onClick={async () => {
                        await deleteRoleById(selectedRow?.roleId);
                        toggleDeleteModal();
                        loadRoles();
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

                    <Breadcrumb heading={'menu.ayarlar.rol-tanimi'} match={match} />

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
                                        data={data}
                                        onRowSelected={(row) => {
                                            setSelectedRow(row);
                                        }} />
                                </Colxx>
                            </Row>
                        </CardBody>
                    </Card>
                </Colxx>
            </Row>
        </>
    )

};

export default observer(RolTanimi);