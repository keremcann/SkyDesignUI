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

const AddOrUpdateModal = ({ selectedRow = null, match, columnDefinitions }) => {

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


  return <Formik
    initialValues={
      selectedRow != null
        ? selectedRow
        : {}
    }
    onSubmit={async (e) => {

      let entries = {
        tableName: columnList[0]?.tableName,
        items: []
      };

      Object.keys(e).forEach(key => {
        entries.items.push({
          propertyName: key,
          propertyValue: `${e[key] ?? ''}`
        });
      });

      if (selectedRow == null) {
        await createContent(entries);
        toggleAddModal();
      } else {
        entries.items.pop();
        await updateContent(entries);
        toggleUpdateModal();
      }
      await loadAllContent();
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
              {columnDefinitions.map((cd, index, array) => {
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
              })}
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