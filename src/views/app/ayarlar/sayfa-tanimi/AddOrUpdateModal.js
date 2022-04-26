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
const AddOrUpdateModal = (data) => {

  const { pageStore } = useStore();
  const {
    createPage, loadPages, addPage,

    toggleAddModal, addModalOpen
  } = pageStore;

  const [selectedOption, setSelectedOption] = useState({ "label": "iconsminds-cursor-select", "value": "iconsminds-cursor-select", "key": 698, "icon": "iconsminds-cursor-select" })
  const [isCustomPage, setIsCustomPage] = useState(false);
  
  let initialValues = {
    parentId: null,
    isCustom: isCustomPage,
    pageName: '',
    pageIcon: selectedOption?.icon,
    description: '',
    pageUrl: '',
  };

  return (
    <>
      <Formik
        initialValues={
          data.data == null ? initialValues : data.data}
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
          if(data.data == null) {
            e = {
              ...e,
              pageIcon: selectedOption?.icon
            }

            await createPage(e);
            await addPage(e);
            toggleAddModal();
          }
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
                    </FormGroup>
                  </Colxx>

                  <Colxx md='2'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className={selectedOption?.value} style={{ fontSize: 32 }} />
                    </div>
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

      </Formik>
    </>
  )

}

export default observer(AddOrUpdateModal);