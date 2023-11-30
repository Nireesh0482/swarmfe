/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  DatePicker, Input, Select, Table, Spin, PageHeader, Button,
  Space, Tooltip, Modal, Upload, InputNumber, Typography, Radio,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, UploadOutlined, SaveFilled,
  CloseCircleFilled, CheckCircleFilled, StarFilled, InfoCircleOutlined, InfoCircleTwoTone,
  QuestionCircleOutlined, DownloadOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Prompt } from 'react-router-dom';
import Excel from 'exceljs';
import SaveAs from 'file-saver';

const initialState = {
  resourceList: [],
  groupDetailsList: [],
  locationList: [],
  joinedAsList: [],
  streamList: [],
  designationList: [],
  resourceStatusList: [],
  duplicateTableData: [],
  booleanStateValues: {
    isLoading: true,
    showActionModal: false,
    editableData: false,
    showStatusModal: false,
    saveIndication: false,
    dependencyValue: false,
    focus: false,
    verifyDuplicate: false,
    // saveEnable: false,
    saveClick: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedSupervisor: '',
    radioValue: '',
    searchValue: '',
  },
  tableData: [
    {
      key: 1,
      resource_emp_id: '',
      resource_name: '',
      email_id: '',
      is_reporting_manager: 'No',
      resource_doj: '',
      bu_name: '',
      designation: '',
      reporting_manager: '',
      location: '',
      joined_as: '',
      ctc: '',
      per_month: '0',
      stream: '',
      total_years_exp: '0',
      resource_status: 'Active',
      resource_lwd: null,
    },
  ],
  keyCount: 2,
  selectedRowKeys: [],
  selectedRows: [],
  selectedValue: [],
  tempValue: [],
  filterTable: [],
  joiTableValidation: [],
  duplicateEmpList: [],
  duplicateEmailList: [],
  inactiveManager: [],
};

const ResourceManagement = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const required = <StarFilled className="required-indication" />;
  const lightRed = '#fc8f83';

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

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllDesignation`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          designationList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllLocation`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          locationList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllJoinedAsDetails`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          joinedAsList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllStreams`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          streamList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllResourceStatus`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          resourceStatusList: res.data.data,
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
          } else if (key.trim() === 'Resource Emp ID' && row[key] !== null && row[key].toString().trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().trim();
          } else if (key.trim() === 'Resource Emp ID'
            && (row[key] === null || row[key].length !== 4 || row[key].length === undefined)) {
            errRow.push(row[key] === null ? '' : row[key].toString().trim());
          } else if (key.trim() === 'Resource DOJ') {
            if (row[key] && row[key].length === 10) {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : moment(row[key], 'DD-MM-YYYY');
            } else {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
            }
          } else if (key.trim() === 'Reporting Manager'
            && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Reporting Manager'
            // eslint-disable-next-line max-len
            && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(object.resource_emp_id.toString());
          } else if (key.trim() === 'Total Years Exp.') {
            object.total_years_exp = row[key].toString().trim();
          } else if (key.trim() === 'Resource LWD') {
            if (row['Resource status'] === 'Inactive') {
              if (row[key] && row[key].length === 10) {
                object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                  ? '' : moment(row[key], 'DD-MM-YYYY');
              } else {
                object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                  ? null : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
              }
            } else {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = null;
            }
          } else if (row[key] === null) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = '';
          } else {
            // eslint-disable-next-line max-len
            object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key].toString().trim();
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
              modalsTitle: 'Import Resource Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;Resource Emp ID&apos; & Employee ID of &apos;Reporting Manager&apos; should be 4. Please check the records of &apos;Resource Emp ID&apos; (<b>{errRow.join(', ')}</b>).</p>,
              searchValue: '',
            },
            filterTable: [],
            tempValue: [],
          }));
          errRow = [];
        } else if (excelData[0].resource_emp_id !== undefined && excelData[0].resource_name !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              editableData: false,
              showStatusModal: true,
              saveIndication: true,
              showActionModal: false,
            },
            selectedValue: [],
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Resource Data',
              modalsIcon: infoIcon,
              selectedSupervisor: '',
              searchValue: '',
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
            },
            filterTable: [],
            tableData: excelData,
            keyCount: excelData.length + 1,
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
            tempValue: [],
          }));
          errRow = [];
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
              modalsTitle: 'Import Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel for Resource Data.',
              searchValue: '',
            },
            filterTable: [],
            tempValue: [],
          }));
          errRow = [];
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
            modalsTitle: 'Import Resource Data',
            modalsIcon: failureIcon,
            searchValue: '',
            modalsMessage: 'Invalid excel for Resource Data.',
          },
          filterTable: [],
          tempValue: [],
        }));
        errRow = [];
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const checkEmpId = (value, index) => {
    let empId = '';
    if (value.trim() === '0') {
      empId = '0000';
      // eslint-disable-next-line no-restricted-globals
    } else if (isNaN(value.trim())) {
      const zero = value.trim().startsWith('0');
      if (value.trim().length === 1) {
        empId = zero ? `000${value.trim()}` : `000${value.trim().replace(/^0+/, '')}`;
      } else if (value.trim().length === 2) {
        empId = zero ? `00${value.trim()}` : `00${value.trim().replace(/^0+/, '')}`;
      } else if (value.trim().length === 3) {
        empId = zero ? `0${value.trim()}` : `0${value.trim().replace(/^0+/, '')}`;
      } else {
        empId = value.trim().substring(value.trim().length - 4);
      }
    } else if (value > 0 && value <= 9) {
      empId = `000${value.trim().replace(/^0+/, '')}`;
    } else if (value >= 10 && value <= 99) {
      empId = `00${value.trim().replace(/^0+/, '')}`;
    } else if (value >= 100 && value <= 999) {
      empId = `0${value.trim().replace(/^0+/, '')}`;
    } else if (value >= 999) {
      empId = value.trim().replace(/^0+/, '');
    } else {
      empId = '';
    }
    setState((prevState) => ({
      ...prevState,
      tableData: prevState.tableData.map((item, i) => {
        return index === i ? { ...item, resource_emp_id: empId } : item;
      }),
      booleanStateValues: {
        ...state.booleanStateValues,
        // eslint-disable-next-line no-unneeded-ternary
        saveIndication: state.booleanStateValues.saveIndication ? prevState.booleanStateValues.saveIndication : true,
      },
    }));
  };

  const handleInputChange = (e, index, keyName) => {
    if (e === null) {
      if (keyName === 'ctc') {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: '', per_month: 0 } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: '' } : item;
          }),
        }));
      }
    } else if (e.target === undefined) {
      if (keyName === 'ctc') {
        if (state.booleanStateValues.saveIndication) {
          setState((prevState) => ({
            ...prevState,
            tableData: prevState.tableData.map((item, i) => {
              return index === i ? { ...item, [keyName]: e, per_month: (e / 12).toFixed(2) } : item;
            }),
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            tableData: prevState.tableData.map((item, i) => {
              return index === i ? { ...item, [keyName]: e, per_month: (e / 12).toFixed(2) } : item;
            }),
            booleanStateValues: {
              ...state.booleanStateValues,
              saveIndication: true,
            },
          }));
        }
      } else if (keyName === 'total_years_exp') {
        if (state.booleanStateValues.saveIndication) {
          setState((prevState) => ({
            ...prevState,
            tableData: prevState.tableData.map((item, i) => {
              return index === i ? { ...item, [keyName]: e === 0 ? '0' : e } : item;
            }),
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            tableData: prevState.tableData.map((item, i) => {
              return index === i ? { ...item, [keyName]: e === 0 ? '0' : e } : item;
            }),
            booleanStateValues: {
              ...state.booleanStateValues,
              saveIndication: true,
            },
          }));
        }
      }
    } else {
      const { name, value } = e.target;
      if (name === 'resource_emp_id') {
        checkEmpId(value, index);
      } else if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [name]: name === 'email_id' ? value.trim() : value } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [name]: name === 'email_id' ? value.trim() : value } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    }
  };

  const handleDateChange = (_, dateString, index, key) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [key]: dateString } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [key]: dateString } : item;
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

  const tableColumns = [
    {
      title: 'Resource Emp ID',
      dataIndex: 'resource_emp_id',
      key: 'resource_emp_id',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_emp_id',
        );
        const duplicateError = state.duplicateEmpList.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
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
              <div className="required-icon-flex">
                <Input
                  autoFocus={state.booleanStateValues.focus}
                  placeholder="Enter Resource Emp ID"
                  name="resource_emp_id"
                  value={text || null}
                  disabled={state.booleanStateValues.editableData
                    && (state.selectedValue.length !== 0 || state.textStateValues.selectedSupervisor !== '')}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {state.tableData[index].resource_emp_id === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Input
              autoFocus={state.booleanStateValues.focus}
              placeholder="Enter Resource Emp ID"
              name="resource_emp_id"
              value={text || null}
              disabled={state.booleanStateValues.editableData
                && (state.selectedValue.length !== 0 || state.textStateValues.selectedSupervisor !== '')}
              onChange={(e) => handleInputChange(e, index)}
            />
            {state.tableData[index].resource_emp_id === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_emp_id !== prevRecord.resource_emp_id;
      },
    },
    {
      title: 'Resource Name',
      dataIndex: 'resource_name',
      key: 'resource_name',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_name',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'resource_name',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Input
                  placeholder="Enter Resource Name"
                  name="resource_name"
                  value={text || null}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {state.tableData[index].resource_name === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Input
              placeholder="Enter Resource Name"
              name="resource_name"
              value={text || null}
              onChange={(e) => handleInputChange(e, index)}
            />
            {state.tableData[index].resource_name === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_name !== prevRecord.resource_name;
      },
    },
    {
      title: 'Email ID',
      dataIndex: 'email_id',
      key: 'email_id',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'email_id',
        );
        const duplicateError = state.duplicateEmailList.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'email_id',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Input
                  placeholder="Enter Email ID"
                  name="email_id"
                  value={text || null}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {state.tableData[index].email_id === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <Tooltip title={text} placement="bottom">
            <div className="required-icon-flex">
              <Input
                placeholder="Enter Email ID"
                name="email_id"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
              {state.tableData[index].email_id === '' && required}
            </div>
          </Tooltip>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.email_id !== prevRecord.email_id;
      },
    },
    {
      title: 'Is Reporting Manager',
      dataIndex: 'is_reporting_manager',
      key: 'is_reporting_manager',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'is_reporting_manager',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'is_reporting_manager',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Select
                  showSearch
                  style={state.tableData[index].is_reporting_manager === '' ? { width: '95%' } : { width: '100%' }}
                  placeholder="Select Is Reporting Manager"
                  name="is_reporting_manager"
                  value={text || null}
                  onSelect={handleChangeSelect('is_reporting_manager', index)}
                  filterOption={(inputValue, option) => option.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())}
                >
                  <Select.Option key="Yes" value="Yes">Yes</Select.Option>
                  <Select.Option key="No" value="No">No</Select.Option>
                </Select>
                {state.tableData[index].is_reporting_manager === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Select
              showSearch
              style={state.tableData[index].is_reporting_manager === '' ? { width: '95%' } : { width: '100%' }}
              placeholder="Select Is Reporting Manager"
              name="is_reporting_manager"
              value={text || null}
              onSelect={handleChangeSelect('is_reporting_manager', index)}
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
            >
              <Select.Option key="Yes" value="Yes">Yes</Select.Option>
              <Select.Option key="No" value="No">No</Select.Option>
            </Select>
            {state.tableData[index].is_reporting_manager === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.is_reporting_manager !== prevRecord.is_reporting_manager;
      },
    },
    {
      title: 'Resource DOJ',
      dataIndex: 'resource_doj',
      key: 'resource_doj',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_doj',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'resource_doj',
        );

        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <DatePicker
                  placeholder="Select Resource DOJ"
                  name="resource_doj"
                  allowClear={false}
                  disabled={state.booleanStateValues.editableData
                    && (state.selectedValue.length !== 0 || state.textStateValues.selectedSupervisor !== '')}
                  value={text ? moment(text) : undefined}
                  onChange={(date, dateString) => handleDateChange(date, dateString, index, 'resource_doj')}
                />
                {state.tableData[index].resource_doj === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <DatePicker
              placeholder="Select Resource DOJ"
              name="resource_doj"
              allowClear={false}
              disabled={state.booleanStateValues.editableData
                && (state.selectedValue.length !== 0 || state.textStateValues.selectedSupervisor !== '')}
              value={text ? moment(text) : undefined}
              onChange={(date, dateString) => handleDateChange(date, dateString, index, 'resource_doj')}
            />
            {state.tableData[index].resource_doj === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_doj !== prevRecord.resource_doj;
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
              <div className="required-icon-flex">
                <Select
                  showSearch
                  style={state.tableData[index].bu_name === '' ? { width: '95%' } : { width: '100%' }}
                  placeholder="Select BU Name"
                  name="bu_name"
                  value={text || null}
                  onSelect={handleChangeSelect('bu_name', index)}
                  filterOption={(inputValue, option) => option.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())}
                >
                  {state.groupDetailsList.map((group) => {
                    return (
                      <Select.Option
                        key={group.bu_code}
                        value={group.bu_name}
                      >
                        {group.bu_name}
                      </Select.Option>
                    );
                  })}
                </Select>
                {state.tableData[index].bu_name === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Select
              showSearch
              style={state.tableData[index].bu_name === '' ? { width: '95%' } : { width: '100%' }}
              placeholder="Select BU Name"
              name="bu_name"
              value={text || null}
              onSelect={handleChangeSelect('bu_name', index)}
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
            >
              {state.groupDetailsList.map((group) => {
                return (
                  <Select.Option
                    key={group.bu_code}
                    value={group.bu_name}
                  >
                    {group.bu_name}
                  </Select.Option>
                );
              })}
            </Select>
            {state.tableData[index].bu_name === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.bu_name !== prevRecord.bu_name;
      },
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'designation',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'designation',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Select
                  style={state.tableData[index].location === '' ? { width: '95%' } : { width: '100%' }}
                  placeholder="Select Designation"
                  name="designation"
                  value={text || null}
                  showSearch
                  filterOption={(inputValue, option) => option.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())}
                  onSelect={handleChangeSelect('designation', index)}
                >
                  {state.designationList.map((desig) => {
                    return (
                      <Select.Option key={desig.designation_id} value={desig.designation}>
                        {desig.designation}
                      </Select.Option>
                    );
                  })}
                </Select>
                {state.tableData[index].designation === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Select
              style={state.tableData[index].designation === '' ? { width: '95%' } : { width: '100%' }}
              placeholder="Select Designation"
              name="designation"
              value={text || null}
              showSearch
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
              onSelect={handleChangeSelect('designation', index)}
            >
              {state.designationList.map((desig) => {
                return (
                  <Select.Option key={desig.designation_id} value={desig.designation}>
                    {desig.designation}
                  </Select.Option>
                );
              })}
            </Select>
            {state.tableData[index].designation === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.designation !== prevRecord.designation;
      },
    },
    {
      title: 'Reporting Manager',
      dataIndex: 'reporting_manager',
      key: 'reporting_manager',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'reporting_manager',
        );
        const inactiveManager = state.inactiveManager.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || inactiveManager) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'reporting_manager',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Select
                  showSearch
                  style={state.tableData[index].reporting_manager === '' ? { width: '95%' } : { width: '100%' }}
                  placeholder="Select Reporting Manager"
                  name="reporting_manager"
                  value={text || null}
                  onSelect={handleChangeSelect('reporting_manager', index)}
                  filterOption={(inputValue, option) => option.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())}
                >
                  {state.resourceList.map((emp) => {
                    return (
                      <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
                        {emp.resource_emp_id}
                        {' - '}
                        {emp.resource_name}
                      </Select.Option>
                    );
                  })}
                </Select>
                {state.tableData[index].reporting_manager === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Select
              showSearch
              style={state.tableData[index].reporting_manager === '' ? { width: '95%' } : { width: '100%' }}
              placeholder="Select Reporting Manager"
              name="reporting_manager"
              value={text || null}
              onSelect={handleChangeSelect('reporting_manager', index)}
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
            >
              {state.resourceList.map((emp) => {
                return (
                  <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
                    {emp.resource_emp_id}
                    {' - '}
                    {emp.resource_name}
                  </Select.Option>
                );
              })}
            </Select>
            {state.tableData[index].reporting_manager === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.reporting_manager !== prevRecord.reporting_manager;
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'location',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'location',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Select
                  style={state.tableData[index].location === '' ? { width: '95%' } : { width: '100%' }}
                  placeholder="Select Location"
                  name="location"
                  value={text || null}
                  showSearch
                  filterOption={(inputValue, option) => option.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())}
                  onSelect={handleChangeSelect('location', index)}
                >
                  {state.locationList.map((loc) => {
                    return (
                      <Select.Option key={loc.location_id} value={loc.location}>
                        {loc.location}
                      </Select.Option>
                    );
                  })}
                </Select>
                {state.tableData[index].location === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Select
              style={state.tableData[index].location === '' ? { width: '95%' } : { width: '100%' }}
              placeholder="Select Location"
              name="location"
              value={text || null}
              showSearch
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
              onSelect={handleChangeSelect('location', index)}
            >
              {state.locationList.map((loc) => {
                return (
                  <Select.Option key={loc.location_id} value={loc.location}>
                    {loc.location}
                  </Select.Option>
                );
              })}
            </Select>
            {state.tableData[index].location === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.location !== prevRecord.location;
      },
    },
    {
      title: 'Joined as',
      dataIndex: 'joined_as',
      key: 'joined_as',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'joined_as',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'joined_as',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Select
                  style={state.tableData[index].joined_as === '' ? { width: '95%' } : { width: '100%' }}
                  placeholder="Select Joined As"
                  name="joined_as"
                  value={text || null}
                  showSearch
                  filterOption={(inputValue, option) => option.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())}
                  onSelect={handleChangeSelect('joined_as', index)}
                >
                  {state.joinedAsList.map((joinedAs) => {
                    return (
                      <Select.Option key={joinedAs.joined_as_id} value={joinedAs.joined_as}>
                        {joinedAs.joined_as}
                      </Select.Option>
                    );
                  })}
                </Select>
                {state.tableData[index].joined_as === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Select
              style={state.tableData[index].joined_as === '' ? { width: '95%' } : { width: '100%' }}
              placeholder="Select Joined As"
              name="joined_as"
              value={text || null}
              showSearch
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
              onSelect={handleChangeSelect('joined_as', index)}
            >
              {state.joinedAsList.map((joinedAs) => {
                return (
                  <Select.Option key={joinedAs.joined_as_id} value={joinedAs.joined_as}>
                    {joinedAs.joined_as}
                  </Select.Option>
                );
              })}
            </Select>
            {state.tableData[index].joined_as === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.joined_as !== prevRecord.joined_as;
      },
    },
    {
      title: 'CTC (₹)',
      dataIndex: 'ctc',
      key: 'ctc',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'ctc',
        );

        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find((ele) => ele.indexValue === index && ele.field === 'ctc');
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <InputNumber
                  type="number"
                  style={state.tableData[index].ctc === '' ? { width: '95%' } : { width: '100%' }}
                  controls={false}
                  placeholder="Enter CTC"
                  name="ctc"
                  disabled={state.booleanStateValues.editableData
                    && (state.selectedValue.length !== 0 || state.textStateValues.selectedSupervisor !== '')}
                  value={text || null}
                  onChange={(e) => handleInputChange(e, index, 'ctc')}
                />
                {state.tableData[index].ctc === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <InputNumber
              type="number"
              style={state.tableData[index].ctc === '' ? { width: '95%' } : { width: '100%' }}
              controls={false}
              placeholder="Enter CTC"
              name="ctc"
              disabled={state.booleanStateValues.editableData
                && (state.selectedValue.length !== 0 || state.textStateValues.selectedSupervisor !== '')}
              value={text || null}
              onChange={(e) => handleInputChange(e, index, 'ctc')}
            />
            {state.tableData[index].ctc === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.ctc !== prevRecord.ctc;
      },
    },
    {
      title: 'Per Month (₹)',
      dataIndex: 'per_month',
      key: 'per_month',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'per_month',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.per_month !== prevRecord.per_month;
      },
    },
    {
      title: 'Stream',
      dataIndex: 'stream',
      key: 'stream',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'stream',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'stream',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Stream"
                name="stream"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('stream', index)}
              >
                {state.streamList.map((streams) => {
                  return (
                    <Select.Option key={streams.stream_id} value={streams.stream}>
                      {streams.stream}
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
            placeholder="Select Stream"
            name="stream"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('stream', index)}
          >
            {state.streamList.map((streams) => {
              return (
                <Select.Option key={streams.stream_id} value={streams.stream}>
                  {streams.stream}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.stream !== prevRecord.stream;
      },
    },
    {
      title: 'Total Years Exp.',
      dataIndex: 'total_years_exp',
      key: 'total_years_exp',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'total_years_exp',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'total_years_exp',
        );
        if (validationError) {
          return (

            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                style={{ width: '100%' }}
                controls={false}
                placeholder="Enter Total Years Exp"
                name="total_years_exp"
                value={text || null}
                disabled
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            style={{ width: '100%' }}
            controls={false}
            placeholder="Enter Total Years Exp"
            name="total_years_exp"
            value={text || null}
            disabled
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.total_years_exp !== prevRecord.total_years_exp;
      },
    },
    {
      title: 'Resource status',
      dataIndex: 'resource_status',
      key: 'resource_status',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_status',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'resource_status',
        );

        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <div className="required-icon-flex">
                <Select
                  style={state.tableData[index].resource_status === '' ? { width: '95%' } : { width: '100%' }}
                  placeholder="Select Resource status"
                  name="resource_status"
                  value={text || null}
                  showSearch
                  filterOption={(inputValue, option) => option.children
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())}
                  onSelect={handleChangeSelect('resource_status', index)}
                >
                  {state.resourceStatusList.map((status) => {
                    return (
                      <Select.Option key={status.resource_status_id} value={status.resource_status}>
                        {status.resource_status}
                      </Select.Option>
                    );
                  })}
                </Select>
                {state.tableData[index].resource_status === '' && required}
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="required-icon-flex">
            <Select
              style={state.tableData[index].resource_status === '' ? { width: '95%' } : { width: '100%' }}
              placeholder="Select Resource status"
              name="resource_status"
              value={text || null}
              showSearch
              filterOption={(inputValue, option) => option.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())}
              onSelect={handleChangeSelect('resource_status', index)}
            >
              {state.resourceStatusList.map((status) => {
                return (
                  <Select.Option key={status.resource_status_id} value={status.resource_status}>
                    {status.resource_status}
                  </Select.Option>
                );
              })}
            </Select>
            {state.tableData[index].resource_status === '' && required}
          </div>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_status !== prevRecord.resource_status;
      },
    },
    {
      title: 'Resource LWD',
      dataIndex: 'resource_lwd',
      key: 'resource_lwd',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_lwd',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'resource_lwd',
        );

        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Resource LWD"
                name="resource_lwd"
                allowClear={false}
                disabledDate={(d) => !d || d.isBefore(moment(state.tableData[index].resource_doj).endOf('day'))}
                disabled={state.tableData[index].resource_status !== 'Inactive'}
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'resource_lwd')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Resource LWD"
            name="resource_lwd"
            allowClear={false}
            disabledDate={(d) => !d || d.isBefore(moment(state.tableData[index].resource_doj).endOf('day'))}
            disabled={state.tableData[index].resource_status !== 'Inactive'}
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'resource_lwd')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_lwd !== prevRecord.resource_lwd;
      },
    },
  ];

  const duplicateTableColumns = [
    {
      title: 'Resource Emp Id',
      dataIndex: 'resource_emp_id',
      key: 'resource_emp_id',
      width: 150,
    },
    {
      title: 'Resource Name',
      dataIndex: 'resource_name',
      key: 'resource_name',
      width: 150,
    },
  ];

  const enableSave = state.tableData.length > 0 && state.tableData[0].resource_emp_id !== ''
    && state.tableData[0].is_reporting_manager !== ''
    && state.tableData[0].resource_name !== '' && state.tableData[0].resource_doj !== ''
    && state.tableData[0].bu_name !== '' && state.tableData[0].designation !== ''
    && state.tableData[0].email_id !== '' && state.tableData[0].reporting_manager !== ''
    && state.tableData[0].location !== '' && state.tableData[0].joined_as !== ''
    && state.tableData[0].ctc !== '' && state.tableData[0].resource_status !== '';

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      resource_emp_id: '',
      resource_name: '',
      email_id: '',
      is_reporting_manager: 'No',
      resource_doj: '',
      bu_name: '',
      designation: '',
      reporting_manager: '',
      location: '',
      joined_as: '',
      ctc: '',
      per_month: '0',
      stream: '',
      total_years_exp: '0',
      resource_status: 'Active',
      resource_lwd: null,
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

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys,
        selectedRows,
      }));
    },
    getCheckboxProps: () => {
      return {
        disabled: state.booleanStateValues.editableData,
      };
    },
  };

  const callUpdateEmpSave = (body) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/saveUpdateResourceData`, body)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveIndication: false,
              editableData: false,
              // saveEnable: false,
              dependencyValue: !state.booleanStateValues.dependencyValue,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: successIcon,
              // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
              modalsMessage: res.data.data.inActiveAllocation ? <><h3>Data saved/updated successfully.</h3><p>Note: Make sure to update <b>Salary Revision</b> data if imported data contains changes in <b>CTC</b>.</p><p><b>Total Years Exp.</b> is updated by tool automatically.</p><p>Selected employee status is changed to <b>&quot;Inactive&quot;</b>. Please check and update the Resource Allocation.</p></> : <><h3>Data saved/updated successfully.</h3><p>Note: Make sure to update <b>Salary Revision</b> data if imported data contains changes in <b>CTC</b>.</p><p><b>Total Years Exp.</b> is updated by tool automatically.</p></>,
              selectedSupervisor: '',
              radioValue: '',
              searchValue: '',
            },
            tableData: initialState.tableData,
            keyCount: 2,
            selectedValue: [],
            filterTable: [],
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
            selectedRowKeys: [],
            selectedRows: [],
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
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Server error. Please try again.',
              radioValue: '',
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
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
              radioValue: '',
            },
          }));
        } else if (err.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              radioValue: '',
            },
            joiTableValidation: err.response.data.data.errorDetails,
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
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
                saveClick: false,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
                radioValue: '',
              },
              joiTableValidation: [],
              duplicateEmpList: [],
              duplicateEmailList: [],
              inactiveManager: [],
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
                modalsTitle: 'Save Resource Data',
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
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Your Role access has changed. Please Login again.',
            },
          }));
        } else if (err.response.status === 410) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
              modalsMessage: <p>Mismatch in <b>Total Years Exp./Experience Data</b> not found for highlighted records.</p>,
              radioValue: '',
            },
            joiTableValidation: err.response.data.data,
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
          }));
        } else if (err.response.status === 400) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Database error. Please contact the Admin.',
              radioValue: '',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
          }));
        } else if (err.response.status === 401) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Duplicate records found. Please check highlighted <b>Email ID</b> records.</p>,
              radioValue: '',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: err.response.data.data.checkEmailData,
            inactiveManager: [],
          }));
        } else if (err.response.status === 406) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
              modalsMessage: <p>Selected Reporting Manager is already a Reporting Manager (Reporting {err.response.data.data.verifyIsManager.length === 1 ? ' Manager Id is' : ' Manager Id\'s are'} {err.response.data.data.verifyIsManager.join(', ')}).</p>,
              radioValue: '',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
          }));
        } else if (err.response.status === 409) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to save Resource Data. Click on save button.',
              radioValue: '',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
          }));
        } else if (err.response.status === 405) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line max-len
              modalsMessage: `Selected Reporting ${err.response.data.data.emptyManager.length === 1 ? 'Manager is' : 'Managers are'} neither inactive nor doing a role of Reporting Manager. Please check highlighted ${err.response.data.data.emptyManager.length === 1 ? 'record' : 'records'}.`,
              radioValue: '',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: err.response.data.data.emptyManager,
          }));
        } else if (err.response.status === 417) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line max-len, no-nested-ternary, react/jsx-one-expression-per-line
              modalsMessage: err.response.data.data.duplicateRowValidateForResource.length > 0 && err.response.data.data.duplicateRowValidateForEmailId.length > 0 ? <p>Duplicate records found. Please check highlighted <b>Resource Emp ID & Email ID</b> records.</p> : err.response.data.data.duplicateRowValidateForResource.length > 0 ? <p>Duplicate records found. Please check highlighted <b>Resource Emp ID</b> records.</p> : <p>Duplicate records found. Please check highlighted <b>Email ID</b> records.</p>,
              radioValue: '',
            },
            duplicateEmpList: err.response.data.data.duplicateRowValidateForResource,
            duplicateEmailList: err.response.data.data.duplicateRowValidateForEmailId,
            joiTableValidation: [],
            inactiveManager: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              radioValue: '',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
          }));
        }
      });
  };

  const handleActionModalOk = (key) => {
    if (state.booleanStateValues.editableData && state.selectedRowKeys.length !== 0
      && state.selectedValue.length !== 0) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          isLoading: true,
        },
      }));
      const body = {
        resource_emp_id: key,
      };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/deleteResource`, body)
        .then((res) => {
          if (res.status === 200) {
            if (state.tableData.length === key.length) {
              setState((prevState) => ({
                ...prevState,
                tableData: initialState.tableData,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  showActionModal: false,
                  showStatusModal: true,
                  editableData: false,
                  dependencyValue: !state.booleanStateValues.dependencyValue,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Inactive Employee Data',
                  modalsIcon: successIcon,
                  modalsMessage:
                    key.length > 1 ? 'Employees account Inactivated.' : 'Employee account Inactivated.',
                  searchValue: '',
                },
                filterTable: [],
                keyCount: 2,
                selectedRowKeys: [],
                selectedRows: [],
                selectedValue: [],
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                tableData: prevState.tableData.filter((row) => !key.includes(row.resource_emp_id)),
                booleanStateValues: {
                  ...state.booleanStateValues,
                  showActionModal: false,
                  showStatusModal: true,
                  dependencyValue: !state.booleanStateValues.dependencyValue,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Inactive Employee Data',
                  modalsIcon: successIcon,
                  modalsMessage:
                    key.length > 1 ? 'Inactivated Employees Successfully.' : 'Inactivated Employee Successfully.',
                },
                selectedRowKeys: [],
                selectedRows: [],
                selectedValue: prevState.selectedValue.filter((item) => !key.includes(item)),
              }));
            }
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
                modalsTitle: 'Inactive Employee Data',
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
                modalsTitle: 'Inactive Employee Data',
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
                  modalsTitle: 'Inactive Employee Data',
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
                  modalsTitle: 'Inactive Employee Data',
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
                modalsTitle: 'Inactive Employee Data',
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
                modalsTitle: 'Inactive Employee Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to Inactivate Employee Data. Please try again.',
              },
            }));
          }
        });
    } else if (state.booleanStateValues.saveClick) {
      if (state.textStateValues.radioValue === '1') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: true,
          },
        }));
        const body = state.tableData;
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/saveResourceData`, body)
          .then((res) => {
            if (res.status === 200) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveIndication: false,
                  editableData: false,
                  // saveEnable: false,
                  dependencyValue: !state.booleanStateValues.dependencyValue,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: successIcon,
                  modalsMessage: 'Data saved successfully.',
                  selectedSupervisor: '',
                  radioValue: '',
                  searchValue: '',
                },
                tableData: initialState.tableData,
                keyCount: 2,
                selectedValue: [],
                filterTable: [],
                joiTableValidation: [],
                duplicateEmpList: [],
                duplicateEmailList: [],
                inactiveManager: [],
                selectedRowKeys: [],
                selectedRows: [],
              }));
            } else if (res.status === 205) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  // eslint-disable-next-line max-len
                  modalsMessage: 'Data import is cancelled as imported entire data information is identical with existing database data.',
                  radioValue: '',
                },
                joiTableValidation: [],
                duplicateEmpList: [],
                duplicateEmailList: [],
                inactiveManager: [],
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
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Server error. Please try again.',
                  radioValue: '',
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
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Server down. Please try again.',
                  radioValue: '',
                },
              }));
            } else if (err.response.status === 422) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
                  radioValue: '',
                },
                joiTableValidation: err.response.data.data.errorDetails,
                duplicateEmpList: [],
                duplicateEmailList: [],
                inactiveManager: [],
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
                    saveClick: false,
                  },
                  textStateValues: {
                    ...state.textStateValues,
                    modalsTitle: 'Save Resource Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Internal server error. Please contact the Admin.',
                    radioValue: '',
                  },
                  joiTableValidation: [],
                  duplicateEmpList: [],
                  duplicateEmailList: [],
                  inactiveManager: [],
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
                    modalsTitle: 'Save Resource Data',
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
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Your Role access has changed. Please Login again.',
                },
              }));
            } else if (err.response.status === 400) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Database error. Please contact the Admin.',
                  radioValue: '',
                },
                joiTableValidation: [],
                duplicateEmpList: [],
                duplicateEmailList: [],
                inactiveManager: [],
              }));
            } else if (err.response.status === 401) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  // eslint-disable-next-line react/jsx-one-expression-per-line
                  modalsMessage: <p>Duplicate records found. Please check highlighted <b>Email ID</b> records.</p>,
                  radioValue: '',
                },
                joiTableValidation: [],
                duplicateEmpList: [],
                duplicateEmailList: err.response.data.data.checkEmailData,
                inactiveManager: [],
              }));
            } else if (err.response.status === 405) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  // eslint-disable-next-line max-len
                  modalsMessage: `Selected Reporting ${err.response.data.data.emptyManager.length === 1 ? 'Manager is' : 'Managers are'} neither inactive nor doing a role of Reporting Manager. Please check highlighted ${err.response.data.data.emptyManager.length === 1 ? 'record' : 'records'}.`,
                  radioValue: '',
                },
                joiTableValidation: [],
                duplicateEmpList: [],
                duplicateEmailList: [],
                inactiveManager: err.response.data.data.emptyManager,
              }));
            } else if (err.response.status === 409) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Failed to save Resource Data. Please try again.',
                  radioValue: '',
                },
                joiTableValidation: [],
                duplicateEmpList: [],
                duplicateEmailList: [],
                inactiveManager: [],
              }));
            } else if (err.response.status === 417) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  // eslint-disable-next-line max-len, no-nested-ternary, react/jsx-one-expression-per-line
                  modalsMessage: err.response.data.data.duplicateRowValidateForResource.length > 0 && err.response.data.data.duplicateRowValidateForEmailId.length > 0 ? <p>Duplicate records found. Please check highlighted <b>Resource Emp ID & Email ID</b> records.</p> : err.response.data.data.duplicateRowValidateForResource.length > 0 ? <p>Duplicate records found. Please check highlighted <b>Resource Emp ID</b> records.</p> : <p>Duplicate records found. Please check highlighted <b>Email ID</b> records.</p>,
                  radioValue: '',
                },
                duplicateEmpList: err.response.data.data.duplicateRowValidateForResource,
                duplicateEmailList: err.response.data.data.duplicateRowValidateForEmailId,
                joiTableValidation: [],
                inactiveManager: [],
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showActionModal: false,
                  showStatusModal: true,
                  saveClick: false,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Data',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
                  radioValue: '',
                },
                joiTableValidation: [],
                duplicateEmpList: [],
                duplicateEmailList: [],
                inactiveManager: [],
              }));
            }
          });
      } else if (state.textStateValues.radioValue === '2') {
        callUpdateEmpSave(state.tableData);
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
    } else if (state.booleanStateValues.editableData && state.selectedRowKeys.length !== 0) {
      if (state.tableData.length === key.length) {
        setState((prevState) => ({
          ...prevState,
          tableData: initialState.tableData,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            editableData: false,
            saveIndication: false,
          },
          keyCount: 2,
          selectedRowKeys: [],
          selectedRows: [],
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
            tableData: prevState.tableData.filter((row) => !key.includes(row.resource_emp_id)),
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
            },
            selectedRowKeys: [],
            selectedRows: [],
          }));
        }, 10);
      }
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
        selectedRows: [],
        joiTableValidation: [],
        duplicateEmpList: [],
        duplicateEmailList: [],
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
          selectedRows: [],
        }));
      }, 10);
    }
  };

  const handleActionModalCancel = () => {
    if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      if (state.textStateValues.modalsTitle === 'Import Resource Data') {
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
      } else if (state.textStateValues.modalsTitle === 'Employee Select'
        && state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
        if (state.tempValue.length === 0) {
          setState((prevState) => ({
            ...prevState,
            tableData: initialState.tableData,
            selectedValue: [],
            keyCount: 2,
            booleanStateValues: {
              ...state.booleanStateValues,
              editableData: false,
              showActionModal: false,
              saveIndication: false,
            },
            textStateValues: {
              ...state.textStateValues,
              searchValue: '',
              selectedSupervisor: '',
            },
            filterTable: [],
            tempValue: [],
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
            selectedRowKeys: [],
            selectedRows: [],
          }));
        } else if (state.tempValue[state.tempValue.length - 1] !== 'all') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
              editableData: true,
              saveIndication: false,
            },
            tableData: state.resourceList.filter((emp) => state.tempValue.slice(-1).includes(emp.resource_emp_id)),
            keyCount: 2,
            selectedValue: state.tempValue.slice(-1),
            tempValue: [],
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
            selectedRowKeys: [],
            selectedRows: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
              editableData: true,
              saveIndication: false,
            },
            tableData: state.resourceList,
            keyCount: state.resourceList.length + 1,
            selectedValue: ['all'],
            tempValue: [],
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
            selectedRowKeys: [],
            selectedRows: [],
          }));
        }
      } else if (state.textStateValues.modalsTitle === 'Clear Supervisor'
        && state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            editableData: false,
            saveIndication: false,
            showActionModal: false,
          },
          tableData: initialState.tableData,
          keyCount: 2,
          textStateValues: {
            ...state.textStateValues,
            selectedSupervisor: '',
            searchValue: '',
          },
          filterTable: [],
          joiTableValidation: [],
          duplicateEmpList: [],
          duplicateEmailList: [],
          inactiveManager: [],
          selectedValue: [],
          selectedRowKeys: [],
          selectedRows: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            editableData: true,
            saveIndication: false,
          },
          tableData: state.resourceList.filter((emp) => state.tempValue.includes(emp.reporting_manager)),
          textStateValues: {
            ...state.textStateValues,
            selectedSupervisor: state.tempValue,
          },
          // eslint-disable-next-line max-len
          selectedValue: state.resourceList.filter((emp) => state.tempValue.includes(emp.reporting_manager)).length > 0 ? ['all'] : [],
          joiTableValidation: [],
          duplicateEmpList: [],
          duplicateEmailList: [],
          inactiveManager: [],
          selectedRowKeys: [],
          selectedRows: [],
        }));
      }
    } else if (state.booleanStateValues.saveClick) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
          saveClick: false,
        },
        textStateValues: {
          ...state.textStateValues,
          radioValue: '',
        },
        selectedRowKeys: [],
        selectedRows: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        selectedRowKeys: [],
        selectedRows: [],
      }));
    }
  };

  const handleRadioChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        radioValue: e.target.value,
      },
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
      onCancel={() => handleActionModalOk(state.selectedRowKeys)}
      okText={state.textStateValues.modalsMessage.length === undefined
        || state.textStateValues.modalsMessage.length === 32 ? 'No' : 'Cancel'}
      cancelText={state.textStateValues.modalsMessage.length === undefined
        || state.textStateValues.modalsMessage.length === 32 ? 'Yes' : 'OK'}
      cancelButtonProps={state.booleanStateValues.saveClick && { disabled: state.textStateValues.radioValue === '' }}
    >
      {state.booleanStateValues.saveClick ? (
        <Radio.Group onChange={handleRadioChange} value={state.textStateValues.radioValue}>
          <Space direction="vertical">
            <Radio value="1">Save newly added data only</Radio>
            <Radio value="2">Save both existing and newly added data</Radio>
          </Space>
        </Radio.Group>
      ) : (
        <div className="action-modal">
          {state.textStateValues.modalsIcon}
          <div>{state.textStateValues.modalsMessage}</div>
        </div>
      )}
    </Modal>
  );

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsTitle === 'Verify Resource Data') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
          verifyDuplicate: false,
          // saveEnable: true,
        },
        duplicateTableData: [],
      }));
    } else if (state.textStateValues.modalsMessage === 'Your session has expired. Please Login again.') {
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
      // eslint-disable-next-line max-len
    } else if (state.textStateValues.modalsMessage === 'Data import is cancelled as imported entire data information is identical with existing database data.') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          isLoading: false,
          saveIndication: false,
          editableData: false,
          showStatusModal: false,
          saveClick: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedSupervisor: '',
          radioValue: '',
          searchValue: '',
        },
        tableData: initialState.tableData,
        keyCount: 2,
        selectedValue: [],
        filterTable: [],
        selectedRowKeys: [],
        selectedRows: [],
      }));
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
      {state.booleanStateValues.verifyDuplicate ? (
        <>
          <p>Please find the duplicate data identified information as below:</p>
          <Table
            columns={duplicateTableColumns}
            dataSource={state.duplicateTableData}
            pagination={false}
            bordered
            className="table-style"
            rowKey="resource_emp_id"
            scroll={{ y: 200 }}
            size="small"
          />
        </>
      ) : (
        <div className="action-modal">
          {state.textStateValues.modalsIcon}
          <div>{state.textStateValues.modalsMessage}</div>
        </div>
      )}
    </Modal>
  );

  const handleDeleteClick = () => {
    if (state.selectedValue.length !== 0) {
      const selectedEmployeeName = [];
      state.selectedRows.forEach((data) => {
        selectedEmployeeName.push(data.resource_name);
      });
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Inactive Employee Data',
          modalsIcon: optionIcon,
          // eslint-disable-next-line react/jsx-one-expression-per-line
          modalsMessage: <p>Are you sure to Inactivate <b>{selectedEmployeeName.join(', ')}</b> employee?</p>,
        },
      }));
    } else {
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
    }
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
          modalsTitle: 'Import Resource Data',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: [files],
      }));
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleSaveClick = () => {
    if (state.selectedValue.length === 0 && state.textStateValues.selectedSupervisor === '') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
          saveClick: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Save Resource Data',
          modalsMessage: '',
        },
      }));
    } else {
      callUpdateEmpSave(state.tableData);
    }
  };

  const handleEmployeeSelect = (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Employee Select',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: value,
      }));
    } else if (value.length === 0) {
      setState((prevState) => ({
        ...prevState,
        tableData: initialState.tableData,
        selectedValue: [],
        selectedRowKeys: [],
        selectedRows: [],
        keyCount: 2,
        booleanStateValues: {
          ...state.booleanStateValues,
          editableData: false,
        },
        textStateValues: {
          ...state.textStateValues,
          searchValue: '',
          selectedSupervisor: '',
        },
        filterTable: [],
        joiTableValidation: [],
        duplicateEmpList: [],
        duplicateEmailList: [],
        inactiveManager: [],
      }));
    } else if (value.length > 0 && state.booleanStateValues.editableData) {
      if (value[value.length - 1] !== 'all') {
        const newArr = value.filter((val) => val !== 'all');
        setState((prevState) => ({
          ...prevState,
          tableData: state.resourceList.filter((emp) => value.includes(emp.resource_emp_id)),
          selectedValue: newArr,
          joiTableValidation: [],
          duplicateEmpList: [],
          duplicateEmailList: [],
          inactiveManager: [],
          selectedRowKeys: [],
          selectedRows: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: state.resourceList,
          selectedValue: ['all'],
          joiTableValidation: [],
          duplicateEmpList: [],
          duplicateEmailList: [],
          inactiveManager: [],
          selectedRowKeys: [],
          selectedRows: [],
        }));
      }
    } else if (value.length > 0) {
      if (value[value.length - 1] !== 'all') {
        const newArr = value.filter((val) => val !== 'all');
        setState((prevState) => ({
          ...prevState,
          tableData: state.resourceList.filter((emp) => value.includes(emp.resource_emp_id)),
          selectedValue: newArr,
          booleanStateValues: {
            ...state.booleanStateValues,
            editableData: true,
          },
          joiTableValidation: [],
          duplicateEmpList: [],
          duplicateEmailList: [],
          inactiveManager: [],
          selectedRowKeys: [],
          selectedRows: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: state.resourceList,
          selectedValue: ['all'],
          booleanStateValues: {
            ...state.booleanStateValues,
            editableData: true,
          },
          joiTableValidation: [],
          duplicateEmpList: [],
          duplicateEmailList: [],
          inactiveManager: [],
          selectedRowKeys: [],
          selectedRows: [],
        }));
      }
    }
  };

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
    }
  };

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredData = state.tableData.filter((key) => Object.keys(key).some((data) => String(key[data])
        .toLowerCase()
        .includes(e.target.value.toLowerCase())));
      const filteredArray = [];
      filteredData.forEach((empID) => {
        if (empID.resource_emp_id) {
          filteredArray.push(empID.resource_emp_id);
        } else {
          filteredArray.push(empID.emp_id);
        }
      });
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          searchValue: e.target.value,
        },
        filterTable: filteredArray,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          searchValue: '',
        },
        filterTable: [],
      }));
    }
  };

  // Export Excel
  const handleExportExcel = async (exportData) => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    // eslint-disable-next-line max-len
    const fileName = exportData ? `RM_Resource_Management_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}` : 'RM_Resource_Management_Template';

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Resource Management', {
        views: [{ showGridLines: false }],
      });
      const worksheet2 = workbook.addWorksheet('BU Name');
      const resourceMgtTable = [
        [],
        [
          ' ',
          'Sl. No.',
          'Resource Emp ID',
          'Resource Name',
          'Email ID',
          'Is Reporting Manager',
          'Resource DOJ',
          'BU Name',
          'Designation',
          'Reporting Manager',
          'Location',
          'Joined as',
          'CTC',
          'Per Month',
          'Stream',
          'Total Years Exp.',
          'Resource status',
          'Resource LWD',
        ],
      ];
      if (exportData) {
        resourceMgtTable[1].splice(1, 1);
      }
      worksheet1.addRows(resourceMgtTable);
      if (exportData && state.resourceList.length > 0) {
        state.resourceList.forEach((ele) => {
          worksheet1.addRow([
            ' ',
            ele.resource_emp_id,
            ele.resource_name,
            ele.email_id,
            ele.is_reporting_manager,
            moment(ele.resource_doj).format('DD-MM-YYYY'),
            ele.bu_name,
            ele.designation,
            `${ele.reporting_manager} - ${ele.reporting_manager_name}`,
            ele.location,
            ele.joined_as,
            ele.ctc,
            ele.per_month,
            ele.stream,
            ele.total_years_exp,
            ele.resource_status,
            ele.resource_lwd ? moment(ele.resource_lwd).format('DD-MM-YYYY') : ele.resource_lwd,
          ]);
        });
      } else {
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < 10; k++) {
          worksheet1.addRow(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
        }
      }

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      if (exportData) {
        worksheet1.getColumn(4).width = 35;
      } else {
        worksheet1.getColumn(2).width = 10;
      }
      if (state.groupDetailsList.length > 0) {
        state.groupDetailsList.forEach((group, i) => {
          worksheet2.getCell(`A${i + 1}`).value = group.bu_name;
        });
      }
      if (state.resourceList.length > 0) {
        state.resourceList.forEach((emp, j) => {
          // eslint-disable-next-line max-len
          worksheet2.getCell(`B${j + 1}`).value = `${emp.resource_emp_id} - ${emp.resource_name}`;
        });
      }
      if (state.designationList.length > 0) {
        state.designationList.forEach((desig, k) => {
          worksheet2.getCell(`C${k + 1}`).value = desig.designation;
        });
      }

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
              row.getCell('C').dataValidation = {
                type: 'textLength',
                operator: 'greaterThanOrEqual',
                showErrorMessage: true,
                allowBlank: true,
                formulae: [4],
                errorStyle: 'error',
                errorTitle: 'Resource Emp ID',
                error: 'The Resource Emp ID length must be greater than or equal to 4',
              };
              row.getCell('G').dataValidation = {
                type: 'date',
                showErrorMessage: true,
                allowBlank: true,
                formulae: [new Date(row.getCell('G').value)],
                errorStyle: 'error',
                errorTitle: 'Resource DOJ',
                error: 'Resource DOJ should be a valid date',
              };
              row.getCell('F').value = 'No';
              row.getCell('P').value = '0';
              // row.getCell('N').value = { formula: `ROUND(${'M'}${rowNumber}/12, 2)` };
            }
            // eslint-disable-next-line max-len
            // row.getCell(exportData ? 'M' : 'N').value = { formula: `ROUND(${exportData ? 'L' : 'M'}${rowNumber}/12, 2)` };
            row.getCell(exportData ? 'E' : 'F').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              formulae: ['"Yes, No"'],
            };
            row.getCell(exportData ? 'G' : 'H').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              formulae: [`'BU Name'!$A$1:$A$${state.groupDetailsList.length}`],
            };
            row.getCell(exportData ? 'H' : 'I').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              formulae: [`'BU Name'!$C$1:$C$${state.designationList.length}`],
            };
            row.getCell(exportData ? 'I' : 'J').dataValidation = {
              type: 'list',
              allowBlank: true,
              // error: 'Please use the drop down to select a valid value',
              // errorTitle: 'Invalid Selection',
              // showErrorMessage: true,
              formulae: [`'BU Name'!$B$1:$B$${state.resourceList.length}`],
            };
            row.getCell(exportData ? 'J' : 'K').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.locationList.map((location) => location.location).join(',') + '"'],
            };
            row.getCell(exportData ? 'K' : 'L').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.joinedAsList.map((joinedAs) => joinedAs.joined_as).join(',') + '"'],
            };
            row.getCell(exportData ? 'N' : 'O').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.streamList.map((stream) => stream.stream).join(',') + '"'],
            };
            row.getCell(exportData ? 'P' : 'Q').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.resourceStatusList.map((status) => status.resource_status).join(',') + '"'],
            };
            row.getCell(exportData ? 'Q' : 'R').dataValidation = {
              type: 'date',
              showErrorMessage: true,
              allowBlank: true,
              formulae: [new Date(row.getCell(exportData ? 'Q' : 'R').value)],
              errorStyle: 'error',
              errorTitle: 'Resource LWD',
              error: 'Resource LWD should be a valid date',
            };
          }
        });
        // Commit the changed row to the stream
        row.commit();
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();
      if (exportData) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export Employee Data',
            modalsIcon: successIcon,
            modalsMessage: 'Exported data successfully. Same excel can be used to edit and import again.',
          },
        }));
      }
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
          modalsTitle: exportData ? 'Export Employee Data' : 'Export Resource Management Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource Management');
      workbook.removeWorksheet('BU Name');
    }
  };

  const handleVerifyClick = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/verifyEmployeeExistenceInDb`, body)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              verifyDuplicate: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Verify Resource Data',
            },
            duplicateTableData: res.data.data,
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
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
              modalsTitle: 'Verify Resource Data',
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
              modalsTitle: 'Verify Resource Data',
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
                modalsTitle: 'Verify Resource Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateEmpList: [],
              duplicateEmailList: [],
              inactiveManager: [],
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
                modalsTitle: 'Verify Resource Data',
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
              modalsTitle: 'Verify Resource Data',
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
              modalsTitle: 'Verify Resource Data',
              modalsIcon: infoIcon,
              modalsMessage: 'No duplicate records found.',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
          }));
        } else if (err.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              showStatusModal: true,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              radioValue: '',
            },
            joiTableValidation: err.response.data.data.errorDetails,
            duplicateEmpList: [],
            duplicateEmailList: [],
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
              modalsTitle: 'Verify Resource Data',
              modalsIcon: infoIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiTableValidation: [],
            duplicateEmpList: [],
            duplicateEmailList: [],
            inactiveManager: [],
          }));
        }
      });
  };

  const handleSupervisorSelect = (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Select Supervisor',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: value,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: state.resourceList.filter(({ reporting_manager: reportingManager }) => value === reportingManager),
        textStateValues: {
          ...state.textStateValues,
          selectedSupervisor: value,
        },
        booleanStateValues: {
          ...state.booleanStateValues,
          editableData: true,
        },
        joiTableValidation: [],
        duplicateEmpList: [],
        duplicateEmailList: [],
        inactiveManager: [],
        selectedRowKeys: [],
        selectedRows: [],
        // eslint-disable-next-line max-len
        selectedValue: state.resourceList.filter(({ reporting_manager: reportingManager }) => value === reportingManager).length > 0 ? ['all'] : [],
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
          modalsTitle: 'Clear Supervisor',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          editableData: false,
          saveIndication: false,
        },
        tableData: initialState.tableData,
        textStateValues: {
          ...state.textStateValues,
          selectedSupervisor: '',
          searchValue: '',
        },
        filterTable: [],
        joiTableValidation: [],
        duplicateEmpList: [],
        duplicateEmailList: [],
        inactiveManager: [],
        selectedValue: [],
        selectedRowKeys: [],
        selectedRows: [],
      }));
    }
  };

  return (
    <div>
      {roles.includes(201) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading ? (
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
                  <PageHeader>Resource Management</PageHeader>
                  {state.booleanStateValues.saveIndication && <StarFilled className="save-indication" />}
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
                        {state.filterTable.length}
                        /
                        {state.tableData.length}
                        )
                      </p>
                    )}
                </div>
              </div>
              <div className="dropdown-btns-flex">
                <Space>
                  <Space>
                    <Typography>Employee:</Typography>
                    <Select
                      style={{ width: '180px' }}
                      mode="multiple"
                      maxTagCount="responsive"
                      placeholder="Select Employee"
                      showArrow
                      allowClear={state.textStateValues.selectedSupervisor === ''}
                      showSearch
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      value={state.selectedValue}
                      onChange={handleEmployeeSelect}
                      onInputKeyDown={handleBackspaceDisable}
                    >
                      {state.textStateValues.selectedSupervisor === '' ? (
                        <>
                          {state.resourceList.length > 0 && <Select.Option key="all" value="all">All</Select.Option>}
                          {state.resourceList.map((emp) => {
                            return (
                              <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
                                {emp.resource_emp_id}
                                {' - '}
                                {emp.resource_name}
                              </Select.Option>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {state.resourceList.filter((emp) => {
                            return state.textStateValues.selectedSupervisor.includes(emp.reporting_manager);
                          }).length > 0
                            && <Select.Option key="all" value="all">All</Select.Option>}
                          {state.resourceList.map((emp) => {
                            if (emp.reporting_manager === state.textStateValues.selectedSupervisor) {
                              return (
                                <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
                                  {emp.resource_emp_id}
                                  {' - '}
                                  {emp.resource_name}
                                </Select.Option>
                              );
                            }
                            return null;
                          })}
                        </>
                      )}
                    </Select>
                    <Tooltip placement="bottom" title="Select Employee to view/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Typography>Supervisor:</Typography>
                    <Select
                      style={{ width: '180px' }}
                      placeholder="Select Supervisor"
                      showSearch
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      allowClear
                      onClear={handleClear}
                      value={state.textStateValues.selectedSupervisor || null}
                      onSelect={handleSupervisorSelect}
                    >
                      {state.resourceList.map((emp) => {
                        return (
                          <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
                            {emp.resource_emp_id}
                            {' - '}
                            {emp.resource_name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select Supervisor to view their employees">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                </Space>
                <Space>
                  <Upload
                    accept=".xlsx, .xlsm"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleUploadExcel}
                  >
                    <Tooltip placement="bottom" title="Import Resource Data">
                      <Button type="primary">
                        <UploadOutlined />
                        Import Data
                      </Button>
                    </Tooltip>
                  </Upload>
                  <Tooltip placement="bottom" title="Verify Resource Data">
                    <Button
                      type="primary"
                      disabled={!(enableSave && state.selectedValue.length === 0)}
                      onClick={handleVerifyClick}
                    >
                      <SaveFilled />
                      Verify
                    </Button>
                  </Tooltip>
                  <Tooltip placement="bottom" title="Save Resource Data">
                    <Button
                      type="primary"
                      disabled={!(enableSave && state.booleanStateValues.saveIndication)}
                      onClick={handleSaveClick}
                    >
                      <SaveFilled />
                      Save
                    </Button>
                  </Tooltip>
                  <Tooltip placement="bottom" title="Help">
                    <a href="/rm-tool/help/data-management/resource-management" target="_blank">
                      <QuestionCircleOutlined className="help-icon" />
                    </a>
                  </Tooltip>
                </Space>
              </div>

              <div className="table-border">
                <div className="table-btn-flex">
                  <Space>
                    <Tooltip placement="bottom" title="Add Resource">
                      <Button type="primary" disabled={state.booleanStateValues.editableData} onClick={handleAddClick}>
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
                  <Space>
                    <Tooltip placement="bottom" title="Export Template to add new Resource data">
                      <Button onClick={() => handleExportExcel(false)}>
                        <DownloadOutlined />
                        Export Template
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Export Existing Employees to Excel">
                      <Button
                        type="primary"
                        disabled={state.resourceList.length === 0}
                        onClick={() => handleExportExcel(true)}
                      >
                        <DownloadOutlined />
                        Export Data
                      </Button>
                    </Tooltip>
                  </Space>
                </div>
                <Table
                  columns={tableColumns}
                  dataSource={state.tableData}
                  pagination={false}
                  bordered
                  rowKey={state.booleanStateValues.editableData ? 'resource_emp_id' : 'key'}
                  rowSelection={rowSelection}
                  rowClassName={(record) => {
                    return state.filterTable.map((emp) => (record.resource_emp_id === emp ? 'table-row-dark' : null));
                  }}
                  scroll={{ x: 200, y: 400 }}
                  size="small"
                />

                {statusModal}
                {actionModal}
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

export default ResourceManagement;
