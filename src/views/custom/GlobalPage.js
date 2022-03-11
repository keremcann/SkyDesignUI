import React, { useCallback, useEffect, useState } from 'react'
import { useStore } from '../../app/stores/store';
import { Button, Card, FormGroup, Label, Row } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import Box from '../../components/cards/Box';
import SkyModal from '../../components/common/SkyModal';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
const GlobalPage = ({ heading, match, subCatalogId }) => {
    const { subCatalogDetailStore } = useStore();
    const {
        loading, data,
        loadSubCatalogDetailsBySubCatalogId,
        createCatalogDetail, updateCatalogDetail, deleteCatalogDetail,
        updateModalOpen, toggleUpdateModal,
        addModalOpen, toggleAddModal,
        deleteModalOpen, toggleDeleteModal

    } = subCatalogDetailStore;

    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => autorun(() => {
        loadSubCatalogDetailsBySubCatalogId(subCatalogId);
    }), [loadSubCatalogDetailsBySubCatalogId]);

    const onSubmit = async (values) => {
        if (selectedItem == null) {
            await createCatalogDetail(values);
            toggleAddModal();
        }
        else {
            await updateCatalogDetail(values);
            toggleUpdateModal();
        }
        await loadSubCatalogDetailsBySubCatalogId(subCatalogId);
    }

    const AddOrUpdateModal = (data) => {
        // alert(JSON.stringify(data))
        return <Formik
            initialValues={
                data.data == null ? {
                    subCatalogId: subCatalogId,
                    name: '',
                    type: '',
                    description: '',
                    status: ''
                } : data.data}
            validationSchema={
                Yup.object().shape({
                    name: Yup.string().required('Catalog name is required!'),
                    type: Yup.string().required('Type is required!'),
                    description: Yup.string().required('Description is required!'),
                    status: Yup.string().required('Status is required!'),

                })
            }
            onSubmit={onSubmit}
        >
            {({
                errors,
                touched,
            }) => (
                <>
                    <Form className="av-tooltip tooltip-label-bottom">
                        <SkyModal.Body>

                            <FormGroup className="form-group has-float-label">
                                <Label>
                                    Katalog adı
                                </Label>
                                <Field className="form-control" name="name" />
                                {errors.name && touched.name ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.name}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <FormGroup className="form-group has-float-label">
                                <Label>
                                    Açıklama
                                </Label>
                                <Field className="form-control" name="description" />
                                {errors.description && touched.description ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.description}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <FormGroup className="form-group has-float-label">
                                <Label>
                                    Tipi
                                </Label>
                                <Field className="form-control" name="type" />
                                {errors.type && touched.type ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.type}
                                    </div>
                                ) : null}
                            </FormGroup>

                            <FormGroup className="form-group has-float-label">
                                <Label>
                                    Durumu
                                </Label>
                                <Field className="form-control" name="status" />
                                {errors.status && touched.status ? (
                                    <div className="invalid-feedback d-block">
                                        {errors.status}
                                    </div>
                                ) : null}
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

        </Formik>
    }

    return <>

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
                    await deleteCatalogDetail(selectedItem.subCatalogDetailId);
                    toggleDeleteModal();
                    await loadSubCatalogDetailsBySubCatalogId(subCatalogId);
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
            <Colxx xxs="12">
                <Breadcrumb heading={heading} match={match} />

                <div className="text-zero top-right-button-container">
                    <Button
                        color="primary"
                        size="lg"
                        className="top-right-button"
                        onClick={() => {
                            toggleAddModal();
                            setSelectedItem(null);
                        }}
                    >
                        <IntlMessages id="pages.add-new" />
                    </Button>

                </div>

                <Separator className="mb-5" />
            </Colxx>
        </Row>
        <Row>
            <Colxx xxs="12" className="mb-3">
                <Card>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center" style={{ fontWeight: 'bold' }}>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                İsim
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                Tipi
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                Açıklama
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                Durum
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                İşlemler
                            </p>
                        </div>
                    </div>
                </Card>
            </Colxx>
        </Row>
        <Box>

            <Row>
                <Colxx xxs="12" className="mb-4 table-items">
                    {loading ? <>Yükleniyor...</> : <>
                        {data.map((item, index) => {
                            return (
                                <>
                                    <Row>
                                        <Colxx xxs="12" className="mb-3 table-item">
                                            <Card className={index % 2 == 1 && 'colorize-it'}>
                                                <div className={"pl-2 d-flex flex-grow-1 min-width-zero"}>
                                                    <div className={"card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center "}>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                            {item.name}
                                                        </p>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                            {item.type}
                                                        </p>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                            {item.description}
                                                        </p>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                                            {item.status}
                                                        </p>
                                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">

                                                            <button
                                                                type='button'
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    borderColor: "transparent",
                                                                    fontSize: "1.1rem",
                                                                    color: 'brown'
                                                                }}
                                                                className="iconsminds-folder-edit"
                                                                onClick={(e) => {
                                                                    toggleUpdateModal();
                                                                    setSelectedItem(item);
                                                                }}> Düzenle</button>


                                                            <button
                                                                type='button'
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    borderColor: "transparent",
                                                                    fontSize: "1.1rem",
                                                                    color: 'red'
                                                                }}
                                                                className="iconsminds-folder-delete"
                                                                onClick={(e) => {
                                                                    setSelectedItem(item);
                                                                    toggleDeleteModal();
                                                                }}> Sil</button>

                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Colxx>
                                    </Row>
                                </>)
                        })}
                    </>
                    }

                </Colxx>
            </Row>
        </Box>
    </>
};

export default observer(GlobalPage)