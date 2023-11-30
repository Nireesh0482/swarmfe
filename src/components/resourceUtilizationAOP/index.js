/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Table, Spin, PageHeader, Space, Typography, Select, DatePicker, Tooltip, Button, Modal, Switch, Divider,
} from 'antd';
import {
  EyeFilled, DownloadOutlined, QuestionCircleOutlined, CloseCircleFilled, InfoCircleTwoTone,
} from '@ant-design/icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ToolTip, Legend, ResponsiveContainer, LabelList, Label,
} from 'recharts';
import moment from 'moment';
import axios from 'axios';
import Excel from 'exceljs';
import SaveAs from 'file-saver';
import convertSVGtoPng from '../../utils/svgToImage';
import { convertStringRGBtoHex } from '../../utils/colorConversion';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showTable: false,
    showStatusModal: false,
    showTableWise: true,
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
  resourceTableData: [],
  totalAOP: [],
  graphData: [],
  graphColor: [],
};

const ResourceUtilization = () => {
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
  }, []);

  const handleProjectGroupSelect = (value) => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        groupName: value,
      },
    }));
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
      project_bu_name: [state.textStateValues.groupName],
      start_date: state.textStateValues.startMonth,
      // eslint-disable-next-line max-len, no-nested-ternary
      end_date: (state.textStateValues.startMonth >= moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? state.textStateValues.startMonth : (state.textStateValues.startMonth !== null && state.textStateValues.startMonth < moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.endMonth,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getResourceAOPReports`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && res.data.data.noCostPlan.length !== 0
            && res.data.data.graphArr[0].length !== 0 && state.textStateValues.startMonth === null) {
            setState((prevState) => ({
              ...prevState,
              resourceTableData: res.data.data.totalOutput,
              totalAOP: res.data.data.totalAOP,
              graphData: res.data.data.graphArr,
              // eslint-disable-next-line max-len
              graphColor: Object.keys(res.data.data.graphArr[0][0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showStatusModal: true,
                showTableWise: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization',
                modalsIcon: infoIcon,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                // modalsMessage: <><p>Planned Cost not declared for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project' : 'projects'}. We considered &apos;0&apos; as Planned Cost and showing result.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning</p></>,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                modalsMessage: <><p>Planned Cost {res.data.data.noCostPlan.length === 1 ? 'is' : 'are'} not defined for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project.' : 'projects.'} Showing records by considering Planned Cost as &apos;0&apos;.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning.</p><p>Note : Records will be displayed from {moment(Object.keys(res.data.data.totalOutput[0].monthWiseData[0])[0]).format('MMM-YY')} to {moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.</p></>,
              },
            }));
          } else if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && res.data.data.noCostPlan.length !== 0
            && res.data.data.graphArr[0].length !== 0) {
            setState((prevState) => ({
              ...prevState,
              resourceTableData: res.data.data.totalOutput,
              totalAOP: res.data.data.totalAOP,
              graphData: res.data.data.graphArr,
              // eslint-disable-next-line max-len
              graphColor: Object.keys(res.data.data.graphArr[0][0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showStatusModal: true,
                showTableWise: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization',
                modalsIcon: infoIcon,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                // modalsMessage: <><p>Planned Cost not declared for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project' : 'projects'}. We considered &apos;0&apos; as Planned Cost and showing result.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning</p></>,
                // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
                modalsMessage: <><p>Planned Cost {res.data.data.noCostPlan.length === 1 ? 'is' : 'are'} not defined for <b>{res.data.data.noCostPlan.join(', ')}</b> {res.data.data.noCostPlan.length === 1 ? 'project.' : 'projects.'} Showing records by considering Planned Cost as &apos;0&apos;.</p><p>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning.</p></>,
              },
            }));
            // eslint-disable-next-line max-len
          } else if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && res.data.data.graphArr[0].length !== 0 && state.textStateValues.startMonth !== null) {
            setState((prevState) => ({
              ...prevState,
              resourceTableData: res.data.data.totalOutput,
              totalAOP: res.data.data.totalAOP,
              graphData: res.data.data.graphArr,
              // eslint-disable-next-line max-len
              graphColor: Object.keys(res.data.data.graphArr[0][0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showTableWise: true,
              },
            }));
            // eslint-disable-next-line max-len
          } else if (res.data.data.totalOutput[0].monthWiseData.length !== 0 && res.data.data.graphArr[0].length !== 0 && state.textStateValues.startMonth === null) {
            setState((prevState) => ({
              ...prevState,
              resourceTableData: res.data.data.totalOutput,
              totalAOP: res.data.data.totalAOP,
              graphData: res.data.data.graphArr,
              // eslint-disable-next-line max-len
              graphColor: Object.keys(res.data.data.graphArr[0][0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showTableWise: true,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization',
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
              modalsTitle: 'Resource Utilization',
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
              modalsTitle: 'Resource Utilization',
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
                showStatusModal: true,
                showTable: false,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save BU & Operational Plan',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
                resourceError: '',
              },
            }));
          } else if ((err.response.status === 500 && !err.response.data.data.tokenPresent)
            || (err.response.status === 500 && !err.response.data.data.tokenVerify)) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization',
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
              modalsTitle: 'Resource Utilization',
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
              showStatusModal: true,
              showTable: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
              resourceError: '',
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              showTable: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              resourceError: '',
            },
          }));
        }
      });
  };

  const totalAOPColumns = [
    {
      title: 'AOP Parameter',
      dataIndex: 'aop_parameter',
      key: 'aop_parameter',
      width: 100,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      width: 100,
    },
  ];

  let totalAOPData = [];
  if (state.totalAOP.length > 0) {
    totalAOPData = [
      {
        key: 1,
        aop_parameter: 'AOP Approved',
        details: state.totalAOP[0].AOPApproved,
      },
      {
        key: 2,
        aop_parameter: 'BU head planned resources',
        details: state.totalAOP[0].plannedResourceLoading,
      },
      {
        key: 3,
        aop_parameter: 'Actual Resource Loading',
        details: state.totalAOP[0].actualResourceLoading,
      },
      {
        key: 4,
        aop_parameter: 'Actual Resource Loading_billable',
        details: state.totalAOP[0].actualResourceLoading_billable,
      },
      {
        key: 5,
        aop_parameter: 'Revenue Leakage (Actual Resource Loading_billable - BU head planned resources)',
        details: state.totalAOP[0].revenueLeakage,
      },
      {
        key: 6,
        aop_parameter: 'Variance w.r.t AOP (Actual Resource Loading - AOP Approved)',
        details: state.totalAOP[0]['Variance w.r.t AOP'],
      },
      {
        key: 7,
        aop_parameter: 'Utilization (Actual Resource Loading_billable / Actual Resource Loading)*100',
        details: state.totalAOP[0].utilization,
      },
    ];
  }

  let tableColumns = [];
  if (state.resourceTableData.length > 0) {
    Object.entries(state.resourceTableData[0]).forEach((col, i) => {
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
            if (index % 5 === 0) {
              return {
                rowSpan: 5,
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
    { types: 'BU head planned resources' },
    { types: 'Actual Resource Loading' },
    { types: 'Actual Resource Loading_billable' },
    { types: 'Revenue Leakage' },
    { types: 'Utilization' },
  ];

  let tableData = [];
  if (state.resourceTableData.length > 0) {
    state.resourceTableData.forEach((data) => {
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
          colData[1][keyName] = value.actualResourceLoading;
          colData[2][keyName] = value.actualResourceLoading_billable;
          colData[3][keyName] = value.revenueLeakage;
          colData[4][keyName] = value.utilization;
        });
      });
      tableData = [...tableData, ...colData];
    });
  }

  const convertSVGStringToImage = async (selectedSVGElement) => {
    // stringify the SVG element
    const afterSVGToSerializer = new XMLSerializer().serializeToString(selectedSVGElement);

    // create the required setting for the output for image.
    const imageSetting = {
      svg: afterSVGToSerializer,
      // Usually all SVG have transparency, so PNG is the way to go by default
      mimetype: 'image/png',
      quality: 1,
      width: 'auto',
      height: 'auto',
      outputFormat: 'base64',
    };
    // pass the setting with svg data to the function
    const imageInBase64 = await convertSVGtoPng(imageSetting);
    return imageInBase64;
  };

  // Export Excel of Single Projects
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    // eslint-disable-next-line max-len
    const workBookName = `RM_Resource_Utilization_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      const fileName = workBookName;

      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet(
        'Resource Utilization',
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

      const ResourceUtilizationTable = [
        [],
        [' ', 'Resource Utilization'],
        [],
        [' ', 'AOP Parameter', 'Details'],
        [' ', 'AOP Approved', state.totalAOP[0].AOPApproved],
        [' ', 'BU head planned resources', state.totalAOP[0].plannedResourceLoading],
        [' ', 'Actual Resource Loading', state.totalAOP[0].actualResourceLoading],
        [' ', 'Actual Resource Loading_billable', state.totalAOP[0].actualResourceLoading_billable],
        // eslint-disable-next-line max-len
        [' ', 'Revenue Leakage (Actual Resource Loading_billable - BU head planned resources)', state.totalAOP[0].revenueLeakage],
        [' ', 'Variance w.r.t AOP (Actual Resource Loading - AOP Approved)', state.totalAOP[0]['Variance w.r.t AOP']],
        // eslint-disable-next-line max-len
        [' ', 'Utilization (Actual Resource Loading_billable / Actual Resource Loading)*100', state.totalAOP[0].utilization],
        [],
        [' ', ...tableHeaders],
      ];
      worksheet1.addRows(ResourceUtilizationTable);

      const createResourceArray = (data) => {
        const itemName = [
          'plannedResourceLoading',
          'actualResourceLoading',
          'actualResourceLoading_billable',
          'revenueLeakage',
          'utilization',
        ];
        const finalArray = data.flatMap(
          ({
            projectBUName, monthWiseData,
          }) => {
            const yearMonthKeys = monthWiseData.map(
              (ele) => Object.keys(ele)[0],
            );
            const eachProjectData = [];
            itemName.forEach((eachItem, index) => {
              const result = eachItem.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
              const eachRowArray = index === 0 ? [projectBUName] : [''];
              yearMonthKeys.forEach((date, indx) => {
                if (indx === 0 && eachItem === 'plannedResourceLoading') {
                  eachRowArray.push('BU head planned resources');
                } else if (indx === 0) {
                  eachRowArray.push(result.charAt(0).toUpperCase() + result.slice(1));
                }
                const MonthItemData = monthWiseData.find(
                  (eachResource) => Object.keys(eachResource)[0] === date,
                );
                eachRowArray.push(MonthItemData[date][eachItem]);
              });
              eachProjectData.push(eachRowArray);
            });
            return eachProjectData;
          },
        );
        return finalArray;
      };

      const allResourceData = createResourceArray(state.resourceTableData);

      allResourceData.forEach((data) => {
        const rscCostUtilizationTableData = [[' ', ...data]];
        worksheet1.addRows(rscCostUtilizationTableData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 35;
      worksheet1.getColumn(3).width = 35;
      worksheet1.mergeCells('B2:C2');

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
          } else if (rowNumber === 13 && !(colNumber === 1)) {
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
        // Commit the changed row to the stream
        row.commit();
      });

      const graphHeading = document.getElementsByTagName('h2');
      // select and all SVG images from the DOM in a Array
      const allSVGImages = document.getElementsByClassName('recharts-responsive-container');
      const finalTableInExcelLength = state.graphData.length * 5 + 9; // 8 for primary table

      // eslint-disable-next-line max-len
      for (let index = 0, bRow = finalTableInExcelLength + 7, gRow = finalTableInExcelLength + 18; index < allSVGImages.length; index += 1, bRow += 16, gRow += 16) {
        // Process 1:
        // get single svg elements from the array
        const afterSVG = allSVGImages[index].querySelector('svg');

        // convert the svg to Image
        // eslint-disable-next-line no-await-in-loop
        const svgToBase64Image = await convertSVGStringToImage(afterSVG);

        // save to worksheet(excel)
        const barChartImg = workbook.addImage({ base64: svgToBase64Image, extension: 'png' });
        worksheet1.getCell(`B${bRow - 1}:G${gRow - 1}`).value = graphHeading[index].innerHTML;
        // set row for the image
        worksheet1.addImage(barChartImg, `B${bRow}:G${gRow}`);

        // save the image ending row number so we can add text below to that
        const textRowNumberInExcel = gRow;
        // eslint-disable-next-line max-len, no-nested-ternary
        worksheet1.getRow(textRowNumberInExcel + 1).height = graphHeading[index].innerHTML.length < 17 ? 40 : (graphHeading[index].innerHTML.length > 17 && graphHeading[index].innerHTML.length <= 34) ? 50 : (graphHeading[index].innerHTML.length > 34 && graphHeading[index].innerHTML.length <= 51) ? 70 : (graphHeading[index].innerHTML.length > 51 && graphHeading[index].innerHTML.length <= 68) ? 80 : 100;

        // after the image add a empty row
        worksheet1.addRow(['', '', '', '']);
        worksheet1.addRow(['', '', '', '']);

        // Process 2:
        // select the svg images UL element legend(i.e text of the name given to points in chart)
        const rechartsLegendSelector = Array.from(allSVGImages[index].getElementsByTagName('ul'));

        // all UL element will be single Element, so directly consider the 0th element
        // after that fetch all the Span(element) using the getElementsByClassName.this will have 2 elements.
        Array.from(rechartsLegendSelector[0].getElementsByClassName('recharts-legend-item-text')).forEach(
          (ele, indexNumber) => {
            // fetch the text and color(by converting to HEX)
            const selectedText = ele.innerHTML;
            const selectedColor = convertStringRGBtoHex(window.getComputedStyle(ele).color);

            // get the immediate row after the image
            const addTextToRow = worksheet1.getRow(textRowNumberInExcel + 1);

            //  add the text to cell and merge it
            if (indexNumber === 0) {
              const selectedCellInRow = addTextToRow.getCell('C');
              selectedCellInRow.value = selectedText;
              selectedCellInRow.font = {
                color: { argb: selectedColor },
              };
              selectedCellInRow.alignment = {
                wrapText: true,
                vertical: 'top',
                horizontal: 'left',
              };
            } else if (indexNumber === 1) {
              const selectedCellInRow = addTextToRow.getCell('D');
              selectedCellInRow.value = selectedText;
              selectedCellInRow.font = {
                color: { argb: selectedColor },
              };
              selectedCellInRow.alignment = {
                wrapText: true,
                vertical: 'top',
                horizontal: 'left',
              };
            } else if (indexNumber === 2) {
              const selectedCellInRow = addTextToRow.getCell('E');
              selectedCellInRow.value = selectedText;
              selectedCellInRow.font = {
                color: { argb: selectedColor },
              };
              selectedCellInRow.alignment = {
                wrapText: true,
                vertical: 'top',
                horizontal: 'left',
              };
            } else if (indexNumber === 3) {
              const selectedCellInRow = addTextToRow.getCell('F');
              selectedCellInRow.value = selectedText;
              selectedCellInRow.font = {
                color: { argb: selectedColor },
              };
              selectedCellInRow.alignment = {
                wrapText: true,
                vertical: 'top',
                horizontal: 'left',
              };
            }
          },
        );
      }

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
          modalsTitle: 'Export Resource Utilization Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource Utilization');
    }
  };

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        groupName: '',
      },
    }));
  };

  const handleSwitchChange = (checked) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showTableWise: checked,
      },
    }));
  };

  return (
    <div>
      {roles.includes(226) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <PageHeader>Operational Reports - Resource Utilization</PageHeader>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>BU:</Typography>
                    <Select
                      style={{ width: '160px' }}
                      placeholder="Select BU"
                      allowClear
                      onClear={handleClear}
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      showSearch
                      value={state.textStateValues.groupName || null}
                      onSelect={handleProjectGroupSelect}
                    >
                      {state.groupDetailsList.length > 0
                        && <Select.Option key="All" value="All">All</Select.Option>}
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
                  <Space>
                    <Typography>Start Month:</Typography>
                    <DatePicker
                      picker="month"
                      placeholder="Select Start Month"
                      style={{ width: '160px' }}
                      value={state.textStateValues.startMonth
                        ? moment(state.textStateValues.startMonth) : null}
                      onChange={(date, dateString) => handleMonthSelect(date, dateString, 1)}
                    />
                  </Space>
                  <Space>
                    <Typography>End Month:</Typography>
                    <DatePicker
                      picker="month"
                      placeholder="Select End Month"
                      style={{ width: '160px' }}
                      value={state.textStateValues.endMonth
                        ? moment(state.textStateValues.endMonth) : null}
                      onChange={(date, dateString) => handleMonthSelect(date, dateString, 2)}
                      disabledDate={(d) => {
                        return !d || d.isBefore(moment(state.textStateValues.startMonth).startOf('month'));
                      }}
                      disabled={state.textStateValues.startMonth === null}
                    />
                  </Space>
                  <Space>
                    <Tooltip placement="bottom" title="View Resource Utilization">
                      <Button
                        type="primary"
                        disabled={state.textStateValues.groupName === ''}
                        onClick={handleView}
                      >
                        <EyeFilled />
                        View
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/reports/operational-reports/resource-utilization" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                {state.booleanStateValues.showTable
                  ? (
                    <div className="table-border">
                      <div className="report-table-btn-flex">
                        <Switch
                          checkedChildren="Table Wise"
                          unCheckedChildren="Graph Wise"
                          defaultChecked
                          onChange={handleSwitchChange}
                        />
                        {!state.booleanStateValues.showTableWise && (
                          <Tooltip placement="bottom" title="Export Data">
                            <Button
                              type="primary"
                              onClick={handleExportExcel}
                            >
                              <DownloadOutlined />
                              Export Data
                            </Button>
                          </Tooltip>
                        )}
                      </div>
                      {state.booleanStateValues.showTableWise ? (
                        <Space
                          direction="vertical"
                          size="large"
                          style={{
                            display: 'flex',
                          }}
                        >
                          <Table
                            className="report-project-details-table"
                            columns={totalAOPColumns}
                            dataSource={totalAOPData}
                            bordered
                            pagination={false}
                            scroll={{ x: 200 }}
                            rowKey="key"
                            size="small"
                          />
                          <Table
                            columns={tableColumns}
                            dataSource={tableData.map((d, i) => ({ key: i, ...d }))}
                            bordered
                            className="table-style"
                            pagination={false}
                            scroll={{ x: 200, y: 600 }}
                            size="small"
                          />
                        </Space>
                      ) : (
                        state.graphData.map((data, i) => {
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={i}>
                              <h2 style={{ textAlign: 'center' }}>{state.resourceTableData[i].projectBUName}</h2>
                              <ResponsiveContainer
                                width="100%"
                                height={300}
                              >
                                <LineChart
                                  // data={data}
                                  // eslint-disable-next-line max-len
                                  data={data.map((el) => { Object.keys(el).forEach((key) => { if (key !== 'month') { el[key] = +el[key]; } }); return el; })}
                                  margin={{
                                    top: 40,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month">
                                    <Label
                                      value="Months --->"
                                      offset={0}
                                      position="insideBottom"
                                      style={{ fontWeight: 'bold' }}
                                    // dy={5}
                                    />
                                  </XAxis>
                                  <YAxis>
                                    <Label
                                      value="Resource Count --->"
                                      angle={-90}
                                      position="insideLeft"
                                      style={{ fontWeight: 'bold' }}
                                      dy={40}
                                      dx={4}
                                    />
                                  </YAxis>
                                  <ToolTip />
                                  <Legend />
                                  {Object.keys(data[0]).map((el, j) => {
                                    if (el !== 'month') {
                                      // const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                                      return (
                                        <Line key={el} type="monotone" dataKey={el} stroke={state.graphColor[j]}>
                                          <LabelList
                                            dataKey={el}
                                            position="top"
                                            fill={state.graphColor[j]}
                                          />
                                        </Line>
                                      );
                                    }
                                    return null;
                                  })}
                                </LineChart>
                              </ResponsiveContainer>
                              {i !== state.graphData.length - 1 && <Divider />}
                            </div>
                          );
                        })
                      )}
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

export default ResourceUtilization;
