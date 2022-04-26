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
const { Option } = components;

const AddOrUpdateModal = (data) => {

  const { userStore, roleStore } = useStore();

  useEffect(() => {
    roleStore.loadRoles();
    if (data.data != null) {
      userStore.getUserInformationById(data.data.userId);
    }
  }, [])

  return <Formik
    initialValues={
      data.data != null
        ? userStore.userInfo
        : {
          fullName: '',
          userName: '',
          password: '',
          email: '',
          roles: [{
            roleId: roleStore.data[0]?.roleId
          }]
        }
    }
    validationSchema={
      Yup.object().shape({
        fullName: Yup.string().required('Tam isim zorunlu!'),
        userName: Yup.string().required('Kullanıcı adı zorunlu!'),
        password: Yup.string().required('Parola zorunlu!'),
        email: Yup.string().required('E-posta zorunlu!'),
        roles: Yup.array().min(1)

      })
    }
    enableReinitialize
    onSubmit={async (e) => {
      if (data.data == null) {
        await userStore.createUser(e);
        userStore.toggleAddModal();
      } else {
        await userStore.updateUser(e);
        userStore.toggleUpdateModal();
      }
      await userStore.loadUsers();
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

              {
                [
                  { fieldName: 'fullName', displayText: 'Tam isim' },
                  { fieldName: 'userName', displayText: 'Kullanıcı adı' },
                  { fieldName: 'password', displayText: 'Parola' },
                  { fieldName: 'email', displayText: 'E-posta' },
                ].map(field => {

                  return (
                    <Colxx sm={12}>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          {field.displayText}
                        </Label>
                        <Field isClearable={true} className="form-control" name={field.fieldName} />
                        {errors[field.fieldName] && touched[field.fieldName] ? (
                          <div className="invalid-feedback d-block">
                            {errors[field.fieldName]}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  )
                })
              }

              <Colxx sm={12}>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Rol
                  </Label>

                  <Field as='select' placeholder='wha' className="form-control" name={'roles[0].roleId'} >
                    {roleStore.data.map(role => {
                      return (
                        <option value={role.roleId}>{role.roleName}</option>)
                    })}
                  </Field>
                  {errors.roles && touched.roles ? (
                    <div className="invalid-feedback d-block">
                      {errors.roles}
                    </div>
                  ) : null}

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

export default observer(AddOrUpdateModal);