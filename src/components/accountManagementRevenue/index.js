/* eslint-disable react/function-component-definition, arrow-body-style, max-len */
import {
  DatePicker, InputNumber, Select, Table, Spin, PageHeader, Button, Space, Tooltip, Modal, Typography,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, QuestionCircleOutlined,
  SaveFilled, CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, StarFilled,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Prompt } from 'react-router-dom';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showActionModal: false,
    showStatusModal: false,
    projectSelected: false,
    dependencyValue: false,
    saveIndication: false,
    focus: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedProject: '',
    tempValue: '',
  },
  tableData: [
    {
      key: 1,
      project_code: '',
      project_name: '',
      project_bu_name: '',
      revenue_date: '',
      revenue: '',
    },
  ],
  keyCount: 2,
  selectedRowKeys: [],
  projectList: [],
  revenueList: [],
  joiTableValidation: [],
};

const AccountManagementClaims = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const lightRed = '#fc8f83';
  const enableSave = state.tableData.length > 0 && state.tableData[0].project_name !== '' && state.tableData[0].revenue_date !== ''
    && state.tableData[0].revenue !== '';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/revenue/getAllRevenue`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          revenueList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/getAllProjects`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          projectList: res.data.data,
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

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      project_code: '',
      project_name: '',
      project_bu_name: '',
      revenue_date: '',
      revenue: '',
    };
    if (state.booleanStateValues.focus) {
      setState((prevState) => ({
        ...prevState,
        tableData: [...prevState.tableData, newRow],
        keyCount: state.keyCount + 1,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          focus: true,
        },
        tableData: [...prevState.tableData, newRow],
        keyCount: state.keyCount + 1,
      }));
    }
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys,
      }));
    },
    getCheckboxProps: () => {
      return {
        disabled: state.textStateValues.selectedProject !== '',
      };
    },
  };

  const handleActionModalOk = (key) => {
    if (state.booleanStateValues.projectSelected) {
      if (state.tableData.length === key.length) {
        setState((prevState) => ({
          ...prevState,
          tableData: initialState.tableData,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            projectSelected: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedProject: '',
          },
          keyCount: 2,
          selectedRowKeys: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.filter((row) => !key.includes(row.opr_id)),
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
          },
          selectedRowKeys: [],
        }));
      }
    } else if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        textStateValues: {
          ...state.textStateValues,
          tempValue: '',
        },
        selectedRowKeys: [],
      }));
    } else if (state.tableData.length === key.length) {
      setState((prevState) => ({
        ...prevState,
        tableData: initialState.tableData,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
          saveIndication: false,
        },
        keyCount: 2,
        selectedRowKeys: [],
        joiTableValidation: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          isLoading: true,
        },
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.filter((row) => !key.includes(row.key)),
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
            showActionModal: false,
            focus: false,
          },
          selectedRowKeys: [],
        }));
      }, 10);
    }
  };

  const handleActionModalCancel = () => {
    if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      if (state.textStateValues.modalsTitle === 'Clear Project') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            projectSelected: false,
            saveIndication: false,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedProject: '',
          },
          tableData: initialState.tableData,
          keyCount: 2,
          selectedRowKeys: [],
          joiTableValidation: [],
        }));
      } else if (state.textStateValues.tempValue !== 'All') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            saveIndication: false,
            projectSelected: true,
          },
          tableData: state.revenueList.filter(((item) => item.project_code === state.textStateValues.tempValue)),
          textStateValues: {
            ...state.textStateValues,
            selectedProject: state.textStateValues.tempValue,
            tempValue: '',
          },
          joiTableValidation: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            saveIndication: false,
            projectSelected: true,
          },
          tableData: state.revenueList,
          textStateValues: {
            ...state.textStateValues,
            selectedProject: state.textStateValues.tempValue,
            tempValue: '',
          },
          joiTableValidation: [],
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        selectedRowKeys: [],
      }));
    }
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
      onCancel={() => handleActionModalOk(state.selectedRowKeys)}
      okText={state.textStateValues.modalsMessage.length === 32 ? 'No' : 'Cancel'}
      cancelText={state.textStateValues.modalsMessage.length === 32 ? 'Yes' : 'OK'}
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

  const handleDeleteClick = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showActionModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: 'Delete Row',
        modalsIcon: optionIcon,
        modalsMessage: 'Are you sure to remove selected record',
      },
    }));
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

  const handleSelectChange = (index) => (value) => {
    const [prjCode, prjName, prjGrpName] = value;
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? {
            ...item, project_code: prjCode, project_name: prjName, project_bu_name: prjGrpName,
          } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? {
            ...item, project_code: prjCode, project_name: prjName, project_bu_name: prjGrpName,
          } : item;
        }),
      }));
    }
  };

  const handleMonthChange = (_, dateString, index) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, revenue_date: dateString } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, revenue_date: dateString } : item;
        }),
      }));
    }
  };

  const handleInputChange = (e, index) => {
    if (e === null) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, revenue: '' } : item;
        }),
      }));
    } else if (e.target === undefined) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, revenue: e } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, revenue: e } : item;
          }),
        }));
      }
    }
  };

  const tableColumns = [
    {
      title: 'Project Code',
      dataIndex: 'project_code',
      key: 'project_code',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_code',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_code',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                autoFocus={state.booleanStateValues.focus}
                placeholder="Select Project"
                name="project_code"
                disabled={state.booleanStateValues.projectSelected}
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleSelectChange(index)}
              >
                {state.projectList.map((prj) => {
                  if (prj.project_type !== 'Buffer' && prj.project_status !== 'Closed') {
                    return (
                      <Select.Option key={prj.project_code} value={[prj.project_code, prj.project_name, prj.project_bu_name]}>
                        {prj.project_code}
                        {' - '}
                        {prj.project_name}
                      </Select.Option>
                    );
                  }
                  return null;
                })}
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            autoFocus={state.booleanStateValues.focus}
            placeholder="Select Project"
            name="project_code"
            disabled={state.booleanStateValues.projectSelected}
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleSelectChange(index)}
          >
            {state.projectList.map((prj) => {
              if (prj.project_type !== 'Buffer' && prj.project_status !== 'Closed') {
                return (
                  <Select.Option key={prj.project_code} value={[prj.project_code, prj.project_name, prj.project_bu_name]}>
                    {prj.project_code}
                    {' - '}
                    {prj.project_name}
                  </Select.Option>
                );
              }
              return null;
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_code !== prevRecord.project_code;
      },
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
      width: 150,
    },
    {
      title: 'Project BU Name',
      dataIndex: 'project_bu_name',
      key: 'project_bu_name',
      width: 150,
    },
    {
      title: 'Month',
      dataIndex: 'revenue_date',
      key: 'revenue_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'revenue_date',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'revenue_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                picker="month"
                placeholder="Select Month"
                name="revenue_date"
                className="date-picker"
                disabled={state.booleanStateValues.projectSelected}
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleMonthChange(date, dateString, index)}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            picker="month"
            placeholder="Select Month"
            name="revenue_date"
            className="date-picker"
            disabled={state.booleanStateValues.projectSelected}
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleMonthChange(date, dateString, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.revenue_date !== prevRecord.revenue_date;
      },
    },
    {
      title: 'Actual Revenue (₹)',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'revenue',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'revenue',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                placeholder="Enter Actual Revenue"
                name="revenue"
                className="input-no"
                style={{ width: '100%' }}
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            controls={false}
            placeholder="Enter Actual Revenue"
            name="revenue"
            className="input-no"
            style={{ width: '100%' }}
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.revenue !== prevRecord.revenue;
      },
    },
  ];

  const handleSaveClick = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;
    if (state.booleanStateValues.projectSelected) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/revenue/updateRevenue`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
                projectSelected: false,
                saveIndication: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Actual Revenue',
                modalsIcon: successIcon,
                modalsMessage: 'Data updated successfully.',
                selectedProject: '',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              joiTableValidation: [],
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
                modalsTitle: 'Update Actual Revenue',
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
                modalsTitle: 'Update Actual Revenue',
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
                  modalsTitle: 'Update Actual Revenue',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiTableValidation: [],
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
                  modalsTitle: 'Update Actual Revenue',
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
                modalsTitle: 'Update Actual Revenue',
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
                modalsTitle: 'Update Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update Actual Revenue. Please try again.',
              },
              joiTableValidation: [],
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
                modalsTitle: 'Update Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
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
                modalsTitle: 'Update Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
            }));
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/revenue/saveRevenueData`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
                saveIndication: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Actual Revenue',
                modalsIcon: successIcon,
                modalsMessage: 'Data saved successfully.',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              joiTableValidation: [],
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
                modalsTitle: 'Save Actual Revenue',
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
                modalsTitle: 'Save Actual Revenue',
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
                  modalsTitle: 'Save Actual Revenue',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiTableValidation: [],
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
                  modalsTitle: 'Save Actual Revenue',
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
                modalsTitle: 'Save Actual Revenue',
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
                modalsTitle: 'Save Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to save Actual Revenue. Please try again.',
              },
              joiTableValidation: [],
            }));
          } else if (err.response.status === 400) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: 'Database error. Please contact the Admin.',
              },
              joiTableValidation: [],
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
                modalsTitle: 'Save Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: `Actual Revenue for ${err.response.data.data}.`,
              },
              joiTableValidation: [],
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
                modalsTitle: 'Save Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
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
                modalsTitle: 'Save Actual Revenue',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
            }));
          }
        });
    }
  };

  const handleProjectSelect = (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          tempValue: value,
          modalsTitle: 'Project Select',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else if (value !== 'All') {
      setState((prevState) => ({
        ...prevState,
        tableData: state.revenueList.filter(((item) => item.project_code === value)),
        booleanStateValues: {
          ...state.booleanStateValues,
          projectSelected: true,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedProject: value,
        },
        joiTableValidation: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: state.revenueList,
        booleanStateValues: {
          ...state.booleanStateValues,
          projectSelected: true,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedProject: value,
        },
        joiTableValidation: [],
      }));
    }
  };

  const handleClear = () => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Clear Project',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          projectSelected: false,
          saveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedProject: '',
        },
        tableData: initialState.tableData,
        keyCount: 2,
        selectedRowKeys: [],
      }));
    }
  };

  return (
    <div>
      {roles.includes(211) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <Prompt
                  message={(_, action) => {
                    if (action !== 'REPLACE' && state.booleanStateValues.saveIndication) {
                      return 'There are unsaved changes. Are you sure want to leave this page?';
                    }
                    return true;
                  }}
                />
                <div className="page-header-star-flex">
                  <PageHeader>Actual Revenue</PageHeader>
                  {state.booleanStateValues.saveIndication && (
                    <StarFilled className="save-indication" />
                  )}
                </div>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>Project:</Typography>
                    <Select
                      style={{ width: '200px' }}
                      placeholder="Select Project"
                      allowClear
                      showSearch
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      onClear={handleClear}
                      value={state.textStateValues.selectedProject ? state.textStateValues.selectedProject : null}
                      onSelect={handleProjectSelect}
                    >
                      {state.projectList.length > 0 && (
                        <Select.Option key="All" value="All">All</Select.Option>
                      )}
                      {state.projectList.map((prj) => {
                        if (prj.project_type !== 'Buffer') {
                          return (
                            <Select.Option key={prj.project_code} value={prj.project_code}>
                              {prj.project_code}
                              {' - '}
                              {prj.project_name}
                            </Select.Option>
                          );
                        }
                        return null;
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select Project to view/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Tooltip placement="bottom" title="Save Actual Revenue">
                      <Button type="primary" onClick={handleSaveClick} disabled={!(enableSave && state.booleanStateValues.saveIndication)}>
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/accounts-management/actual-revenue" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <div className="table-border">
                  <Space style={{ marginBottom: '10px' }}>
                    <Tooltip placement="bottom" title="Add Actual Revenue">
                      <Button type="primary" disabled={state.booleanStateValues.projectSelected} onClick={handleAddClick}>
                        <PlusOutlined />
                        Add
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Select Row(s) to Delete">
                      <Button type="primary" onClick={handleDeleteClick} disabled={state.selectedRowKeys.length === 0}>
                        <DeleteOutlined />
                        Delete
                      </Button>
                    </Tooltip>
                  </Space>
                  <Table
                    columns={tableColumns}
                    dataSource={state.tableData}
                    pagination={false}
                    bordered
                    rowKey={state.booleanStateValues.projectSelected ? 'opr_id' : 'key'}
                    rowSelection={rowSelection}
                    scroll={{ x: 200, y: 400 }}
                    size="small"
                  />
                </div>
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

export default AccountManagementClaims;
