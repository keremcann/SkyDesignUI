import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, CustomInput, FormGroup, Input, Label, Row } from 'reactstrap';
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
import { menuIconData } from '../../../../app/constants/menu-icon-data';
const { Option } = components;
const DefineColumnModal = ({ selectedItem }) => {
  const { pageStore } = useStore();
  const {
    loadAllColumnListByPageId, columnList,
    addColumnToTable, dropColumnFromTable,

    addColumnModalOpen, toggleAddColumnModal
  } = pageStore;

  const loadContent = () => {
    loadAllColumnListByPageId(selectedItem?.pageId)
  }

  useEffect(() => {
    loadContent();
  }, [])

  return (
    <>
      <h1 style={{ alignSelf: 'center', margin: '18px 0' }}>{selectedItem?.pageName}</h1>
      <div style={{ display: 'flex', fontSize: '14px', alignSelf: 'center', gap: '20px', margin: '0 0 30px 0' }}>
        <div style={{ flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold' }}>Mevcut olmayan kolonlar</span>
          <ol>
            {columnList
              .filter(c => c.isInColumn == false)
              .map(c => {
                return <li className='fancy-hover' >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>{c.columnName} <button onClick={async () => {
                    await addColumnToTable({
                      ...c,
                      pageId: selectedItem?.pageId
                    });
                    loadContent();
                  }} style={{ width: 'auto', display: 'unset', marginLeft: 4 }} className='form-control'>{'>'}</button></div>
                </li>
              })}
          </ol>
        </div>


        <div style={{ flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold' }}>Mevcut kolonlar</span>
          <ol>
            {columnList
              .filter(c => c.isInColumn == true)
              .map(c => {
                return <li>
                  <div className='fancy-hover' style={{ display: 'flex', justifyContent: 'space-between' }}>{c.columnName} <button onClick={async () => {
                    await dropColumnFromTable({
                      ...c,
                      pageId: selectedItem?.pageId
                    })
                    loadContent();
                  }} style={{ width: 'auto', display: 'unset', marginLeft: 4 }} className='form-control'>{'<'}</button></div>
                </li>
              })}
          </ol>
        </div>
      </div>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={
          Yup.object().shape({
            isCustom: Yup.bool().required('Is custom or not?'),
            pageName: Yup.string().required('Page name is required!'),
            pageIcon: Yup.string().required('Icon is required!'),
            description: Yup.string().required('Description is required!'),
            pageUrl: Yup.string().required('Url is required!'),

          })
        }
        onSubmit={async (e) => {

        }}
      >
        {({
          errors,
          touched,
        }) => (
          <>
            <Form className="av-tooltip tooltip-label-bottom">
              <SkyModal.Body>

                {
                  [
                    { fieldName: 'pageName', displayText: 'Sayfa adı' },
                    { fieldName: 'description', displayText: 'Açıklama' },
                    { fieldName: 'tableName', displayText: 'Tablo adı' },
                    { fieldName: 'pageUrl', displayText: 'URL' },

                  ].map(field => {
                    return (
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          {field.displayText}
                        </Label>
                        <Field className="form-control" name={field.fieldName} />
                        {errors[field.fieldName] && touched[field.fieldName] ? (
                          <div className="invalid-feedback d-block">
                            {errors[field.fieldName]}
                          </div>
                        ) : null}
                      </FormGroup>
                    )
                  })
                }

                <Row>
                  <Colxx md='10'>

                    <FormGroup className="form-group has-float-label">
                      <Label>
                        İkon
                      </Label>

                    </FormGroup>
                  </Colxx>
                </Row>

                <FormGroup className="form-group has-float-label">
                  <Field type='checkbox' name={'isCustom'} />  Özel sayfa (Sistem sayfaları)
                  {errors.isCustom && touched.isCustom ? (
                    <div className="invalid-feedback d-block">
                      {errors.isCustom}
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

      </Formik> */}
    </>
  )

}

export default observer(DefineColumnModal);