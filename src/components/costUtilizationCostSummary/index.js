/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
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
  projectCode: [],
  costTableData: [],
};

const CostSummary = () => {
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

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
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
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/costUtilizationHighLevel`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.highLevelData[0].highLevelData.length !== 0) {
            if (res.data.data.highLevelData.length !== 0 && res.data.data.noCostPlanProjectNames.length !== 0
              && state.textStateValues.projectStartMonth === null) {
              setState((prevState) => ({
                ...prevState,
                costTableData: res.data.data.highLevelData,
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
                  modalsMessage: <><p>Planned Cost {res.data.data.noCostPlanProjectNames.length === 1 ? 'is' : 'are'} not defined for <b>{res.data.data.noCostPlanProjectNames.join(', ')}</b> {res.data.data.noCostPlanProjectNames.length === 1 ? 'project.' : 'projects.'} Showing records by considering Planned Cost as &apos;0&apos;.</p><p><b>To declare : PROJECT MANAGEMENT -&gt; Project Data -&gt; Resource Planning.</b></p><p>Note : Records will be displayed from {Object.keys(res.data.data.highLevelData[0].highLevelData[0])[0]} to {moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.</p></>,
                },
              }));
            } else if (res.data.data.highLevelData.length !== 0 && res.data.data.noCostPlanProjectNames.length !== 0) {
              setState((prevState) => ({
                ...prevState,
                costTableData: res.data.data.highLevelData,
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
                costTableData: res.data.data.highLevelData,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                costTableData: res.data.data.highLevelData,
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
                  modalsMessage: `Records will be displayed from ${Object.keys(res.data.data.highLevelData[0].highLevelData[0])[0]} to ${moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.`,
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

  const tableColumns = [];
  if (state.costTableData.length > 0) {
    Object.entries(state.costTableData[0]).forEach((col, i) => {
      if (col[0] === 'highLevelData') {
        col[1].forEach((val, j) => {
          const planned = `planned${j}`;
          const actual = `actual${j}`;
          tableColumns.push({
            title: Object.keys(val)[0],
            children: [
              {
                title: 'Planned',
                dataIndex: planned,
                key: planned,
                width: 80,
              },
              {
                title: 'Actual',
                dataIndex: actual,
                key: actual,
                width: 80,
              },
            ],
          });
        });
      } else {
        tableColumns.push({
          // eslint-disable-next-line max-len
          title: col[0] === 'projectBUName' ? 'Project BU Name' : col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 100,
          fixed: 'left',
        });
      }
    });
  }

  const tableData = [];
  if (state.costTableData.length > 0) {
    state.costTableData.forEach((row, i) => {
      tableData.push({});
      let obj = {};
      row.highLevelData.forEach((e, l) => {
        const planned = `planned${l}`;
        const actual = `actual${l}`;
        obj = {
          ...obj,
          [planned]: parseFloat(Object.values(e)[0].plannedCost).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          }),
          [actual]: parseFloat(Object.values(e)[0].actualTotalCost).toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR',
          }),
        };
      });
      const finalObj = {
        projectCode: row.projectCode,
        projectName: row.projectName,
        projectBUName: row.projectBUName,
        totalPlannedCost: parseFloat(row.totalPlannedCost).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          style: 'currency',
          currency: 'INR',
        }),
        totalActualCost: parseFloat(row.totalActualCost).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          style: 'currency',
          currency: 'INR',
        }),
        ...obj,
      };
      tableData[i] = { ...tableData[i], ...finalObj };
    });
  }

  // Export Excel
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    // eslint-disable-next-line max-len
    const fileName = `RM_Cost_Utilization_Cost_Summary_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Cost Summary', {
        views: [{ showGridLines: false }],
      });

      const highLevel = [
        [],
        [' ', 'Cost Utilization Report - Cost Summary'],
        [],
      ];
      worksheet1.addRows(highLevel);

      const excelTableSubHeaders = [];
      const excelTableHeaders = [];
      if (tableColumns.length > 0) {
        Object.values(tableColumns).forEach((data) => {
          const excelTableHeadersData = [];
          excelTableHeadersData.push(data.title);
          if (!data.dataIndex) {
            for (let index = 1; index < Object.keys(data.children).length; index += 1) {
              excelTableHeadersData.push(data.title);
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

      tableData.forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 25;

      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 25;

      worksheet1.mergeCells('B2:C2');

      worksheet1.mergeCells('B4:B5');
      worksheet1.mergeCells('C4:C5');
      worksheet1.mergeCells('D4:D5');
      worksheet1.mergeCells('E4:E5');
      worksheet1.mergeCells('F4:F5');

      // eslint-disable-next-line dot-notation
      const mergeCellRow = worksheet1.getRow(4)['_cells'];
      if (mergeCellRow.length > 0) {
        let startCellAddress = '';
        let endCellAddress = '';
        mergeCellRow.forEach((row, k) => {
          if (k > 5) {
            if (k !== mergeCellRow.length - 1 && row.value === mergeCellRow[k + 1].value) {
              startCellAddress = startCellAddress === '' ? row.address : startCellAddress;
            } else {
              endCellAddress = row.address;
            }
            if (startCellAddress !== '' && endCellAddress !== '') {
              worksheet1.mergeCells(`${startCellAddress}:${endCellAddress}`);
              startCellAddress = '';
              endCellAddress = '';
            }
          }
        });
      }

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
      workbook.removeWorksheet('Cost Summary');
    }
  };

  return (
    <div>
      {roles.includes(216) ? (
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
                  <PageHeader>Cost Utilization - Cost Summary</PageHeader>
                  <Space>
                    <Tooltip placement="bottom" title="View Cost Summary">
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
                      <a href="/rm-tool/help/reports/cost-utilization/cost-summary" target="_blank">
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
                          dataSource={tableData}
                          bordered
                          className="table-style"
                          pagination={false}
                          scroll={{ x: 200, y: 600 }}
                          rowKey="projectCode"
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

export default CostSummary;
