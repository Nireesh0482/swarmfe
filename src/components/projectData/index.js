/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line, no-param-reassign, max-len */
import React, { useEffect, useState } from 'react';
import {
  DatePicker, Input, Select, Table, Spin, PageHeader, Button, Space, Tooltip, Modal, Upload, Tabs,
  Typography, InputNumber, Radio,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, UploadOutlined, SaveFilled, CloseCircleFilled,
  CheckCircleFilled, StarFilled, QuestionCircleOutlined, InfoCircleOutlined, InfoCircleTwoTone, DownloadOutlined,
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
  projectTypeList: [],
  projectStatusList: [],
  projectList: [],
  avgEnggCostList: [],
  tempValue: [],
  booleanStateValues: {
    isLoading: true,
    saveClick: false,
    isLoadingResource: false,
    showActionModal: false,
    editableData: false,
    enableAdd: false,
    showStatusModal: false,
    saveIndication: false,
    projectSelected: false,
    deleteResourceRow: false,
    dependencyValue: false,
    focus: false,
    resourceFocus: false,
    resourceSaveIndication: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedProject: '',
    radioValue: '',
    searchValue: '',
  },
  tableData: [
    {
      key: 1,
      project_name: '',
      project_code: '',
      project_bu_name: '',
      project_bu_head: '',
      project_manager: '',
      project_type: '',
      project_start_date: '',
      project_end_date: '',
      po_ro_sow_number: '',
      po_ro_sow_value: '',
      project_status: '',
    },
  ],
  keyCount: 2,
  selectedRowKeys: [],
  selectedValue: [],
  filterTable: [],
  resourcePlanningData: [
    {
      key: 1,
      project_code: '',
      month_year: '',
      planned_resource: '',
      planned_cost: '',
    },
  ],
  keyCountValue: 2,
  resourceSelectedRowKeys: [],
  joiTableValidation: [],
  duplicatePrjList: [],
  duplicatePrjNameList: [],
  joiPlanningTableValidation: [],
  duplicatePlanningTableRecord: [],
};

const { TabPane } = Tabs;

const ProjectData = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const lightRed = '#fc8f83';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/getAllProjects`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          projectList: res.data.data,
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

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/getAllProjectGroupNames`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          groupDetailsList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/getAllProjTypes`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          projectTypeList: res.data.data,
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/getAllProjStatus`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          projectStatusList: res.data.data,
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
  }, []);

  const beforeUpload = (file, fileList, key) => {
    if (key === 'Project Data') {
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
            modalsTitle: 'Import Project Data',
            modalsIcon: optionIcon,
            modalsMessage: 'Do you want to save the changes?',
          },
          tempValue: [files],
        }));
        return Upload.LIST_IGNORE;
      }
      return false;
    }
    if (key === 'Resource Planning') {
      if (state.booleanStateValues.resourceSaveIndication) {
        const files = { file, fileList };
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Import Resource Planning',
            modalsIcon: optionIcon,
            modalsMessage: 'Do you want to save the changes?',
          },
          tempValue: [files],
        }));
        return Upload.LIST_IGNORE;
      }
      return false;
    }
    return false;
  };

  const handleUploadExcel = (e, key) => {
    if (key === 'Project Data') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          isLoading: true,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          isLoadingResource: true,
        },
      }));
    }
    const reader = new FileReader();
    let errRow = [];
    // evt = on_file_select event
    reader.onload = (evt) => {
      try {
        if (key === 'Project Data') {
          // Parse data
          const data = evt.target.result;
          const wb = XLSX.read(data, { type: 'binary', cellDates: true });
          const sheet = wb.SheetNames[0];
          const excel = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: null });
          // eslint-disable-next-line no-shadow
          const excelData = excel.map((row, index) => Object.keys(row).reduce((obj, key) => {
            const object = obj;
            object.key = index + 1;
            if (key.trim() === '' || key.trim() === '__EMPTY' || key.trim() === null) {
              delete object[key];
            } else if (key.trim() === 'Type of the Project') {
              object.project_type = row[key] === null ? '' : row[key].toString().trim();
            } else if (key.trim() === 'Project Start Date') {
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key] === null
                ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
            } else if (key.trim() === 'Project End Date') {
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key] === null
                ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
            } else if (key.trim() === 'Project BU Head' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
            } else if (key.trim() === 'Project BU Head'
              && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
              errRow.push(object.project_code);
            } else if (key.trim() === 'Project Manager' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
            } else if (key.trim() === 'Project Manager'
              && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
              errRow.push(object.project_code);
            } else if (row[key] === null) {
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = '';
            } else {
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
                modalsTitle: 'Import Project Data',
                modalsIcon: failureIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
                modalsMessage: <p>Minimum length of &apos;Project BU Head&apos; should be 4. Please check the records of &apos;Project Code&apos; (<b>{errRow.join(', ')}</b>).</p>,
              },
            }));
            errRow = [];
          } else if (excelData[0].project_code !== undefined && excelData[0].project_name !== undefined) {
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
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Import Project Data',
                modalsIcon: infoIcon,
                modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
                searchValue: '',
              },
              filterTable: [],
              tableData: excelData,
              keyCount: excelData.length + 1,
              joiTableValidation: [],
              duplicatePrjList: [],
              duplicatePrjNameList: [],
              selectedValue: [],
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
                modalsTitle: 'Import Project Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Invalid excel for Project Data.',
                searchValue: '',
              },
              filterTable: [],
              tempValue: [],
            }));
          }
        } else if (key === 'Resource Planning') {
          // Parse data
          const data = evt.target.result;
          const wb = XLSX.read(data, { type: 'binary', cellDates: true });
          const sheet = wb.SheetNames[0];
          const excel = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: null });
          // eslint-disable-next-line no-shadow
          const excelData = excel.map((row, index) => Object.keys(row).reduce((obj, key) => {
            const object = obj;
            object.key = index + 1;
            if (key.trim() === '' || key.trim() === '__EMPTY' || key.trim() === null) {
              delete object[key];
            } else if (key.trim() === 'Project Code') {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
            } else if (key.trim() === 'Month') {
              if (typeof (row[key]) === 'object') {
                object.month_year = moment(new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0]).format('YYYY-MM');
              } else {
                object.month_year = moment(row[key].toString().trim()).format('YYYY-MM');
              }
            } else if (key.trim() === 'Planned Resource') {
              const prjGroup = state.projectList.filter((prj) => {
                return prj.project_code === object.project_code;
              });
              const cost = state.avgEnggCostList.filter((item) => {
                return (item.bu_name === prjGroup[0].project_bu_name && item.average_engg_date === object.month_year);
              });
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key] === null ? '' : row[key].toString().trim();
              object.planned_cost = cost.length > 0 ? cost[0].average_engg_cost * row[key].toString().trim() : '';
            } else if (row[key] === null) {
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = '';
            } else {
              object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key].toString().trim();
            }
            return object;
          }, {}));
          if (excelData[0].project_code !== undefined && excelData[0].planned_resource !== undefined) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                enableAdd: false,
                showStatusModal: true,
                resourceSaveIndication: true,
                showActionModal: false,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Import Resource Planning Data',
                modalsIcon: infoIcon,
                modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
                selectedProject: '',
              },
              resourcePlanningData: excelData,
              keyCountValue: excelData.length + 1,
              joiPlanningTableValidation: [],
              duplicatePlanningTableRecord: [],
              tempValue: [],
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                resourceSaveIndication: false,
                showStatusModal: true,
                showActionModal: false,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Import Resource Planning Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Invalid excel for Resource Planning Data.',
              },
              tempValue: [],
            }));
          }
        }
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
            isLoadingResource: false,
            saveIndication: key === 'Project Data' ? false : state.booleanStateValues.saveIndication,
            resourceSaveIndication: key === 'Resource Planning' ? false : state.booleanStateValues.resourceSaveIndication,
            showStatusModal: true,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: `Import ${key === 'Project Data' ? 'Project' : 'Resource Planning'} Data`,
            modalsIcon: failureIcon,
            modalsMessage: `Invalid excel for ${key === 'Project Data' ? 'Project' : 'Resource Planning'} Data.`,
            searchValue: '',
          },
          filterTable: [],
          tempValue: [],
        }));
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const callProjectResourcePlan = (value) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoadingResource: true,
        showActionModal: false,
      },
    }));
    const body = { project_code: value[0] };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceAllocation/getAllProjectResourcePlan`, body)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoadingResource: false,
            resourceSaveIndication: false,
            enableAdd: true,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedProject: value[0],
          },
          resourcePlanningData: res.data.data,
          joiPlanningTableValidation: [],
          duplicatePlanningTableRecord: [],
          tempValue: [],
        }));
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingResource: false,
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
              isLoadingResource: false,
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
                isLoadingResource: false,
                showActionModal: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Select Project',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              joiPlanningTableValidation: [],
              duplicatePlanningTableRecord: [],
            }));
          } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
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
              isLoadingResource: false,
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
              isLoadingResource: false,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Select Project',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
            },
            joiPlanningTableValidation: [],
            duplicatePlanningTableRecord: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingResource: false,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Select Project',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiPlanningTableValidation: [],
            duplicatePlanningTableRecord: [],
          }));
        }
      });
  };

  const handleInputChange = (e, index, key) => {
    if (e === null) {
      if (key === 'planned_resource') {
        setState((prevState) => ({
          ...prevState,
          resourcePlanningData: prevState.resourcePlanningData.map((item, i) => {
            return index === i ? { ...item, planned_resource: '', planned_cost: '' } : item;
          }),
        }));
      }
    } else if (e.target === undefined) {
      const prjGroup = state.projectList.filter((prj) => {
        return prj.project_code === state.resourcePlanningData[index].project_code;
      });

      const cost = state.avgEnggCostList.filter((item) => {
        return (item.bu_name === prjGroup[0].project_bu_name && item.average_engg_date === state.resourcePlanningData[index].month_year);
      });
      if (key === 'planned_resource') {
        if (state.booleanStateValues.resourceSaveIndication) {
          setState((prevState) => ({
            ...prevState,
            resourcePlanningData: prevState.resourcePlanningData.map((item, i) => {
              return index === i ? { ...item, planned_resource: e === 0 ? '0' : e, planned_cost: cost[0].average_engg_cost * e } : item;
            }),
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              resourceSaveIndication: true,
            },
            resourcePlanningData: prevState.resourcePlanningData.map((item, i) => {
              return index === i ? { ...item, planned_resource: e === 0 ? '0' : e, planned_cost: cost[0].average_engg_cost * e } : item;
            }),
          }));
        }
      }
    } else if (state.booleanStateValues.saveIndication) {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [name]: value } : item;
        }),
      }));
    } else {
      const { name, value } = e.target;
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

  const handleDateChange = (_, dateString, index, keyName) => {
    if (keyName === 'project_start_date') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString, project_end_date: '' } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString, project_end_date: '' } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    } else if (keyName === 'project_end_date') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    } else if (keyName === 'month_year') {
      const prjGroup = state.projectList.filter((prj) => {
        return prj.project_code === state.resourcePlanningData[index].project_code;
      });
      const cost = state.avgEnggCostList.filter((item) => {
        return (item.bu_name === prjGroup[0].project_bu_name && item.average_engg_date === dateString);
      });
      if (dateString !== '' && cost.length === 0) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Resource Planning',
            modalsIcon: failureIcon,
            modalsMessage: <p>Average Engg. Cost is not defined for <b>{dateString} {prjGroup[0].project_bu_name}</b> BU. Please add and try again.</p>,
          },
        }));
      } else if (state.booleanStateValues.resourceSaveIndication) {
        setState((prevState) => ({
          ...prevState,
          resourcePlanningData: prevState.resourcePlanningData.map((item, i) => {
            return index === i ? {
              ...item, [keyName]: dateString, planned_resource: '', planned_cost: '',
            } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            resourceSaveIndication: true,
          },
          resourcePlanningData: prevState.resourcePlanningData.map((item, i) => {
            return index === i ? {
              ...item, [keyName]: dateString, planned_resource: '', planned_cost: '',
            } : item;
          }),
        }));
      }
    }
  };

  const handleChangeSelect = (keyName, index) => (value) => {
    if (keyName === 'resource_project_name') {
      if (state.booleanStateValues.resourceSaveIndication) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Select Project ',
            modalsIcon: optionIcon,
            modalsMessage: 'Do you want to save the changes?',
          },
          tempValue: [value],
        }));
      } else {
        callProjectResourcePlan([value]);
      }
    } else if (keyName === 'project_code') {
      if (state.booleanStateValues.resourceSaveIndication) {
        setState((prevState) => ({
          ...prevState,
          resourcePlanningData: prevState.resourcePlanningData.map((item, i) => {
            return index === i ? { ...item, [keyName]: value } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            resourceSaveIndication: true,
          },
          resourcePlanningData: prevState.resourcePlanningData.map((item, i) => {
            return index === i ? { ...item, [keyName]: value } : item;
          }),
        }));
      }
    } else if (keyName === 'project_bu_name') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: value[0], project_bu_head: value[1] } : item;
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
            return index === i ? { ...item, [keyName]: value[0], project_bu_head: value[1] } : item;
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
      title: 'Project Code',
      dataIndex: 'project_code',
      key: 'project_code',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_code',
        );
        const duplicateError = state.duplicatePrjList.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
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
              <Input
                autoFocus={state.booleanStateValues.focus}
                placeholder="Enter Project Code"
                name="project_code"
                value={text || null}
                disabled={state.selectedValue.length !== 0}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            autoFocus={state.booleanStateValues.focus}
            placeholder="Enter Project Code"
            name="project_code"
            value={text || null}
            disabled={state.selectedValue.length !== 0}
            onChange={(e) => handleInputChange(e, index)}
          />
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
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find((ele) => ele.indexValue === rowIndex && ele.field === 'project_name');
        const duplicateError = state.duplicatePrjNameList.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find((ele) => ele.indexValue === index && ele.field === 'project_name');
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Input
                placeholder="Enter Project Name"
                name="project_name"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="Enter Project Name"
            name="project_name"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_name !== prevRecord.project_name;
      },
    },
    {
      title: 'Project BU Name',
      dataIndex: 'project_bu_name',
      key: 'project_bu_name',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_bu_name',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_bu_name',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select BU name"
                name="project_bu_name"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('project_bu_name', index)}
                filterSort={(optionA, optionB) => optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())}
              >
                {state.groupDetailsList.map((group) => {
                  return (
                    <Select.Option
                      key={group.bu_code}
                      value={[group.bu_name, group.bu_head]}
                    >
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
            placeholder="Select BU name"
            name="project_bu_name"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('project_bu_name', index)}
            filterSort={(optionA, optionB) => optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())}
          >
            {state.groupDetailsList.map((group) => {
              return (
                <Select.Option
                  key={group.bu_code}
                  value={[group.bu_name, group.bu_head]}
                >
                  {group.bu_name}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_bu_name !== prevRecord.project_bu_name;
      },
    },
    {
      title: 'Project BU Head',
      dataIndex: 'project_bu_head',
      key: 'project_bu_head',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_bu_head',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_bu_head',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              {text ? (
                state.resourceList.map((emp) => {
                  if (text === emp.resource_emp_id) {
                    return (
                      `${text} - ${emp.resource_name}`
                    );
                  }
                  return null;
                })
              ) : (
                null
              )}
            </Tooltip>
          );
        }
        return (
          state.resourceList.map((emp) => {
            if (text === emp.resource_emp_id) {
              return (
                `${text} - ${emp.resource_name}`
              );
            }
            return null;
          })
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_bu_head !== prevRecord.project_bu_head;
      },
    },
    {
      title: 'Project Manager',
      dataIndex: 'project_manager',
      key: 'project_manager',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_manager',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_manager',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Project Manager"
                name="project_manager"
                value={text || null}
                onSelect={handleChangeSelect('project_manager', index)}
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
            placeholder="Select Project Manager"
            name="project_manager"
            value={text || null}
            onSelect={handleChangeSelect('project_manager', index)}
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
        return record.project_manager !== prevRecord.project_manager;
      },
    },
    {
      title: 'Type of the Project',
      dataIndex: 'project_type',
      key: 'project_type',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_type',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_type',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Project Type"
                name="project_type"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('project_type', index)}
              >
                {state.projectTypeList.map((projectType) => {
                  return (
                    <Select.Option
                      key={projectType.project_type_id}
                      value={projectType.project_type}
                    >
                      {projectType.project_type}
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
            placeholder="Select Project Type"
            name="project_type"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('project_type', index)}
          >
            {state.projectTypeList.map((projectType) => {
              return (
                <Select.Option
                  key={projectType.project_type_id}
                  value={projectType.project_type}
                >
                  {projectType.project_type}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_type !== prevRecord.project_type;
      },
    },
    {
      title: 'Project Start Date',
      dataIndex: 'project_start_date',
      key: 'project_start_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_start_date',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_start_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Start Date"
                name="project_start_date"
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'project_start_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Start Date"
            name="project_start_date"
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'project_start_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_start_date !== prevRecord.project_start_date;
      },
    },
    {
      title: 'Project End Date',
      dataIndex: 'project_end_date',
      key: 'project_end_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_end_date',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_end_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select End Date"
                name="project_end_date"
                value={text ? moment(text) : undefined}
                disabledDate={(d) => {
                  return (!d || d.isBefore(moment(state.tableData[index].project_start_date).endOf('day')));
                }}
                disabled={state.tableData[index].project_start_date.length === 0}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'project_end_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select End Date"
            name="project_end_date"
            value={text ? moment(text) : undefined}
            disabledDate={(d) => {
              return (!d || d.isBefore(moment(state.tableData[index].project_start_date).endOf('day')));
            }}
            disabled={state.tableData[index].project_start_date.length === 0}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'project_end_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_end_date !== prevRecord.project_end_date;
      },
    },
    {
      title: 'PO/RO/SOW Number',
      dataIndex: 'po_ro_sow_number',
      key: 'po_ro_sow_number',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'po_ro_sow_number',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'po_ro_sow_number',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Input
                placeholder="PO/RO/SOW Number"
                name="po_ro_sow_number"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="PO/RO/SOW Number"
            name="po_ro_sow_number"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.po_ro_sow_number !== prevRecord.po_ro_sow_number;
      },
    },
    {
      title: 'PO/RO/SOW Value',
      dataIndex: 'po_ro_sow_value',
      key: 'po_ro_sow_value',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'po_ro_sow_value',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'po_ro_sow_value',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Input
                placeholder="PO/RO/SOW Value"
                name="po_ro_sow_value"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="PO/RO/SOW Value"
            name="po_ro_sow_value"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.po_ro_sow_value !== prevRecord.po_ro_sow_value;
      },
    },
    {
      title: 'Project Status',
      dataIndex: 'project_status',
      key: 'project_status',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_status',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_status',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Project status"
                name="project_status"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('project_status', index)}
              >
                {state.projectStatusList.map((status) => {
                  return (
                    <Select.Option
                      key={status.project_status_id}
                      value={status.project_status}
                    >
                      {status.project_status}
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
            placeholder="Select Project status"
            name="project_status"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('project_status', index)}
          >
            {state.projectStatusList.map((status) => {
              return (
                <Select.Option
                  key={status.project_status_id}
                  value={status.project_status}
                >
                  {status.project_status}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.project_status !== prevRecord.project_status;
      },
    },
  ];

  const enableSave = state.tableData.length > 0 && state.tableData[0].project_name !== '' && state.tableData[0].project_code !== ''
    && state.tableData[0].project_bu_name !== '' && state.tableData[0].project_bu_head !== '' && state.tableData[0].project_type !== ''
    && state.tableData[0].project_start_date !== '' && state.tableData[0].project_end_date !== '' && state.tableData[0].po_ro_sow_number !== ''
    && state.tableData[0].po_ro_sow_value !== '' && state.tableData[0].project_status !== '';

  const handleAddClick = (id) => {
    if (id === 1) {
      const newRow = {
        key: state.keyCount,
        project_name: '',
        project_code: '',
        project_bu_name: '',
        project_bu_head: '',
        project_manager: '',
        project_type: '',
        project_start_date: '',
        project_end_date: '',
        po_ro_sow_number: '',
        po_ro_sow_value: '',
        project_status: '',
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
    } else {
      const newRow = {
        key: state.keyCountValue,
        project_code: '',
        month_year: '',
        planned_resource: '',
        planned_cost: '',
      };
      if (state.booleanStateValues.resourceFocus) {
        setState((prevState) => ({
          ...prevState,
          resourcePlanningData: [...prevState.resourcePlanningData, newRow],
          keyCountValue: state.keyCountValue + 1,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            resourceFocus: true,
          },
          resourcePlanningData: [...prevState.resourcePlanningData, newRow],
          keyCountValue: state.keyCountValue + 1,
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
        disabled: state.selectedValue.length !== 0,
      };
    },
  };

  const callUpdateProjectSave = (body) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/saveUpdateProjectData`, body)
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
              dependencyValue: !state.booleanStateValues.dependencyValue,
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Project Data',
              modalsIcon: successIcon,
              modalsMessage:
                state.selectedValue.length === 0
                  ? 'Data saved successfully.'
                  : 'Data updated successfully.',
              radioValue: '',
              searchValue: '',
            },
            tableData: initialState.tableData,
            keyCount: 2,
            selectedValue: [],
            filterTable: [],
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
          }));
        } else if (res.status === 204) {
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: <><p><b>Project BU Name&apos;s</b> are not added. Add Project BU Name before adding projects.</p><p>To add : DATA MANAGEMENT -&gt; BU Details.</p></>,
              radioValue: '',
            },
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
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
              modalsTitle: 'Save Project Data',
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
              radioValue: '',
            },
          }));
        } else if (err.response.status === 304) {
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Buffer project already exists.',
              radioValue: '',
            },
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
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
                modalsTitle: 'Save Project Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
                radioValue: '',
              },
              joiTableValidation: [],
              duplicatePrjList: [],
              duplicatePrjNameList: [],
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
                modalsTitle: 'Save Project Data',
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
              modalsTitle: 'Save Project Data',
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
              saveClick: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to save Project Data. Please try again.',
              radioValue: '',
            },
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: <p>Duplicate records found. Please check highlighted <b>Project Name</b> records. Project Name already exists in database.</p>,
              radioValue: '',
            },
            duplicatePrjList: [],
            joiTableValidation: [],
            duplicatePrjNameList: err.response.data.data.duplicateData,
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Database error. Please contact the Admin.',
              radioValue: '',
            },
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              radioValue: '',
            },
            joiTableValidation: err.response.data.data.errorDetails,
            duplicatePrjList: [],
            duplicatePrjNameList: [],
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              // modalsMessage: <p>Mapped <b>Project BU Head</b> is wrong for {err.response.data.data.length > 1 ? 'Project\'s' : 'Project'} {err.response.data.data.join(', ')}</p>,
              modalsMessage: `Project BU Name & ${err.response.data.data.length > 1 ? 'employee id\'s' : 'employee id'} of Project BU Head mismatch for ${err.response.data.data.length > 1 ? 'Project\'s' : 'Project'} ${err.response.data.data.join(', ')}.`,
              radioValue: '',
            },
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
          }));
        } else if (err.response.status === 405) {
          if (err.response.data.data.duplicateRowValidateForProjectCode) {
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
                modalsTitle: 'Save Project Data',
                modalsIcon: failureIcon,
                modalsMessage: <p>Duplicate records found. Please check highlighted <b>Project Code</b> records.</p>,
                radioValue: '',
              },
              duplicatePrjList: err.response.data.data.duplicateRowValidateForProjectCode,
              joiTableValidation: [],
              duplicatePrjNameList: [],
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
                modalsTitle: 'Save Project Data',
                modalsIcon: failureIcon,
                modalsMessage: <p>Duplicate records found. Please check highlighted <b>Project Name</b> records.</p>,
                radioValue: '',
              },
              duplicatePrjNameList: err.response.data.data.duplicateRowValidateForProjectName,
              joiTableValidation: [],
              duplicatePrjList: [],
            }));
          }
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
              modalsTitle: 'Save Project Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              radioValue: '',
            },
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
          }));
        }
      });
  };

  const handleActionModalOk = (key) => {
    const resourceKey = state.resourceSelectedRowKeys;
    if ((key.length === 0 && state.booleanStateValues.deleteResourceRow === false)
      || (key.length !== 0 && state.booleanStateValues.deleteResourceRow === false)) {
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
          project_code: key,
        };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/deleteProject`, body)
          .then(() => {
            if (state.tableData.length === key.length) {
              setState((prevState) => ({
                ...prevState,
                tableData: initialState.tableData,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  showActionModal: false,
                  editableData: false,
                  dependencyValue: !state.booleanStateValues.dependencyValue,
                },
                textStateValues: {
                  ...state.textStateValues,
                  searchValue: '',
                },
                filterTable: [],
                keyCount: 2,
                selectedRowKeys: [],
                selectedValue: [],
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                tableData: prevState.tableData.filter(
                  (row) => !key.includes(row.project_code),
                ),
                booleanStateValues: {
                  ...state.booleanStateValues,
                  showActionModal: false,
                  dependencyValue: !state.booleanStateValues.dependencyValue,
                },
                selectedRowKeys: [],
                selectedValue: prevState.selectedValue.filter(
                  (item) => !key.includes(item),
                ),
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
                  modalsTitle: 'Delete Project',
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
                  modalsTitle: 'Delete Project',
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
                    modalsTitle: 'Delete Project',
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
                    modalsTitle: 'Delete Project',
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
                  modalsTitle: 'Delete Project',
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
                  modalsTitle: 'Delete Project',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Failed to delete Project Data.',
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
                  modalsTitle: 'Delete Project',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
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
            .post(`${process.env.REACT_APP_BASE_URL}/promTool/projectManagement/saveProjectData`, body)
            .then((res) => {
              if (res.status === 205) {
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Duplicate entries has been found.',
                    radioValue: '',
                    searchValue: '',
                  },
                  filterTable: [],
                }));
              } else if (res.status === 200) {
                setState((prevState) => ({
                  ...prevState,
                  booleanStateValues: {
                    ...state.booleanStateValues,
                    isLoading: false,
                    showActionModal: false,
                    showStatusModal: true,
                    saveIndication: false,
                    dependencyValue: !state.booleanStateValues.dependencyValue,
                    saveClick: false,
                  },
                  textStateValues: {
                    ...state.textStateValues,
                    modalsTitle: 'Save Project Data',
                    modalsIcon: successIcon,
                    modalsMessage: 'Data saved successfully.',
                    radioValue: '',
                  },
                  tableData: initialState.tableData,
                  keyCount: 2,
                  filterTable: [],
                  joiTableValidation: [],
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
                }));
              } else if (res.status === 204) {
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: <><p><b>Project BU Name&apos;s</b> are not added. Add Project BU Name before adding projects.</p><p>To add : DATA MANAGEMENT -&gt; BU Details.</p></>,
                    radioValue: '',
                  },
                  joiTableValidation: [],
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
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
                    modalsTitle: 'Save Project Data',
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Server down. Please try again.',
                    radioValue: '',
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
                      saveClick: false,
                    },
                    textStateValues: {
                      ...state.textStateValues,
                      modalsTitle: 'Save Project Data',
                      modalsIcon: failureIcon,
                      modalsMessage: 'Internal server error. Please contact the Admin.',
                      radioValue: '',
                    },
                    joiTableValidation: [],
                    duplicatePrjList: [],
                    duplicatePrjNameList: [],
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
                      modalsTitle: 'Save Project Data',
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Your Role access has changed. Please Login again.',
                  },
                }));
              } else if (err.response.status === 304) {
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Buffer Project already exists.',
                    radioValue: '',
                  },
                  joiTableValidation: [],
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Failed to save Project Data. Please try again.',
                    radioValue: '',
                  },
                  joiTableValidation: [],
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: <p>Duplicate records found. Please check highlighted <b>Project Name</b> records. Project Name already exists in database.</p>,
                    radioValue: '',
                  },
                  duplicatePrjList: [],
                  joiTableValidation: [],
                  duplicatePrjNameList: err.response.data.data.duplicateData,
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Database error. Please contact the Admin.',
                    radioValue: '',
                  },
                  joiTableValidation: [],
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
                    radioValue: '',
                  },
                  joiTableValidation: err.response.data.data.errorDetails,
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    // modalsMessage: <p>Mapped <b>Project BU Head</b> is wrong for {err.response.data.data.length > 1 ? 'Project\'s' : 'Project'} {err.response.data.data.join(', ')}</p>,
                    modalsMessage: `Project BU Name & ${err.response.data.data.length > 1 ? 'employee id\'s' : 'employee id'} of Project BU Head mismatch for ${err.response.data.data.length > 1 ? 'Project\'s' : 'Project'} ${err.response.data.data.join(', ')}.`,
                    radioValue: '',
                  },
                  joiTableValidation: [],
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
                }));
              } else if (err.response.status === 405) {
                if (err.response.data.data.duplicateRowValidateForProjectCode) {
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
                      modalsTitle: 'Save Project Data',
                      modalsIcon: failureIcon,
                      modalsMessage: <p>Duplicate records found. Please check highlighted <b>Project Code</b> records.</p>,
                      radioValue: '',
                    },
                    duplicatePrjList: err.response.data.data.duplicateRowValidateForProjectCode,
                    joiTableValidation: [],
                    duplicatePrjNameList: [],
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
                      modalsTitle: 'Save Project Data',
                      modalsIcon: failureIcon,
                      modalsMessage: <p>Duplicate records found. Please check highlighted <b>Project Name</b> records.</p>,
                      radioValue: '',
                    },
                    duplicatePrjList: [],
                    joiTableValidation: [],
                    duplicatePrjNameList: err.response.data.data.duplicateRowValidateForProjectName,
                  }));
                }
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
                    modalsTitle: 'Save Project Data',
                    modalsIcon: failureIcon,
                    modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
                    radioValue: '',
                  },
                  joiTableValidation: [],
                  duplicatePrjList: [],
                  duplicatePrjNameList: [],
                }));
              }
            });
        } else if (state.textStateValues.radioValue === '2') {
          callUpdateProjectSave(state.tableData);
        }
      } else if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
          },
          selectedValue: [],
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
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            tableData: prevState.tableData.filter((row) => !key.includes(row.project_code)),
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
            },
            selectedRowKeys: [],
          }));
        }
      } else if (state.tableData.length === key.length) {
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
          joiTableValidation: [],
          duplicatePrjList: [],
          duplicatePrjNameList: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: true,
            showActionModal: false,
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
    } else if (state.resourcePlanningData.length === resourceKey.length
      && state.textStateValues.selectedProject !== '') {
      setState((prevState) => ({
        ...prevState,
        resourcePlanningData: initialState.resourcePlanningData,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
          deleteResourceRow: false,
          enableAdd: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedProject: '',
        },
        keyCountValue: 2,
        resourceSelectedRowKeys: [],
      }));
    } else if (state.booleanStateValues.deleteResourceRow && state.textStateValues.selectedProject !== '') {
      setState((prevState) => ({
        ...prevState,
        resourcePlanningData: prevState.resourcePlanningData.filter((row) => !resourceKey.includes(row.id)),
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
          deleteResourceRow: false,
        },
        resourceSelectedRowKeys: [],
      }));
    } else if (state.resourcePlanningData.length === resourceKey.length) {
      setState((prevState) => ({
        ...prevState,
        resourcePlanningData: initialState.resourcePlanningData,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
          resourceSaveIndication: false,
          deleteResourceRow: false,
        },
        keyCountValue: 2,
        resourceSelectedRowKeys: [],
        joiPlanningTableValidation: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          isLoadingResource: true,
        },
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          resourcePlanningData: prevState.resourcePlanningData.filter((row) => !resourceKey.includes(row.key)),
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoadingResource: false,
            showActionModal: false,
            deleteResourceRow: false,
            resourceFocus: false,
          },
          resourceSelectedRowKeys: [],
        }));
      }, 10);
    }
  };

  const handleActionModalCancel = () => {
    if (state.booleanStateValues.deleteResourceRow) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
          deleteResourceRow: false,
          enableAdd: false,
        },
        resourceSelectedRowKeys: [],
      }));
    } else if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      if (state.textStateValues.modalsTitle === 'Import Project Data') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
          },
          tableData: initialState.tableData,
        }));
        setTimeout(() => {
          handleUploadExcel(state.tempValue[0], 'Project Data');
        }, 10);
      } else if (state.textStateValues.modalsTitle === 'Import Resource Planning') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
          },
          resourcePlanningData: initialState.resourcePlanningData,
        }));
        setTimeout(() => {
          handleUploadExcel(state.tempValue[0], 'Resource Planning');
        }, 10);
      } else if (state.textStateValues.modalsTitle === 'Project Select'
        && state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
        if (state.tempValue.length === 0) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
              saveIndication: false,
              editableData: false,
            },
            textStateValues: {
              ...state.textStateValues,
              searchValue: '',
            },
            filterTable: [],
            tableData: initialState.tableData,
            selectedValue: [],
            keyCount: 2,
            joiTableValidation: [],
            duplicatePrjList: [],
            duplicatePrjNameList: [],
          }));
        } else if (state.tempValue.length > 0) {
          if (state.tempValue[state.tempValue.length - 1] !== 'all') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showActionModal: false,
                saveIndication: false,
                editableData: true,
              },
              tableData: state.projectList.filter((prj) => state.tempValue.slice(-1).includes(prj.project_code)),
              selectedValue: state.tempValue.slice(-1),
              tempValue: [],
              joiTableValidation: [],
              duplicatePrjList: [],
              duplicatePrjNameList: [],
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showActionModal: false,
                saveIndication: false,
                editableData: true,
              },
              tableData: state.projectList.filter((prj) => prj.project_type !== 'Buffer'),
              selectedValue: ['all'],
              tempValue: [],
              joiTableValidation: [],
              duplicatePrjList: [],
              duplicatePrjNameList: [],
            }));
          }
        }
      } else if (state.textStateValues.modalsTitle === 'Select Project '
        && state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            isLoadingResource: true,
          },
        }));
        callProjectResourcePlan(state.tempValue);
      } else {
        setState((prevState) => ({
          ...prevState,
          resourcePlanningData: initialState.resourcePlanningData,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            enableAdd: false,
            resourceSaveIndication: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedProject: '',
          },
          keyCountValue: 2,
          resourceSelectedRowKeys: [],
          joiPlanningTableValidation: [],
          duplicatePlanningTableRecord: [],
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
      okText={state.textStateValues.modalsMessage.length === undefined || state.textStateValues.modalsMessage.length === 32 ? 'No' : 'Cancel'}
      cancelText={state.textStateValues.modalsMessage.length === undefined || state.textStateValues.modalsMessage.length === 32 ? 'Yes' : 'OK'}
      cancelButtonProps={state.booleanStateValues.saveClick && { disabled: state.textStateValues.radioValue === '' }}
    >
      {state.booleanStateValues.saveClick ? (
        <Radio.Group
          onChange={handleRadioChange}
          value={state.textStateValues.radioValue}
        >
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

  const handleDeleteClick = (id) => {
    if (id === 1) {
      if (state.selectedValue.length !== 0) {
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
            modalsMessage: 'Are you sure want to Delete Project?',
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
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
          deleteResourceRow: true,
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
    if (state.selectedValue.length === 0) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
          saveClick: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Save Project Data',
          modalsMessage: '',
        },
      }));
    } else {
      callUpdateProjectSave(state.tableData);
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
          modalsTitle: 'Project Select',
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
        keyCount: 2,
        booleanStateValues: {
          ...state.booleanStateValues,
          editableData: false,
        },
        textStateValues: {
          ...state.textStateValues,
          searchValue: '',
        },
        filterTable: [],
        joiTableValidation: [],
        duplicatePrjList: [],
        duplicatePrjNameList: [],
      }));
    } else if (value.length > 0 && state.booleanStateValues.editableData) {
      if (value[value.length - 1] !== 'All') {
        const newArr = value.filter((val) => val !== 'All');
        setState((prevState) => ({
          ...prevState,
          tableData: state.projectList.filter((prj) => value.includes(prj.project_code)),
          selectedValue: newArr,
          joiTableValidation: [],
          duplicatePrjList: [],
          duplicatePrjNameList: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: state.projectList.filter((prj) => prj.project_type !== 'Buffer'),
          selectedValue: ['All'],
          joiTableValidation: [],
          duplicatePrjList: [],
          duplicatePrjNameList: [],
        }));
      }
    } else if (value.length > 0) {
      if (value[value.length - 1] !== 'All') {
        const newArr = value.filter((val) => val !== 'All');
        setState((prevState) => ({
          ...prevState,
          tableData: state.projectList.filter((prj) => value.includes(prj.project_code)),
          selectedValue: newArr,
          booleanStateValues: {
            ...state.booleanStateValues,
            editableData: true,
          },
          joiTableValidation: [],
          duplicatePrjList: [],
          duplicatePrjNameList: [],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: state.projectList.filter((prj) => prj.project_type !== 'Buffer'),
          selectedValue: ['All'],
          booleanStateValues: {
            ...state.booleanStateValues,
            editableData: true,
          },
          joiTableValidation: [],
          duplicatePrjList: [],
          duplicatePrjNameList: [],
        }));
      }
    }
  };

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
    }
  };

  const resourcePlanningColumns = [
    {
      title: 'Project Code',
      dataIndex: 'project_code',
      key: 'project_code',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiPlanningTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'project_code',
        );
        const duplicateError = state.duplicatePlanningTableRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiPlanningTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'project_code',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                autoFocus={state.booleanStateValues.resourceFocus}
                placeholder="Select Project"
                name="project_code"
                disabled={state.booleanStateValues.enableAdd}
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleChangeSelect('project_code', index)}
              >
                {state.projectList.map((prj) => {
                  if (prj.project_status !== 'Closed') {
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
            autoFocus={state.booleanStateValues.resourceFocus}
            placeholder="Select Project"
            name="project_code"
            disabled={state.booleanStateValues.enableAdd}
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleChangeSelect('project_code', index)}
          >
            {state.projectList.map((prj) => {
              if (prj.project_status !== 'Closed') {
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
      title: 'Month',
      dataIndex: 'month_year',
      key: 'month_year',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiPlanningTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'month_year',
        );
        const duplicateError = state.duplicatePlanningTableRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiPlanningTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'month_year',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                style={{ width: '100%' }}
                picker="month"
                disabled={state.booleanStateValues.enableAdd || state.resourcePlanningData[index].project_code === ''}
                placeholder="Select Month"
                name="month_year"
                value={text ? moment(text) : undefined}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'month_year')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            style={{ width: '100%' }}
            picker="month"
            disabled={state.booleanStateValues.enableAdd || state.resourcePlanningData[index].project_code === ''}
            placeholder="Select Month"
            name="month_year"
            value={text ? moment(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'month_year')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.month_year !== prevRecord.month_year;
      },
    },
    {
      title: 'Planned Resource',
      dataIndex: 'planned_resource',
      key: 'planned_resource',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiPlanningTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'planned_resource',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiPlanningTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'planned_resource',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                style={{ width: '100%' }}
                placeholder="Enter Planned Resource"
                name="planned_resource"
                value={text || null}
                disabled={state.resourcePlanningData[index].month_year.length === 0}
                onChange={(e) => handleInputChange(e, index, 'planned_resource')}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            controls={false}
            style={{ width: '100%' }}
            placeholder="Enter Planned Resource"
            name="planned_resource"
            value={text || null}
            disabled={state.resourcePlanningData[index].month_year.length === 0}
            onChange={(e) => handleInputChange(e, index, 'planned_resource')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.planned_resource !== prevRecord.planned_resource;
      },
    },
    {
      title: 'Planned Cost',
      dataIndex: 'planned_cost',
      key: 'planned_cost',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiPlanningTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'planned_cost',
        );
        const duplicateError = state.duplicatePlanningTableRecord.find((index) => index === rowIndex);
        const hasError = validationError || duplicateError;
        const colorOfBackground = hasError ? lightRed : 'transparent';
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.planned_cost !== prevRecord.planned_cost;
      },
    },
  ];

  const resourceRowSelection = {
    selectedRowKeys: state.resourceSelectedRowKeys,
    onChange: (selectedRowKeys) => {
      setState((prevState) => ({
        ...prevState,
        resourceSelectedRowKeys: selectedRowKeys,
      }));
    },
    getCheckboxProps: () => {
      return { disabled: state.textStateValues.selectedProject !== '' };
    },
  };

  const handleResourcePlanSaveClick = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoadingResource: true,
      },
    }));
    const body = state.resourcePlanningData;
    if (state.booleanStateValues.enableAdd) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/resourceAllocation/updateProjectResourcePlan`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              resourcePlanningData: initialState.resourcePlanningData,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                enableAdd: false,
                showStatusModal: true,
                resourceSaveIndication: false,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Resource Planning',
                modalsIcon: successIcon,
                modalsMessage: 'Data updated successfully.',
                selectedProject: '',
              },
              joiPlanningTableValidation: [],
            }));
          }
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Server error. Please try again.',
              },
            }));
          } else if (err.response === undefined) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Resource Planning',
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
                  isLoadingResource: false,
                  showActionModal: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Update Resource Planning',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiPlanningTableValidation: [],
              }));
            } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoadingResource: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Update Resource Planning',
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
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Your Role access has changed. Please Login again.',
              },
            }));
          } else if (err.response.status === 405) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update Resource Planning. Please try again.',
              },
              joiPlanningTableValidation: [],
            }));
          } else if (err.response.status === 422) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiPlanningTableValidation: err.response.data.data.errorDetails,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiPlanningTableValidation: [],
            }));
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceAllocation/addProjectResourcePlan`, body)
        .then((res) => {
          if (res.status === 201) {
            setState((prevState) => ({
              ...prevState,
              resourcePlanningData: initialState.resourcePlanningData,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
                resourceSaveIndication: false,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: successIcon,
                modalsMessage: 'Data saved successfully.',
              },
              joiPlanningTableValidation: [],
              duplicatePlanningTableRecord: [],
            }));
          }
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Server error. Please try again.',
              },
            }));
          } else if (err.response === undefined) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
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
                  isLoadingResource: false,
                  showActionModal: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Planning',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiPlanningTableValidation: [],
                duplicatePlanningTableRecord: [],
              }));
            } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoadingResource: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Save Resource Planning',
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
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Your Role access has changed. Please Login again.',
              },
            }));
          } else if (err.response.status === 417) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'No Avg engg. cost declared. Please declare it and try again.',
              },
              joiPlanningTableValidation: [],
              duplicatePlanningTableRecord: [],
            }));
          } else if (err.response.status === 409) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Data for selected month already exists.',
              },
              joiPlanningTableValidation: [],
              duplicatePlanningTableRecord: [],
            }));
          } else if (err.response.status === 422) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiPlanningTableValidation: err.response.data.data.errorDetails,
              duplicatePlanningTableRecord: [],
            }));
          } else if (err.response.status === 405) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Duplicate records found. Please check highlighted records.',
              },
              duplicatePlanningTableRecord: err.response.data.data,
              joiPlanningTableValidation: [],
            }));
          } else if (err.response.status === 406) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Duplicate records found. Please check highlighted records. Data with Project Name & Month already present.',
              },
              duplicatePlanningTableRecord: err.response.data.data,
              joiPlanningTableValidation: [],
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Resource Planning',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              duplicatePlanningTableRecord: [],
              joiPlanningTableValidation: [],
            }));
          }
        });
    }
  };

  const enableRPSave = state.resourcePlanningData.length > 0 && state.resourcePlanningData[0].project_name !== ''
    && state.resourcePlanningData[0].month_year !== '' && state.resourcePlanningData[0].planned_resource !== '';

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredData = state.tableData.filter((key) => Object.keys(key).some((data) => String(key[data]).toLowerCase().includes(e.target.value.toLowerCase())));
      const filteredArray = [];
      filteredData.forEach((prj) => {
        if (prj.project_code) {
          filteredArray.push(prj.project_code);
        } else {
          filteredArray.push(prj.project_code);
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

  const handleClear = () => {
    if (state.booleanStateValues.resourceSaveIndication) {
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
        resourcePlanningData: initialState.resourcePlanningData,
        booleanStateValues: {
          ...state.booleanStateValues,
          enableAdd: false,
          resourceSaveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedProject: '',
        },
        keyCountValue: 2,
        resourceSelectedRowKeys: [],
        joiPlanningTableValidation: [],
        duplicatePlanningTableRecord: [],
      }));
    }
  };

  const generateExcelTemplate = async (key) => {
    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const fileName = `RM_${key === 'Project Data' ? 'Project_Data' : 'Resource_Planning'}_Template`;

    try {
      const worksheet1 = workbook.addWorksheet(key, {
        views: [{ showGridLines: false }],
      });
      const worksheet2 = workbook.addWorksheet(key === 'Project Data' ? 'Project BU Name' : 'Project List');
      const exportTemplateTable = [
        [],
        key === 'Project Data' ? [
          ' ',
          'Sl. No.',
          'Project Code',
          'Project Name',
          'Project BU Name',
          'Project BU Head',
          'Project Manager',
          'Type of the Project',
          'Project Start Date',
          'Project End Date',
          'PO/RO/SOW Number',
          'PO/RO/SOW Value',
          'Project Status',
        ] : [
          ' ',
          'Sl. No.',
          'Project Code',
          'Month',
          'Planned Resource',
        ],
      ];
      worksheet1.addRows(exportTemplateTable);
      // eslint-disable-next-line no-plusplus
      for (let k = 0; k < 10; k++) {
        // eslint-disable-next-line no-unused-expressions
        key === 'Project Data' ? worksheet1.addRow(['', '', '', '', '', '', '', '', '', '', '', '', '']) : worksheet1.addRow(['', '', '', '', '']);
      }

      if (key === 'Project Data' && state.groupDetailsList.length > 0) {
        state.groupDetailsList.forEach((grp, i) => {
          worksheet2.getCell(`A${i + 1}`).value = grp.bu_name;
        });
      }

      if (key === 'Project Data' && state.resourceList.length > 0) {
        let j = 0;
        state.resourceList.forEach((emp) => {
          if (emp.resource_status !== 'Inactive') {
            // eslint-disable-next-line max-len
            worksheet2.getCell(`B${j + 1}`).value = `${emp.resource_emp_id} - ${emp.resource_name}`;
            j += 1;
          }
        });
      }

      if (key === 'Resource Planning' && state.projectList.length > 0) {
        let k = 0;
        state.projectList.forEach((prj) => {
          if (prj.project_status !== 'Closed' && prj.project_code) {
            // eslint-disable-next-line max-len
            worksheet2.getCell(`A${k + 1}`).value = `${prj.project_code} - ${prj.project_name}`;
            k += 1;
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
            if (key === 'Project Data') {
              row.getCell('E').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'Project BU Name'!$A$1:$A$${state.groupDetailsList.length}`],
              };
              row.getCell('F').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'Project BU Name'!$B$1:$B$${state.resourceList.length}`],
              };
              row.getCell('G').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'Project BU Name'!$B$1:$B$${state.resourceList.length}`],
              };
              row.getCell('H').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                // eslint-disable-next-line prefer-template, quotes
                formulae: ['"' + state.projectTypeList.map((type) => type.project_type).join(',') + '"'],
              };
              row.getCell('I').dataValidation = {
                type: 'date',
                showErrorMessage: true,
                allowBlank: true,
                formulae: [new Date(row.getCell('I').value)],
                errorStyle: 'error',
                errorTitle: 'Project Start Date',
                error: 'Project Start Date should be a valid Date',
              };
              row.getCell('J').dataValidation = {
                type: 'date',
                showErrorMessage: true,
                allowBlank: true,
                formulae: [new Date(row.getCell('J').value)],
                errorStyle: 'error',
                errorTitle: 'Project End Date',
                error: 'Project End Date should be a valid Date',
              };
              row.getCell('M').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                // eslint-disable-next-line prefer-template, quotes
                formulae: ['"' + state.projectStatusList.map((status) => status.project_status).join(',') + '"'],
              };
            } else {
              row.getCell('C').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'Project List'!$A$1:$A$${state.projectList.length}`],
              };
            }
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
          modalsTitle: 'Export Project Data Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet(key);
      workbook.removeWorksheet(key === 'Project Data' ? 'Project BU Name' : 'Project List');
    }
  };

  return (
    <div>
      {roles.includes(208) ? (
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
                  if (action !== 'REPLACE' && (state.booleanStateValues.saveIndication || state.booleanStateValues.resourceSaveIndication)) {
                    // eslint-disable-next-line no-nested-ternary
                    return (state.booleanStateValues.saveIndication && state.booleanStateValues.resourceSaveIndication)
                      ? 'There are unsaved changes in Project Data & Resource Planning. Are you sure want to leave this page?'
                      : state.booleanStateValues.saveIndication
                        ? 'There are unsaved changes in Project Data. Are you sure want to leave this page?'
                        : 'There are unsaved changes in Resource Planning. Are you sure want to leave this page?';
                  }
                  return true;
                }}
              />
              <Tabs type="card">
                <TabPane tab="Project Data" key="1">
                  <div>
                    <div className="page-header-searchbar-flex">
                      <div className="page-header-star-flex">
                        <PageHeader>Project Data</PageHeader>
                        {state.booleanStateValues.saveIndication && (<StarFilled className="save-indication" />)}
                      </div>
                      <div>
                        <Input.Search
                          placeholder="Search by..."
                          enterButton
                          value={state.textStateValues.searchValue || null}
                          onChange={handleSearch}
                          disabled={!enableSave}
                        />
                        {state.textStateValues.searchValue !== '' && (
                          <p style={{ float: 'right' }}>
                            ({state.filterTable.length}/{state.tableData.length})
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="dropdown-btns-flex">
                      <Space>
                        <Typography>Project:</Typography>
                        <Select
                          style={{ width: '200px' }}
                          mode="multiple"
                          maxTagCount="responsive"
                          placeholder="Select Project"
                          showArrow
                          allowClear
                          filterOption={(inputValue, option) => option.children
                            .toString()
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())}
                          showSearch
                          value={state.selectedValue}
                          onChange={handleProjectSelect}
                          onInputKeyDown={handleBackspaceDisable}
                        >
                          {state.projectList.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
                          {state.projectList.map((prj) => {
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
                        <Tooltip
                          placement="bottom"
                          title="Select Project to view/update existing data"
                        >
                          <InfoCircleOutlined />
                        </Tooltip>
                      </Space>
                      <Space>
                        <Upload
                          accept=".xlsx, .xlsm"
                          showUploadList={false}
                          beforeUpload={(file, fileList) => beforeUpload(file, fileList, 'Project Data')}
                          onChange={(e) => handleUploadExcel(e, 'Project Data')}
                        >
                          <Tooltip
                            placement="bottom"
                            title="Import Project Data"
                          >
                            <Button type="primary">
                              <UploadOutlined />
                              Import Data
                            </Button>
                          </Tooltip>
                        </Upload>
                        <Tooltip placement="bottom" title="Save Project Data">
                          <Button
                            type="primary"
                            disabled={
                              !(
                                enableSave
                                && state.booleanStateValues.saveIndication
                              )
                            }
                            onClick={handleSaveClick}
                          >
                            <SaveFilled />
                            Save
                          </Button>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Help">
                          <a
                            href="/rm-tool/help/project-management/project-data"
                            target="_blank"
                          >
                            <QuestionCircleOutlined className="help-icon" />
                          </a>
                        </Tooltip>
                      </Space>
                    </div>
                  </div>

                  <div className="table-border">
                    <div className="table-btn-flex">
                      <Space>
                        <Tooltip placement="bottom" title="Add Project">
                          <Button
                            type="primary"
                            disabled={state.booleanStateValues.editableData}
                            onClick={() => handleAddClick(1)}
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
                            onClick={() => handleDeleteClick(1)}
                            disabled={state.selectedRowKeys.length === 0}
                          >
                            <DeleteOutlined />
                            Delete
                          </Button>
                        </Tooltip>
                      </Space>
                      <Tooltip placement="bottom" title="Export Template to add new Project data">
                        <Button onClick={() => generateExcelTemplate('Project Data')}>
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
                      rowKey={state.booleanStateValues.editableData ? 'project_code' : 'key'}
                      rowSelection={rowSelection}
                      rowClassName={(record) => {
                        return state.filterTable.map((prj) => (record.project_code === prj ? 'table-row-dark' : null));
                      }}
                      scroll={{ x: 200, y: 400 }}
                      size="small"
                    />
                    {statusModal}
                    {actionModal}
                  </div>
                </TabPane>
                <TabPane tab="Resource Planning" key="2">
                  <div>
                    {state.booleanStateValues.isLoadingResource ? (
                      <div className="pagecenter">
                        <Spin size="large" />
                      </div>
                    ) : (
                      <div>
                        <div className="page-header-star-flex">
                          <PageHeader>Resource Planning</PageHeader>
                          {state.booleanStateValues.resourceSaveIndication && (<StarFilled className="save-indication" />)}
                        </div>
                        <div className="dropdown-btns-flex">
                          <Space>
                            <Typography>Project:</Typography>
                            <Select
                              style={{ width: '200px' }}
                              placeholder="Select Project"
                              name="resource_project_name"
                              allowClear
                              showSearch
                              filterOption={(inputValue, option) => option.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())}
                              onClear={handleClear}
                              value={state.textStateValues.selectedProject || null}
                              onSelect={handleChangeSelect('resource_project_name')}
                            >
                              {state.projectList.length > 0 && (
                                <Select.Option key="All" value="All">
                                  All
                                </Select.Option>
                              )}
                              {state.projectList.map((prj) => {
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
                            <Tooltip
                              placement="bottom"
                              title="Select Project to view/update existing data"
                            >
                              <InfoCircleOutlined />
                            </Tooltip>
                          </Space>
                          <Space>
                            <Upload
                              accept=".xlsx, .xlsm"
                              showUploadList={false}
                              beforeUpload={(file, fileList) => beforeUpload(file, fileList, 'Resource Planning')}
                              onChange={(e) => handleUploadExcel(e, 'Resource Planning')}
                            >
                              <Tooltip
                                placement="bottom"
                                title="Import Resource Planning"
                              >
                                <Button type="primary">
                                  <UploadOutlined />
                                  Import Data
                                </Button>
                              </Tooltip>
                            </Upload>
                            <Tooltip
                              placement="bottom"
                              title="Save Resource Planning"
                            >
                              <Button
                                type="primary"
                                disabled={!(enableRPSave && state.booleanStateValues.resourceSaveIndication)}
                                onClick={handleResourcePlanSaveClick}
                              >
                                <SaveFilled />
                                Save
                              </Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Help">
                              <a
                                href="/rm-tool/help/project-management/project-data"
                                target="_blank"
                              >
                                <QuestionCircleOutlined className="help-icon" />
                              </a>
                            </Tooltip>
                          </Space>
                        </div>
                        <div className="table-border">
                          <div className="table-btn-flex">
                            <Space>
                              <Tooltip
                                placement="bottom"
                                title="Add Resource Planning"
                              >
                                <Button
                                  type="primary"
                                  onClick={() => handleAddClick(2)}
                                  disabled={state.booleanStateValues.enableAdd}
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
                                  onClick={() => handleDeleteClick(2)}
                                  disabled={
                                    state.resourceSelectedRowKeys.length === 0
                                  }
                                >
                                  <DeleteOutlined />
                                  Delete
                                </Button>
                              </Tooltip>
                            </Space>
                            <Tooltip placement="bottom" title="Export Template to add new Resource Planning data">
                              <Button onClick={() => generateExcelTemplate('Resource Planning')}>
                                <DownloadOutlined />
                                Export Template
                              </Button>
                            </Tooltip>
                          </div>
                          <Table
                            columns={resourcePlanningColumns}
                            dataSource={state.resourcePlanningData}
                            pagination={false}
                            bordered
                            rowKey={state.booleanStateValues.enableAdd ? 'id' : 'key'}
                            rowSelection={resourceRowSelection}
                            scroll={{ x: 200, y: 400 }}
                            size="small"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabPane>
              </Tabs>
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

export default ProjectData;
