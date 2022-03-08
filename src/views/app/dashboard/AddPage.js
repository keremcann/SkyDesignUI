import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import * as Yup from 'yup';
import SkyModal from '../../../components/common/SkyModal'




export const AddPage = observer(({ modalOpen, setModalOpen }) => {
    return (
        <SkyModal
            modalOpen={modalOpen}
            toggleModal={() => setModalOpen(!modalOpen)}>

            <input type='text' name='data'></input>

        </SkyModal>
    )
});