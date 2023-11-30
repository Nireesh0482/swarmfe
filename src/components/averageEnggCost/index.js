/* eslint-disable react/function-component-definition, arrow-body-style */
import {
  Spin, PageHeader, Button, Tooltip, Modal, Space, Table, DatePicker, InputNumber, Typography, Select,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, QuestionCircleOutlined,
  SaveFilled, CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, StarFilled,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Prompt } from 'react-router-dom';

const initialState = {
  booleanStateValues: {
    isLoading: false,
    showActionModal: false,
    showStatusModal: false,
    dependencyValue: false,
    monthSelected: false,
    saveIndication: false,
    focus: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedGroup: '',
    tempValue: '',
  },
  tableData: [
    {
      key: 1,
      bu_name: '',
      average_engg_date: '',
      average_engg_cost: '',
    },
  ],
  keyCount: 2,
  groupDetailsList: [],
  selectedRowKeys: [],
  avgEnggCostList: [],
  joiTableValidation: [],
};

const AverageEnggCost = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const lightRed = '#fc8f83';
  const enableSave = state.tableData.length > 0 && state.tableData[0].bu_name !== ''
    && state.tableData[0].average_engg_date !== '' && state.tableData[0].average_engg_cost !== '';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/avgEnggCost/getAllEnggCost`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          avgEnggCostList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/getAllProjectGroupNames`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          groupDetailsList: res.data.data,
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

  const handleSelectChange = (index) => (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? {
            ...item, bu_name: value,
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
            ...item, bu_name: value,
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
          return index === i ? { ...item, average_engg_date: dateString } : item;
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
          return index === i ? { ...item, average_engg_date: dateString } : item;
        }),
      }));
    }
  };

  const handleInputChange = (e, index) => {
    if (e === null) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, average_engg_cost: '' } : item;
        }),
      }));
    } else if (e.target === undefined) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, average_engg_cost: e } : item;
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
            return index === i ? { ...item, average_engg_cost: e } : item;
          }),
        }));
      }
    }
  };

  const tableColumns = [
    {
      title: 'BU Name',
      dataIndex: 'bu_name',
      key: 'bu_name',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'bu_name',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'bu_name',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select BU Name"
                name="bu_name"
                value={text || null}
                showSearch
                autoFocus={state.booleanStateValues.focus}
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                disabled={state.booleanStateValues.monthSelected}
                onSelect={handleSelectChange(index)}
              >
                {state.groupDetailsList.map((group) => {
                  return (
                    <Select.Option
                      key={group.bu_code}
                      value={group.bu_name}
                    >
                      {group.bu_code}
                      {' - '}
                      {group.bu_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Select BU Name"
            name="bu_name"
            value={text || null}
            showSearch
            autoFocus={state.booleanStateValues.focus}
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            disabled={state.booleanStateValues.monthSelected}
            onSelect={handleSelectChange(index)}
          >
            {state.groupDetailsList.map((group) => {
              return (
                <Select.Option
                  key={group.bu_code}
                  value={group.bu_name}
                >
                  {group.bu_code}
                  {' - '}
                  {group.bu_name}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.bu_name !== prevRecord.bu_name;
      },
    },
    {
      title: 'Month',
      dataIndex: 'average_engg_date',
      key: 'average_engg_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'average_engg_date',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'average_engg_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                style={{ width: '100%' }}
                picker="month"
                placeholder="Select Month"
                name="average_engg_date"
                className="date-picker"
                disabled={state.booleanStateValues.monthSelected}
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleMonthChange(date, dateString, index)}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            style={{ width: '100%' }}
            picker="month"
            placeholder="Select Month"
            name="average_engg_date"
            className="date-picker"
            disabled={state.booleanStateValues.monthSelected}
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleMonthChange(date, dateString, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.average_engg_date !== prevRecord.average_engg_date;
      },
    },
    {
      title: 'Average Engg. Cost (₹)',
      dataIndex: 'average_engg_cost',
      key: 'average_engg_cost',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'average_engg_cost',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'average_engg_cost',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                placeholder="Enter Average Engg. Cost"
                name="average_engg_cost"
                value={text || null}
                className="input-no"
                style={{ width: '100%' }}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            controls={false}
            placeholder="Enter Average Engg. Cost"
            name="average_engg_cost"
            value={text || null}
            className="input-no"
            style={{ width: '100%' }}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.average_engg_cost !== prevRecord.average_engg_cost;
      },
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
    getCheckboxProps: () => {
      return {
        disabled: state.textStateValues.selectedGroup !== '',
      };
    },
  };

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      bu_name: '',
      average_engg_date: '',
      average_engg_cost: '',
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

  const handleActionModalOk = (key) => {
    if (state.booleanStateValues.monthSelected) {
      if (state.tableData.length === key.length) {
        setState((prevState) => ({
          ...prevState,
          tableData: initialState.tableData,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            monthSelected: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedGroup: '',
          },
          keyCount: 2,
          selectedRowKeys: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.filter((row) => !key.includes(row.un_id)),
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
      if (state.textStateValues.modalsTitle === 'Select BU') {
        setState((prevState) => ({
          ...prevState,
          tableData: state.avgEnggCostList.filter((item) => item.bu_name === state.textStateValues.tempValue),
          booleanStateValues: {
            ...state.booleanStateValues,
            monthSelected: true,
            showActionModal: false,
            saveIndication: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedGroup: state.textStateValues.tempValue,
            tempValue: '',
          },
          joiTableValidation: [],
        }));
      } else if (state.textStateValues.modalsTitle === 'Clear BU') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            monthSelected: false,
            saveIndication: false,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedGroup: '',
          },
          tableData: initialState.tableData,
          keyCount: 2,
          selectedRowKeys: [],
          joiTableValidation: [],
        }));
      } else {
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
        modalsMessage: 'Are you sure to remove selected record?',
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

  const handleSaveClick = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;
    if (state.booleanStateValues.monthSelected) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/avgEnggCost/updateEnggCost`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
                monthSelected: false,
                saveIndication: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Average Engg. Cost',
                modalsIcon: successIcon,
                modalsMessage: 'Data updated successfully.',
                selectedGroup: '',
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
                modalsTitle: 'Update Average Engg. Cost',
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
                modalsTitle: 'Update Average Engg. Cost',
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
                  modalsTitle: 'Update Average Engg. Cost',
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
                  modalsTitle: 'Update Average Engg. Cost',
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
                modalsTitle: 'Update Average Engg. Cost',
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
                modalsTitle: 'Update Average Engg. Cost',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update Average Engg. Cost. Please try again.',
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
                modalsTitle: 'Update Average Engg. Cost',
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
                modalsTitle: 'Update Average Engg. Cost',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
            }));
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/avgEnggCost/saveEnggCostData`, body)
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
                modalsTitle: 'Save Average Engg. Cost',
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
                modalsTitle: 'Save Average Engg. Cost',
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
                modalsTitle: 'Save Average Engg. Cost',
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
                  modalsTitle: 'Save Average Engg. Cost',
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
                  modalsTitle: 'Save Average Engg. Cost',
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
                modalsTitle: 'Save Average Engg. Cost',
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
                modalsTitle: 'Save Average Engg. Cost',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to save Average Engg. Cost. Please try again.',
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
                modalsTitle: 'Save Average Engg. Cost',
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
                modalsTitle: 'Save Average Engg. Cost',
                modalsIcon: failureIcon,
                modalsMessage: `Average Engg. Cost for month ${err.response.data.data}`,
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
                modalsTitle: 'Save Average Engg. Cost',
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
                modalsTitle: 'Save Average Engg. Cost',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
            }));
          }
        });
    }
  };

  const handleGroupSelect = (value) => {
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
          modalsTitle: 'Select BU',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: state.avgEnggCostList.filter((item) => item.bu_name === value),
        booleanStateValues: {
          ...state.booleanStateValues,
          monthSelected: true,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedGroup: value,
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
          modalsTitle: 'Clear BU',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          monthSelected: false,
          saveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedGroup: '',
        },
        tableData: initialState.tableData,
        keyCount: 2,
        selectedRowKeys: [],
        joiTableValidation: [],
      }));
    }
  };

  return (
    <div>
      {roles.includes(212) ? (
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
                  <PageHeader>Average Engg. Cost</PageHeader>
                  {state.booleanStateValues.saveIndication && (
                    <StarFilled className="save-indication" />
                  )}
                </div>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>BU:</Typography>
                    <Select
                      style={{ width: '200px' }}
                      placeholder="Select BU"
                      allowClear
                      showSearch
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      onClear={handleClear}
                      value={state.textStateValues.selectedGroup || null}
                      onSelect={handleGroupSelect}
                    >
                      {state.groupDetailsList.map((group) => {
                        return (
                          <Select.Option key={group.bu_code} value={group.bu_name}>
                            {group.bu_code}
                            {' - '}
                            {group.bu_name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select BU Name to view/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Tooltip placement="bottom" title="Save Average Engg. Cost">
                      <Button
                        type="primary"
                        onClick={handleSaveClick}
                        disabled={!(enableSave && state.booleanStateValues.saveIndication)}
                      >
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/accounts-management/average-engg-cost" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <div className="table-border">
                  <Space style={{ marginBottom: '10px' }}>
                    <Tooltip placement="bottom" title="Add Average Engg. Cost">
                      <Button type="primary" disabled={state.booleanStateValues.monthSelected} onClick={handleAddClick}>
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
                    rowKey={state.booleanStateValues.monthSelected ? 'un_id' : 'key'}
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

export default AverageEnggCost;
