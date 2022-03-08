import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Form from 'reactstrap/lib/Form';
import IntlMessages from '../../helpers/IntlMessages';

const SkyModal = ({
  modalOpen,
  toggleModal = () => { },
  children }) => {

  return (
    <Modal
      isOpen={modalOpen}
      toggle={() => toggleModal(!modalOpen)}
      wrapClassName="modal-center"
      backdrop="static"
    >
      <ModalHeader toggle={() => toggleModal(!modalOpen)}>
        Header
      </ModalHeader>
      {children}
    </Modal >
  );
};

const Body = ({ children }) => (<ModalBody>{children}</ModalBody>)
const Footer = ({ children }) => (<ModalFooter>{children}</ModalFooter>)

SkyModal.Body = Body;
SkyModal.Footer = Footer;

export default SkyModal;