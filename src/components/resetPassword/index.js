/* eslint-disable react/function-component-definition, arrow-body-style, max-len */
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Row, Col, Form, Input, Button, Modal, Layout, PageHeader, Spin,
} from 'antd';
import 'antd/dist/antd.min.css';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import Img from '../../images/resetPassword.png';

const initialState = {
  booleanStateValues: {
    isLoading: false,
    showStatusModal: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
};

const {
  Header, Footer, Content,
} = Layout;

const ResetPassword = () => {
  const { token } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

  const onFinish = (values) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const tokenValue = values;
    tokenValue.token = token;
    const body = values;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promUser/resetPassword`, body)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Reset Password',
              modalsIcon: successIcon,
              modalsMessage: 'Your Password has been updated successfully. Please login again.',
            },
          }));
        }
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Reset Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Server error. Please try again.',
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Reset Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
            },
          }));
        } else if (err.response.status === 403) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Reset Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Reset password link has expired. Please use the forgot password link to repeat the steps.',
            },
          }));
        } else if (err.response.status === 409) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Reset Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to update the Password. Please try again.',
            },
          }));
        } else if (err.response.status === 404) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Reset Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Email is not present in user list. Please contact the Admin.',
            },
          }));
        } else if (err.response.status === 500) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Reset Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Internal server error. Please contact the Admin.',
            },
          }));
        }
      });
  };

  const onFinishFailed = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showStatusModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: 'Forgot Password',
        modalsIcon: failureIcon,
        modalsMessage: 'Please enter New Password and Confirm Password.',
      },
    }));
  };

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsMessage === 'Your Password has been updated successfully. Please login again.') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      history.push('/');
    } else if (state.textStateValues.modalsMessage === 'Reset password link has expired. Please use the forgot password link to repeat the steps.') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      history.push('/forgot-password');
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
    }
  };

  const statusModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      visible={state.booleanStateValues.showStatusModal}
      centered
      closable={false}
      onOk={handleStatusModalOk}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

  return (
    <div>
      {state.booleanStateValues.isLoading
        ? (
          <div className="pagecenter">
            <Spin size="large" />
          </div>
        ) : (
          <div style={{ height: '100vh' }}>
            <Row>
              <Col xs={0} sm={0} md={16} lg={16} xl={17}>
                <img
                  src={Img}
                  alt="#"
                  style={{
                    height: '100vh',
                    width: '100%',
                  }}
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={7}>
                <Layout style={{ height: '100vh', backgroundColor: '#F5F5F5', alignItems: 'center' }}>
                  <Header style={{ backgroundColor: '#F5F5F5' }} />
                  <Content>
                    <PageHeader className="signin-login-header">Create New Password</PageHeader>
                    <br />
                    <h5 style={{ textAlign: 'center' }}>
                      Your new password must be different from your current or
                      <br />
                      previous password.
                    </h5>
                    <h5>
                      Inorder to protect your account, make sure your password:
                      <ul>
                        <li>Is at least 8 characters</li>
                        <li>Contains at least one uppercase letter</li>
                        <li>Contains at least one lowercase letter</li>
                        <li>Contains at least one number</li>
                        <li>Contains at least one special character</li>
                      </ul>
                    </h5>
                    <br />
                    <Form
                      form={form}
                      name="ResetPassword"
                      layout="vertical"
                      requiredMark={false}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your password!',
                          },
                          {
                            pattern: RegExp(passwordRegex),
                            message:
                        'Password should contain 1 Uppercase, 1 Lowercase, 1 special character with length 8',
                          },
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input.Password placeholder="Password" />
                      </Form.Item>

                      <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                new Error('The passwords that you entered do not match!'),
                              );
                            },
                          }),
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input.Password placeholder="Confirm Password" />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          style={{
                            fontWeight: 'bold',
                            height: 'auto',
                            padding: '6px 15px',
                            marginTop: '10px',
                            width: '300px',
                          }}
                        >
                          Create Password
                        </Button>
                      </Form.Item>
                    </Form>
                  </Content>
                  <Footer
                    style={{
                      backgroundColor: '#F5F5F5',
                      textAlign: 'center',
                    }}
                  >
                    Copyright ©
                    {' '}
                    {new Date().getFullYear()}
                    {' '}
                    AVIN Systems Private Limited
                  </Footer>
                </Layout>
              </Col>
            </Row>
            {statusModal}
          </div>
        )}
    </div>
  );
};

export default ResetPassword;
