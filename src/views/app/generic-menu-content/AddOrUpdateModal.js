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
import Select, { components } from 'react-select';

function SelectField(FieldProps, value) {
  console.log(FieldProps);
  return (
    <Select
      options={FieldProps.options}
      {...FieldProps.field}

      className="react-select"
      classNamePrefix="react-select"

      value={FieldProps.options ? FieldProps.options.find(option => option.value === FieldProps.field.value) : ''}
      onChange={option => {
        // FieldProps.field.onChange(value);
        return FieldProps.form.setFieldValue(FieldProps.field.name, option.value)

      }}
      onBlur={() => {
        console.log(FieldProps);
        alert(JSON.stringify(FieldProps))
        return FieldProps.field.onBlur

      }}
    />
  )
}

const AddOrUpdateModal = ({ selectedRow = null, match, columnDefinitions }) => {

  const { genericMenuContentStore } = useStore();
  const {
    columnList, data, loading,
    loadContent,
    loadContentForAddOrUpdate, addOrUpdateColumnList,
    createContent, updateContent, deleteContent,

    updateModalOpen, toggleUpdateModal,
    addModalOpen, toggleAddModal,
    deleteModalOpen, toggleDeleteModal
  } = genericMenuContentStore;

  const loadAddOrUpdateContent = async () => {
    await loadContentForAddOrUpdate(match.params.Level1Menu, match.params.Level2Menu, match.params.Level3Menu, selectedRow && selectedRow[Object.keys(selectedRow)[0]]);
  }

  const loadTableContent = async () => {
    await loadContent(match.params.Level1Menu, match.params.Level2Menu, match.params.Level3Menu);
  }
  useEffect(() => {
    loadAddOrUpdateContent();
  }, []);

  var initialData = addOrUpdateColumnList.reduce((aouc, current) => ({
    ...aouc,
    [current.columnName]: current.currentData
  }), {}) || {};

  return !loading && <Formik
    enableReinitialize={true}
    initialValues={initialData}
    onSubmit={async (e) => {

      let data = {
        tableName: columnList[0].tableName,
        items: Object.entries(e).map(([propertyName, propertyValue]) => {
          if (addOrUpdateColumnList.find(pn => pn.columnName === propertyName).hasRelation === "1") {
            propertyName = propertyName + "Id";
          }
          return ({ propertyName, propertyValue: String(propertyValue) })
        })
      }



      // let entries = {
      //   tableName: columnList[0]?.tableName,
      //   items: []
      // };

      // Object.keys(e).forEach(key => {
      //   entries.items.push({
      //     propertyName: key,
      //     propertyValue: `${e[key] ?? ''}`
      //   });
      // });

      if (selectedRow == null) {
        await createContent(data);
        toggleAddModal();
      } else {
        data.items.unshift({ propertyName: 'key', propertyValue: String(selectedRow[Object.keys(selectedRow)[0]]) })

        await updateContent(data);
        toggleUpdateModal();
      }
      await loadTableContent();


    }}
  >
    {({
      errors,
      touched,
      handleBlur,
      handleChange,
      values
    }) => (
      <>
        <Form className="av-tooltip tooltip-label-bottom">
          <SkyModal.Body>
            <FormGroup row>
              {addOrUpdateColumnList.map((cd, index, array) => {
                const selectOptions = cd.relationalDataList.map((x, i) => {
                  return { label: x.name, value: x.id, key: i };
                });
                if (cd?.accessor == columnList[0].tableName + 'Id') return null

                return <>
                  <Colxx sm={6}>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        {cd.columnName}
                      </Label>
                      {cd.hasRelation === '1'
                        ?
                        <Field name={cd.columnName} defaultValue={cd.currentData} className="form-control react-select" as="select">
                          <option value=''>Please choose</option>
                          {cd.relationalDataList.map(rd => {
                            return <option value={rd.id}>{rd.name}</option>
                          })}
                        </Field>


                        // <select name={cd.columnName} onBlur={handleBlur} defaultValue={cd.currentData || ''} onChange={handleChange}
                        //   className="form-control react-select"
                        // >
                        //   <option value=''>Please choose</option>
                        //   {cd.relationalDataList.map(rd => {
                        //     return <option value={rd.id}>{rd.name}</option>
                        //   })}
                        // </select>

                        // <Field name={cd.columnName} options={selectOptions} component={SelectField} />

                        // <Select
                        //   className="react-select"
                        //   classNamePrefix="react-select"
                        //   name={cd.columnName}
                        //   onChange={handleChange}
                        //   onBlur={handleBlur}
                        //   value={selectOptions.filter(opt => opt.value === cd.currentData)}
                        //   options={selectOptions}
                        // />
                        : <Field
                          className="form-control"
                          name={cd.columnName}
                          defaultValue={cd.currentData}
                          onChange={handleChange} />}

                    </FormGroup>
                  </Colxx>
                </>
              })}
              {/* {columnDefinitions.map((cd, index, array) => {
                if (array.length == index + 1) {
                  return null;
                }
                if (cd?.accessor == columnList[0].tableName + 'Id') return null
                return <>
                  <Colxx sm={6}>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        {cd.Header}
                      </Label>
                      <Field isClearable={true} className="form-control" name={cd.accessor} />
                    </FormGroup>
                  </Colxx>
                </>
              })} */}


              {/* <pre>
                <code>
                  {JSON.stringify(initialData, null, 4)}
                </code>
              </pre>
              {<>{JSON.stringify(addOrUpdateColumnList, null, 4)}</>} */}
              {/* {JSON.stringify(selectedRow)} */}
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