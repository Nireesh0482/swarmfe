/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  PageHeader, Checkbox, Modal, Spin, Tooltip, Row, Col, Pagination, Space, Input, Table, Typography,
} from 'antd';
import {
  CloseCircleFilled, CheckCircleFilled, QuestionCircleOutlined, EditTwoTone,
} from '@ant-design/icons';
import axios from 'axios';

const initialState = {
  employeeList: [],
  filteredEmployee: [],
  groupInfo: [],
  selectedFeatures: [],
  selectedEmployees: [],
  booleanStateValues: {
    isLoading: true,
    showStatusModal: false,
    showActionModal: false,
    dependencyValue: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  minValue: 0,
  maxValue: 40,
};

const RoleAllocation = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/roles/rolesWithFeatureAndUserInfo`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          groupInfo: res.data.data,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
        }));
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else if (err.response.status === 404) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        }
      });
  }, [state.booleanStateValues.dependencyValue]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllResources`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          employeeList: res.data.data,
          filteredEmployee: res.data.data,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
        }));
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else if (err.response.status === 404) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        }
      });
  }, []);

  const onCheckOfGroups = (checkedValues) => {
    if (checkedValues.length > 0 && !state.selectedEmployees.includes(checkedValues[checkedValues.length - 1])) {
      const empList = [...state.selectedEmployees];
      empList.push(checkedValues[checkedValues.length - 1]);
      setState((prevState) => ({
        ...prevState,
        selectedEmployees: empList,
      }));
    } else {
      const searchedEmpList = state.filteredEmployee.filter((val) => state.selectedEmployees.includes(val.resource_emp_id));
      const unCheckedEmp = searchedEmpList.filter((val) => !checkedValues.includes(val.resource_emp_id));
      setState((prevState) => ({
        ...prevState,
        selectedEmployees: state.selectedEmployees.filter((r) => !unCheckedEmp[0].resource_emp_id.includes(r)),
      }));
    }
  };

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsMessage === 'Your session has expired. Please Login again.') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      localStorage.clear();
      window.location = '/';
    } else if (state.textStateValues.modalsMessage === 'Your Role access has changed. Please Login again.') {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/promTool/logout`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showStatusModal: false,
              },
            }));
            localStorage.clear();
            window.location = '/';
          }
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            setState((prevState) => ({
              ...prevState,
              textStateValues: {
                ...state.textStateValues,
                modalsIcon: failureIcon,
                modalsMessage: 'Server error. Please try again.',
              },
            }));
          } else if (err.response === undefined) {
            setState((prevState) => ({
              ...prevState,
              textStateValues: {
                ...state.textStateValues,
                modalsIcon: failureIcon,
                modalsMessage: 'Server down. Please try again.',
              },
            }));
          } else if (err.response.status === 500) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showStatusModal: false,
              },
            }));
            localStorage.clear();
            window.location = '/';
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showStatusModal: false,
              },
            }));
            localStorage.clear();
            window.location = '/';
          }
        });
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

  const handlePageClick = (value) => {
    setState((prevState) => ({
      ...prevState,
      minValue: (value - 1) * 40,
      maxValue: value * 40,
    }));
  };

  const handleChange = (e) => {
    const filteredData = state.employeeList.filter((obj) => {
      return obj.resource_name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState((prevState) => ({
      ...prevState,
      filteredEmployee: filteredData,
    }));
  };

  const handleActionModalUpdate = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = {
      emp_id: state.selectedEmployees,
      role: state.selectedFeatures,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/roles/addRolesToUser`, body)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              dependencyValue: !state.booleanStateValues.dependencyValue,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Assign Roles',
              modalsIcon: successIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>{state.selectedFeatures.length === 1 ? 'Role' : 'Roles'} assigned/modified successfully.</p>,
            },
            selectedFeatures: [],
            selectedEmployees: [],
            filteredEmployee: state.employeeList,
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
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Assign Roles',
              modalsIcon: failureIcon,
              modalsMessage: 'Server error. Please try again.',
            },
            selectedFeatures: [],
            selectedEmployees: [],
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Assign Roles',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
            },
            selectedFeatures: [],
            selectedEmployees: [],
          }));
        } else if (err.response.status === 500) {
          if (err.response.data.message === 'Data not saved') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showActionModal: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Assign Roles',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              selectedFeatures: [],
              selectedEmployees: [],
            }));
          } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showActionModal: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Assign Roles',
                modalsIcon: failureIcon,
                modalsMessage: 'Your session has expired. Please Login again.',
              },
            }));
          }
        } else if (err.response.status === 412) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Assign Roles',
              modalsIcon: failureIcon,
              modalsMessage: 'Your Role access has changed. Please Login again.',
            },
          }));
        } else if (err.response.status === 409) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Assign Roles',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to assign/modify Roles. Please try again.',
            },
            selectedFeatures: [],
            selectedEmployees: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Assign Roles',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            selectedFeatures: [],
            selectedEmployees: [],
          }));
        }
      });
  };

  const handleActionModalCancel = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showActionModal: false,
      },
      selectedEmployees: [],
      selectedFeatures: [],
      filteredEmployee: state.employeeList,
    }));
  };

  const actionModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      width={1000}
      maskClosable={false}
      keyboard={false}
      centered
      closable={false}
      destroyOnClose
      visible={state.booleanStateValues.showActionModal}
      onOk={handleActionModalCancel}
      onCancel={handleActionModalUpdate}
      okText="Cancel"
      cancelText="Update"
    >
      <div>
        <fieldset className="role-allocation-emp-container">
          <legend className="role-allocation-emp-legend">Select Employee:</legend>
          <Space direction="vertical">
            <Input size="small" addonBefore="Search Employee" onChange={handleChange} />
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={onCheckOfGroups}
              value={state.selectedEmployees}
            >
              <Row gutter={[16, 0]}>
                {state.filteredEmployee
                        && state.filteredEmployee.length > 0
                        && state.filteredEmployee.slice(state.minValue, state.maxValue).map((emp) => (
                          <Col key={emp.resource_emp_id} span={6}>
                            <Checkbox
                              key={emp.resource_emp_id}
                              value={emp.resource_emp_id}
                            >
                              {emp.resource_name}
                              {' '}
                              [
                              {emp.resource_emp_id}
                              ]
                            </Checkbox>
                          </Col>
                        ))}
              </Row>
            </Checkbox.Group>
            <Pagination
              style={{ float: 'right' }}
              hideOnSinglePage
              defaultCurrent={1}
              defaultPageSize={40}
              onChange={handlePageClick}
              total={state.employeeList.length}
              showSizeChanger={false}
            />
          </Space>
        </fieldset>
      </div>
    </Modal>
  );

  const handleEditRoleClick = (groups, employee) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showActionModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: `Edit Group: ${groups}`,
      },
      selectedEmployees: employee,
      selectedFeatures: [groups],
    }));
  };

  const groupInfoColumns = [
    {
      title: 'Group/Role Names',
      dataIndex: 'groups',
      key: 'groups',
      width: 150,
    },
    {
      title: 'Features Access',
      dataIndex: 'features',
      key: 'features',
      width: 150,
      render: (text) => (
        <>
          {text.map((features, i) => (
            <p key={i}>{features}</p>
          ))}
        </>
      ),
    },
    {
      title: 'Users',
      dataIndex: 'userNames',
      key: 'userNames',
      width: 150,
      render: (text) => (
        <>
          {text.map((users, j) => (
            <p key={j}>{users}</p>
          ))}
        </>
      ),
    },
    {
      title: 'Modify',
      key: 'edit_role',
      width: 150,
      render: (text) => (
        <Typography.Link
          type="text"
          onClick={() => handleEditRoleClick(text.groups, text.userEmployeeId)}
        >
          <EditTwoTone />
          Edit
        </Typography.Link>
      ),
    },
  ];

  return (
    <div>
      {roles.includes(202) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <div className="page-header-searchbar-flex">
                  <PageHeader>Role Allocation</PageHeader>
                  <Tooltip placement="bottom" title="Help">
                    <a href="/rm-tool/help/data-management/role-management/role-allocation" target="_blank">
                      <QuestionCircleOutlined className="help-icon" />
                    </a>
                  </Tooltip>
                </div>
                <div className="role-allocation-container">
                  <Table
                    columns={groupInfoColumns}
                    dataSource={state.groupInfo}
                    rowKey="groups"
                    bordered
                    size="small"
                    pagination={false}
                    scroll={{ y: 400 }}
                    className="role-table"
                  />
                </div>
                {statusModal}
                {actionModal}
              </div>
            )}
        </>
      ) : (
        <div className="pagecenter">
          <h1>No Access</h1>
        </div>
      )}
    </div>
  );
};

export default RoleAllocation;
