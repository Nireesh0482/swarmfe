/* eslint-disable react/function-component-definition, arrow-body-style, max-len, no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  DatePicker, InputNumber, Select, Table, Spin, PageHeader, Button, Space, Tooltip,
  Modal, Typography, Input, Upload,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, QuestionCircleOutlined,
  SaveFilled, CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, StarFilled,
  UploadOutlined, InfoCircleTwoTone, ThunderboltFilled, DownloadOutlined,
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
    employeeSelected: false,
    dependencyValue: false,
    saveIndication: false,
    focus: false,
    enableTrigger: true,
    excelExport: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedEmployee: '',
    tempValue: '',
    startMonth: '',
  },
  tableData: [
    {
      key: 1,
      resource_emp_id: '',
      revision_start_date: '',
      revision_end_date: null,
      ctc: '',
      remarks: '',
    },
  ],
  keyCount: 2,
  selectedRowKeys: [],
  resourceList: [],
  salaryRevisionEmpList: [],
  joiTableValidation: [],
  duplicateRecord: [],
  duplicateEmpRecord: [],
};

const SalaryRevision = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const lightRed = '#fc8f83';
  const enableSave = state.tableData.length > 0 && state.tableData[0].resource_emp_id !== '' && state.tableData[0].revision_start_date !== ''
    && state.tableData[0].ctc !== '';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getUniqueEmpForSalaryRevision`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          salaryRevisionEmpList: res.data.data,
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
          modalsTitle: 'Import Salary Revision Data',
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
          object.revision_end_date = null;
          if (key.trim() === '' || key.trim() === '__EMPTY' || key.trim() === null) {
            delete object[key];
          } else if (key.trim() === 'Resource Emp ID' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Resource Emp ID' && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(row[key] === null ? '' : row[key].toString().split('-')[0].trim());
          } else if (key.trim() === 'Revision Start Date') {
            if (row[key] && row[key].length === 10) {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : moment(row[key], 'DD-MM-YYYY');
            } else {
              object[key.trim().replace(/\s+/g, '_').toLowerCase()] = row[key] === null
                ? '' : new Date(row[key].setDate(row[key].getDate() + 1)).toISOString().split('T')[0];
            }
          } else if (row[key] === null) {
            object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = '';
          } else {
            object[key.trim().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toLowerCase()] = row[key].toString().trim();
          }
          object.revision_end_date = null;
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
              modalsTitle: 'Import Salary Revision Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;Resource Emp ID&apos; should be 4. Please check the records of &apos;Resource Emp ID&apos; (<b>{errRow.join(', ')}</b>).</p>,
              tempValue: '',
            },
          }));
          errRow = [];
        } else if (excelData[0].resource_emp_id !== undefined && excelData[0].revision_start_date !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              saveIndication: true,
              employeeSelected: false,
              showActionModal: false,
            },
            selectedValue: [],
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Salary Revision Data',
              modalsIcon: infoIcon,
              selectedEmployee: '',
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
              tempValue: '',
            },
            keyCount: excelData.length + 1,
            tableData: excelData,
            joiTableValidation: [],
            duplicateRecord: [],
            duplicateEmpRecord: [],
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
              modalsTitle: 'Import Salary Revision Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel For Salary Revision Data.',
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
            modalsTitle: 'Import Salary Revision Data',
            modalsIcon: failureIcon,
            modalsMessage: 'Invalid excel For Salary Revision Data.',
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
      resource_emp_id: '',
      revision_start_date: '',
      revision_end_date: null,
      ctc: '',
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
        disabled: state.textStateValues.selectedEmployee !== '',
      };
    },
  };

  const handleExportExcel = async (salaryRevisionData) => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    // eslint-disable-next-line max-len
    const fileName = `RM_Salary_Revision_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`;

    try {
      if (salaryRevisionData.length > 0) {
        // creating worksheet1 in workbook
        const worksheet1 = workbook.addWorksheet('Salary Revision', {
          views: [{ showGridLines: false }],
        });
        const resourceMgtTable = [
          [],
          [
            ' ',
            'Resource Emp ID',
            'Revision Start Date',
            'Revision End Date',
            'CTC',
            'Remarks',
          ],
        ];
        worksheet1.addRows(resourceMgtTable);

        salaryRevisionData.forEach((ele) => {
          worksheet1.addRow([
            ' ',
            ele.resource_emp_id,
            ele.revision_start_date !== null ? moment(ele.revision_start_date).format('DD-MM-YYYY') : '',
            ele.revision_end_date !== null ? moment(ele.revision_end_date).format('DD-MM-YYYY') : '',
            ele.ctc,
            ele.remarks,
          ]);
        });

        // Formatting of sheet
        worksheet1.properties.defaultRowHeight = 21;
        worksheet1.properties.defaultColWidth = 20;
        worksheet1.getColumn(1).width = 5;

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
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            excelExport: false,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export Salary Revision Data',
            modalsIcon: failureIcon,
            modalsMessage: 'No Records found.',
            startMonth: '',
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
          modalsTitle: 'Export Salary Revision Data',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Salary Revision');
    }
  };

  const getSalaryRevisionDetails = (empId, month) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = {
      resource_emp_id: empId,
      startMonth: month,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getSalaryRevisionDetails`, body)
      .then((res) => {
        if (state.booleanStateValues.excelExport) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              excelExport: false,
              showActionModal: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              startMonth: '',
              modalsTitle: 'Export Salary Revision',
              modalsIcon: successIcon,
              modalsMessage: 'Exported data successfully.',
            },
          }));
          handleExportExcel(res.data.data);
        } else {
          setState((prevState) => ({
            ...prevState,
            tableData: res.data.data,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              employeeSelected: true,
              enableTrigger: true,
              showActionModal: false,
              saveIndication: false,
            },
            textStateValues: {
              ...state.textStateValues,
              selectedEmployee: empId,
              tempValue: '',
            },
            selectedRowKeys: [],
            joiTableValidation: [],
            duplicateRecord: [],
            duplicateEmpRecord: [],
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
              modalsTitle: 'Select Employee',
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
              modalsTitle: 'Select Employee',
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
                modalsTitle: 'Select Employee',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              selectedRowKeys: [],
              joiTableValidation: [],
              duplicateRecord: [],
              duplicateEmpRecord: [],
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
                modalsTitle: 'Select Employee',
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
              modalsTitle: 'Select Employee',
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
              modalsTitle: 'Select Employee',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
            },
            selectedRowKeys: [],
            joiTableValidation: [],
            duplicateRecord: [],
            duplicateEmpRecord: [],
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
              modalsTitle: 'Select Employee',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            selectedRowKeys: [],
            joiTableValidation: [],
            duplicateRecord: [],
            duplicateEmpRecord: [],
          }));
        }
      });
  };

  const handleActionModalOk = (key) => {
    if (state.booleanStateValues.employeeSelected) {
      if (state.tableData.length === key.length) {
        setState((prevState) => ({
          ...prevState,
          tableData: initialState.tableData,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            employeeSelected: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedEmployee: '',
          },
          keyCount: 2,
          selectedRowKeys: [],
        }));
      } else if (state.booleanStateValues.excelExport) {
        getSalaryRevisionDetails(null, state.textStateValues.startMonth);
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
          employeeSelected: false,
          saveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedEmployee: '',
        },
        keyCount: 2,
        selectedRowKeys: [],
        joiTableValidation: [],
        duplicateRecord: [],
        duplicateEmpRecord: [],
      }));
    } else if (state.booleanStateValues.excelExport) {
      getSalaryRevisionDetails(null, state.textStateValues.startMonth);
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
      if (state.textStateValues.modalsTitle === 'Import Salary Revision Data') {
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
      } else if (state.textStateValues.modalsTitle === 'Clear Employee') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            employeeSelected: false,
            saveIndication: false,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedEmployee: '',
          },
          tableData: initialState.tableData,
          keyCount: 2,
          selectedRowKeys: [],
          duplicateRecord: [],
          duplicateEmpRecord: [],
          joiTableValidation: [],
        }));
      } else {
        getSalaryRevisionDetails(state.textStateValues.tempValue, '');
      }
    } else if (state.booleanStateValues.excelExport) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          excelExport: false,
          showActionModal: false,
        },
        textStateValues: {
          ...state.textStateValues,
          startMonth: '',
        },
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

  const handleMonthChange = (_, dateString, index, id) => {
    if (id === 1) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, revision_start_date: dateString } : item;
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
            return index === i ? { ...item, revision_start_date: dateString } : item;
          }),
        }));
      }
    } else if (id === 2) {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          startMonth: dateString,
        },
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
      cancelButtonProps={state.booleanStateValues.excelExport && { disabled: state.textStateValues.startMonth === '' }}
    >
      {state.booleanStateValues.excelExport ? (
        <Space>
          <Typography>Start Month:</Typography>
          <DatePicker
            picker="month"
            placeholder="Select Start Month"
            style={{ width: '200px' }}
            value={state.textStateValues.startMonth
              ? moment(state.textStateValues.startMonth) : null}
            onChange={(date, dateString) => handleMonthChange(date, dateString, 0, 2)}
          />
        </Space>
      ) : (
        <div className="action-modal">
          {state.textStateValues.modalsIcon}
          <div>{state.textStateValues.modalsMessage}</div>
        </div>
      )}
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

  const handleSelectChange = (index) => (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? {
            ...item, resource_emp_id: value,
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
            ...item, resource_emp_id: value,
          } : item;
        }),
      }));
    }
  };

  const handleInputChange = (e, index, key) => {
    if (e === null) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, ctc: '' } : item;
        }),
      }));
    } else if (e.target === undefined) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, ctc: e } : item;
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
            return index === i ? { ...item, ctc: e } : item;
          }),
        }));
      }
    } else if (key === 'remarks') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, remarks: e.target.value } : item;
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
            return index === i ? { ...item, remarks: e.target.value } : item;
          }),
        }));
      }
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
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const duplicateEmpError = state.duplicateEmpRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError === 0 ? 1 : duplicateError || duplicateEmpError) === undefined ? 'transparent' : lightRed;
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
                disabled={state.booleanStateValues.employeeSelected}
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
            disabled={state.booleanStateValues.employeeSelected}
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
      title: 'Revision Start Date',
      dataIndex: 'revision_start_date',
      key: 'revision_start_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'revision_start_date',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'revision_start_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Select Revision Start Date"
                name="revision_start_date"
                className="date-picker"
                allowClear={false}
                value={text ? moment(text) : undefined}
                disabled={state.booleanStateValues.employeeSelected}
                disabledDate={(d) => {
                  return (d.format('YYYY-MM-DD') !== moment(d).startOf('month').format('YYYY-MM-DD'));
                }}
                onChange={(date, dateString) => handleMonthChange(date, dateString, index, 1)}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Select Revision Start Date"
            name="revision_start_date"
            className="date-picker"
            allowClear={false}
            value={text ? moment(text) : undefined}
            disabled={state.booleanStateValues.employeeSelected}
            disabledDate={(d) => {
              return (d.format('YYYY-MM-DD') !== moment(d).startOf('month').format('YYYY-MM-DD'));
            }}
            onChange={(date, dateString) => handleMonthChange(date, dateString, index, 1)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.revision_start_date !== prevRecord.revision_start_date;
      },
    },
    {
      title: 'Revision End Date',
      dataIndex: 'revision_end_date',
      key: 'revision_end_date',
      hidden: !state.booleanStateValues.employeeSelected,
      width: 150,
      // onCell: (record, rowIndex) => {
      //   const validationError = state.joiTableValidation.find(
      //     (ele) => ele.indexValue === rowIndex && ele.field === 'revision_end_date',
      //   );
      //   const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
      //   const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
      //   return {
      //     style: { backgroundColor: colorOfBackground },
      //   };
      // },
      // render: (text, record, index) => {
      //   const validationError = state.joiTableValidation.find(
      //     (ele) => ele.indexValue === index && ele.field === 'revision_end_date',
      //   );
      //   if (validationError) {
      //     return (
      //       <Tooltip title={validationError.errorMessage} placement="left">
      //         <DatePicker
      //           style={{ width: '100%' }}
      //           placeholder="Select Revision End Date"
      //           name="revision_end_date"
      //           className="date-picker"
      //           allowClear={false}
      //           value={text ? moment(text) : undefined}
      //           disabled={state.booleanStateValues.employeeSelected}
      //           onChange={(date, dateString) => handleMonthChange(date, dateString, index, 2)}
      //         />
      //       </Tooltip>
      //     );
      //   }
      //   return (
      //     <DatePicker
      //       style={{ width: '100%' }}
      //       placeholder="Select Revision End Date"
      //       name="revision_end_date"
      //       className="date-picker"
      //       allowClear={false}
      //       value={text ? moment(text) : undefined}
      //       disabled={state.booleanStateValues.employeeSelected}
      //       onChange={(date, dateString) => handleMonthChange(date, dateString, index, 2)}
      //     />
      //   );
      // },
      render: (text) => {
        return (
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Select Revision End Date"
            name="revision_end_date"
            className="date-picker"
            allowClear={false}
            value={text ? moment(text) : undefined}
            disabled
          // onChange={(date, dateString) => handleMonthChange(date, dateString, index, 2)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.revision_end_date !== prevRecord.revision_end_date;
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
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'ctc',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                controls={false}
                placeholder="Enter CTC"
                name="ctc"
                className="input-no"
                style={{ width: '100%' }}
                value={text || null}
                disabled={state.booleanStateValues.employeeSelected}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            controls={false}
            placeholder="Enter CTC"
            name="ctc"
            className="input-no"
            style={{ width: '100%' }}
            value={text || null}
            disabled={state.booleanStateValues.employeeSelected}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.ctc !== prevRecord.ctc;
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
                style={{ width: '100%', textAlign: 'center' }}
                value={text || null}
                onChange={(e) => handleInputChange(e, index, 'remarks')}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="Enter Remarks"
            name="remarks"
            style={{ width: '100%', textAlign: 'center' }}
            value={text || null}
            onChange={(e) => handleInputChange(e, index, 'remarks')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.remarks !== prevRecord.remarks;
      },
    },
  ].filter((item) => !item.hidden);

  const handleSaveClick = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;
    if (state.booleanStateValues.employeeSelected) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/updateSalaryRevisionDetails`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
                employeeSelected: false,
                saveIndication: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Revenue',
                modalsIcon: successIcon,
                modalsMessage: 'Data updated successfully.',
                selectedEmployee: '',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              joiTableValidation: [],
              duplicateRecord: [],
              duplicateEmpRecord: [],
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
                modalsTitle: 'Update Salary Revision',
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
                modalsTitle: 'Update Salary Revision',
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
                  modalsTitle: 'Update Salary Revision',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                joiTableValidation: [],
                duplicateRecord: [],
                duplicateEmpRecord: [],
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
                  modalsTitle: 'Update Salary Revision',
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
                modalsTitle: 'Update Salary Revision',
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
                modalsTitle: 'Update Salary Revision',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update Salary Revision. Please try again.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
              duplicateEmpRecord: [],
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
                modalsTitle: 'Update Salary Revision',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              duplicateRecord: [],
              duplicateEmpRecord: [],
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
                modalsTitle: 'Update Salary Revision',
                modalsIcon: failureIcon,
                modalsMessage: 'Duplicate records found. Please check highlighted records.',
              },
              duplicateRecord: err.response.data.data,
              duplicateEmpRecord: [],
              joiTableValidation: [],
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
                modalsTitle: 'Update Salary Revision',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
              duplicateEmpRecord: [],
            }));
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/saveSalaryRevision`, body)
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
                enableTrigger: state.booleanStateValues.enableTrigger ? false : state.booleanStateValues.enableTrigger,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Salary Revision',
                modalsIcon: successIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line
                modalsMessage: <>Data saved successfully.<p>Please click on <b>Trigger Revision</b> button to update CTC based on provided salary revision start date.</p></>,
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              duplicateRecord: [],
              duplicateEmpRecord: [],
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
                modalsTitle: 'Save Salary Revision',
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
                modalsTitle: 'Save Salary Revision',
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
                  modalsTitle: 'Save Salary Revision',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                duplicateRecord: [],
                duplicateEmpRecord: [],
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
                  modalsTitle: 'Save Salary Revision',
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
                modalsTitle: 'Save Salary Revision',
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
                modalsTitle: 'Save Salary Revision',
                modalsIcon: failureIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line
                modalsMessage: <p>Please check highlighted <b>Resource Emp ID</b> records. Per employee, only one Salary Revision is allowed.</p>,
              },
              duplicateEmpRecord: err.response.data.data.duplicateEntryInTable,
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
                modalsTitle: 'Save Salary Revision',
                modalsIcon: failureIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line
                modalsMessage: <p>Salary Revision is already exists for the highlighted {err.response.data.data.duplicateRecordRowIndex.length > 1 ? <b>Resource Emp Id&apos;s.</b> : <b>Resource Emp Id.</b>}</p>,
              },
              duplicateRecord: err.response.data.data.duplicateRecordRowIndex,
              duplicateEmpRecord: [],
              joiTableValidation: [],
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
                modalsTitle: 'Save Salary Revision',
                modalsIcon: failureIcon,
                modalsMessage: 'Duplicate records found. Please check highlighted records.',
              },
              duplicateRecord: err.response.data.data.duplicateEntryInTable,
              duplicateEmpRecord: [],
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
                modalsTitle: 'Save Salary Revision',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              duplicateRecord: [],
              duplicateEmpRecord: [],
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
                modalsTitle: 'Save Salary Revision',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              duplicateRecord: [],
              duplicateEmpRecord: [],
              joiTableValidation: [],
            }));
          }
        });
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
          tempValue: value,
          modalsTitle: 'Employee Select',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      getSalaryRevisionDetails(value, '');
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
          modalsTitle: 'Clear Employee',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          employeeSelected: false,
          saveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedEmployee: '',
        },
        tableData: initialState.tableData,
        keyCount: 2,
        selectedRowKeys: [],
        duplicateRecord: [],
        duplicateEmpRecord: [],
        joiTableValidation: [],
      }));
    }
  };

  const handleTriggerRevision = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/updateSalaryForEmployees`)
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              enableTrigger: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Trigger Salary Revision',
              modalsIcon: successIcon,
              modalsMessage: 'Triggered Salary Revision successfully.',
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
              modalsTitle: 'Trigger Salary Revision',
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
              modalsTitle: 'Trigger Salary Revision',
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
                modalsTitle: 'Trigger Salary Revision',
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
                modalsTitle: 'Trigger Salary Revision',
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
              modalsTitle: 'Trigger Salary Revision',
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
              modalsTitle: 'Trigger Salary Revision',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to Trigger Salary Revision.',
            },
            joiTableValidation: [],
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
              modalsTitle: 'Trigger Salary Revision',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiTableValidation: [],
          }));
        }
      });
  };

  // const save = async (fileName, data) => {
  //   try {
  //     const options = {
  //       suggestedName: fileName,
  //       types: [
  //         {
  //           description: 'Excel Files',
  //           accept: {
  //             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  //           },
  //         },
  //       ],
  //     };
  //     const newHandle = await window.showSaveFilePicker(options);
  //     console.log('newHandle', newHandle.name);
  //     const fileData = await newHandle.getFile();
  //     console.log('fileData', fileData);
  //     // create a FileSystemWritableFileStream to write to
  //     const writableStream = await newHandle.createWritable();
  //     console.log('writableStream', writableStream);
  //     // write our file
  //     await writableStream.write(data);
  //     const dd = window.requestFileSystem();
  //     console.log('dd', dd);
  //     // close the file and write the contents to disk.
  //     await writableStream.close();
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const generateExcelTemplate = async () => {
    // Create workbook and worksheet
    const workbook = new Excel.Workbook();

    const fileName = 'RM_Salary_Revision_Template';

    try {
      const worksheet1 = workbook.addWorksheet('Salary Revision', {
        views: [{ showGridLines: false }],
      });
      const worksheet2 = workbook.addWorksheet('Resource List');
      const exportTemplateTable = [
        [],
        [
          ' ',
          'Sl. No.',
          'Resource Emp ID',
          'Revision Start Date',
          'CTC',
          'Remarks',
        ],
      ];
      worksheet1.addRows(exportTemplateTable);
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
              formulae: [`'Resource List'!$A$1:$A$${state.resourceList.length}`],
            };
            row.getCell('D').dataValidation = {
              type: 'date',
              showErrorMessage: true,
              allowBlank: true,
              formulae: [new Date(row.getCell('D').value)],
              errorStyle: 'error',
              errorTitle: 'Revision Start Date',
              error: 'Revision Start Date should be a valid date',
            };
          }
        });
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      SaveAs(new Blob([buf]), `${fileName}.xlsx`);

      // save data to this location as many times as you want. first time will ask the user for permission
      // await save(`${fileName}.xlsx`, buf);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Export Salary Revision Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Salary Revision');
      workbook.removeWorksheet('Resource List');
    }
  };

  const handleExcelExport = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        excelExport: true,
        showActionModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: 'Export Data',
      },
    }));
  };

  return (
    <div>
      {roles.includes(204) ? (
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
                  <PageHeader>Salary Revision</PageHeader>
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
                      {state.salaryRevisionEmpList.map((emp) => {
                        return (
                          <Select.Option key={emp.resourceEmpId} value={emp.resourceEmpId}>
                            {emp.resourceEmpId}
                            {' - '}
                            {emp.resourceName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select Employee to view/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Tooltip placement="bottom" title="Trigger Salary Revision">
                      <Button type="primary" onClick={handleTriggerRevision} disabled={state.booleanStateValues.enableTrigger}>
                        <ThunderboltFilled />
                        Trigger Revision
                      </Button>
                    </Tooltip>
                    <Upload
                      accept=".xlsx, .xlsm"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadExcel}
                    >
                      <Tooltip placement="bottom" title="Import Salary Revision Data">
                        <Button type="primary">
                          <UploadOutlined />
                          Import Data
                        </Button>
                      </Tooltip>
                    </Upload>
                    <Tooltip placement="bottom" title="Save Salary Revision">
                      <Button type="primary" onClick={handleSaveClick} disabled={!(enableSave && state.booleanStateValues.saveIndication)}>
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/data-management/salary-revision" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <div className="table-border">
                  <div className="table-btn-flex">
                    <Space>
                      <Tooltip placement="bottom" title="Add Salary Revision">
                        <Button type="primary" disabled={state.booleanStateValues.employeeSelected} onClick={handleAddClick}>
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
                      <Tooltip placement="bottom" title="Export Template to add new Salary Revision data">
                        <Button onClick={generateExcelTemplate}>
                          <DownloadOutlined />
                          Export Template
                        </Button>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Export Salary Revision to Excel">
                        <Button onClick={handleExcelExport}>
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
                    rowKey={state.booleanStateValues.employeeSelected ? 'id' : 'key'}
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

export default SalaryRevision;
