/* eslint-disable react/function-component-definition, arrow-body-style, max-len */
import React, { useState } from 'react';
import {
  Row, Col, Form, Input, Button, Modal, Layout, PageHeader, Radio, Spin,
} from 'antd';
import 'antd/dist/antd.min.css';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
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
  },
};

const {
  Header, Footer, Content,
} = Layout;

const SignUp = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const empNameRegex = '^(?![0-9]*$)[a-zA-Z0-9\\-\\s]+.{1,}$';
  const empIdRegex = '^(?=.*[0-9])([a-zA-Z0-9]+).{3,}$';
  const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  const empEmailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$';

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
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promUser/signup`, body)
      .then((res) => {
        if (res.status === 201) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Signup',
              modalsIcon: successIcon,
              modalsMessage: 'Signup completed successfully. Please proceed to Login.',
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
              modalsTitle: 'Signup',
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
              modalsTitle: 'Signup',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
            },
          }));
        } else if (err.response.status === 417) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Signup',
              modalsIcon: failureIcon,
              modalsMessage: 'Provided Employee Name, Employee ID and Email ID are not matching. Please enter correct Employee Name, Employee ID and Email ID.',
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
              modalsTitle: 'Signup',
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
              modalsTitle: 'Signup',
              modalsIcon: failureIcon,
              modalsMessage: 'Your account is already created. Please Login.',
            },
          }));
        } else if (err.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Signup',
              modalsIcon: failureIcon,
              modalsMessage: 'Entered Email ID doesn\'t match with domain (@avinsystems.com). Please enter correct Email ID.',
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
              modalsTitle: 'Signup',
              modalsIcon: failureIcon,
              modalsMessage: 'Internal server error. Please contact the Admin.',
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
              modalsTitle: 'Signup',
              modalsIcon: failureIcon,
              modalsMessage: 'Your account is disabled.',
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
        modalsTitle: 'Signup',
        modalsIcon: failureIcon,
        modalsMessage: 'Please fill all the fields.',
      },
    }));
  };

  const handleLoginClick = () => {
    history.push('./');
  };

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsMessage === 'Signup completed successfully. Please proceed to Login.'
      || state.textStateValues.modalsMessage === 'Your account is already created. Please Login.') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      history.push('./');
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
                    <Radio.Group defaultValue="b" buttonStyle="solid" size="large">
                      <Radio.Button
                        value="a"
                        onChange={handleLoginClick}
                      >
                        Login
                      </Radio.Button>
                      <Radio.Button value="b">Signup</Radio.Button>
                    </Radio.Group>
                  </Header>
                  <Content>
                    <PageHeader className="signin-login-header">Signup to RM Tool</PageHeader>
                    <Form
                      form={form}
                      requiredMark={false}
                      name="SignUp"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      layout="vertical"
                    >
                      <Form.Item
                        name="name"
                        label="Employee Name"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Employee Full Name',
                          },
                          {
                            pattern: RegExp(empNameRegex),
                            message: 'Employee Name should be Alphabetic or Alphanumeric with minimum length 2',
                          },
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input type="text" placeholder="Employee Name" autoComplete="off" />
                      </Form.Item>
                      <Form.Item
                        name="employeeID"
                        label="Employee ID"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Employee ID',
                          },
                          {
                            pattern: RegExp(empIdRegex),
                            message: 'Employee ID should be Alphanumeric or Number with minimum length 4',
                          },
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input type="text" placeholder="Employee ID" autoComplete="off" />
                      </Form.Item>
                      <Form.Item
                        name="emailID"
                        label="Email ID"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Employee Email ID',
                          },
                          {
                            pattern: RegExp(empEmailRegex),
                            message: 'Please enter valid Email ID',
                          },
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input type="text" placeholder="Email ID" autoComplete="off" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Password',
                          },
                          {
                            pattern: RegExp(passwordRegex),
                            message:
                'Password should contain 1 Uppercase, 1 Lowercase, 1 Special character with length 8',
                          },
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input.Password placeholder="Password" />
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your Password',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error('Password and Confirm Password must match'),
                              );
                            },
                          }),
                        ]}
                        style={{
                          width: '300px',
                        }}
                      >
                        <Input.Password
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onCopy={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          placeholder="Confirm Password"
                        />
                      </Form.Item>
                      <Form.Item
                        name="domain"
                        label="Domain"
                        className="ant-form-item-required"
                        initialValue="AvinSystem"
                      >
                        <Input disabled />
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
                            width: '300px',
                            marginTop: '20px',
                          }}
                        >
                          Signup
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

export default SignUp;
