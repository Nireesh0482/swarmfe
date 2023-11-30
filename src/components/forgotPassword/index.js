/* eslint-disable react/function-component-definition, arrow-body-style */
import React, { useState } from 'react';
import {
  Row, Col, Form, Input, Button, Modal, Layout, PageHeader, Spin,
} from 'antd';
import 'antd/dist/antd.min.css';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Img from '../../images/forgotPassword.png';

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

const ForgotPassword = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$';
  const message = (
    <>
      <h3>Email has been sent.</h3>
      <h4>
        Please check your inbox and click on the link to reset your password.
      </h4>
    </>
  );

  const onFinish = (values) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = values;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promUser/forgotPassword`, body)
      .then((res) => {
        if (res.status === 200) {
          form.resetFields();
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Forgot Password',
              modalsIcon: successIcon,
              modalsMessage: message,
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
              modalsTitle: 'Forgot Password',
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
              modalsTitle: 'Forgot Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
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
              modalsTitle: 'Forgot Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Your record is not available in the database. Please contact the Admin.',
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
              modalsTitle: 'Forgot Password',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to send Forgot Password link. Please try again.',
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
              modalsTitle: 'Forgot Password',
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
        modalsMessage: 'Please enter Email ID.',
      },
    }));
  };

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsMessage.length === undefined) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      history.push('/');
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
                    <PageHeader className="signin-login-header">Forgot Password?</PageHeader>
                    <br />
                    <h5 style={{ textAlign: 'center' }}>
                      No worries! Enter the email associated with Your account
                      <br />
                      and we&apos;ll send an email to reset your password.
                    </h5>
                    <br />
                    <Form
                      form={form}
                      name="ForgotPassword"
                      layout="vertical"
                      requiredMark={false}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label="Email ID"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Email ID',
                          },
                          {
                            pattern: RegExp(emailRegex),
                            message: 'Please enter valid Email ID',
                          },
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input type="text" placeholder="Email ID" />
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
                          Send recovery link
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

export default ForgotPassword;
