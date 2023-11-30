/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/no-array-index-key, no-param-reassign */
import {
  DatePicker, Input, Select, Table, Spin, PageHeader, Button, Space, Tooltip, Modal, InputNumber, Upload,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, StarFilled,
  SaveFilled, CheckCircleFilled, CloseCircleFilled, QuestionCircleOutlined,
  UploadOutlined, InfoCircleTwoTone, DownloadOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Excel from 'exceljs';
import SaveAs from 'file-saver';
import { Prompt } from 'react-router-dom';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showActionModal: false,
    showStatusModal: false,
    saveIndication: false,
    focus: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  tableData: [
    {
      key: 1,
      project_code: '',
      resource_emp_id: null,
      expense_type: '',
      date: '',
      amount: '',
      remarks: '',
      approver: '',
    },
  ],
  keyCount: 2,
  selectedRowKeys: [],
  expenseTypeList: [],
  projectEmpList: [],
  resourceList: [],
  joiTableValidation: [],
  tempValue: [],
};

const Claims = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const lightRed = '#fc8f83';
  const enableSave = state.tableData.length > 0 && state.tableData[0].project_code !== '' && state.tableData[0].expense_type !== ''
    && state.tableData[0].date !== '' && state.tableData[0].amount !== '' && state.tableData[0].approver !== '';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/claims/getAllResourceByProject`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          projectEmpList: res.data.data,
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

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/claims/getAllExpenseTypes`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          expenseTypeList: res.data.data,
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

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllResources`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          resourceList: res.data.data,
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

  const handleUploadExcel = (e) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const reader = new FileReader();
    let errRow = [];
    // evt = on_file_select event
    reader.onload = (evt) => {
      try {
        // Parse data
        const data = evt.target.result;
        const wb = XLSX.read(data, {
          type: 'binary',
          cellDates: true,
        });
        const sheet = wb.SheetNames[0];
        const excel = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: null });
        const excelData = excel.map((row, index) => Object.keys(row).reduce((obj, key) => {
          const object = obj;
          object.key = index + 1;
          if (key.trim() === '' || key.trim() === '__EMPTY' || key.trim() === null) {
            delete object[key];
          } else if (key.trim() === 'Project Code' && row[key] !== null) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Resource Emp ID' && row[key] === null) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = null;
          } else if (key.trim() === 'Resource Emp ID' && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Resource Emp ID' && (row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(object.project_code);
          } else if (key.trim() === 'Date') {
            if (row[key] && row[key].length === 10) {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : moment(row[key], 'DD-MM-YYYY');
            } else {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
            }
          } else if (key.trim() === 'Approver' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Approver' && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(object.project_code);
          } else if (row[key] === null) {
            object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = '';
          } else {
            // eslint-disable-next-line max-len
            object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key].toString().trim();
          }
          return object;
        }, {}));
        if (errRow.length > 0) {
          const unique = [...new Set(errRow)];
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              saveIndication: false,
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Claims Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;Resource Emp ID (Optional)&apos; and &apos;Approver&apos; should be 4. Please check the records of &apos;Project Code&apos; (<b>{unique.join(', ')}</b>).</p>,
            },
            tempValue: [],
          }));
          errRow = [];
        } else if (excelData[0].project_code !== undefined
          && excelData[0].expense_type !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              saveIndication: true,
              uploadExcel: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Claims Data',
              modalsIcon: infoIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
            },
            tableData: excelData,
            keyCount: excelData.length + 1,
            selectedRowKeys: [],
            joiTableValidation: [],
            tempValue: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              saveIndication: false,
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Claims Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel for Claims Data.',
            },
            tempValue: [],
          }));
        }
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
            saveIndication: false,
            showStatusModal: true,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Import Claims Data',
            modalsIcon: failureIcon,
            modalsMessage: 'Invalid excel for Claims Data.',
          },
          tempValue: [],
        }));
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const beforeUpload = (file, fileList) => {
    if (state.booleanStateValues.saveIndication) {
      const files = { file, fileList };
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Import Claims Data',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: [files],
      }));
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      project_code: '',
      resource_emp_id: null,
      expense_type: '',
      date: '',
      amount: '',
      remarks: '',
      approver: '',
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
  };

  const handleActionModalOk = (key) => {
    if (state.textStateValues.modalsMessage === 'Are you sure to remove selected record?') {
      if (state.tableData.length === key.length) {
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
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        tempValue: [],
      }));
    }
  };

  const handleActionModalCancel = () => {
    if (state.textStateValues.modalsMessage === 'Are you sure to remove selected record?') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        selectedRowKeys: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        tableData: initialState.tableData,
      }));
      setTimeout(() => {
        handleUploadExcel(state.tempValue[0]);
      }, 10);
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

  const handleSelectChange = (keyName, index) => (value) => {
    if (keyName === 'project_code') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? {
              ...item, [keyName]: value, resource_emp_id: null,
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
              ...item, [keyName]: value, resource_emp_id: null,
            } : item;
          }),
        }));
      }
    } else if (keyName === 'resource_emp_id') {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: value } : item;
        }),
      }));
    } else if (keyName === 'approver') {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: value } : item;
        }),
      }));
    } else if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: value } : item;
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
          return index === i ? { ...item, [keyName]: value } : item;
        }),
      }));
    }
  };

  const handleDateChange = (_, dateString, index) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, date: dateString } : item;
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
          return index === i ? { ...item, date: dateString } : item;
        }),
      }));
    }
  };

  const handleInputChange = (e, index) => {
    if (e === null) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, amount: '' } : item;
        }),
      }));
    } else if (e.target === undefined) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, amount: e } : item;
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
            return index === i ? { ...item, amount: e } : item;
          }),
        }));
      }
    } else {
      const { name, value } = e.target;
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [name]: value } : item;
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
            return index === i ? { ...item, [name]: value } : item;
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
                placeholder="Select Project"
                name="project_code"
                autoFocus={state.booleanStateValues.focus}
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleSelectChange('project_code', index)}
              >
                {state.projectEmpList.map((prj) => {
                  return (
                    <Select.Option
                      key={prj.project_code}
                      value={prj.project_code}
                    >
                      {prj.project_code}
                      {' - '}
                      {prj.project_name}
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
            placeholder="Select Project"
            name="project_code"
            autoFocus={state.booleanStateValues.focus}
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleSelectChange('project_code', index)}
          >
            {state.projectEmpList.map((prj) => {
              return (
                <Select.Option
                  key={prj.project_code}
                  value={prj.project_code}
                >
                  {prj.project_code}
                  {' - '}
                  {prj.project_name}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_code !== prevRecord.project_code;
      },
    },
    {
      title: 'Resource Emp ID',
      dataIndex: 'resource_emp_id',
      key: 'resource_emp_id',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_emp_id',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'resource_emp_id',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Emp ID"
                name="resource_emp_id"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                disabled={state.tableData[index].project_code.length === 0}
                onSelect={handleSelectChange('resource_emp_id', index)}
              >
                {state.projectEmpList.filter((item) => state.tableData[index].project_code === item.project_code).map((project) => {
                  return project.resourceNames.map((emp, i) => {
                    return (
                      <Select.Option
                        key={i}
                        value={emp.resource_emp_id}
                      >
                        {emp.resource_emp_id}
                        {' - '}
                        {emp.resource_name}
                      </Select.Option>
                    );
                  });
                })}
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Select Emp ID"
            name="resource_emp_id"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            disabled={state.tableData[index].project_code.length === 0}
            onSelect={handleSelectChange('resource_emp_id', index)}
          >
            {state.projectEmpList.filter((item) => state.tableData[index].project_code === item.project_code).map((project) => {
              return project.resourceNames.map((emp, i) => {
                return (
                  <Select.Option
                    key={i}
                    value={emp.resource_emp_id}
                  >
                    {emp.resource_emp_id}
                    {' - '}
                    {emp.resource_name}
                  </Select.Option>
                );
              });
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_emp_id !== prevRecord.resource_emp_id;
      },
    },
    {
      title: 'Expense Type',
      dataIndex: 'expense_type',
      key: 'expense_type',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'expense_type',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'expense_type',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Expense Type"
                name="expense_type"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleSelectChange('expense_type', index)}
              >
                {state.expenseTypeList.map((expense, j) => {
                  return (
                    <Select.Option
                      key={j}
                      value={expense.expense_type}
                    >
                      {expense.expense_type}
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
            placeholder="Select Expense Type"
            name="expense_type"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleSelectChange('expense_type', index)}
          >
            {state.expenseTypeList.map((expense, j) => {
              return (
                <Select.Option
                  key={j}
                  value={expense.expense_type}
                >
                  {expense.expense_type}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.expense_type !== prevRecord.expense_type;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'date',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Date"
                name="date"
                allowClear={false}
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleDateChange(date, dateString, index)}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Date"
            name="date"
            allowClear={false}
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.date !== prevRecord.date;
      },
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'amount',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'amount',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                placeholder="Enter Amount"
                name="amount"
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
            placeholder="Enter Amount"
            name="amount"
            style={{ width: '100%' }}
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.amount !== prevRecord.amount;
      },
    },
    {
      title: 'Approver',
      dataIndex: 'approver',
      key: 'approver',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'approver',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'approver',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Approver"
                name="approver"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleSelectChange('approver', index)}
              >
                {state.resourceList.map((emp) => {
                  return (
                    <Select.Option
                      key={emp.resource_emp_id}
                      value={emp.resource_emp_id}
                      disabled={state.tableData[index].resource_emp_id === emp.resource_emp_id}
                    >
                      {emp.resource_emp_id}
                      {' - '}
                      {emp.resource_name}
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
            placeholder="Select Approver"
            name="approver"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleSelectChange('approver', index)}
          >
            {state.resourceList.map((emp) => {
              return (
                <Select.Option
                  key={emp.resource_emp_id}
                  value={emp.resource_emp_id}
                  disabled={state.tableData[index].resource_emp_id === emp.resource_emp_id}
                >
                  {emp.resource_emp_id}
                  {' - '}
                  {emp.resource_name}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.approver !== prevRecord.approver;
      },
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'remarks',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'remarks',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Input
                placeholder="Enter Remarks"
                name="remarks"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="Enter Remarks"
            name="remarks"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.remarks !== prevRecord.remarks;
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
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/claims/uploadClaimData`, body)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              saveIndication: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Claim Data',
              modalsIcon: successIcon,
              modalsMessage: 'Data saved successfully.',
              selectedProject: '',
            },
            tableData: initialState.tableData,
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
              modalsTitle: 'Save Claim Data',
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
              modalsTitle: 'Save Claim Data',
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
                modalsTitle: 'Save Claim Data',
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
                modalsTitle: 'Save Claim Data',
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
              modalsTitle: 'Save Claim Data',
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
              modalsTitle: 'Save Claim Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to save Claim Data. Please try again.',
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
              modalsTitle: 'Save Claim Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Database error. Please contact the Admin.',
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
              modalsTitle: 'Save Claim Data',
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
              modalsTitle: 'Save Claim Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiTableValidation: [],
          }));
        }
      });
  };

  const generateExcelTemplate = async () => {
    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const fileName = 'RM_Claims_Template';

    try {
      const worksheet1 = workbook.addWorksheet('Claims', {
        views: [{ showGridLines: false }],
      });
      const worksheet2 = workbook.addWorksheet('Project & Resource List');
      const exportTemplateTable = [
        [],
        [
          ' ',
          'Sl. No.',
          'Project Code',
          'Resource Emp ID',
          'Expense Type',
          'Date',
          'Amount',
          'Approver',
          'Remarks',
        ],
      ];
      worksheet1.addRows(exportTemplateTable);
      // eslint-disable-next-line no-plusplus
      for (let k = 0; k < 10; k++) {
        worksheet1.addRow(['', '', '', '', '', '', '', '', '']);
      }

      if (state.projectEmpList.length > 0) {
        state.projectEmpList.forEach((prj, i) => {
          // eslint-disable-next-line max-len
          worksheet2.getCell(`A${i + 1}`).value = `${prj.project_code} - ${prj.project_name}`;
        });
      }

      if (state.resourceList.length > 0) {
        state.resourceList.forEach((emp, j) => {
          if (emp.resource_status !== 'Active') {
            // eslint-disable-next-line max-len
            worksheet2.getCell(`B${j + 1}`).value = `${emp.resource_emp_id} - ${emp.resource_name}`;
          }
        });
      }

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 10;

      worksheet1.eachRow((row, rowNumber) => {
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          if (rowNumber === 2 && !(colNumber === 1)) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'DEEAF6' },
            };
            cell.font = {
              size: 12,
              bold: true,
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'left',
              indent: 1,
            };
            // Set border of each cell
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          } else if (rowNumber >= 3 && !(colNumber === 1)) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'F5F5F5' },
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'left',
              indent: 1,
            };
            cell.font = {
              size: 12,
            };
            // Set border of each cell
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            row.getCell('C').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              formulae: [`'Project & Resource List'!$A$1:$A$${state.projectEmpList.length}`],
            };
            row.getCell('D').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              formulae: [`'Project & Resource List'!$B$1:$B$${state.resourceList.length}`],
            };
            row.getCell('E').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.expenseTypeList.map((expense) => expense.expense_type).join(',') + '"'],
            };
            row.getCell('F').dataValidation = {
              type: 'date',
              showErrorMessage: true,
              allowBlank: true,
              formulae: [new Date(row.getCell('F').value)],
              errorStyle: 'error',
              errorTitle: 'Date',
              error: 'Date should be a valid Date',
            };
            row.getCell('H').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              formulae: [`'Project & Resource List'!$B$1:$B$${state.resourceList.length}`],
            };
          }
        });
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      SaveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Export Claims Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Claims');
    }
  };

  return (
    <div>
      {roles.includes(213) ? (
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
                <div className="claims-page-header-flex">
                  <div className="page-header-star-flex">
                    <PageHeader>Claims</PageHeader>
                    {state.booleanStateValues.saveIndication && (
                      <StarFilled className="save-indication" />
                    )}
                  </div>
                  <Space>
                    <Upload
                      accept=".xlsx, .xlsm"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadExcel}
                    >
                      <Tooltip placement="bottom" title="Import Claims Data">
                        <Button type="primary">
                          <UploadOutlined />
                          Import Data
                        </Button>
                      </Tooltip>
                    </Upload>
                    <Tooltip placement="bottom" title="Save Claims Data">
                      <Button type="primary" onClick={handleSaveClick} disabled={!enableSave}>
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/accounts-management/claims" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <div className="table-border">
                  <div className="table-btn-flex">
                    <Space>
                      <Tooltip placement="bottom" title="Add Claims">
                        <Button type="primary" onClick={handleAddClick}>
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
                    <Tooltip placement="bottom" title="Export Template to add new Claims data">
                      <Button onClick={generateExcelTemplate}>
                        <DownloadOutlined />
                        Export Template
                      </Button>
                    </Tooltip>
                  </div>
                  <Table
                    columns={tableColumns}
                    dataSource={state.tableData}
                    pagination={false}
                    bordered
                    rowKey="key"
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

export default Claims;
