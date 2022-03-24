import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications';

// import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

const validatePassword = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your password';
    } else if (value.length < 4) {
        error = 'Value must be longer than 3 characters';
    }
    return error;
};

// const validateuserName = (value) => {
//     let error;
//     if (!value) {
//         error = 'Please enter your userName address';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//         error = 'Invalid userName address';
//     }
//     return error;
// };

const Login = ({ history, loading, error, loginUserAction }) => {
    const { userStore } = useStore();
    const { login, loginSucceeded } = userStore;
    const [userName] = useState('krmcn');
    const [password] = useState('Batman72');

    if (loginSucceeded) history.push('/');

    useEffect(() => {
        if (error) {
            NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
        }
    }, [error]);

    const onUserLogin = (values) => {
        if (!loading) {
            if (values.username !== '' && values.password !== '') {
                login(values);
            }
        }
    };

    const initialValues = { userName, password };

    return (
        <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                    <div className="position-relative image-side ">
                        <p className="text-white h2">IT Varlık Yönetimi</p>
                        {/* <p className='text-white'>Hoş Geldiniz</p> */}
                        {/* <p className="white mb-0">
                            Please use your credentials to login.
                            <br />
                            If you are not a member, please{' '}
                            <NavLink to="/user/register" className="white">
                                register
                            </NavLink>
                            .
                        </p> */}
                    </div>
                    <div className="form-side">
                        <NavLink to="/" className="white">
                            {/* <span className="logo-single" /> */}
                            <div style={{ display: 'flex', alignSelf: 'center' }}>
                                <img src='/assets/img/logo.png' style={{ height: '42px' }} />
                                <h1 style={{ padding: '5px', color: 'black' }}>Sky<b>Design</b></h1>
                            </div>
                        </NavLink>
                        <CardTitle className="mb-4">
                            <IntlMessages id="user.login-title" />
                        </CardTitle>

                        <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                            {({ errors, touched }) => (
                                <Form className="av-tooltip tooltip-label-bottom">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="user.userName" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            name="userName"
                                        // validate={validateuserName}
                                        />
                                        {errors.userName && touched.userName && (
                                            <div className="invalid-feedback d-block">
                                                {errors.userName}
                                            </div>
                                        )}
                                    </FormGroup>
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="user.password" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            validate={validatePassword}
                                        />
                                        {errors.password && touched.password && (
                                            <div className="invalid-feedback d-block">
                                                {errors.password}
                                            </div>
                                        )}
                                    </FormGroup>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <NavLink to="/user/forgot-password">
                                            {/* <IntlMessages id="user.forgot-password-question" /> */}
                                        </NavLink>
                                        <Button
                                            color="primary"
                                            className={`btn-shadow btn-multiple-state ${loading ? 'show-spinner' : ''
                                                }`}
                                            size="lg"
                                        >
                                            <span className="spinner d-inline-block">
                                                <span className="bounce1" />
                                                <span className="bounce2" />
                                                <span className="bounce3" />
                                            </span>
                                            <span className="label">
                                                <IntlMessages id="user.login-button" />
                                            </span>
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Card>
            </Colxx>
        </Row>
    );
};

export default observer(Login);