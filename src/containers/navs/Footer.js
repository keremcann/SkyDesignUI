import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6">
              <p className="mb-0 text-muted">SkyDesign 2020</p>
            </Colxx>
            <Colxx className="col-sm-6 d-none d-sm-block">
              <ul className="breadcrumb pt-0 pr-0 float-right">
                <li className="breadcrumb-item mb-0">
                  <a className="btn-link" href="https://www.google.com" target={'_blank'}>
                    | KM Tech Labs |
                  </a>
                </li>
              </ul>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
