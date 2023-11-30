/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Input, Space, Typography, Select, Upload,
  Tooltip, Button, Table, Modal,
} from 'antd';
import {
  StarFilled, UploadOutlined, PlusOutlined, SaveFilled, QuestionCircleOutlined, InfoCircleOutlined,
  CloseCircleFilled, InfoCircleTwoTone, QuestionCircleTwoTone, CheckCircleFilled, DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import axios from 'axios';
import moment from 'moment';
import { Prompt } from 'react-router-dom';
import Excel from 'exceljs';
import SaveAs from 'file-saver';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showActionModal: false,
    showStatusModal: false,
    saveIndication: false,
    dependencyValue: false,
    focus: false,
    groupSelected: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    searchValue: '',
  },
  tableData: [
    {
      key: 1,
      bu_code: '',
      bu_name: '',
      bu_head: '',
      remarks: '',
    },
  ],
  keyCount: 2,
  groupDetailsList: [],
  tempValue: [],
  selectedRowKeys: [],
  resourceList: [],
  filteredTable: [],
  selectedGroup: [],
  joiTableValidation: [],
  duplicateGroupCode: [],
  duplicateGroupName: [],
};

const GroupDetails = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const lightRed = '#fc8f83';

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
  }, [state.booleanStateValues.dependencyValue]);

  useEffect(() => {
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
          modalsTitle: 'Import BU Details Data',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: [files],
      }));
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  // onclick of import button call function
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
        const wb = XLSX.read(data, { type: 'binary' });
        const sheet = wb.SheetNames[0];
        const excel = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: null });
        const excelData = excel.map((row, index) => Object.keys(row).reduce((obj, key) => {
          const object = obj;
          object.key = index + 1;
          if (key.trim() === '' || key.trim() === '__EMPTY' || key.trim() === null) {
            delete object[key];
            // eslint-disable-next-line max-len
          } else if (key.trim() === 'BU Head' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'BU Head'
            // eslint-disable-next-line max-len
            && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(object.bu_code);
          } else if (row[key] === null) {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = '';
          } else {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = row[key].toString().trim();
          }
          return object;
        }, {}));
        if (errRow.length > 0) {
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
              modalsTitle: 'Import BU Details Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;BU Head&apos; should be 4. Please check the records of &apos;BU Code&apos; (<b>{errRow.join(', ')}</b>).</p>,
              searchValue: '',
            },
            filteredTable: [],
            tempValue: [],
          }));
          errRow = [];
        } else if (excelData[0].bu_code !== undefined && excelData[0].bu_name !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              saveIndication: true,
              showStatusModal: true,
              groupSelected: false,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import BU Details Data',
              modalsIcon: infoIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
              searchValue: '',
            },
            filteredTable: [],
            selectedRowKeys: [],
            tableData: excelData,
            keyCount: excelData.length + 1,
            joiTableValidation: [],
            tempValue: [],
            duplicateGroupCode: [],
            duplicateGroupName: [],
            selectedGroup: [],
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
              modalsTitle: 'Import BU Details Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel for BU Details Data.',
              searchValue: '',
            },
            filteredTable: [],
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
            modalsTitle: 'Import BU Details Data',
            modalsIcon: failureIcon,
            modalsMessage: 'Invalid excel for BU Details Data.',
            searchValue: '',
          },
          filteredTable: [],
          tempValue: [],
        }));
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const handleInputChange = (e, index) => {
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
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [name]: value } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
    }
  };

  const handleChangeSelect = (keyName, index) => (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: value } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: value } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
    }
  };

  const tableColumnsData = [
    {
      title: 'BU Code',
      dataIndex: 'bu_code',
      key: 'bu_code',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'bu_code',
        );
        const duplicateError = state.duplicateGroupCode.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'bu_code',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Input
                placeholder="Enter BU Code"
                autoFocus={state.booleanStateValues.focus}
                name="bu_code"
                value={text || null}
                disabled={state.booleanStateValues.groupSelected}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="Enter BU Code"
            autoFocus={state.booleanStateValues.focus}
            name="bu_code"
            value={text || null}
            disabled={state.booleanStateValues.groupSelected}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.bu_code !== prevRecord.bu_code;
      },
    },
    {
      title: 'BU Name',
      dataIndex: 'bu_name',
      key: 'bu_name',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'bu_name',
        );
        const duplicateError = state.duplicateGroupName.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
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
              <Input
                placeholder="Enter BU Name"
                disabled={state.booleanStateValues.groupSelected}
                name="bu_name"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="Enter BU Name"
            disabled={state.booleanStateValues.groupSelected}
            name="bu_name"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.bu_name !== prevRecord.bu_name;
      },
    },
    {
      title: 'BU Head',
      dataIndex: 'bu_head',
      key: 'bu_head',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'bu_head',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'bu_head',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                placeholder="Select BU Head"
                style={{ width: '100%' }}
                name="bu_head"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('bu_head', index)}
              >
                {state.resourceList.map((emp) => {
                  if (emp.resource_status !== 'Inactive') {
                    return (
                      <Select.Option
                        key={emp.resource_emp_id}
                        value={emp.resource_emp_id}
                      >
                        {emp.resource_emp_id}
                        {' - '}
                        {emp.resource_name}
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
            placeholder="Select BU Head"
            style={{ width: '100%' }}
            name="bu_head"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('bu_head', index)}
          >
            {state.resourceList.map((emp) => {
              if (emp.resource_status !== 'Inactive') {
                return (
                  <Select.Option
                    key={emp.resource_emp_id}
                    value={emp.resource_emp_id}
                  >
                    {emp.resource_emp_id}
                    {' - '}
                    {emp.resource_name}
                  </Select.Option>
                );
              }
              return null;
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.bu_head !== prevRecord.bu_head;
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

  const handleActionModalOk = (key) => {
    if (key.length > 0) {
      if (state.tableData.length === key.length) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            saveIndication: false,
          },
          tableData: initialState.tableData,
          keyCount: 2,
          selectedRowKeys: [],
          joiTableValidation: [],
          duplicateGroupCode: [],
          duplicateGroupName: [],
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
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              focus: false,
            },
            tableData: state.tableData.filter((item) => !key.includes(item.key)),
            selectedRowKeys: [],
          }));
        }, 10);
      }
    } else if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        tempValue: [],
      }));
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

  const handleActionModalCancel = () => {
    if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      if (state.tempValue.length > 0) {
        if (state.textStateValues.modalsTitle === 'Import BU Details Data') {
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
        } else if (state.tempValue[state.tempValue.length - 1] !== 'All') {
          const newArr = state.tempValue.filter((val) => val !== 'All');
          setState((prevState) => ({
            ...prevState,
            tableData: state.groupDetailsList.filter((group) => state.tempValue.includes(group.bu_code)),
            selectedGroup: newArr,
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
              saveIndication: false,
              groupSelected: true,
            },
            tempValue: [],
            selectedRowKeys: [],
            joiTableValidation: [],
            duplicateGroupCode: [],
            duplicateGroupName: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            tableData: state.groupDetailsList,
            selectedGroup: ['All'],
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
              saveIndication: false,
              groupSelected: true,
            },
            tempValue: [],
            selectedRowKeys: [],
            joiTableValidation: [],
            duplicateGroupCode: [],
            duplicateGroupName: [],
          }));
        }
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
      destroyOnClose
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
          modalsTitle: 'BU Select',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: value,
      }));
    } else if (value.length === 0) {
      setState((prevState) => ({
        ...prevState,
        tableData: initialState.tableData,
        keyCount: 2,
        selectedGroup: [],
        selectedRowKeys: [],
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: false,
          groupSelected: false,
        },
        textStateValues: {
          ...state.textStateValues,
          searchValue: '',
        },
        filteredTable: [],
        joiTableValidation: [],
        duplicateGroupCode: [],
        duplicateGroupName: [],
      }));
    } else if (value.length > 0) {
      if (value[value.length - 1] !== 'All') {
        const newArr = value.filter((val) => val !== 'All');
        setState((prevState) => ({
          ...prevState,
          tableData: state.groupDetailsList.filter((group) => value.includes(group.bu_code)),
          selectedGroup: newArr,
          booleanStateValues: {
            ...state.booleanStateValues,
            groupSelected: true,
          },
          selectedRowKeys: [],
          joiTableValidation: [],
          duplicateGroupCode: [],
          duplicateGroupName: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: state.groupDetailsList,
          selectedGroup: ['All'],
          booleanStateValues: {
            ...state.booleanStateValues,
            groupSelected: true,
          },
          joiTableValidation: [],
          selectedRowKeys: [],
          duplicateGroupCode: [],
          duplicateGroupName: [],
        }));
      }
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
        disabled: state.booleanStateValues.groupSelected,
      };
    },
  };

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      bu_code: '',
      bu_name: '',
      bu_head: '',
      remarks: '',
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
        tableData: [...prevState.tableData, newRow],
        keyCount: state.keyCount + 1,
        booleanStateValues: {
          ...state.booleanStateValues,
          focus: true,
        },
      }));
    }
  };

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

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredData = state.tableData.filter((key) => Object.keys(key).some((data) => String(key[data])
        .toLowerCase()
        .includes(e.target.value.toLowerCase())));
      const filteredArray = [];
      filteredData.forEach((group) => {
        filteredArray.push(group.bu_code);
      });
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          searchValue: e.target.value,
        },
        filteredTable: filteredArray,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          searchValue: '',
        },
        filteredTable: [],
      }));
    }
  };

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        saveIndication: false,
        groupSelected: false,
      },
      textStateValues: {
        ...state.textStateValues,
        searchValue: '',
      },
      selectedGroup: [],
      tableData: initialState.tableData,
      keyCount: 2,
      filteredTable: [],
      selectedRowKeys: [],
    }));
  };

  const handleSave = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;
    if (state.booleanStateValues.groupSelected) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/orgGRPAOP/updateOrgGroupDetails`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
                saveIndication: false,
                groupSelected: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update BU Details Data',
                modalsIcon: successIcon,
                modalsMessage: 'Data updated successfully.',
                searchValue: '',
              },
              selectedGroup: [],
              tableData: initialState.tableData,
              keyCount: 2,
              filteredTable: [],
              selectedRowKeys: [],
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                modalsTitle: 'Update BU Details Data',
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
                modalsTitle: 'Update BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Server down. Please try again.',
              },
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
                modalsTitle: 'Update BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Database error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                modalsTitle: 'Update BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update BU Details Data. Please try again.',
              },
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                  modalsTitle: 'Update BU Details Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiTableValidation: [],
                duplicateGroupCode: [],
                duplicateGroupName: [],
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
                  modalsTitle: 'Update BU Details Data',
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
                modalsTitle: 'Update BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Your Role access has changed. Please Login again.',
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
                modalsTitle: 'Update BU Details Data',
                modalsIcon: failureIcon,
                // eslint-disable-next-line max-len, no-nested-ternary, react/jsx-one-expression-per-line
                modalsMessage: err.response.data.data.duplicateGroupCode.length > 0 && err.response.data.data.duplicateGroupName.length > 0 ? <p>Duplicate records found. Please check highlighted <b>BU Code & BU Name</b> records.</p> : err.response.data.data.duplicateGroupCode.length > 0 ? <p>Duplicate records found. Please check highlighted <b>BU Code</b> records.</p> : <p>Duplicate records found. Please check highlighted <b>BU Name</b> records.</p>,
              },
              duplicateGroupCode: err.response.data.data.duplicateGroupCode,
              duplicateGroupName: err.response.data.data.duplicateGroupName,
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
                modalsTitle: 'Update BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                modalsTitle: 'Update BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
            }));
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/orgGRPAOP/saveOrgGroupDetails`, body)
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: successIcon,
                modalsMessage: 'Data saved successfully.',
                searchValue: '',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              filteredTable: [],
              selectedRowKeys: [],
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                modalsTitle: 'Save BU Details Data',
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Server down. Please try again.',
              },
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Database error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to save BU Details Data. Please try again.',
              },
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                  modalsTitle: 'Save BU Details Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiTableValidation: [],
                duplicateGroupCode: [],
                duplicateGroupName: [],
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
                  modalsTitle: 'Save BU Details Data',
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Your Role access has changed. Please Login again.',
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: failureIcon,
                // eslint-disable-next-line max-len, no-nested-ternary, react/jsx-one-expression-per-line
                modalsMessage: err.response.data.data.duplicateGroupCode.length > 0 && err.response.data.data.duplicateGroupName.length > 0 ? <p>Duplicate records found. Please check highlighted <b>BU Code & BU Name</b> records.</p> : err.response.data.data.duplicateGroupCode.length > 0 ? <p>Duplicate records found. Please check highlighted <b>BU Code</b> records.</p> : <p>Duplicate records found. Please check highlighted <b>BU Name</b> records.</p>,
              },
              duplicateGroupCode: err.response.data.data.duplicateGroupCode,
              duplicateGroupName: err.response.data.data.duplicateGroupName,
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              duplicateGroupCode: [],
              duplicateGroupName: [],
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
                modalsTitle: 'Save BU Details Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateGroupCode: [],
              duplicateGroupName: [],
            }));
          }
        });
    }
  };

  const enableSave = state.tableData.length > 0 && state.tableData[0].bu_code !== ''
    && state.tableData[0].bu_name !== '' && state.tableData[0].bu_head !== '';

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
    }
  };

  const handleExportExcel = async (exportData) => {
    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    // eslint-disable-next-line max-len
    const fileName = exportData ? `RM_BU_Details_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}` : 'RM_BU_Details_Template';

    try {
      const worksheet1 = workbook.addWorksheet('BU Details', {
        views: [{ showGridLines: false }],
      });
      const exportTemplateTable = [
        [],
        [
          ' ',
          'Sl. No.',
          'BU Code',
          'BU Name',
          'BU Head',
          'Remarks',
        ],
      ];
      if (exportData) {
        exportTemplateTable[1].splice(1, 1);
      }
      worksheet1.addRows(exportTemplateTable);

      if (exportData && state.groupDetailsList.length > 0) {
        state.groupDetailsList.forEach((grp) => {
          worksheet1.addRow([
            ' ',
            grp.bu_code,
            grp.bu_name,
            grp.bu_head,
            grp.remarks,
          ]);
        });
      } else {
        const worksheet2 = workbook.addWorksheet('Resource List');
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < 10; k++) {
          worksheet1.addRow(['', '', '', '', '', '']);
        }
        let j = 0;
        if (state.resourceList.length > 0) {
          state.resourceList.forEach((emp) => {
            if (emp.resource_status !== 'Inactive') {
              // eslint-disable-next-line max-len
              worksheet2.getCell(`A${j + 1}`).value = `${emp.resource_emp_id} - ${emp.resource_name}`;
              j += 1;
            }
          });
        }
      }

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = exportData ? 20 : 10;

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
            if (!exportData) {
              row.getCell('E').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'Resource List'!$A$1:$A$${state.resourceList.length}`],
              };
            }
          }
        });
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      SaveAs(new Blob([buf]), `${fileName}.xlsx`);
      if (exportData) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export BU Details Data',
            modalsIcon: successIcon,
            modalsMessage: 'Exported data successfully.',
          },
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: exportData ? 'Export BU Details Data' : 'Export BU Details Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('BU Details');
      workbook.removeWorksheet('Resource List');
    }
  };

  return (
    <div>
      {roles.includes(205) ? (
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
                <div className="page-header-searchbar-flex">
                  <div className="page-header-star-flex">
                    <PageHeader>BU Details</PageHeader>
                    {state.booleanStateValues.saveIndication && (
                      <StarFilled className="save-indication" />
                    )}
                  </div>
                  <div>
                    <Input.Search
                      placeholder="Search by..."
                      enterButton
                      value={state.textStateValues.searchValue || null}
                      onChange={handleSearch}
                      disabled={!enableSave}
                    />
                    {state.textStateValues.searchValue !== ''
                      && (
                        <p style={{ float: 'right' }}>
                          (
                          {state.filteredTable.length}
                          /
                          {state.tableData.length}
                          )
                        </p>
                      )}
                  </div>
                </div>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>BU:</Typography>
                    <Select
                      style={{ width: '200px' }}
                      mode="multiple"
                      maxTagCount="responsive"
                      placeholder="Select BU"
                      showArrow
                      showSearch
                      allowClear
                      onChange={handleGroupSelect}
                      onClear={handleClear}
                      value={state.selectedGroup || null}
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      onInputKeyDown={handleBackspaceDisable}
                    >
                      {state.groupDetailsList.length > 0
                        && (
                          <Select.Option
                            key="All"
                            value="All"
                          >
                            All
                          </Select.Option>
                        )}
                      {state.groupDetailsList.map((group) => {
                        return (
                          <Select.Option
                            key={group.bu_code}
                            value={group.bu_code}
                          >
                            {group.bu_code}
                            {' - '}
                            {group.bu_name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select BU to view/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Upload
                      accept=".xlsx, .xlsm"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadExcel}
                    >
                      <Tooltip placement="bottom" title="Import BU Details Data">
                        <Button type="primary">
                          <UploadOutlined />
                          Import Data
                        </Button>
                      </Tooltip>
                    </Upload>
                    <Tooltip placement="bottom" title="Save BU Details Data">
                      <Button
                        type="primary"
                        onClick={handleSave}
                        disabled={!(enableSave && state.booleanStateValues.saveIndication)}
                      >
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/data-management/bu-details" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                {statusModal}
                {actionModal}
                <div className="table-border">
                  <div className="table-btn-flex">
                    <Space>
                      <Tooltip placement="bottom" title="Add BU Details Data">
                        <Button
                          type="primary"
                          disabled={state.booleanStateValues.groupSelected}
                          onClick={handleAddClick}
                        >
                          <PlusOutlined />
                          Add
                        </Button>
                      </Tooltip>
                      <Tooltip
                        placement="bottom"
                        title="Select Row(s) to Delete"
                      >
                        <Button
                          type="primary"
                          onClick={handleDeleteClick}
                          disabled={state.selectedRowKeys.length === 0}
                        >
                          <DeleteOutlined />
                          Delete
                        </Button>
                      </Tooltip>
                    </Space>
                    <Space>
                      <Tooltip placement="bottom" title="Export Template to add new BU Details data">
                        <Button onClick={() => handleExportExcel(false)}>
                          <DownloadOutlined />
                          Export Template
                        </Button>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Export Existing BU Details to Excel">
                        <Button
                          type="primary"
                          disabled={state.groupDetailsList.length === 0}
                          onClick={() => handleExportExcel(true)}
                        >
                          <DownloadOutlined />
                          Export Data
                        </Button>
                      </Tooltip>
                    </Space>
                  </div>
                  <Table
                    rowSelection={rowSelection}
                    columns={tableColumnsData}
                    dataSource={state.tableData}
                    size="small"
                    rowKey={state.booleanStateValues.groupSelected ? 'bu_code' : 'key'}
                    // eslint-disable-next-line max-len
                    rowClassName={(record) => (state.filteredTable.map((group) => (record.bu_code === group ? 'table-row-dark' : null)))}
                    pagination={false}
                    bordered
                    scroll={{ x: 200, y: 400 }}
                  />
                </div>
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

export default GroupDetails;
