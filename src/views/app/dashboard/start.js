import React, { useEffect, useState } from 'react';
import { Button, Card, Form, FormGroup, Label, Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import SkyModal from '../../../components/common/SkyModal';
import IntlMessages from '../../../helpers/IntlMessages';
import { AddPage } from './AddPage';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  catalogName: Yup.string().required('Email is required!'),
  createUser: Yup.string().required('Password is required!'),
});

const Start = observer(({ match }) => {
  const { catalogStore } = useStore();
  const { data, searchText, loading, setPredicate, loadCatalogs, createCatalog } = catalogStore;

  const [modalOpen, setModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  const onSubmit = (values) => {
    values.preventDefault();
    console.log(values);
    alert(JSON.stringify(values));

    const payload = {
      ...values,
      state: values.state.value,
    }

    console.log(payload);
  }
  return <>
    <SkyModal
      modalOpen={addModalOpen}
      toggleModal={setAddModalOpen}
    >
      <SkyModal.Body>

        <Formik
          initialValues={{
            catalogName: '',
            createUser: '',
          }}
          validationSchema={Schema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form className="av-tooltip tooltip-label-bottom">
              
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="forms.email" />
                </Label>
                <Field className="form-control" name="email" />
                {errors.catalogName && touched.createUser ? (
                  <div className="invalid-feedback d-block">
                    {errors.catalogName}
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="forms.password" />
                </Label>
                <Field
                  className="form-control"
                  name="catalogName"
                  type='text'
                />
                {errors.catalogName && touched.catalogName ? (
                  <div className="invalid-feedback d-block">
                    {errors.catalogName}
                  </div>
                ) : null}
              </FormGroup>

              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>

      </SkyModal.Body>
      <SkyModal.Footer>

      </SkyModal.Footer>
    </SkyModal>

    {/* <SkyModal
      modalOpen={modalOpen}
      toggleModal={() => setModalOpen(!modalOpen)} >
      <>
        <div>Sample text here {selectedId}</div>
        <button type='button' onClick={() => setSubModalOpen(true)}>Click for the second modal</button>
        <div>
          {<SkyModal
            modalOpen={subModalOpen}
            toggleModal={() => setSubModalOpen(!subModalOpen)}
          >
            <SkyModal.Body>
              <p>1 2 3</p>
            </SkyModal.Body>
            <SkyModal.Footer>
              <p>4 5 6</p>
            </SkyModal.Footer>
          </SkyModal>}De
        </div>
      </>

    </SkyModal> */}

    {/* <SkyModal
      modalOpen={deleteModalOpen}
      toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}>

      You sure to delete? {selectedId}

    </SkyModal> */}

    {/* <AddPage
      modalOpen={addModalOpen}
      setModalOpen={setAddModalOpen} /> */}
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.start" match={match} />

        <div className="text-zero top-right-button-container">
          <Button
            color="primary"
            size="lg"
            className="top-right-button"
            onClick={() => {
              setAddModalOpen(true);

            }
            }
          >
            <IntlMessages id="pages.add-new" />
          </Button>

        </div>

        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <form onSubmit={(e) => {
          e.preventDefault();

          setPredicate(e.target.elements.searchText.value)
        }}>

          <input type='text' placeholder='Search' name='searchText'></input>
          <button type='submit'>Search</button>
        </form>
        <p>{searchText && "Searched text: "}{searchText}</p>

        {loading ? <>Loading...</> : <>
          {data.map(item => {
            return (
              <>
                <Row>
                  <Colxx xxs="12" className="mb-3">
                    <Card>
                      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                          <p className="list-item-heading mb-1 w-15 w-sm-100">
                            {item.catalogId}
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {item.catalogName}
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {!item.success ? "success" : "failed"}
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">

                            <button
                              type='button'
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                fontSize: "1.1rem"
                              }}
                              className="iconsminds-folder-edit"
                              onClick={(e) => {
                                setModalOpen(true);
                                setSelectedId(item.catalogId);
                              }}> Edit</button>


                            <button
                              type='button'
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                fontSize: "1.1rem"
                              }}
                              className="iconsminds-folder-delete"
                              onClick={(e) => {
                                setDeleteModalOpen(true);
                                setSelectedId(item.catalogId);
                              }}> Delete</button>

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

    {/* <ListPageListing
      items={data}
      displayMode={undefined}
      selectedItems={undefined}
      onCheckItem={undefined}
      currentPage={1}
      totalPage={10}
      onContextMenuClick={undefined}
      onContextMenu={undefined}
      onChangePage={undefined}
    /> */}

  </>
});

export default Start;