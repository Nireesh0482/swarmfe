/* eslint-disable react/function-component-definition, arrow-body-style */
import React, { useState } from 'react';
import {
  Row, Col, Form, Input, Button, Modal, Layout, PageHeader, Radio, Spin,
} from 'antd';
import 'antd/dist/antd.min.css';
import { CloseCircleFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Img from '../../images/LoginImage.png';

const initialState = {
  booleanStateValues: {
    isLoading: false,
    showStatusModal: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    emailMessage: '',
  },
};

const {
  Header, Footer, Content,
} = Layout;

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const failureIcon = <CloseCircleFilled className="failure-icon" />;

  const handleSubmit = (values) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = { email: values.email.trim(), password: values.password };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promUser/login`, body)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
          localStorage.setItem('Role', JSON.stringify(res.data.data.confirmRole));
          localStorage.setItem('accessToken', res.data.data.accessToken);
          localStorage.setItem('userName', res.data.data.userName);
          localStorage.setItem('userEmail', res.data.data.userEmail);
          localStorage.setItem('userEmpId', res.data.data.employeeID);
          localStorage.setItem('userGrpName', JSON.stringify(res.data.data.userRoleGroups));
          localStorage.setItem('groupName', res.data.data.userGroup);
          history.push('/rm-tool/home');
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
              modalsTitle: 'Login',
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
              modalsTitle: 'Login',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
            },
          }));
        } else if (err.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
            textStateValues: {
              ...state.textStateValues,
              emailMessage: 'Incorrect Email ID/Password!! Retry..',
            },
          }));
        } else if (err.response.status === 403) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
            textStateValues: {
              ...state.textStateValues,
              emailMessage: 'Incorrect Email ID/Password!! Retry..',
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
              modalsTitle: 'Login',
              modalsIcon: failureIcon,
              modalsMessage: 'Sorry, you are not a registered user. Please Signup and then Login.',
            },
          }));
        } else if (err.response.status === 405) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Login',
              modalsIcon: failureIcon,
              modalsMessage: 'Your account is disabled.',
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
              modalsTitle: 'Login',
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
        modalsTitle: 'Login',
        modalsIcon: failureIcon,
        modalsMessage: 'Please enter Email ID and Password.',
      },
    }));
  };

  const handleSignupClick = () => {
    history.push('./signup');
  };

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsMessage === 'Sorry, you are not a registered user. Please Signup and then Login.') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      history.push('./signup');
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
                  <Header style={{ backgroundColor: '#F5F5F5' }}>
                    <Radio.Group defaultValue="a" buttonStyle="solid" size="large">
                      <Radio.Button value="a">Login</Radio.Button>
                      <Radio.Button value="b" onChange={handleSignupClick}>Signup</Radio.Button>
                    </Radio.Group>
                  </Header>
                  <Content>
                    <PageHeader className="signin-login-header">Login to RM Tool</PageHeader>
                    <div style={{ color: 'red', textAlign: 'center' }}>
                      {state.textStateValues.emailMessage.length !== 0 ? state.textStateValues.emailMessage : null}
                    </div>
                    <Form
                      form={form}
                      name="Login"
                      layout="vertical"
                      requiredMark={false}
                      onFinish={handleSubmit}
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
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input type="text" placeholder="Email ID" />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Password',
                          },
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input.Password placeholder="Password" />
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
                          Login
                        </Button>
                      </Form.Item>
                      <Form.Item className="login-form-forgot">
                        <a href="http://localhost:8088/forgot-password">Forgot password?</a>
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

export default Login;
