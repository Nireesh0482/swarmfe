/* eslint-disable react/function-component-definition, arrow-body-style, react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Button, PageHeader, Modal, Input, Select, Space, Table, Tooltip, Spin, Typography,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, DiffFilled, CloseCircleFilled, QuestionCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showCreateUpdateGroupModal: false,
    dependencyValue: false,
    showActionModal: false,
    showStatusModal: false,
  },
  textStateValues: {
    groupName: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  featureList: [],
  roleList: [],
  features: [],
  selectedRowKeys: [],
};

const RoleGroupManagement = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/roles/featuresAndAccess`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          featureList: res.data.data,
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/roles/roleGroups`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          roleList: res.data.data,
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

  const handleCreateUpdateGroupOk = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    if (state.textStateValues.modalsTitle === 'Create Groups') {
      const body = {
        groupName: state.textStateValues.groupName,
        features: state.features,
      };
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/roles/createRoles`, body)
        .then((res) => {
          if (res.status === 201) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showCreateUpdateGroupModal: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                groupName: '',
              },
              features: [],
            }));
          } else if (res.status === 205) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showCreateUpdateGroupModal: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                groupName: '',
                modalsTitle: 'Create Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Group/Role with same name already exists. Try with some other name.',
              },
              features: [],
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
                modalsTitle: 'Create Group/Role',
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
                modalsTitle: 'Create Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Server down. Please try again.',
              },
            }));
          } else if (err.response.status === 500) {
            if (err.response.data.message === 'Data not saved') {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Create Group/Role',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
              }));
            } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Create Group/Role',
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
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Create Group/Role',
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
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Create Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Group/Role creation failed. Please try again.',
              },
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Create Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
            }));
          }
        });
    } else {
      const body = {
        groupName: state.textStateValues.groupName,
        features: state.features,
      };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/roles/updateRoles`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showCreateUpdateGroupModal: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                groupName: '',
              },
              features: [],
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
                modalsTitle: 'Update Group/Role',
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
                showActionModal: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Server down. Please try again.',
              },
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
                  modalsTitle: 'Update Group/Role',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
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
                  modalsTitle: 'Update Group/Role',
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
                modalsTitle: 'Update Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Your Role access has changed. Please Login again.',
              },
            }));
          } else if (err.response.status === 404) {
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
                modalsTitle: 'Update Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Group/Role not found. Refresh and try again.',
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
                modalsTitle: 'Update Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update Group/Role features. Please try again.',
              },
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
            }));
          }
        });
    }
  };

  const handleCreateUpdateGroupCancel = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showCreateUpdateGroupModal: false,
      },
      features: [],
      textStateValues: {
        ...state.textStateValues,
        groupName: '',
      },
    }));
  };

  const handleGroupNameChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        groupName: e.target.value,
      },
    }));
  };

  const handleSelectFeature = (value) => {
    setState((prevState) => ({
      ...prevState,
      features: value,
    }));
  };

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
    }
  };

  const handleAddGroup = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showCreateUpdateGroupModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: 'Create Groups',
      },
    }));
  };

  const handleSelectGroup = (value) => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        groupName: value[0],
      },
      features: value[1],
    }));
  };

  const createUpdateGroupModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      destroyOnClose
      centered
      visible={state.booleanStateValues.showCreateUpdateGroupModal}
      closable={false}
      keyboard={false}
      maskClosable={false}
      onOk={handleCreateUpdateGroupCancel}
      onCancel={handleCreateUpdateGroupOk}
      width={620}
      okText="Cancel"
      cancelText={state.textStateValues.modalsTitle === 'Create Groups' ? 'Add' : 'Save'}
      cancelButtonProps={state.textStateValues.modalsTitle === 'Create Groups'
        ? {
          disabled: !(state.textStateValues.groupName.length > 0 && state.features.length > 0),
        } : { disabled: !(state.textStateValues.groupName.length > 0 && state.features.length > 0) }}
    >
      {state.textStateValues.modalsTitle === 'Create Groups'
        ? (
          <Space>
            <Typography>Group Name:</Typography>
            <Input placeholder="Enter Group Name" onChange={handleGroupNameChange} />
            <Typography>Select Feature:</Typography>
            <Select
              placeholder="Select Feature"
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: '180px' }}
              showArrow
              showSearch
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
              onChange={handleSelectFeature}
              onInputKeyDown={handleBackspaceDisable}
            >
              {state.featureList.map((feature, i) => (
                <Select.Option
                  value={feature.value}
                  key={i}
                >
                  {feature.feature}
                </Select.Option>
              ))}
            </Select>
          </Space>
        ) : (
          <Space>
            <Typography>Select Group:</Typography>
            <Select
              placeholder="Select Group"
              style={{ width: '180px' }}
              onSelect={handleSelectGroup}
              showSearch
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
              value={state.textStateValues.groupName ? state.textStateValues.groupName : null}
            >
              {state.roleList.map((groups, j) => (
                <Select.Option
                  key={j}
                  value={[groups.groups, groups.featuresValue]}
                >
                  {groups.groups}
                </Select.Option>
              ))}
            </Select>
            <Typography>Select Feature:</Typography>
            <Select
              placeholder="Select Feature"
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: '180px' }}
              showArrow
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
              showSearch
              onChange={handleSelectFeature}
              onInputKeyDown={handleBackspaceDisable}
              value={state.features}
              disabled={state.textStateValues.groupName.length === 0}
            >
              {state.featureList.map((feature, k) => (
                <Select.Option
                  value={feature.value}
                  key={k}
                >
                  {feature.feature}
                </Select.Option>
              ))}
            </Select>
          </Space>
        )}
    </Modal>
  );

  const rolesColumns = [
    {
      title: 'Group/Role Names',
      dataIndex: 'groups',
      key: 'groups',
    },
    {
      title: 'Features Access',
      dataIndex: 'features',
      key: 'features',
      render: (text) => (
        <>
          {text.map((features, i) => (
            <p key={i}>{features}</p>
          ))}
        </>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys,
      }));
    },
    getCheckboxProps: (record) => {
      return {
        disabled: record.groups === 'Admin',
      };
    },
  };

  const handleDeleteGroup = () => {
    // eslint-disable-next-line react/jsx-one-expression-per-line
    const message = <p>Are you sure to <b>delete</b> <b>{state.selectedRowKeys.join(', ')}</b> Group/Role?</p>;
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showActionModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: 'Delete Group/Role',
        modalsIcon: optionIcon,
        modalsMessage: message,
      },
    }));
  };

  const handleActionModalOk = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const data = {
      groupName: state.selectedRowKeys,
    };
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/promTool/roles/deleteRoles`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        data,
      })
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              dependencyValue: !state.booleanStateValues.dependencyValue,
              showActionModal: false,
            },
            selectedRowKeys: [],
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
              modalsTitle: 'Delete Group/Role',
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
              modalsTitle: 'Delete Group/Role',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
            },
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
                modalsTitle: 'Delete Group/Role',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
            }));
          } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Delete Group/Role',
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
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Delete Group/Role',
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
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Delete Group/Role',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to delete Group/Role. Please try again.',
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Delete Group/Role',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
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
      selectedRowKeys: [],
    }));
  };

  const actionModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      maskClosable={false}
      keyboard={false}
      centered
      closable={false}
      visible={state.booleanStateValues.showActionModal}
      onOk={handleActionModalCancel}
      onCancel={handleActionModalOk}
      okText="Cancel"
      cancelText="OK"
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

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

  const handleUpdateGroup = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showCreateUpdateGroupModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: 'Update Groups',
      },
    }));
  };

  return (
    <div>
      {roles.includes(203) ? (
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
                  <PageHeader>Role Group Management</PageHeader>
                  <Tooltip placement="bottom" title="Help">
                    <a href="/rm-tool/help/data-management/role-management/role-group-management" target="_blank">
                      <QuestionCircleOutlined className="help-icon" />
                    </a>
                  </Tooltip>
                </div>
                <div className="role-allocation-container">
                  <Space style={{ marginBottom: '10px' }}>
                    <Tooltip placement="bottom" title="Update Group/Role">
                      <Button disabled={state.roleList.length === 0} onClick={handleUpdateGroup}>
                        <DiffFilled />
                        Update
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Add Group/Role">
                      <Button onClick={handleAddGroup}>
                        <PlusOutlined />
                        Add
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Select Group/Role Name(s) to Delete">
                      <Button onClick={handleDeleteGroup} disabled={state.selectedRowKeys.length === 0}>
                        <DeleteOutlined />
                        Delete
                      </Button>
                    </Tooltip>
                  </Space>
                  <Table
                    columns={rolesColumns}
                    dataSource={state.roleList}
                    rowSelection={rowSelection}
                    pagination={false}
                    bordered
                    rowKey="groups"
                    size="small"
                    scroll={{ y: 400 }}
                    className="role-table"
                  />
                </div>
                {createUpdateGroupModal}
                {actionModal}
                {statusModal}
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

export default RoleGroupManagement;
