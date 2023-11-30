/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  DatePicker, Select, Table, PageHeader, Button, Tooltip, Typography, Spin, Modal, Space, Row, Col,
} from 'antd';
import {
  EyeFilled, QuestionCircleOutlined, CloseCircleFilled, DownloadOutlined, InfoCircleTwoTone,
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
    selectedProjectCode: '',
    selectedProjectName: '',
    selectedEmployeeId: '',
    selectedEmployeeName: '',
    selectedClaimStatus: '',
    selectedExpenseType: '',
    selectedClaimMonth: '',
    error: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  tableData: [],
  projectList: [],
  resourceList: [],
};

const ClaimsReports = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;

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
              textStateValues: {
                ...state.textStateValues,
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

  const tableColumns = [
    {
      title: 'Project Code',
      dataIndex: 'project_code',
      key: 'project_code',
      width: 100,
    },
    {
      title: 'Resource Emp ID',
      dataIndex: 'resource_emp_id',
      key: 'resource_emp_id',
      width: 100,
    },
    {
      title: 'Resource Name',
      dataIndex: 'resource_name',
      key: 'resource_name',
      width: 100,
    },
    {
      title: 'Expense Type',
      dataIndex: 'expense_type',
      key: 'expense_type',
      width: 100,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 100,
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
    },
    {
      title: 'Approver',
      dataIndex: 'approver',
      key: 'approver',
      width: 100,
    },
    {
      title: 'Claim Status',
      dataIndex: 'claim_status',
      key: 'claim_status',
      width: 100,
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 100,
    },
  ];

  const handleSelectChange = (value, name) => {
    if (name === 'project_code') {
      const [prjCode, prjName] = value;
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...prevState.textStateValues,
          selectedProjectCode: prjCode,
          selectedProjectName: prjName,
        },
      }));
    } else if (name === 'emp_name') {
      const [empId, empName] = value;
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...prevState.textStateValues,
          selectedEmployeeId: empId,
          selectedEmployeeName: empName,
        },
      }));
    } else if (name === 'expense_type') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedExpenseType: value,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedClaimStatus: value,
        },
      }));
    }
  };

  const handleClear = (name) => {
    if (name === 'project_code') {
      if (state.textStateValues.selectedEmployeeId === '' && state.textStateValues.selectedClaimStatus === ''
        && state.textStateValues.selectedExpenseType === '') {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedProjectCode: '',
            selectedProjectName: '',
            selectedClaimMonth: '',
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedProjectCode: '',
            selectedProjectName: '',
          },
        }));
      }
    } else if (name === 'emp_name') {
      if (state.textStateValues.selectedProjectCode === '' && state.textStateValues.selectedClaimStatus === ''
        && state.textStateValues.selectedExpenseType === '') {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedEmployeeId: '',
            selectedEmployeeName: '',
            selectedClaimMonth: '',
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedEmployeeId: '',
            selectedEmployeeName: '',
          },
        }));
      }
    } else if (name === 'claim_status') {
      if (state.textStateValues.selectedProjectCode === '' && state.textStateValues.selectedEmployeeId === ''
        && state.textStateValues.selectedExpenseType === '') {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedClaimStatus: '',
            selectedClaimMonth: '',
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedClaimStatus: '',
          },
        }));
      }
    } else if (name === 'expense_type') {
      if (state.textStateValues.selectedProjectCode === '' && state.textStateValues.selectedEmployeeId === ''
        && state.textStateValues.selectedClaimStatus === '') {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedExpenseType: '',
            selectedClaimMonth: '',
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          textStateValues: {
            ...state.textStateValues,
            selectedExpenseType: '',
          },
        }));
      }
    }
  };

  const handleMonthSelect = (_, dateString) => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        selectedClaimMonth: dateString,
      },
    }));
  };

  const handleClaimReportsView = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));

    const body = {
      project_code: state.textStateValues.selectedProjectCode,
      resource_emp_id: state.textStateValues.selectedEmployeeId,
      claim_status: state.textStateValues.selectedClaimStatus,
      expense_type: state.textStateValues.selectedExpenseType,
      date: state.textStateValues.selectedClaimMonth,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getClaimReports`, body)
      .then((res) => {
        if (res.data.data.claimArr.length !== 0) {
          if (state.textStateValues.selectedClaimMonth !== '') {
            setState((prevState) => ({
              ...prevState,
              tableData: res.data.data.claimArr,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
              },
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              tableData: res.data.data.claimArr,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showTable: true,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Claims Report',
                modalsIcon: infoIcon,
                // eslint-disable-next-line max-len
                modalsMessage: `Records will be displayed from ${moment(res.data.data.datesObj.start_date).format('MMM-YY')} to ${moment(res.data.data.datesObj.end_date).format('MMM-YY')} month.`,
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
              modalsTitle: 'Claims Report',
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
              modalsTitle: 'Claims Report',
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
                modalsTitle: 'Claims Report',
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
                modalsTitle: 'Claims Report',
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
              modalsTitle: 'Claims Report',
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
              modalsTitle: 'Claims Report',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
              error: '',
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
              modalsTitle: 'Claims Report',
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
    const fileName = `RM_Claims_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Claims', {
        views: [{ showGridLines: false }],
      });

      const tableColumnHeaders = [];
      if (tableColumns.length > 0) {
        Object.values(tableColumns).forEach((data) => {
          tableColumnHeaders.push(data.title);
        });
      }
      const claimsReport = [
        [],
        [' ', 'Claims Report'],
        [],
        [' ', ...tableColumnHeaders],
      ];
      worksheet1.addRows(claimsReport);

      const excelData = state.tableData.map(({
        // eslint-disable-next-line camelcase
        pe_id, createdAt, updatedAt, approved_date, ...restData
      }) => restData);

      // eslint-disable-next-line no-restricted-syntax
      // for (const ele of excelData) {
      //   const claimData = [];
      //   // eslint-disable-next-line no-restricted-syntax
      //   for (const key in ele) {
      //     // eslint-disable-next-line no-prototype-builtins
      //     if (ele.hasOwnProperty(key)) {
      //       claimData.push(ele[key]);
      //     }
      //   }
      //   const allCLaimData = [[' ', ...claimData]];
      //   worksheet1.addRows(allCLaimData);
      // }
      excelData.forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 25;
      worksheet1.getColumn(4).width = 25;
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
          modalsTitle: 'Export Claims Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Claims');
    }
  };

  return (
    <div>
      {roles.includes(224) ? (
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
                  <PageHeader>Claims Report</PageHeader>
                  <Space>
                    <Tooltip placement="bottom" title="View Claims">
                      <Button
                        type="primary"
                        disabled={!(state.textStateValues.selectedProjectCode !== ''
                          || state.textStateValues.selectedEmployeeId !== ''
                          || state.textStateValues.selectedClaimStatus !== ''
                          || state.textStateValues.selectedExpenseType !== '')}
                        onClick={handleClaimReportsView}
                      >
                        <EyeFilled />
                        View
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a
                        href="/rm-tool/help/reports/claims-reports"
                        target="_blank"
                      >
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <Row
                  style={{ marginTop: '16px', marginBottom: '16px' }}
                  gutter={[
                    16,
                    {
                      xs: 8,
                      sm: 16,
                      md: 16,
                      lg: 16,
                    },
                  ]}
                >
                  <Col span={12}>
                    <Space>
                      <Typography>Project:</Typography>
                      <Select
                        style={{ width: '250px', marginLeft: '40px' }}
                        placeholder="Select Project"
                        allowClear
                        onClear={() => handleClear('project_code')}
                        showSearch
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        value={state.textStateValues.selectedProjectName || null}
                        onSelect={(value) => handleSelectChange(value, 'project_code')}
                      >
                        {state.projectList.length > 0
                          && <Select.Option key="All" value={['All', 'All']}>All</Select.Option>}
                        {state.projectList.map((prj) => {
                          return (
                            <Select.Option
                              key={prj.project_code}
                              value={[prj.project_code, prj.project_name]}
                            >
                              {prj.project_code}
                              {' - '}
                              {prj.project_name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Employee: </Typography>
                      <Select
                        style={{ width: '250px', marginLeft: '15px' }}
                        placeholder="Select Employee"
                        allowClear
                        onClear={() => handleClear('emp_name')}
                        showSearch
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        value={state.textStateValues.selectedEmployeeName || null}
                        onSelect={(value) => handleSelectChange(value, 'emp_name')}
                      >
                        {state.resourceList.length > 0
                          && <Select.Option key="All" value={['All', 'All']}>All</Select.Option>}
                        {state.resourceList.map((emp) => {
                          return (
                            <Select.Option
                              key={emp.resource_emp_id}
                              value={[emp.resource_emp_id, emp.resource_name]}
                            >
                              {emp.resource_emp_id}
                              {' - '}
                              {emp.resource_name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Expense Type:</Typography>
                      <Select
                        style={{ width: '250px' }}
                        placeholder="Select Expense Type"
                        allowClear
                        onClear={() => handleClear('expense_type')}
                        showSearch
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        value={state.textStateValues.selectedExpenseType || null}
                        onSelect={(value) => handleSelectChange(value, 'expense_type')}
                      >
                        <Select.Option value="Travel Expense">Travel Expense</Select.Option>
                        <Select.Option value="Cab Expense">Cab Expense</Select.Option>
                        <Select.Option value="Food Expense">Food Expense</Select.Option>
                        <Select.Option value="Project equipment cost">Project equipment cost</Select.Option>
                        <Select.Option value="UER">UER</Select.Option>
                        <Select.Option value="Sales Commission">Sales Commission</Select.Option>
                        <Select.Option value="Consultancy fee">Consultancy fee</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                      </Select>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Claim Status:</Typography>
                      <Select
                        style={{ width: '250px' }}
                        placeholder="Select Claim Status"
                        allowClear
                        onClear={() => handleClear('claim_status')}
                        showSearch
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        value={state.textStateValues.selectedClaimStatus || null}
                        onSelect={(value) => handleSelectChange(value, 'claim_status')}
                      >
                        <Select.Option value="All">All</Select.Option>
                        <Select.Option value="Approved">Approved</Select.Option>
                        <Select.Option value="Pending">Pending</Select.Option>
                        <Select.Option value="Rejected">Rejected</Select.Option>
                      </Select>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Month: </Typography>
                      <DatePicker
                        style={{ width: '250px', marginLeft: '42px' }}
                        placeholder="Select Month"
                        picker="month"
                        value={state.textStateValues.selectedClaimMonth
                          ? moment(state.textStateValues.selectedClaimMonth) : null}
                        disabled={!(state.textStateValues.selectedProjectCode !== ''
                          || state.textStateValues.selectedEmployeeId !== ''
                          || state.textStateValues.selectedClaimStatus !== ''
                          || state.textStateValues.selectedExpenseType !== '')}
                        onChange={(date, dateString) => handleMonthSelect(date, dateString)}
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
                        dataSource={state.tableData.map((d, i) => ({ key: i, ...d }))}
                        bordered
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

export default ClaimsReports;
