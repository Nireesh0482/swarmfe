/* eslint-disable react/function-component-definition, arrow-body-style, max-len, no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  DatePicker, InputNumber, Select, Table, Spin, PageHeader, Button, Space, Tooltip,
  Modal, Typography, Upload, Input,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, QuestionCircleOutlined,
  SaveFilled, CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, StarFilled,
  UploadOutlined, InfoCircleTwoTone, DownloadOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
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
    groupSelected: false,
    dependencyValue: false,
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
      org_bu_name: '',
      org_bu_head: '',
      aop_resource: '',
      aop_cost: '',
      aop_revenue: '',
      aop_month: [],
      remarks: '',
    },
  ],
  keyCount: 2,
  selectedRowKeys: [],
  resourceList: [],
  groupDetailsList: [],
  joiTableValidation: [],
  duplicateRecord: [],
  wrongEmpList: [],
};

const { RangePicker } = DatePicker;

const GroupAndOperationalPlan = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const lightRed = '#fc8f83';
  const enableSave = state.tableData.length > 0 && state.tableData[0].org_bu_name !== '' && state.tableData[0].org_bu_head !== ''
    && state.tableData[0].aop_resource !== '' && state.tableData[0].aop_cost !== '' && state.tableData[0].aop_revenue !== ''
    && state.tableData[0].aop_month.length !== 0;

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
          modalsTitle: 'Import BU & Operational Plan',
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
          } else if (key.trim() === 'Org BU Head' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Org BU Head' && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(object.org_bu_name);
          } else if (key.trim() === 'AOP Year') {
            // if (typeof (row[key]) === 'object') {
            //   object[key.trim().replace(/\s+/g, '_').toLowerCase()] = moment(new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0]).format('YYYY-MM');
            // } else {
            //   object[key.trim().replace(/\s+/g, '_').toLowerCase()] = moment(row[key].toString().trim()).format('YYYY-MM');
            // }
            const years = row[key].toString().split(',');
            object.aop_month = [years[0].toString().trim(), years[1].toString().trim()];
          } else if (row[key] === null) {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = '';
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
              modalsTitle: 'Import BU & Operational Plan',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;BU Head&apos; should be 4. Please check the records of &apos;Org BU Name&apos; (<b>{errRow.join(', ')}</b>).</p>,
              tempValue: '',
            },
          }));
          errRow = [];
        } else if (excelData[0].org_bu_name !== undefined && excelData[0].aop_resource !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              saveIndication: true,
              groupSelected: false,
              showActionModal: false,
            },
            selectedValue: [],
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import BU & Operational Plan',
              modalsIcon: infoIcon,
              selectedGroup: '',
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
              tempValue: '',
            },
            keyCount: excelData.length + 1,
            tableData: excelData,
            joiTableValidation: [],
            duplicateRecord: [],
            wrongEmpList: [],
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
              modalsTitle: 'Import BU & Operational Plan',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel for BU & Operational Plan.',
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
            modalsTitle: 'Import BU & Operational Plan',
            modalsIcon: failureIcon,
            modalsMessage: 'Invalid excel for BU & Operational Plan.',
            tempValue: '',
          },
        }));
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      org_bu_name: '',
      org_bu_head: '',
      aop_resource: '',
      aop_cost: '',
      aop_revenue: '',
      aop_month: [],
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
        disabled: state.textStateValues.selectedGroup !== '',
      };
    },
  };

  const handleExportExcel = async (exportData, grpData) => {
    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const fileName = exportData ? `RM_Group_Operational_Plan_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}` : 'RM_Group_Operational_Plan_Template';

    try {
      const worksheet1 = workbook.addWorksheet('BU & Operational Plan', {
        views: [{ showGridLines: false }],
      });
      const exportTemplateTable = [
        [],
        [
          ' ',
          'Sl. No.',
          'Org BU Name',
          'Org BU Head',
          'AOP Year',
          'AOP Resource',
          'AOP Cost',
          'AOP Revenue',
          'Remarks',
        ],
      ];
      if (exportData) {
        exportTemplateTable[1].splice(1, 1);
      }
      worksheet1.addRows(exportTemplateTable);

      if (exportData && grpData.length > 0) {
        grpData.forEach((grp) => {
          worksheet1.addRow([
            ' ',
            grp.org_bu_name,
            grp.org_bu_head,
            `${grp.aop_month[0]}, ${grp.aop_month[1]}`,
            grp.aop_resource,
            grp.aop_cost,
            grp.aop_revenue,
            grp.remarks,
          ]);
        });
      } else {
        const worksheet2 = workbook.addWorksheet('BU Name');
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < 10; k++) {
          worksheet1.addRow(['', '', '', '', '', '', '', '', '']);
        }

        if (state.groupDetailsList.length > 0) {
          state.groupDetailsList.forEach((grp, i) => {
            worksheet2.getCell(`A${i + 1}`).value = grp.bu_name;
          });
        }
        let j = 0;
        if (state.resourceList.length > 0) {
          state.resourceList.forEach((emp) => {
            if (emp.resource_status !== 'Inactive') {
              // eslint-disable-next-line max-len
              worksheet2.getCell(`B${j + 1}`).value = `${emp.resource_emp_id} - ${emp.resource_name}`;
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
              row.getCell('C').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'BU Name'!$A$1:$A$${state.groupDetailsList.length}`],
              };
              row.getCell('D').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'BU Name'!$B$1:$B$${state.resourceList.length}`],
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
            modalsTitle: 'Export BU & Operational Plan',
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
          modalsTitle: exportData ? 'Export BU & Operational Plan Data' : 'Export BU & Operational Plan Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('BU & Operational Plan');
      workbook.removeWorksheet('BU Name');
    }
  };

  const callGetOrgGroupDetails = (grpName, exportData) => {
    if (!exportData) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          isLoading: true,
        },
      }));
    }
    const body = {
      org_bu_name: grpName,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/orgGRPAOP/getAllGRPAOP`, body)
      .then((res) => {
        if (res.status === 200) {
          if (!exportData) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showActionModal: false,
                saveIndication: false,
                groupSelected: true,
              },
              tableData: res.data.data,
              textStateValues: {
                ...state.textStateValues,
                selectedGroup: grpName,
                tempValue: '',
              },
              selectedRowKeys: [],
              joiTableValidation: [],
              duplicateRecord: [],
              wrongEmpList: [],
            }));
          } else {
            handleExportExcel(true, res.data.data);
          }
        }
      })
      .catch((err) => {
        if (exportData) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Export BU & Operational Plan',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong.',
            },
          }));
        } else if (err.message === 'Network Error') {
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
              modalsTitle: 'Select BU',
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
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Select BU',
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
                showActionModal: false,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Select BU',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
              wrongEmpList: [],
            }));
          } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
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
                modalsTitle: 'Select BU',
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
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Select BU',
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
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Select BU',
              modalsIcon: failureIcon,
              // modalsMessage: `Mapped ${err.response.data.data.employeeIdsNotInDatabase.length > 1 ? 'BU Head\'s' : 'BU Head'} ${err.response.data.data.employeeIdsNotInDatabase.join(', ')} doesn't exist in the Database`,
              modalsMessage: `${err.response.data.data.employeeIdsNotInDatabase.length > 1 ? 'Employee id\'s' : 'Employee id'} of Org BU Head doesn't exists in the database.`,
            },
            wrongEmpList: err.response.data.data.employeeNotInDatabaseIndex,
            duplicateRecord: [],
            joiTableValidation: [],
          }));
        } else if (err.response.status === 422) {
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
              modalsTitle: 'Select BU',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
            },
            joiTableValidation: err.response.data.data.errorDetails,
            duplicateRecord: [],
            wrongEmpList: [],
          }));
        } else if (err.response.status === 417) {
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
              modalsTitle: 'Select BU',
              modalsIcon: failureIcon,
              modalsMessage: 'Duplicate records found. Please check highlighted records.',
            },
            duplicateRecord: err.response.data.data.duplicateEntryInTable,
            joiTableValidation: [],
            wrongEmpList: [],
          }));
        } else {
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
              modalsTitle: 'Select BU',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiTableValidation: [],
            duplicateRecord: [],
            wrongEmpList: [],
          }));
        }
      });
  };

  const handleActionModalOk = (key) => {
    if (state.booleanStateValues.groupSelected) {
      if (state.tableData.length === key.length) {
        setState((prevState) => ({
          ...prevState,
          tableData: initialState.tableData,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            groupSelected: false,
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
          tableData: prevState.tableData.filter((row) => !key.includes(row.id)),
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
          groupSelected: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedGroup: '',
        },
        keyCount: 2,
        selectedRowKeys: [],
        joiTableValidation: [],
        wrongEmpList: [],
        duplicateRecord: [],
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
      if (state.textStateValues.modalsTitle === 'Import BU & Operational Plan') {
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
      } else if (state.textStateValues.modalsTitle === 'Clear BU') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            groupSelected: false,
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
          duplicateRecord: [],
          wrongEmpList: [],
        }));
      } else {
        callGetOrgGroupDetails(state.textStateValues.tempValue, false);
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

  const handleSelectChange = (keyName, index) => (value) => {
    if (keyName === 'org_bu_name') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? {
              ...item, [keyName]: value[0], org_bu_head: value[1],
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
              ...item, [keyName]: value[0], org_bu_head: value[1],
            } : item;
          }),
        }));
      }
    } else if (keyName === 'org_bu_head') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? {
              ...item, [keyName]: value,
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
              ...item, [keyName]: value,
            } : item;
          }),
        }));
      }
    }
  };

  const handleYearsRangeChange = (_, dateString, index) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, aop_month: dateString } : item;
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
          return index === i ? { ...item, aop_month: dateString } : item;
        }),
      }));
    }
  };

  const handleInputChange = (e, index, key) => {
    if (e === null) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [key]: '' } : item;
        }),
      }));
    } else if (e.target === undefined) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [key]: e } : item;
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
            return index === i ? { ...item, [key]: e } : item;
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
      title: 'Org BU Name',
      dataIndex: 'org_bu_name',
      key: 'org_bu_name',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'org_bu_name',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'org_bu_name',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Org BU Name"
                name="org_bu_name"
                value={text || null}
                showSearch
                autoFocus={state.booleanStateValues.focus}
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                disabled={state.textStateValues.selectedGroup !== ''}
                onSelect={handleSelectChange('org_bu_name', index)}
              >
                {state.groupDetailsList.map((group) => {
                  return (
                    <Select.Option
                      key={group.bu_code}
                      value={[group.bu_name, group.bu_head]}
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
            placeholder="Select Org BU Name"
            name="org_bu_name"
            value={text || null}
            showSearch
            autoFocus={state.booleanStateValues.focus}
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            disabled={state.textStateValues.selectedGroup !== ''}
            onSelect={handleSelectChange('org_bu_name', index)}
          >
            {state.groupDetailsList.map((group) => {
              return (
                <Select.Option
                  key={group.bu_code}
                  value={[group.bu_name, group.bu_head]}
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
        return record.org_bu_name !== prevRecord.org_bu_name;
      },
    },
    {
      title: 'Org BU Head',
      dataIndex: 'org_bu_head',
      key: 'org_bu_head',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'org_bu_head',
        );
        const wrongEmpError = state.wrongEmpList.find((ele) => ele.index === rowIndex);
        const colorOfBackground = (validationError || wrongEmpError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const wrongEmpError = state.wrongEmpList.find((el) => el.index === index && el.field === 'org_bu_head');
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'org_bu_head',
        );
        if (validationError || wrongEmpError) {
          return (
            <Tooltip title={validationError ? validationError.errorMessage : wrongEmpError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Org BU Head"
                name="org_bu_head"
                value={text || null}
                showSearch
                disabled={state.textStateValues.selectedGroup !== ''}
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onSelect={handleSelectChange('org_bu_head', index)}
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
            placeholder="Select Org BU Head"
            name="org_bu_head"
            value={text || null}
            showSearch
            disabled={state.textStateValues.selectedGroup !== ''}
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onSelect={handleSelectChange('org_bu_head', index)}
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
        return record.org_bu_head !== prevRecord.org_bu_head;
      },
    },
    {
      title: 'AOP Year',
      dataIndex: 'aop_month',
      key: 'aop_month',
      width: 250,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'aop_month',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'aop_month',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <RangePicker
                style={{ width: '100%' }}
                picker="year"
                name="aop_month"
                allowClear={false}
                value={text.length > 0 ? [dayjs(text[0]), dayjs(text[1])] : undefined}
                disabled={state.textStateValues.selectedGroup !== ''}
                onChange={(date, dateString) => handleYearsRangeChange(date, dateString, index)}
              />
            </Tooltip>
          );
        }
        return (
          <RangePicker
            style={{ width: '100%' }}
            picker="year"
            name="aop_month"
            allowClear={false}
            value={text.length > 0 ? [dayjs(text[0]), dayjs(text[1])] : undefined}
            disabled={state.textStateValues.selectedGroup !== ''}
            onChange={(date, dateString) => handleYearsRangeChange(date, dateString, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.aop_month !== prevRecord.aop_month;
      },
    },
    {
      title: 'AOP Resource',
      dataIndex: 'aop_resource',
      key: 'aop_resource',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'aop_resource',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'aop_resource',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                placeholder="Enter AOP Resource"
                name="aop_resource"
                className="input-no"
                style={{ width: '100%' }}
                value={text || null}
                onChange={(e) => handleInputChange(e, index, 'aop_resource')}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            controls={false}
            placeholder="Enter AOP Resource"
            name="aop_resource"
            className="input-no"
            style={{ width: '100%' }}
            value={text || null}
            onChange={(e) => handleInputChange(e, index, 'aop_resource')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.aop_resource !== prevRecord.aop_resource;
      },
    },
    {
      title: 'AOP Cost (₹)',
      dataIndex: 'aop_cost',
      key: 'aop_cost',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'aop_cost',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'aop_cost',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                placeholder="Enter AOP Cost"
                name="aop_cost"
                className="input-no"
                style={{ width: '100%' }}
                value={text || null}
                onChange={(e) => handleInputChange(e, index, 'aop_cost')}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            controls={false}
            placeholder="Enter AOP Cost"
            name="aop_cost"
            className="input-no"
            style={{ width: '100%' }}
            value={text || null}
            onChange={(e) => handleInputChange(e, index, 'aop_cost')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.aop_cost !== prevRecord.aop_cost;
      },
    },
    {
      title: 'AOP Revenue (₹)',
      dataIndex: 'aop_revenue',
      key: 'aop_revenue',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'aop_revenue',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'aop_revenue',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                placeholder="Enter AOP Revenue"
                name="aop_revenue"
                className="input-no"
                style={{ width: '100%' }}
                value={text || null}
                onChange={(e) => handleInputChange(e, index, 'aop_revenue')}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            controls={false}
            placeholder="Enter AOP Revenue"
            name="aop_revenue"
            className="input-no"
            style={{ width: '100%' }}
            value={text || null}
            onChange={(e) => handleInputChange(e, index, 'aop_revenue')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.aop_revenue !== prevRecord.aop_revenue;
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
                style={{ width: '100%', textAlign: 'center' }}
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
            style={{ width: '100%', textAlign: 'center' }}
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
    if (state.booleanStateValues.groupSelected) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/orgGRPAOP/updateOrgGRPAOP`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
                groupSelected: false,
                saveIndication: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update BU & Operational Plan',
                modalsIcon: successIcon,
                modalsMessage: 'Data updated successfully.',
                selectedGroup: '',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              joiTableValidation: [],
              wrongEmpList: [],
              duplicateRecord: [],
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
                modalsTitle: 'Update BU & Operational Plan',
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
                modalsTitle: 'Update BU & Operational Plan',
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
                  modalsTitle: 'Update BU & Operational Plan',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiTableValidation: [],
                wrongEmpList: [],
                duplicateRecord: [],
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
                  modalsTitle: 'Update BU & Operational Plan',
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
                modalsTitle: 'Update BU & Operational Plan',
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
                modalsTitle: 'Update BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update BU & Operational Plan. Please try again.',
              },
              joiTableValidation: [],
              wrongEmpList: [],
              duplicateRecord: [],
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
                modalsTitle: 'Update BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              wrongEmpList: [],
              duplicateRecord: [],
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
                modalsTitle: 'Update BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Duplicate records found. Please check highlighted records.',
              },
              duplicateRecord: err.response.data.data,
              joiTableValidation: [],
              wrongEmpList: [],
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
                modalsTitle: 'Update BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
              wrongEmpList: [],
              duplicateRecord: [],
            }));
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/orgGRPAOP/saveGRPAOPData`, body)
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
                modalsTitle: 'Save BU & Operational Plan',
                modalsIcon: successIcon,
                modalsMessage: 'Data saved successfully.',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              joiTableValidation: [],
              duplicateRecord: [],
              wrongEmpList: [],
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
                modalsTitle: 'Save BU & Operational Plan',
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
                modalsTitle: 'Save BU & Operational Plan',
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
                  modalsTitle: 'Save BU & Operational Plan',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiTableValidation: [],
                duplicateRecord: [],
                wrongEmpList: [],
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
                  modalsTitle: 'Save BU & Operational Plan',
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
                modalsTitle: 'Save BU & Operational Plan',
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
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save BU & Operational Plan',
                modalsIcon: failureIcon,
                // modalsMessage: `Please check highlighted ${err.response.data.data.errorDetails.length > 1 ? 'BU Head\'s cells' : 'BU Head cell'}, Org BU Head doesn't match with BU Head`,
                modalsMessage: `Org BU Name & ${err.response.data.data.errorDetails.length > 1 ? 'employee id\'s' : 'employee id'} of Org BU Head mismatch.`,
              },
              wrongEmpList: err.response.data.data.errorDetails,
              duplicateRecord: [],
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
                modalsTitle: 'Save BU & Operational Plan',
                modalsIcon: failureIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line
                // modalsMessage: <p>BU & Operational Plan {err.response.data.data.duplicateRecordRowIndex.length > 1 ? 'are' : 'is'} already exists for the highlighted <b>BU Name & Month</b> combination.</p>,
                modalsMessage: 'Duplicate data found for highlighted records.',
              },
              duplicateRecord: err.response.data.data.duplicateRecordRowIndex,
              joiTableValidation: [],
              wrongEmpList: [],
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
                modalsTitle: 'Save BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              duplicateRecord: [],
              wrongEmpList: [],
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
                modalsTitle: 'Save BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Duplicate records found. Please check highlighted records.',
              },
              duplicateRecord: err.response.data.data.duplicateEntryInTable,
              joiTableValidation: [],
              wrongEmpList: [],
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
                modalsTitle: 'Save BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
              wrongEmpList: [],
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
          modalsTitle: 'BU Select',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      callGetOrgGroupDetails(value, false);
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
          groupSelected: false,
          saveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedGroup: '',
        },
        tableData: initialState.tableData,
        keyCount: 2,
        selectedRowKeys: [],
        duplicateRecord: [],
        joiTableValidation: [],
        wrongEmpList: [],
      }));
    }
  };

  return (
    <div>
      {roles.includes(206) ? (
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
                  <PageHeader>BU & Operational Plan</PageHeader>
                  {state.booleanStateValues.saveIndication && (
                    <StarFilled className="save-indication" />
                  )}
                </div>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>BU:</Typography>
                    <Select
                      style={{ width: '200px' }}
                      placeholder="Select BU Name"
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
                      {state.groupDetailsList.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
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
                    <Upload
                      accept=".xlsx, .xlsm"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadExcel}
                    >
                      <Tooltip placement="bottom" title="Import BU & Operational Plan">
                        <Button type="primary">
                          <UploadOutlined />
                          Import Data
                        </Button>
                      </Tooltip>
                    </Upload>
                    <Tooltip placement="bottom" title="Save BU & Operational Plan">
                      <Button type="primary" onClick={handleSaveClick} disabled={!(enableSave && state.booleanStateValues.saveIndication)}>
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/data-management/bu-and-operational-plan" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <div className="table-border">
                  <div className="table-btn-flex">
                    <Space>
                      <Tooltip placement="bottom" title="Add BU & Operational Plan">
                        <Button type="primary" disabled={state.booleanStateValues.groupSelected} onClick={handleAddClick}>
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
                      <Tooltip placement="bottom" title="Export Template to add new BU & Operational Plan data">
                        <Button onClick={() => handleExportExcel(false)}>
                          <DownloadOutlined />
                          Export Template
                        </Button>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Export Existing BU & Operational Plan data to Excel">
                        <Button
                          type="primary"
                          // disabled={state.groupDetailsList.length === 0}
                          onClick={() => callGetOrgGroupDetails('All', true)}
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
                    rowKey={state.booleanStateValues.groupSelected ? 'id' : 'key'}
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

export default GroupAndOperationalPlan;
