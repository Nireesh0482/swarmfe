/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-indent, react/jsx-closing-tag-location, no-param-reassign, max-len */
import React, { useEffect, useState } from 'react';
import {
  Button, Spin, Modal, Tooltip, Table, PageHeader, Space, Select, DatePicker, Typography, Upload,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, QuestionCircleOutlined, CheckCircleTwoTone,
  SaveFilled, CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, StarFilled, WarningTwoTone,
  UploadOutlined, InfoCircleTwoTone, DownloadOutlined,
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
    focus: false,
    constPlan: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedProject: '',
    costPlanMsg: '',
    tempValue: '',
  },
  tableData: [
    {
      key: 1,
      project_code: '',
      resource_emp_id: '',
      resource_name: '',
      supervisor: '',
      start_date: '',
      end_date: '',
      allocation: '',
      billable_resource: '',
      resource_status_in_project: '',
    },
  ],
  keyCount: 2,
  resourceList: [],
  projectResourceList: [],
  allocationList: [],
  selectedRowKeys: [],
  selectedRows: [],
  resourceStatusList: [],
  costPlanData: [],
  joiTableValidation: [],
  duplicateRecord: [],
  wrongSupervisor: [],
  allocationExceedArray: [],
};

const ResourceAllocation = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const userGrpName = localStorage.getItem('userGrpName') === 'undefined' ? [] : JSON.parse(localStorage.getItem('userGrpName'));
  const lightRed = '#fc8f83';
  const startDateFY = new Date().getMonth() < 3 ? `${new Date().getFullYear() - 1}-04-01` : `${new Date().getFullYear()}-04-01`;
  const endDateFY = new Date().getMonth() < 3 ? `${new Date().getFullYear()}-03-31` : `${new Date().getFullYear() + 1}-03-31`;

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

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceAllocation/getPromAllocationDetails`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          allocationList: res.data.data,
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

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/getAllProjectWithEmp`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          projectResourceList: res.data.data,
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
          modalsTitle: 'Import Resource Allocation',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
          tempValue: files,
        },
      }));
      return Upload.LIST_IGNORE;
    }
    return false;
  };

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
    let dateRow = [];
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
          } else if (key.trim() === 'Project Code') {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Resource Emp ID' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
            object.resource_name = row[key].toString().split('-')[1].trim();
          } else if (key.trim() === 'Resource Emp ID'
            && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(object.project_code.toString());
          } else if (key.trim() === 'Supervisor' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Supervisor'
            && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(object.project_code.toString());
          } else if (key.trim() === 'Start Date') {
            if (row[key] && row[key].length === 10) {
              const date = row[key] === null
                ? '' : moment(row[key], 'DD-MM-YYYY');
              if (moment(date) < moment(startDateFY)) {
                dateRow.push(object.project_code.toString());
              }
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null ? '' : date;
            } else {
              const date = row[key] === null
                ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
              if (moment(date) < moment(startDateFY)) {
                dateRow.push(object.project_code.toString());
              }
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null ? '' : date;
            }
          } else if (key.trim() === 'End Date') {
            if (row[key] && row[key].length === 10) {
              const date = row[key] === null
                ? '' : moment(row[key], 'DD-MM-YYYY');
              if (moment(date) > moment(endDateFY)) {
                dateRow.push(object.project_code.toString());
              }
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null ? '' : date;
            } else {
              const date = row[key] === null
                ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
              if (moment(date) > moment(endDateFY)) {
                dateRow.push(object.project_code.toString());
              }
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null ? '' : date;
            }
          } else if (key.trim() === 'Project Resource Status') {
            object.resource_status_in_project = row[key] === null ? '' : row[key].trim().trim();
          } else if (row[key] === null) {
            object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = '';
          } else {
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
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Resource Allocation',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;Resource Emp ID & Supervisor&apos; should be 4. Please check the records of &apos;Project Code&apos; (<b>{unique.join(', ')}</b>).</p>,
              tempValue: '',
            },
          }));
          errRow = [];
        } else if (dateRow.length > 0) {
          const unique = [...new Set(dateRow)];
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
              modalsTitle: 'Import Resource Allocation',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: `Resource Allocation Start & End Date of projects <${unique.join(', ')}> are not within financial year <${startDateFY}-${endDateFY}>.`,
              tempValue: '',
            },
          }));
          dateRow = [];
        } else if (excelData[0].project_code !== undefined && excelData[0].resource_emp_id !== undefined
          && excelData[0].start_date !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              saveIndication: true,
              showActionModal: false,
            },
            selectedRowKeys: [],
            selectedRows: [],
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Resource Allocation',
              modalsIcon: infoIcon,
              selectedProject: '',
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
              tempValue: '',
            },
            keyCount: excelData.length + 1,
            tableData: excelData,
            joiTableValidation: [],
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
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
              modalsTitle: 'Import Resource Allocation',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel for Resource Allocation.',
              tempValue: '',
            },
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
            modalsTitle: 'Import Resource Allocation',
            modalsIcon: failureIcon,
            modalsMessage: 'Invalid excel for Resource Allocation.',
            tempValue: '',
          },
        }));
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const handleChangeSelect = (keyName, index) => (value) => {
    if (keyName === 'project_code') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? {
              ...item,
              [keyName]: value,
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
              ...item,
              [keyName]: value,
            } : item;
          }),
        }));
      }
    } else if (keyName === 'resource_emp_id') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? {
              ...item, [keyName]: value[0], resource_name: value[1], supervisor: value[2],
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
              ...item, [keyName]: value[0], resource_name: value[1], supervisor: value[2],
            } : item;
          }),
        }));
      }
    } else if (keyName === 'supervisor') {
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
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: value } : item;
          }),
        }));
      }
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

  const handleDateChange = (_, dateString, index, keyName) => {
    if (keyName === 'start_date') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString, end_date: '' } : item;
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
            return index === i ? { ...item, [keyName]: dateString, end_date: '' } : item;
          }),
        }));
      }
    } else if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: dateString } : item;
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
          return index === i ? { ...item, [keyName]: dateString } : item;
        }),
      }));
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
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const allocationExceed = state.allocationExceedArray.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError === 0 ? 1 : duplicateError || allocationExceed) === undefined ? 'transparent' : lightRed;
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
                placeholder="Select Project Code"
                name="project_code"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('project_code', index)}
              >
                {state.projectResourceList.map((prj) => {
                  if (userGrpName.includes('Admin') && prj.project_status !== 'Closed') {
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
                  }
                  if (prj.project_group_name === localStorage.getItem('groupName') && prj.project_status !== 'Closed') {
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
            placeholder="Select Project Code"
            name="project_code"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('project_code', index)}
          >
            {state.projectResourceList.map((prj) => {
              if (userGrpName.includes('Admin') && prj.project_status !== 'Closed') {
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
              }
              if (prj.project_group_name === localStorage.getItem('groupName') && prj.project_status !== 'Closed') {
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
      title: 'Resource Emp ID',
      dataIndex: 'resource_emp_id',
      key: 'resource_emp_id',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_emp_id',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const allocationExceed = state.allocationExceedArray.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError === 0 ? 1 : duplicateError || allocationExceed) === undefined ? 'transparent' : lightRed;
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
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Emp Id"
                name="resource_emp_id"
                value={text || null}
                disabled={state.tableData[index].project_code.length === 0}
                onSelect={handleChangeSelect('resource_emp_id', index)}
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
              >
                {state.projectResourceList.filter((item) => state.tableData[index].project_code === item.project_code).map((empList) => {
                  return empList.projectEmployees.map((emp) => {
                    return (
                      <Select.Option
                        key={emp.resource_emp_id}
                        value={[emp.resource_emp_id, emp.resource_name, emp.reporting_manager]}
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
            showSearch
            style={{ width: '100%' }}
            placeholder="Select Emp Id"
            name="resource_emp_id"
            value={text || null}
            disabled={state.tableData[index].project_code.length === 0}
            onSelect={handleChangeSelect('resource_emp_id', index)}
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
          >
            {state.projectResourceList.filter((item) => state.tableData[index].project_code === item.project_code).map((empList) => {
              return empList.projectEmployees.map((emp) => {
                return (
                  <Select.Option
                    key={emp.resource_emp_id}
                    value={[emp.resource_emp_id, emp.resource_name, emp.reporting_manager]}
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
      title: 'Resource Name',
      dataIndex: 'resource_name',
      key: 'resource_name',
      width: 150,
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_name !== prevRecord.resource_name;
      },
    },
    {
      title: 'Supervisor',
      dataIndex: 'supervisor',
      key: 'supervisor',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'supervisor',
        );
        const wrongSupervisorData = state.wrongSupervisor.find((el) => el.index === rowIndex);
        const colorOfBackground = (validationError || wrongSupervisorData) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const wrongSupervisorError = state.wrongSupervisor.find((el) => el.index === index && el.field === 'supervisor');
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'supervisor',
        );
        if (validationError || wrongSupervisorError) {
          return (
            <Tooltip title={validationError ? validationError.errorMessage : wrongSupervisorError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Supervisor"
                name="supervisor"
                value={text || null}
                onSelect={handleChangeSelect('supervisor', index)}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
              >
                {state.resourceList.map((emp) => {
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
                })}
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Select Supervisor"
            name="supervisor"
            value={text || null}
            onSelect={handleChangeSelect('supervisor', index)}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
          >
            {state.resourceList.map((emp) => {
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
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.supervisor !== prevRecord.supervisor;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'start_date',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const allocationExceed = state.allocationExceedArray.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError === 0 ? 1 : duplicateError || allocationExceed) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'start_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Start Date"
                name="start_date"
                disabledDate={(d) => !d || d.isBefore(moment(startDateFY).startOf('day'))
                  || d.isAfter(moment(endDateFY).endOf('day'))}
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'start_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Start Date"
            name="start_date"
            disabledDate={(d) => !d || d.isBefore(moment(startDateFY).startOf('day'))
              || d.isAfter(moment(endDateFY).endOf('day'))}
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'start_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.start_date !== prevRecord.start_date;
      },
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'end_date',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const allocationExceed = state.allocationExceedArray.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError === 0 ? 1 : duplicateError || allocationExceed) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'end_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select End Date"
                name="end_date"
                value={text ? moment(text) : undefined}
                disabledDate={(d) => !d || d.isBefore(moment(state.tableData[index].start_date).endOf('day'))
                  || d.isAfter(moment(endDateFY).endOf('day'))}
                disabled={state.tableData[index].start_date.length === 0}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'end_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select End Date"
            name="end_date"
            value={text ? moment(text) : undefined}
            disabledDate={(d) => !d || d.isBefore(moment(state.tableData[index].start_date).endOf('day'))
              || d.isAfter(moment(endDateFY).endOf('day'))}
            disabled={state.tableData[index].start_date.length === 0}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'end_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.end_date !== prevRecord.end_date;
      },
    },
    {
      title: 'Allocation',
      dataIndex: 'allocation',
      key: 'allocation',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'allocation',
        );
        const allocationExceed = state.allocationExceedArray.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || allocationExceed) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'allocation',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Allocation"
                name="allocation"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('allocation', index)}
              >
                {state.allocationList.map((allocation) => {
                  return <Select.Option key={allocation} value={allocation.toString()}>{allocation}</Select.Option>;
                })}
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Select Allocation"
            name="allocation"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('allocation', index)}
          >
            {state.allocationList.map((allocation) => {
              return <Select.Option key={allocation} value={allocation.toString()}>{allocation}</Select.Option>;
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.allocation !== prevRecord.allocation;
      },
    },
    {
      title: 'Billable Resource',
      dataIndex: 'billable_resource',
      key: 'billable_resource',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'billable_resource',
        );
        const allocationExceed = state.allocationExceedArray.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || allocationExceed) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'billable_resource',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Billable Resource"
                name="billable_resource"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                disabled={state.tableData[index].allocation === ''}
                onSelect={handleChangeSelect('billable_resource', index)}
              >
                {state.allocationList.map((allocation) => {
                  return <Select.Option disabled={state.tableData[index].allocation < allocation} key={allocation} value={allocation.toString()}>{allocation}</Select.Option>;
                })}
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Select Billable Resource"
            name="billable_resource"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            disabled={state.tableData[index].allocation === ''}
            onSelect={handleChangeSelect('billable_resource', index)}
          >
            {state.allocationList.map((allocation) => {
              return <Select.Option disabled={state.tableData[index].allocation < allocation} key={allocation} value={allocation.toString()}>{allocation}</Select.Option>;
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.billable_resource !== prevRecord.billable_resource;
      },
    },
    {
      title: 'Project Resource Status',
      dataIndex: 'resource_status_in_project',
      key: 'resource_status_in_project',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'resource_status_in_project',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'resource_status_in_project',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Resource status"
                name="resource_status_in_project"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('resource_status_in_project', index)}
              >
                {state.resourceStatusList.map((status) => {
                  return (
                    <Select.Option
                      key={status.resource_status_id}
                      value={status.resource_status}
                    >
                      {status.resource_status}
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
            placeholder="Select Resource status"
            name="resource_status_in_project"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('resource_status_in_project', index)}
          >
            {state.resourceStatusList.map((status) => {
              return (
                <Select.Option
                  key={status.resource_status_id}
                  value={status.resource_status}
                >
                  {status.resource_status}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.resource_status_in_project !== prevRecord.resource_status_in_project;
      },
    },
  ];

  const handleExportExcel = async (allocationData) => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    const date = new Date();
    // eslint-disable-next-line max-len
    const fileName = `RM_Resource_Allocation_${moment().format('DD-MMM-YYYY')}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;

    try {
      if (allocationData.length > 0) {
        // creating worksheet1 in workbook
        const worksheet1 = workbook.addWorksheet('Resource Allocation', {
          views: [{ showGridLines: false }],
        });
        const resourceMgtTable = [
          [],
          [
            ' ',
            'Project Code',
            'Resource Emp ID',
            'Supervisor',
            'Start Date',
            'End Date',
            'Allocation',
            'Billable Resource',
            'Project Resource Status',
          ],
        ];
        worksheet1.addRows(resourceMgtTable);

        allocationData.forEach((ele) => {
          if (userGrpName.includes('Admin')) {
            worksheet1.addRow([
              ' ',
              ele.project_code,
              `${ele.resource_emp_id} - ${ele.resource_name}`,
              ele.supervisor,
              moment(ele.start_date).format('DD-MM-YYYY'),
              moment(ele.end_date).format('DD-MM-YYYY'),
              ele.allocation,
              ele.billable_resource,
              ele.resource_status_in_project,
            ]);
          } else if (ele.project_group_name === localStorage.getItem('groupName')) {
            worksheet1.addRow([
              ' ',
              ele.project_code,
              `${ele.resource_emp_id} - ${ele.resource_name}`,
              ele.supervisor,
              ele.start_date,
              ele.end_date,
              ele.allocation,
              ele.billable_resource,
              ele.resource_status_in_project,
            ]);
          }
        });

        // Formatting of sheet
        worksheet1.properties.defaultRowHeight = 21;
        worksheet1.properties.defaultColWidth = 20;
        worksheet1.getColumn(1).width = 5;
        worksheet1.getColumn(9).width = 25;

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
            }
          });
          // Commit the changed row to the stream
          row.commit();
        });

        // write the content using writeBuffer
        const buf = await workbook.xlsx.writeBuffer();

        // download the processed file
        SaveAs(new Blob([buf]), `${fileName}.xlsx`);
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export Resource Allocation Data',
            modalsIcon: successIcon,
            modalsMessage: 'Exported data successfully. Same excel can be used to edit and import again.',
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export Resource Allocation Data',
            modalsIcon: failureIcon,
            modalsMessage: 'No Records found.',
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
          modalsTitle: 'Export Resource Allocation Data',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource Allocation');
    }
  };

  const callGetResourceByProjectId = async (projectCode, exportExcel) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = {
      project_code: projectCode,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceAllocation/getResourceByProjectId`, body)
      .then((res) => {
        if (res.status === 200) {
          if (exportExcel) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
              },
            }));
            handleExportExcel(res.data.data);
          } else if (state.textStateValues.tempValue !== '') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showActionModal: false,
                saveIndication: false,
              },
              tableData: res.data.data,
              keyCount: res.data.data.length + 1,
              textStateValues: {
                ...state.textStateValues,
                selectedProject: projectCode,
                tempValue: '',
              },
              joiTableValidation: [],
              duplicateRecord: [],
              wrongSupervisor: [],
              allocationExceedArray: [],
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                saveIndication: false,
              },
              textStateValues: {
                ...state.textStateValues,
                selectedProject: projectCode,
              },
              tableData: res.data.data,
              keyCount: res.data.data.length + 1,
              joiTableValidation: [],
              duplicateRecord: [],
              wrongSupervisor: [],
              allocationExceedArray: [],
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
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Select Project',
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
              modalsTitle: 'Select Project',
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
                modalsTitle: 'Select Project',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
              wrongSupervisor: [],
              allocationExceedArray: [],
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
                modalsTitle: 'Select Project',
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
              modalsTitle: 'Select Project',
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
              modalsTitle: 'Select Project',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
            },
            joiTableValidation: [],
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
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
              modalsTitle: 'Select Project',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiTableValidation: [],
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
          }));
        }
      });
  };

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      project_code: '',
      resource_emp_id: '',
      resource_name: '',
      supervisor: '',
      start_date: '',
      end_date: '',
      allocation: '',
      billable_resource: '',
      resource_status_in_project: '',
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
    onChange: (selectedRowKeys, selectedRows) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys,
        selectedRows,
      }));
    },
    getCheckboxProps: (record) => {
      return {
        disabled: record.ra_id,
      };
    },
  };

  const handleActionModalOk = (key, rows) => {
    if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      if (state.textStateValues.modalsTitle === 'Clear Project') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
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
          textStateValues: {
            ...state.textStateValues,
            tempValue: '',
          },
          selectedRowKeys: [],
          selectedRows: [],
        }));
      }
    } else if (key.length > 0) {
      const selectedRow = rows.filter((data) => data.ra_id);
      if (selectedRow.length > 0) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: true,
          },
        }));
        const data = selectedRow.map((val) => {
          return val.ra_id;
        });
        axios
          .delete(`${process.env.REACT_APP_BASE_URL}/promTool/resourceAllocation/deleteResourceAllocation`, { data })
          .then((res) => {
            if (res.status === 200) {
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
                  modalsTitle: 'Delete Record',
                  modalsIcon: successIcon,
                  modalsMessage: 'Record deleted successfully.',
                  selectedProject: state.tableData.length === 1 ? '' : state.textStateValues.selectedProject,
                },
                tableData: state.tableData.filter((item) => !key.includes(item.key)),
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
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Delete Record',
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
                  modalsTitle: 'Delete Record',
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
                    modalsTitle: 'Delete Record',
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
                    modalsTitle: 'Delete Record',
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
                  modalsTitle: 'Delete Record',
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
                  modalsTitle: 'Delete Record',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Failed to delete records. Please try again.',
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
                  modalsTitle: 'Delete Record',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
                },
              }));
            }
          });
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
          duplicateRecord: [],
          wrongSupervisor: [],
          allocationExceedArray: [],
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
    }
  };

  const handleActionModalCancel = () => {
    if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      if (state.textStateValues.modalsTitle === 'Import Resource Allocation') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
          },
          tableData: initialState.tableData,
        }));
        setTimeout(() => {
          handleUploadExcel(state.textStateValues.tempValue);
        }, 10);
      } else if (state.textStateValues.modalsTitle === 'Clear Project') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
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
          selectedRows: [],
          joiTableValidation: [],
          duplicateRecord: [],
          wrongSupervisor: [],
          allocationExceedArray: [],
        }));
      } else {
        callGetResourceByProjectId(state.textStateValues.tempValue, false);
      }
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

  const actionModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      maskClosable={false}
      keyboard={false}
      centered
      closable={false}
      visible={state.booleanStateValues.showActionModal}
      onOk={handleActionModalCancel}
      onCancel={() => handleActionModalOk(state.selectedRowKeys, state.selectedRows)}
      okText={state.textStateValues.modalsMessage.length === 32 ? 'No' : 'Cancel'}
      cancelText={state.textStateValues.modalsMessage.length === 32 ? 'Yes' : 'OK'}
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

  const costPlanColumns = [
    {
      title: 'Project Name',
      dataIndex: 'resourceProjectCode',
      key: 'resourceProjectCode',
      width: 150,
    },
    {
      title: 'Month',
      dataIndex: 'resourceMonthYear',
      key: 'resourceMonthYear',
      width: 150,
    },
  ];

  const handleStatusModalOk = () => {
    if (state.booleanStateValues.constPlan) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
          constPlan: false,
        },
        textStateValues: {
          ...state.textStateValues,
          costPlanMsg: '',
        },
        costPlanData: [],
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
      {state.booleanStateValues.constPlan
        ? (
          <>
            <div style={{ marginBottom: '10px' }}>{state.textStateValues.costPlanMsg}</div>
            <Table
              columns={costPlanColumns}
              dataSource={state.costPlanData.map((d, i) => ({ key: i, ...d }))}
              pagination={false}
              bordered
              className="table-style"
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
    const selectedRow = state.selectedRows.filter((data) => data.ra_id);
    if (state.textStateValues.selectedProject !== '' && selectedRow.length > 0) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Delete Record',
          modalsIcon: optionIcon,
          // eslint-disable-next-line react/jsx-one-expression-per-line
          modalsMessage: <p>Are you sure to <b>Delete</b> selected record from Resource Allocation?</p>,
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
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceAllocation/updateAllocationResource`, body)
      .then((res) => {
        if (res.data.data.dataInfo.costPlanDataForAllMonthFromRequest.length === 0) {
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
              modalsTitle: 'Save Resource Allocation',
              modalsIcon: successIcon,
              modalsMessage: 'Data saved successfully.',
              selectedProject: '',
            },
            tableData: initialState.tableData,
            keyCount: 2,
            selectedRowKeys: [],
            selectedRows: [],
            joiTableValidation: [],
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              saveIndication: false,
              constPlan: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Allocation',
              selectedProject: '',
              costPlanMsg: <>
                <div className="prj-allocation-costplan-msg">
                  <CheckCircleTwoTone twoToneColor="#52c41a" className="prj-allocation-costplan-msg-icon" />
                  <p style={{ marginBottom: '0px' }}>Resources Allocated successfully.</p>
                </div>
                <div className="prj-allocation-costplan-msg" style={{ margin: '20px 0px 10px' }}>
                  <WarningTwoTone twoToneColor=" #FFCC00" className="prj-allocation-costplan-msg-icon" />
                  <p style={{ marginBottom: '0px' }}>Planned Cost not added for the month which is mentioned below.</p>
                </div>
              </>,
            },
            tableData: initialState.tableData,
            keyCount: 2,
            selectedRowKeys: [],
            selectedRows: [],
            costPlanData: res.data.data.dataInfo.costPlanDataForAllMonthFromRequest,
            joiTableValidation: [],
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
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
              modalsTitle: 'Save Resource Allocation',
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
              modalsTitle: 'Save Resource Allocation',
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
                modalsTitle: 'Save Resource Allocation',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
              wrongSupervisor: [],
              allocationExceedArray: [],
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
                modalsTitle: 'Save Resource Allocation',
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
              modalsTitle: 'Save Resource Allocation',
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
              modalsTitle: 'Save Resource Allocation',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to save Resource Allocation. Please try again.',
            },
            joiTableValidation: [],
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
          }));
        } else if (err.response.status === 405) {
          if (err.response.data.data.employeeSupervisorDuplicateData) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Allocation',
                modalsIcon: failureIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line
                // modalsMessage: <p>Please check highlighted <b>Supervisor {err.response.data.data.employeeSupervisorDuplicateData.length > 1 ? 'records' : 'record'}</b>. Mapped {err.response.data.data.employeeSupervisorDuplicateData.length > 1 ? 'Supervisor\'s' : 'Supervisor'} doesn&apos;t match with <b>{err.response.data.data.employeeSupervisorDuplicateData.length > 1 ? 'Employee\'s' : 'Employee'} Supervisor Data.</b></p>,
                modalsMessage: `Resource Emp ID and mapped ${err.response.data.data.employeeSupervisorDuplicateData.length > 1 ? 'Supervisor\'s' : 'Supervisor'} data mismatch.`,
              },
              wrongSupervisor: err.response.data.data.employeeSupervisorDuplicateData,
              joiTableValidation: [],
              duplicateRecord: [],
              allocationExceedArray: [],
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
                modalsTitle: 'Save Resource Allocation',
                modalsIcon: failureIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line
                // modalsMessage: <p>Allocation {err.response.data.data.duplicateDatabaseData.length > 1 ? 'are' : 'is'} already exists for the highlighted <b>Project Code, Resource Emp Id, Start Date & End Date</b> Combination</p>,
                modalsMessage: 'Duplicate data found for highlighted records.',
              },
              duplicateRecord: err.response.data.data.duplicateDatabaseData,
              joiTableValidation: [],
              wrongSupervisor: [],
              allocationExceedArray: [],
            }));
          }
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
              modalsTitle: 'Save Resource Allocation',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
            },
            joiTableValidation: err.response.data.data.errorDetails,
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
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
              modalsTitle: 'Save Resource Allocation',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line
              // modalsMessage: <p>Please check the highlighted records, <b>{err.response.data.data.indexDetails.exceededAllocationIndexArray.length === 1 ? 'Employee' : 'Employee\'s'} Allocation Exceeded 1</b></p>,
              modalsMessage: `${err.response.data.data.indexDetails.exceededAllocationIndexArray.length === 1 ? 'Resource is' : 'Resource\'s are'} overloaded.`,
            },
            joiTableValidation: [],
            duplicateRecord: [],
            wrongSupervisor: [],
            allocationExceedArray: err.response.data.data.indexDetails.exceededAllocationIndexArray,
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
              modalsTitle: 'Save Resource Allocation',
              modalsIcon: failureIcon,
              modalsMessage: 'Duplicate records found. Please check highlighted records.',
            },
            duplicateRecord: err.response.data.data,
            joiTableValidation: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
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
              modalsTitle: 'Save Resource Allocation',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            duplicateRecord: err.response.data.data,
            joiTableValidation: [],
            wrongSupervisor: [],
            allocationExceedArray: [],
          }));
        }
      });
  };

  const enableSave = state.tableData.length > 0 && state.tableData[0].project_code !== ''
    && state.tableData[0].resource_emp_id !== '' && state.tableData[0].supervisor !== ''
    && state.tableData[0].start_date !== '' && state.tableData[0].end_date !== ''
    && state.tableData[0].allocation !== '' && state.tableData[0].billable_resource !== ''
    && state.tableData[0].resource_status_in_project !== '';

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
    } else {
      callGetResourceByProjectId(value, false);
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
          saveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedProject: '',
        },
        tableData: initialState.tableData,
        keyCount: 2,
        selectedRowKeys: [],
        selectedRows: [],
        joiTableValidation: [],
        duplicateRecord: [],
        wrongSupervisor: [],
        allocationExceedArray: [],
      }));
    }
  };

  const generateExcelTemplate = async () => {
    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const fileName = 'RM_Resource_Allocation_Template';

    try {
      const worksheet1 = workbook.addWorksheet('Resource Allocation', {
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
          'Supervisor',
          'Start Date',
          'End Date',
          'Allocation',
          'Billable Resource',
          'Project Resource Status',
        ],
      ];
      worksheet1.addRows(exportTemplateTable);
      // eslint-disable-next-line no-plusplus
      for (let k = 0; k < 10; k++) {
        worksheet1.addRow(['', '', '', '', '', '', '', '', '', '']);
      }

      if (state.projectResourceList.length > 0) {
        let i = 0;
        state.projectResourceList.forEach((prj) => {
          if (userGrpName.includes('Admin') && prj.project_status !== 'Closed') {
            // eslint-disable-next-line max-len
            worksheet2.getCell(`A${i + 1}`).value = `${prj.project_code} - ${prj.project_name}`;
            i += 1;
          } else if (prj.project_group_name === localStorage.getItem('groupName') && prj.project_status !== 'Closed') {
            // eslint-disable-next-line max-len
            worksheet2.getCell(`A${i + 1}`).value = `${prj.project_code} - ${prj.project_name}`;
            i += 1;
          }
        });
      }

      if (state.resourceList.length > 0) {
        state.resourceList.forEach((emp, j) => {
          // eslint-disable-next-line max-len
          worksheet2.getCell(`B${j + 1}`).value = `${emp.resource_emp_id} - ${emp.resource_name}`;
        });
      }

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 10;
      worksheet1.getColumn(10).width = 30;

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
              formulae: [`'Project & Resource List'!$A$1:$A$${state.projectResourceList.length}`],
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
              formulae: [`'Project & Resource List'!$B$1:$B$${state.resourceList.length}`],
            };
            row.getCell('F').dataValidation = {
              type: 'date',
              showErrorMessage: true,
              allowBlank: true,
              formulae: [new Date(row.getCell('F').value)],
              errorStyle: 'error',
              errorTitle: 'Start Date',
              error: 'Start Date should be a valid Date',
            };
            row.getCell('G').dataValidation = {
              type: 'date',
              showErrorMessage: true,
              allowBlank: true,
              formulae: [new Date(row.getCell('G').value)],
              errorStyle: 'error',
              errorTitle: 'End Date',
              error: 'End Date should be a valid Date',
            };
            row.getCell('H').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.allocationList.join(',') + '"'],
            };
            row.getCell('I').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.allocationList.join(',') + '"'],
            };
            row.getCell('J').dataValidation = {
              type: 'list',
              allowBlank: true,
              error: 'Please use the drop down to select a valid value',
              errorTitle: 'Invalid Selection',
              showErrorMessage: true,
              // eslint-disable-next-line prefer-template, quotes
              formulae: ['"' + state.resourceStatusList.map((status) => status.resource_status).join(',') + '"'],
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
          modalsTitle: 'Export Resource Allocation Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource Allocation');
      workbook.removeWorksheet('Project & Resource List');
    }
  };

  return (
    <div>
      {roles.includes(209) ? (
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
                  <PageHeader>Resource Allocation</PageHeader>
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
                      {userGrpName.includes('Admin') ? state.projectResourceList.length > 0 && <Select.Option key="All" value="All">All</Select.Option> : null}
                      {state.projectResourceList.map((prj) => {
                        if (userGrpName.includes('Admin')) {
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
                        }
                        if (prj.project_group_name === localStorage.getItem('groupName')) {
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
                        }
                        return null;
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select Project to view/add/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <div>
                    <Space>
                      <Upload
                        accept=".xlsx, .xlsm"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadExcel}
                      >
                        <Tooltip placement="bottom" title="Import Resource Allocation">
                          <Button type="primary">
                            <UploadOutlined />
                            Import Data
                          </Button>
                        </Tooltip>
                      </Upload>
                      <Tooltip placement="bottom" title="Save Resource Allocation">
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
                        <a href="/rm-tool/help/project-management/resource-allocation" target="_blank">
                          <QuestionCircleOutlined className="help-icon" />
                        </a>
                      </Tooltip>
                    </Space>
                  </div>
                </div>
                <div className="table-border">
                  <div className="table-btn-flex">
                    <Space>
                      <Tooltip placement="bottom" title="Add Resource Allocation">
                        <Button
                          type="primary"
                          onClick={handleAddClick}
                        >
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
                      <Tooltip placement="bottom" title="Export Template to add new Resource Allocation data">
                        <Button onClick={generateExcelTemplate}>
                          <DownloadOutlined />
                          Export Template
                        </Button>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Export Allocated data to Excel">
                        <Button type="primary" onClick={() => callGetResourceByProjectId('All', true)}>
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
                    rowKey="key"
                    rowSelection={rowSelection}
                    scroll={{ x: 200, y: 400 }}
                    size="small"
                  />
                  {actionModal}
                  {statusModal}
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

export default ResourceAllocation;
