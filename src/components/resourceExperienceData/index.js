/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign, max-len */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Input, Space, Typography, Select, Upload,
  Tooltip, Button, Table, Modal, InputNumber, DatePicker,
} from 'antd';
import {
  StarFilled, UploadOutlined, PlusOutlined, SaveFilled, QuestionCircleOutlined, InfoCircleOutlined,
  CloseCircleFilled, InfoCircleTwoTone, QuestionCircleTwoTone, CheckCircleFilled, DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import moment from 'moment';
import axios from 'axios';
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
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedEmployee: '',
  },
  tableData: [
    {
      key: 1,
      resource_emp_id: '',
      joining_date: '',
      last_working_date: null,
      years_of_exp: '0',
      previous_company_details: '',
    },
  ],
  keyCount: 2,
  resourceList: [],
  resourceExperienceList: [],
  tempValue: [],
  selectedRowKeys: [],
  duplicateExperienceList: [],
  joiTableValidation: [],
};
const { TextArea } = Input;

const ResourceExperienceData = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const lightRed = '#fc8f83';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourcePreviousExp/getAllResourcePreviousExpDetails`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          resourceExperienceList: res.data.data,
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
          modalsTitle: 'Import Resource Experience Data',
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
        const wb = XLSX.read(data, { type: 'binary', cellDates: true });
        const sheet = wb.SheetNames[0];
        const excel = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: null });
        const excelData = excel.map((row, index) => Object.keys(row).reduce((obj, key) => {
          const object = obj;
          object.key = index + 1;
          if (key.trim() === '' || key.trim() === '__EMPTY' || key.trim() === null) {
            delete object[key];
            // eslint-disable-next-line max-len
          } else if (key.trim() === 'Resource Emp ID' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Resource Emp ID'
            // eslint-disable-next-line max-len
            && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(row['Resource Emp ID']);
          } else if (key.trim() === 'Joining Date') {
            if (row[key] && row[key].length === 10) {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : moment(row[key], 'DD-MM-YYYY');
            } else {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
            }
          } else if (key.trim() === 'Last Working Date') {
            if (row[key] && row[key].length === 10) {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : moment(row[key], 'DD-MM-YYYY');
            } else {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? null : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
            }
          } else if (key.trim() === 'Years of Exp.') {
            object.years_of_exp = row[key].toString().trim();
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
              modalsTitle: 'Import Resource Experience Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;Resource Emp ID&apos; should be 4. Please check the records of &apos;Resource Emp ID&apos; (<b>{errRow.join(', ')}</b>).</p>,
            },
            tempValue: [],
            duplicateExperienceList: [],
          }));
          errRow = [];
        } else if (excelData[0].resource_emp_id !== undefined && excelData[0].years_of_exp !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              saveIndication: true,
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Resource Experience Data',
              modalsIcon: infoIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
              selectedEmployee: '',
            },
            selectedRowKeys: [],
            tableData: excelData,
            keyCount: excelData.length + 1,
            joiTableValidation: [],
            duplicateExperienceList: [],
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
              modalsTitle: 'Import Resource Experience Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel for Resource Experience Data.',
            },
            tempValue: [],
            duplicateExperienceList: [],
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
            modalsTitle: 'Import Resource Experience Data',
            modalsIcon: failureIcon,
            modalsMessage: 'Invalid excel for Resource Experience Data.',
          },
          tempValue: [],
          duplicateExperienceList: [],
        }));
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const handleInputChange = (e, index) => {
    if (e === null) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, years_of_exp: '' } : item;
        }),
      }));
    } else if (e.target === undefined) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, years_of_exp: e === 0 ? '0' : e } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, years_of_exp: e === 0 ? '0' : e } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
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
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [name]: value } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    }
  };

  const calculateYearsOfExp = (joiningDate, lastWorkingDate) => {
    if (joiningDate && lastWorkingDate) {
      const joiningDateObj = moment(joiningDate);
      const lastWorkingDateObj = moment(lastWorkingDate);
      const yearsDiff = lastWorkingDateObj.diff(joiningDateObj, 'years');
      const monthsDiff = lastWorkingDateObj.diff(joiningDateObj, 'months') % 12;

      const formattedYears = yearsDiff.toFixed(0);
      const formattedMonths = (monthsDiff / 100).toFixed(2).slice(2);
      return `${formattedYears}.${formattedMonths}`;
    }
    return '0.00';
  };

  const handleDateChange = (_, dateString, index, key) => {
    if (state.booleanStateValues.saveIndication) {
      if (key === 'joining_date') {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? {
              ...item, [key]: dateString, last_working_date: null, years_of_exp: '',
            } : item;
          }),
        }));
      } else {
        const yearsOfExp = calculateYearsOfExp(state.tableData[index].joining_date, dateString);
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [key]: dateString, years_of_exp: yearsOfExp } : item;
          }),
        }));
      }
    } else if (key === 'joining_date') {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? {
            ...item, [key]: dateString, last_working_date: null, years_of_exp: '',
          } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
    } else {
      const yearsOfExp = calculateYearsOfExp(state.tableData[index].joining_date, dateString);
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [key]: dateString, years_of_exp: yearsOfExp } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
    }
  };

  const handleSelectChange = (index) => (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, resource_emp_id: value } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, resource_emp_id: value } : item;
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
      title: 'Resource Emp ID',
      dataIndex: 'resource_emp_id',
      key: 'resource_emp_id',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_emp_id',
        );
        const duplicateError = state.duplicateExperienceList.find((index) => index === rowIndex);
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
              <Select
                style={{ width: '100%' }}
                autoFocus={state.booleanStateValues.focus}
                placeholder="Select Employee"
                name="resource_emp_id"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                disabled={state.textStateValues.selectedEmployee !== ''}
                onSelect={handleSelectChange(index)}
              >
                {state.resourceList.map((emp) => {
                  if (emp.resource_status !== 'Inactive') {
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
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            autoFocus={state.booleanStateValues.focus}
            placeholder="Select Employee"
            name="resource_emp_id"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            disabled={state.textStateValues.selectedEmployee !== ''}
            onSelect={handleSelectChange(index)}
          >
            {state.resourceList.map((emp) => {
              if (emp.resource_status !== 'Inactive') {
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
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_emp_id !== prevRecord.resource_emp_id;
      },
    },
    {
      title: 'Joining Date',
      dataIndex: 'joining_date',
      key: 'joining_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'joining_date',
        );
        const duplicateError = state.duplicateExperienceList.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'joining_date',
        );

        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Resource DOJ"
                name="joining_date"
                allowClear={false}
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'joining_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Resource DOJ"
            name="joining_date"
            allowClear={false}
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'joining_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.joining_date !== prevRecord.joining_date;
      },
    },
    {
      title: 'Last Working Date',
      dataIndex: 'last_working_date',
      key: 'last_working_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'last_working_date',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'last_working_date',
        );

        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Resource LWD"
                name="last_working_date"
                allowClear={false}
                disabledDate={(d) => {
                  return (!d || d.isBefore(moment(state.tableData[index].joining_date).endOf('day')));
                }}
                disabled={state.tableData[index].joining_date.length === 0}
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'last_working_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Resource DOJ"
            name="last_working_date"
            allowClear={false}
            disabledDate={(d) => {
              return (!d || d.isBefore(moment(state.tableData[index].joining_date).endOf('day')));
            }}
            disabled={state.tableData[index].joining_date.length === 0}
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'last_working_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.last_working_date !== prevRecord.last_working_date;
      },
    },
    {
      title: 'Years of Exp.',
      dataIndex: 'years_of_exp',
      key: 'years_of_exp',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'years_of_exp',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'years_of_exp',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                style={{ width: '100%' }}
                controls={false}
                placeholder="Enter Years of Exp"
                name="years_of_exp"
                value={text || null}
                disabled
              // onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            style={{ width: '100%' }}
            controls={false}
            placeholder="Enter Years of Exp"
            name="years_of_exp"
            value={text || null}
            disabled
          // onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.years_of_exp !== prevRecord.years_of_exp;
      },
    },
    {
      title: 'Previous Company Details',
      dataIndex: 'previous_company_details',
      key: 'previous_company_details',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'previous_company_details',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'previous_company_details',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Input
                placeholder="Enter Previous Company Details"
                name="previous_company_details"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <TextArea
            placeholder="Enter Previous Company Details"
            name="previous_company_details"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.previous_company_details !== prevRecord.previous_company_details;
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
          duplicateExperienceList: [],
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
        if (state.textStateValues.modalsTitle === 'Import Resource Experience Data') {
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
        } else {
          setState((prevState) => ({
            ...prevState,
            tableData: state.tempValue[0] !== 'All' ? state.resourceExperienceList.filter((emp) => state.tempValue.includes(emp.resource_emp_id)) : state.resourceExperienceList,
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
              saveIndication: false,
            },
            textStateValues: {
              ...state.textStateValues,
              selectedEmployee: state.tempValue[0],
            },
            tempValue: [],
            selectedRowKeys: [],
            joiTableValidation: [],
            duplicateExperienceList: [],
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
          modalsTitle: 'Select Employee',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: [value],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: value !== 'All' ? state.resourceExperienceList.filter((emp) => value.includes(emp.resource_emp_id)) : state.resourceExperienceList,
        textStateValues: {
          ...state.textStateValues,
          selectedEmployee: value,
        },
        selectedRowKeys: [],
        joiTableValidation: [],
        duplicateExperienceList: [],
      }));
    }
  };

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      tableData: initialState.tableData,
      keyCount: 2,
      selectedRowKeys: [],
      booleanStateValues: {
        ...state.booleanStateValues,
        saveIndication: false,
      },
      textStateValues: {
        ...state.textStateValues,
        selectedEmployee: '',
      },
      joiTableValidation: [],
      duplicateExperienceList: [],
    }));
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
        disabled: state.textStateValues.selectedEmployee !== '',
      };
    },
  };

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      resource_emp_id: '',
      joining_date: '',
      last_working_date: null,
      years_of_exp: '',
      previous_company_details: '',
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

  const handleSave = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourcePreviousExp/saveResourcePreviousExpDetailsData`, body)
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
              modalsIcon: successIcon,
              modalsMessage: `Data ${state.textStateValues.selectedEmployee !== '' ? 'updated' : 'saved'} successfully.`,
              selectedEmployee: '',
            },
            tableData: initialState.tableData,
            keyCount: 2,
            selectedRowKeys: [],
            joiTableValidation: [],
            duplicateExperienceList: [],
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
              modalsIcon: failureIcon,
              modalsMessage: 'Database error. Please contact the Admin.',
            },
            joiTableValidation: [],
            duplicateExperienceList: [],
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
              modalsIcon: failureIcon,
              modalsMessage: `Failed to ${state.textStateValues.selectedEmployee !== '' ? 'update' : 'save'} Resource Experience Data. Please try again.`,
            },
            joiTableValidation: [],
            duplicateExperienceList: [],
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
                modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateExperienceList: [],
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
                modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
              modalsIcon: failureIcon,
              modalsMessage: 'Your Role access has changed. Please Login again.',
            },
          }));
        } else if (err.response.status === 406) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
              modalsIcon: failureIcon,
              // eslint-disable-next-line max-len, no-nested-ternary, react/jsx-one-expression-per-line
              modalsMessage: <p>Duplicate records found. Please check highlighted <b>Resource Emp Id</b> records.</p>,
            },
            duplicateExperienceList: err.response.data.data.checkExp,
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
            },
            joiTableValidation: err.response.data.data.errorDetails,
            duplicateExperienceList: [],
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
              modalsTitle: `${state.textStateValues.selectedEmployee !== '' ? 'Update' : 'Save'} Resource Experience Data`,
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiTableValidation: [],
            duplicateExperienceList: [],
          }));
        }
      });
  };

  const enableSave = state.tableData.length > 0 && state.tableData[0].resource_emp_id !== ''
    && state.tableData[0].years_of_exp !== '' && state.tableData[0].previous_company_details !== '';

  const handleExportExcel = async (exportData) => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    // eslint-disable-next-line max-len
    const fileName = exportData ? `RM_Resource_Experience_Data_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}` : 'RM_Resource_Experience_Data_Template';
    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Resource Experience Data', {
        views: [{ showGridLines: false }],
      });
      const resourceExperienceTable = [
        [],
        [
          ' ',
          'Sl. No.',
          'Resource Emp ID',
          'Joining Date',
          'Last Working Date',
          'Years of Exp.',
          'Previous Company Details',
        ],
      ];
      if (exportData) {
        resourceExperienceTable[1].splice(1, 1);
      }
      worksheet1.addRows(resourceExperienceTable);

      if (exportData && state.resourceExperienceList.length > 0) {
        state.resourceExperienceList.forEach((ele) => {
          worksheet1.addRow([
            ' ',
            ele.resource_emp_id,
            moment(ele.joining_date).format('DD-MM-YYYY'),
            ele.last_working_date ? moment(ele.last_working_date).format('DD-MM-YYYY') : ele.last_working_date,
            ele.years_of_exp,
            ele.previous_company_details,
          ]);
        });
      } else {
        const worksheet2 = workbook.addWorksheet('Resource List');
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < 10; k++) {
          worksheet1.addRow(['', '', '', '', '', '', '']);
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
      worksheet1.properties.defaultColWidth = 30;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = exportData ? 20 : 10;
      worksheet1.getColumn(exportData ? 4 : 5).width = 30;

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
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'Resource List'!$A$1:$A$${state.resourceList.length}`],
              };
              row.getCell('D').dataValidation = {
                type: 'date',
                showErrorMessage: true,
                allowBlank: true,
                formulae: [new Date(row.getCell('D').value)],
                errorStyle: 'error',
                errorTitle: 'Joining Date',
                error: 'Joining Date should be a valid date',
              };
              row.getCell('E').dataValidation = {
                type: 'date',
                showErrorMessage: true,
                allowBlank: true,
                formulae: [new Date(row.getCell('E').value)],
                errorStyle: 'error',
                errorTitle: 'Last Working Date',
                error: 'Last Working Date should be a valid date',
              };
              row.getCell('G').dataValidation = {
                type: 'textLength',
                showErrorMessage: true,
                errorTitle: 'Previous Company Details',
                error: 'Previous Company Details should not be empty',
              };
            }
          }
        });
        // Commit the changed row to the stream
        row.commit();
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
            modalsTitle: 'Export Resource Experience Data',
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
          showActionModal: false,
          showStatusModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: exportData ? 'ExportResource Experience Data' : 'ExportResource Experience Data Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource Experience Data');
      workbook.removeWorksheet('Resource List');
    }
  };

  return (
    <div>
      {roles.includes(230) ? (
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
                  <PageHeader>Resource Experience Data</PageHeader>
                  {state.booleanStateValues.saveIndication && (
                    <StarFilled className="save-indication" />
                  )}
                </div>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>Employee:</Typography>
                    <Select
                      style={{ width: '200px' }}
                      placeholder="Select Employee"
                      allowClear
                      showSearch
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      onClear={handleClear}
                      value={state.textStateValues.selectedEmployee || null}
                      onSelect={handleEmployeeSelect}
                    >
                      {state.resourceList.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
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
                    <Tooltip placement="bottom" title="Select Employee to view/update existing data">
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
                      <Tooltip placement="bottom" title="Import Resource Experience Data">
                        <Button type="primary">
                          <UploadOutlined />
                          Import Data
                        </Button>
                      </Tooltip>
                    </Upload>
                    <Tooltip placement="bottom" title="Save Resource Experience Data">
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
                      <a href="/rm-tool/help/data-management/resource-experience-data" target="_blank">
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
                      <Tooltip placement="bottom" title="Add Resource Experience Data">
                        <Button
                          type="primary"
                          disabled={state.textStateValues.selectedEmployee !== ''}
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
                      <Tooltip placement="bottom" title="Export Template to add new Resource Experience Data">
                        <Button onClick={() => handleExportExcel(false)}>
                          <DownloadOutlined />
                          Export Template
                        </Button>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Export Existing Resource Experience Data to Excel">
                        <Button
                          type="primary"
                          disabled={state.resourceExperienceList.length === 0}
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
                    rowKey={state.textStateValues.selectedEmployee !== '' ? 'res_previous_exp_id' : 'key'}
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

export default ResourceExperienceData;
