/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Table, Spin, PageHeader, Space, Typography, Select, DatePicker, Tooltip, Button, Modal, Row, Col,
} from 'antd';
import {
  EyeFilled, DownloadOutlined, QuestionCircleOutlined, CloseCircleFilled, InfoCircleTwoTone,
} from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import Excel from 'exceljs';
import SaveAs from 'file-saver';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showTable: false,
    showStatusModal: false,
  },
  textStateValues: {
    groupName: '',
    startMonth: null,
    endMonth: null,
    resourceError: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  groupDetailsList: [],
  projectList: [],
  selectedValue: [],
  resourceCostTableData: [],
};
const ResourceAndCostUtilization = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;

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
  }, []);

  const handleSelectChange = (value, id) => {
    if (id === 2) {
      if (value[value.length - 1] !== 'All') {
        const newArr = value.filter((val) => val !== 'All');
        setState((prevState) => ({
          ...prevState,
          selectedValue: newArr,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          selectedValue: ['All'],
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          groupName: value,
        },
        selectedValue: ['All'],
      }));
    }
  };

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        groupName: '',
      },
      selectedValue: [],
    }));
  };

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
    }
  };

  const handleMonthSelect = (_, dateString, id) => {
    if (id === 1 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          startMonth: dateString,
          endMonth: null,
        },
      }));
    } else if (id === 2 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          endMonth: dateString,
        },
      }));
    } else if (id === 2 && dateString === '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          endMonth: null,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          startMonth: null,
          endMonth: null,
        },
      }));
    }
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
                modalsMessage: 'Server error. Please try again.',
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

  const handleView = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = {
      project_bu_name: state.textStateValues.groupName,
      project_code: state.selectedValue,
      start_date: state.textStateValues.startMonth,
      // eslint-disable-next-line max-len, no-nested-ternary
      end_date: (state.textStateValues.startMonth >= moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? state.textStateValues.startMonth : (state.textStateValues.startMonth !== null && state.textStateValues.startMonth < moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.endMonth,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getResourceCostUtilization`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && res.data.data.noCostPlan.length !== 0
            && state.textStateValues.startMonth === null) {
            setState((prevState) => ({
              ...prevState,
              resourceCostTableData: res.data.data.totalOutput,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource & Cost Utilization',
                modalsIcon: infoIcon,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                // modalsMessage: <><p>Planned Cost not declared for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project' : 'projects'}. We considered &apos;0&apos; as Planned Cost and showing result.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning</p></>,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                modalsMessage: <><p>Planned Cost {res.data.data.noCostPlan.length === 1 ? 'is' : 'are'} not defined for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project.' : 'projects.'} Showing records by considering Planned Cost as &apos;0&apos;.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning.</p><p>Note : Records will be displayed from {moment(Object.keys(res.data.data.totalOutput[0].monthWiseData[0])[0]).format('MMM-YY')} to {moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.</p></>,
              },
            }));
          } else if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && res.data.data.noCostPlan.length !== 0) {
            setState((prevState) => ({
              ...prevState,
              resourceCostTableData: res.data.data.totalOutput,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource & Cost Utilization',
                modalsIcon: infoIcon,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                // modalsMessage: <><p>Planned Cost not declared for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project' : 'projects'}. We considered &apos;0&apos; as Planned Cost and showing result.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning</p></>,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                modalsMessage: <><p>Planned Cost {res.data.data.noCostPlan.length === 1 ? 'is' : 'are'} not defined for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project.' : 'projects.'} Showing records by considering Planned Cost as &apos;0&apos;.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning.</p></>,
              },
            }));
            // eslint-disable-next-line max-len
          } else if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && state.textStateValues.startMonth !== null) {
            setState((prevState) => ({
              ...prevState,
              resourceCostTableData: res.data.data.totalOutput,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
              },
            }));
            // eslint-disable-next-line max-len
          } else if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && state.textStateValues.startMonth === null) {
            setState((prevState) => ({
              ...prevState,
              resourceCostTableData: res.data.data.totalOutput,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource & Cost Utilization',
                modalsIcon: infoIcon,
                // eslint-disable-next-line max-len
                modalsMessage: `Records will be displayed from ${moment(Object.keys(res.data.data.totalOutput[0].monthWiseData[0])[0]).format('MMM-YY')} to ${moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.`,
              },
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: false,
              },
              textStateValues: {
                ...state.textStateValues,
                resourceError: 'No Records Found.',
              },
            }));
          }
        } else if (res.status === 204) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showTable: false,
            },
            textStateValues: {
              ...state.textStateValues,
              resourceError: 'No Records Found.',
            },
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
              showTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource & Cost Utilization',
              modalsIcon: failureIcon,
              modalsMessage: 'Server error. Please try again.',
              resourceError: '',
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource & Cost Utilization',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
              resourceError: '',
            },
          }));
        } else if (err.response.status === 500) {
          if (err.response.data.message === 'Data not saved') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource & Cost Utilization',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
                resourceError: '',
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
                modalsTitle: 'Resource & Cost Utilization',
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
              modalsTitle: 'Resource & Cost Utilization',
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
              showTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource & Cost Utilization',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
              resourceError: '',
            },
          }));
        } else if (err.response.status === 417) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource & Cost Utilization',
              modalsIcon: failureIcon,
              modalsMessage: err.response.data.message,
              resourceError: '',
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource & Cost Utilization',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              resourceError: '',
            },
          }));
        }
      });
  };

  let tableColumns = [];
  if (state.resourceCostTableData.length > 0) {
    Object.entries(state.resourceCostTableData[0]).forEach((col, i) => {
      const monthWise = [{
        title: 'Item Names',
        dataIndex: 'types',
        key: 'types',
        width: 100,
        fixed: 'left',
        onCell: () => {
          return {
            style: { background: 'none' },
          };
        },
      }];
      if (col[0] === 'monthWiseData') {
        col[1].forEach((month) => {
          monthWise.push({
            title: moment(Object.keys(month)[0]).format('MMM-YY'),
            dataIndex: Object.keys(month)[0],
            key: i,
            width: 80,
            onCell: () => {
              return {
                style: { background: 'none' },
              };
            },
          });
        });
        tableColumns = [...tableColumns, ...monthWise];
      } else {
        tableColumns.push({
          // eslint-disable-next-line max-len
          title: col[0] === 'projectBUName' ? 'Project BU Name' : col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 100,
          fixed: 'left',
          onCell: (_, index) => {
            if (index % 6 === 0) {
              return {
                rowSpan: 6,
                style: { background: 'none' },
              };
            }
            return {
              rowSpan: 0,
              style: { background: 'none' },
            };
          },
        });
      }
    });
  }

  const tableObjects = [
    { types: 'Planned Resource Loading' },
    { types: 'Planned Resource Cost' },
    { types: 'Actual Resource Loading' },
    { types: 'Actual Cost' },
    { types: 'Diff in Cost' },
    { types: 'Cumulative Actual Cost' },
  ];

  let tableData = [];
  if (state.resourceCostTableData.length > 0) {
    state.resourceCostTableData.forEach((data) => {
      const colData = JSON.parse(JSON.stringify(tableObjects));
      colData.forEach((key) => {
        key.projectName = data.projectName;
        key.projectCode = data.projectCode;
        key.projectBUName = data.projectBUName;
      });
      data.monthWiseData.forEach((val) => {
        const keyName = Object.keys(val)[0];
        Object.values(val).forEach((value) => {
          colData[0][keyName] = value.plannedResourceLoading;
          colData[1][keyName] = parseFloat(value.plannedResourceCost).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[2][keyName] = value.actualResourceLoading;
          colData[3][keyName] = parseFloat(value.actualCost).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[4][keyName] = parseFloat(value.diffInCost).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[5][keyName] = parseFloat(value.cumulativeActualCost).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
        });
      });
      tableData = [...tableData, ...colData];
    });
  }

  // Export Excel of Single Projects
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    // eslint-disable-next-line max-len
    const fileName = `RM_Resource_&_Cost_Utilization_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet(
        'Resource & Cost Utilization',
        {
          views: [{ showGridLines: false }],
        },
      );

      const tableHeaders = [];
      if (tableColumns.length > 0) {
        Object.values(tableColumns).forEach((data) => {
          tableHeaders.push(data.title);
        });
      }

      const resourceAndCostUtilization = [
        [],
        [' ', 'Resource & Cost Utilization'],
        [],
        [' ', ...tableHeaders],
      ];
      worksheet1.addRows(resourceAndCostUtilization);

      const createResourceAndCostArray = (data) => {
        const itemName = [
          'plannedResourceLoading',
          'plannedResourceCost',
          'actualResourceLoading',
          'actualCost',
          'diffInCost',
          'cumulativeActualCost',
        ];
        const finalArray = data.flatMap(
          ({
            projectCode, projectName, projectBUName, monthWiseData,
          }) => {
            const yearMonthKeys = monthWiseData.map(
              (ele) => Object.keys(ele)[0],
            );
            const eachProjectData = [];
            itemName.forEach((eachItem, index) => {
              const result = eachItem.replace(/([A-Z])/g, ' $1');
              const eachRowArray = index === 0
                ? [projectCode, projectName, projectBUName]
                : ['', '', ''];
              yearMonthKeys.forEach((date, indx) => {
                if (indx === 0) eachRowArray.push(result.charAt(0).toUpperCase() + result.slice(1));
                const MonthItemData = monthWiseData.find(
                  (eachResource) => Object.keys(eachResource)[0] === date,
                );
                if (eachItem === 'plannedResourceCost' || eachItem === 'actualCost' || eachItem === 'diffInCost'
                  || eachItem === 'cumulativeActualCost') {
                  eachRowArray.push(parseFloat(MonthItemData[date][eachItem]).toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR',
                  }));
                } else {
                  eachRowArray.push(MonthItemData[date][eachItem]);
                }
              });

              eachProjectData.push(eachRowArray);
            });
            return eachProjectData;
          },
        );
        return finalArray;
      };

      const allResAndCostData = createResourceAndCostArray(state.resourceCostTableData);

      allResAndCostData.forEach((data) => {
        const rscCostUtilizationTableData = [[' ', ...data]];
        worksheet1.addRows(rscCostUtilizationTableData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 25;
      worksheet1.getColumn(4).width = 25;
      worksheet1.getColumn(5).width = 30;
      worksheet1.mergeCells('B2:C2');

      // Fill Color- Sheet1_Table1
      worksheet1.eachRow((row, rowNumber) => {
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          if (rowNumber === 2 && !(colNumber === 1)) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'A9F5CB' },
            };
            cell.font = {
              name: 'Calibri',
              size: 13,
              bold: true,
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'left',
              indent: 0.5,
            };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          } else if (rowNumber === 4 && !(colNumber === 1)) {
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
              horizontal: 'center',
            };
            // Set border of each cell
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          } else if (rowNumber >= 5 && !(colNumber === 1)) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'F5F5F5' },
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'left',
              indent: 0.5,
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
          modalsTitle: 'Export Resource & Cost Utilization Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource & Cost Utilization');
    }
  };

  return (
    <div>
      {roles.includes(218) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <div className="page-header-searchbar-flex">
                  <PageHeader>Resource & Cost Utilization</PageHeader>
                  <Space>
                    <Tooltip placement="bottom" title="View Resource & Cost Utilization">
                      <Button
                        type="primary"
                        disabled={state.selectedValue.length === 0}
                        onClick={handleView}
                      >
                        <EyeFilled />
                        View
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/reports/resource-and-cost-utilization" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <Row
                  gutter={[
                    16,
                    {
                      xs: 8,
                      sm: 16,
                      md: 16,
                      lg: 16,
                    },
                  ]}
                  style={{ marginTop: '16px', marginBottom: '16px' }}
                >
                  <Col span={12}>
                    <Space>
                      <Typography>BU:</Typography>
                      <Select
                        style={{ width: '250px', marginLeft: '62px' }}
                        placeholder="Select BU"
                        allowClear
                        onClear={handleClear}
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        showSearch
                        value={state.textStateValues.groupName || null}
                        onSelect={(value) => handleSelectChange(value, 1)}
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
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Project: </Typography>
                      <Select
                        style={{ width: '250px', marginLeft: '24px' }}
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
                        disabled={state.textStateValues.groupName === ''}
                        value={state.selectedValue}
                        onChange={(value) => handleSelectChange(value, 2)}
                        onInputKeyDown={handleBackspaceDisable}
                      >
                        {state.projectList.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
                        {state.projectList.map((prj) => {
                          if (prj.project_bu_name === state.textStateValues.groupName) {
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
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Start Month:</Typography>
                      <DatePicker
                        picker="month"
                        placeholder="Select Start Month"
                        style={{ width: '250px', marginLeft: '6px' }}
                        value={state.textStateValues.startMonth
                          ? moment(state.textStateValues.startMonth) : null}
                        onChange={(date, dateString) => handleMonthSelect(date, dateString, 1)}
                      />
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>End Month:</Typography>
                      <DatePicker
                        picker="month"
                        placeholder="Select End Month"
                        style={{ width: '250px' }}
                        value={state.textStateValues.endMonth
                          ? moment(state.textStateValues.endMonth) : null}
                        onChange={(date, dateString) => handleMonthSelect(date, dateString, 2)}
                        disabledDate={(d) => {
                          return !d || d.isBefore(moment(state.textStateValues.startMonth).startOf('month'));
                        }}
                        disabled={state.textStateValues.startMonth === null}
                      />
                    </Space>
                  </Col>
                </Row>
                {state.booleanStateValues.showTable
                  ? (
                    <div className="table-border">
                      <Tooltip placement="bottom" title="Export Data">
                        <Button
                          type="primary"
                          className="report-export-excel-btn"
                          onClick={handleExportExcel}
                        >
                          <DownloadOutlined />
                          Export Data
                        </Button>
                      </Tooltip>
                      <Table
                        columns={tableColumns}
                        dataSource={tableData.map((d, i) => ({ key: i, ...d }))}
                        bordered
                        className="table-style"
                        pagination={false}
                        scroll={{ x: 200, y: 600 }}
                        size="small"
                      />
                    </div>
                  ) : (
                    <div className="report-no-records-found-msg">
                      {state.textStateValues.resourceError}
                    </div>
                  )}
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

export default ResourceAndCostUtilization;
