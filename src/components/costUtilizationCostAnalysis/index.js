/* eslint-disable react/function-component-definition, arrow-body-style, dot-notation, no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Select, Typography, Space, DatePicker, Button, Tooltip, Table, Modal, Row, Col,
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
    projectStartMonth: null,
    projectEndMonth: null,
    error: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  groupDetailsList: [],
  projectList: [],
  projectTableData: [],
  projectCode: [],
};

const CostAnalysis = () => {
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
          projectCode: newArr,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          projectCode: ['All'],
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          groupName: value,
        },
        projectCode: ['All'],
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
      projectCode: [],
    }));
  };

  const handleMonthSelect = (_, dateString, id) => {
    if (id === 1 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectStartMonth: dateString,
          projectEndMonth: null,
        },
      }));
    } else if (id === 2 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectEndMonth: dateString,
        },
      }));
    } else if (id === 2 && dateString === '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectEndMonth: null,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectStartMonth: null,
          projectEndMonth: null,
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

  let tableColumns = [];
  if (state.projectTableData.length > 0) {
    Object.entries(state.projectTableData[0]).forEach((col, i) => {
      const monthWise = [{
        title: 'Expense Types',
        dataIndex: 'types',
        key: 'types',
        width: 100,
        onCell: () => {
          return {
            style: { background: 'none' },
          };
        },
      }];
      const months = [
        {
          title: 'Actuals',
          onCell: () => {
            return {
              style: { background: 'none' },
            };
          },
          children: monthWise,
        }];
      if (col[0] === 'detailedLevelData') {
        col[1].dataInArrayOfObject.forEach((month) => {
          monthWise.push({
            title: Object.keys(month)[0],
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
        tableColumns = [...tableColumns, ...months];
      } else {
        if (col[0].trim() === 'project_start_date' || col[0].trim() === 'po_ro_sow_value') {
          return;
        }
        tableColumns.push({
          // eslint-disable-next-line max-len
          title: col[0] === 'projectBUName' ? 'Project BU Name' : col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 100,
          fixed: 'left',
          onCell: (_, index) => {
            if (index % 10 === 0) {
              return {
                rowSpan: 10,
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
    { types: 'Total Salary per Allocation' },
    { types: 'Travel Expense' },
    { types: 'Cab Expense' },
    { types: 'Food Expense' },
    { types: 'Project Equipment Cost' },
    { types: 'UER' },
    { types: 'Sales Commission' },
    { types: 'Consultancy fee' },
    { types: 'Other' },
    { types: 'Total' },
  ];

  let tableData = [];
  if (state.projectTableData.length > 0) {
    state.projectTableData.forEach((data) => {
      const colData = JSON.parse(JSON.stringify(tableObjects));
      colData.forEach((key) => {
        key.projectCode = data.projectCode;
        key.projectName = data.projectName;
        key.projectBUName = data.projectBUName;
        key.totalPlannedCost = parseFloat(data.totalPlannedCost).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          style: 'currency',
          currency: 'INR',
        });
        key.totalActualCost = parseFloat(data.totalActualCost).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          style: 'currency',
          currency: 'INR',
        });
      });
      data.detailedLevelData.dataInArrayOfObject.forEach((val) => {
        const keyName = Object.keys(val)[0];
        Object.values(val).forEach((value) => {
          colData[0][keyName] = parseFloat(value['TotalSalaryPerAllocation']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[1][keyName] = parseFloat(value['Travel Expense']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[2][keyName] = parseFloat(value['Cab Expense']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[3][keyName] = parseFloat(value['Food Expense']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[4][keyName] = parseFloat(value['Project Equipment Cost']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[5][keyName] = parseFloat(value.UER).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[6][keyName] = parseFloat(value['Sales Commission']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[7][keyName] = parseFloat(value['Consultancy fee']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[8][keyName] = parseFloat(value['Other']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
          colData[9][keyName] = parseFloat(value['Total']).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          });
        });
      });
      tableData = [...tableData, ...colData];
    });
  }

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
      project_code: state.projectCode,
      start_date: state.textStateValues.projectStartMonth,
      // eslint-disable-next-line max-len, no-nested-ternary
      end_date: (state.textStateValues.projectStartMonth >= moment().format('YYYY-MM') && state.textStateValues.projectEndMonth === null) ? state.textStateValues.projectStartMonth : (state.textStateValues.projectStartMonth !== null && state.textStateValues.projectStartMonth < moment().format('YYYY-MM') && state.textStateValues.projectEndMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.projectEndMonth,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/costUtilizationDetailedLevel`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.projectDetailedLevel[0].detailedLevelData.dataInArrayOfObject.length !== 0) {
            if (res.data.data.projectDetailedLevel.length !== 0 && res.data.data.noCostPlanProjectNames.length !== 0
              && state.textStateValues.projectStartMonth === null) {
              setState((prevState) => ({
                ...prevState,
                projectTableData: res.data.data.projectDetailedLevel,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Cost Utilization Report',
                  modalsIcon: infoIcon,
                  // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                  modalsMessage: <><p>Planned Cost {res.data.data.noCostPlanProjectNames.length === 1 ? 'is' : 'are'} not defined for <b>{res.data.data.noCostPlanProjectNames.join(', ')}</b> {res.data.data.noCostPlanProjectNames.length === 1 ? 'project.' : 'projects.'} Showing records by considering Planned Cost as &apos;0&apos;.</p><p><b>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning.</b></p><p>Note : Records will be displayed from {Object.keys(res.data.data.projectDetailedLevel[0].detailedLevelData.dataInArrayOfObject[0])[0]} to {moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.</p></>,
                },
              }));
              // eslint-disable-next-line max-len
            } else if (res.data.data.projectDetailedLevel.length !== 0 && res.data.data.noCostPlanProjectNames.length !== 0) {
              setState((prevState) => ({
                ...prevState,
                projectTableData: res.data.data.projectDetailedLevel,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Cost Utilization Report',
                  modalsIcon: infoIcon,
                  // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                  modalsMessage: <><p>Planned Cost {res.data.data.noCostPlanProjectNames.length === 1 ? 'is' : 'are'} not defined for <b>{res.data.data.noCostPlanProjectNames.join(', ')}</b> {res.data.data.noCostPlanProjectNames.length === 1 ? 'project.' : 'projects.'} Showing records by considering Planned Cost as &apos;0&apos;.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning.</p></>,
                },
              }));
              // eslint-disable-next-line max-len
            } else if (state.textStateValues.projectStartMonth !== null) {
              setState((prevState) => ({
                ...prevState,
                projectTableData: res.data.data.projectDetailedLevel,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                projectTableData: res.data.data.projectDetailedLevel,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Cost Utilization Report',
                  modalsIcon: infoIcon,
                  // eslint-disable-next-line max-len
                  modalsMessage: `Records will be displayed from ${Object.keys(res.data.data.projectDetailedLevel[0].detailedLevelData.dataInArrayOfObject[0])[0]} to ${moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.`,
                },
              }));
            }
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
                error: 'No Records Found.',
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
              error: 'No Records Found.',
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
              modalsTitle: 'Cost Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Server error. Please try again.',
              error: '',
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
              modalsTitle: 'Cost Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
              error: '',
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
                modalsTitle: 'Cost Utilization Report',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
                error: '',
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
                modalsTitle: 'Cost Utilization Report',
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
              modalsTitle: 'Cost Utilization Report',
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
              modalsTitle: 'Cost Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: err.response.data.message,
              error: '',
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
              modalsTitle: 'Cost Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              error: '',
            },
          }));
        }
      });
  };

  // Export Excel
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    // eslint-disable-next-line max-len
    const fileName = `RM_Cost_Utilization_Cost_Analysis_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Cost Analysis', {
        views: [{ showGridLines: false }],
      });

      const detailedLevel = [
        [],
        [' ', 'Cost Utilization Report - Cost Analysis'],
        [],
      ];
      worksheet1.addRows(detailedLevel);

      const excelTableHeaders = [];
      const excelTableSubHeaders = [];
      if (tableColumns.length > 0) {
        Object.values(tableColumns).forEach((data) => {
          const excelTableHeadersData = [];
          excelTableHeadersData.push(data.title);

          if (!data.dataIndex) {
            for (let index = 1; index < Object.keys(data.children).length; index += 1) {
              excelTableHeadersData.push('');
            }
            Object.values(data.children).forEach((ele) => {
              excelTableSubHeaders.push(ele.title);
            });
          }
          excelTableHeaders.push(...excelTableHeadersData);
        });
        worksheet1.getRow(4).values = [' ', ...excelTableHeaders];
      }

      worksheet1.getRow(5).values = [' ', '', '', '', '', '', ...excelTableSubHeaders];

      const func = (data) => {
        const itemName = [
          'TotalSalaryPerAllocation',
          'Travel Expense',
          'Cab Expense',
          'Food Expense',
          'Project Equipment Cost',
          'UER',
          'Sales Commission',
          'Consultancy fee',
          'Other',
          'Total',
        ];
        const finalArray = data.flatMap(({
          // eslint-disable-next-line max-len
          projectCode, projectName, projectBUName, totalPlannedCost, totalActualCost, detailedLevelData: { dataInArrayOfObject },
        }) => {
          const yearMonthKeys = dataInArrayOfObject.map(
            (ele) => Object.keys(ele)[0],
          );
          const eachProjectData = [];
          itemName.forEach((eachItem, index) => {
            const eachRowArray = index === 0
              ? [
                projectCode,
                projectName,
                projectBUName,
                parseFloat(totalPlannedCost).toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'INR',
                }),
                parseFloat(totalActualCost).toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'INR',
                }),
              ]
              : ['', '', '', '', ''];
            yearMonthKeys.forEach((date, indx) => {
              if (indx === 0) {
                if (eachItem === 'TotalSalaryPerAllocation') {
                  eachRowArray.push('Total Salary Per Allocation');
                } else {
                  eachRowArray.push(eachItem);
                }
              }
              const MonthItemData = dataInArrayOfObject.find(
                (eachResource) => Object.keys(eachResource)[0] === date,
              );
              eachRowArray.push(parseFloat(MonthItemData[date][eachItem]).toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR',
              }));
            });
            eachProjectData.push(eachRowArray);
          });
          return eachProjectData;
        });
        return finalArray;
      };
      const allResAndCostData = func(state.projectTableData);

      allResAndCostData.forEach((data) => {
        const rscCostUtilizationTableData = [[' ', ...data]];
        worksheet1.addRows(rscCostUtilizationTableData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 15;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(3).width = 25;
      worksheet1.getColumn(4).width = 25;
      worksheet1.getColumn(5).width = 22;
      worksheet1.getColumn(6).width = 22;
      worksheet1.getColumn(7).width = 25;
      worksheet1.mergeCells('B2:C2');
      worksheet1.mergeCells('B4:B5');
      worksheet1.mergeCells('C4:C5');
      worksheet1.mergeCells('D4:D5');
      worksheet1.mergeCells('E4:E5');
      worksheet1.mergeCells('F4:F5');

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
          } else if ((rowNumber === 4 || rowNumber === 5) && !(colNumber === 1)) {
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
          } else if (rowNumber >= 6 && !(colNumber === 1)) {
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
          modalsTitle: 'Export Cost Utilization Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Cost Analysis');
    }
  };

  return (
    <div>
      {roles.includes(217) ? (
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
                  <PageHeader>Cost Utilization - Cost Analysis</PageHeader>
                  <Space>
                    <Tooltip placement="bottom" title="View Cost Analysis">
                      <Button
                        type="primary"
                        disabled={state.projectCode.length === 0}
                        onClick={handleView}
                      >
                        <EyeFilled />
                        View
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/reports/cost-utilization/cost-analysis" target="_blank">
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
                        allowClear
                        showSearch
                        showArrow
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        disabled={state.textStateValues.groupName === ''}
                        value={state.projectCode}
                        onChange={(value) => handleSelectChange(value, 2)}
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
                        value={state.textStateValues.projectStartMonth
                          ? moment(state.textStateValues.projectStartMonth) : null}
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
                        value={state.textStateValues.projectEndMonth
                          ? moment(state.textStateValues.projectEndMonth) : null}
                        onChange={(date, dateString) => handleMonthSelect(date, dateString, 2)}
                        disabledDate={(d) => {
                          return !d
                            || d.isBefore(moment(state.textStateValues.projectStartMonth).startOf('month'));
                        }}
                        disabled={state.textStateValues.projectStartMonth === null}
                      />
                    </Space>
                  </Col>
                </Row>
                <div>
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
                          rowClassName={(record) => {
                            return record.types === 'Total' ? 'table-row-dark' : null;
                          }}
                          className="table-style"
                          pagination={false}
                          scroll={{ x: 200, y: 600 }}
                          size="small"
                        />
                      </div>
                    ) : (
                      <div className="report-no-records-found-msg">
                        {state.textStateValues.error}
                      </div>
                    )}
                </div>
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

export default CostAnalysis;
