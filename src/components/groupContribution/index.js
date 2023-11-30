/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Button, Tooltip, Table, Space, Typography, Select, Modal, DatePicker,
} from 'antd';
import {
  EyeFilled, DownloadOutlined, QuestionCircleOutlined, CloseCircleFilled, InfoCircleTwoTone,
} from '@ant-design/icons';
import axios from 'axios';
import Excel from 'exceljs';
import SaveAs from 'file-saver';
import moment from 'moment';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showTable: false,
    showStatusModal: false,
  },
  textStateValues: {
    startMonth: null,
    endMonth: null,
    error: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  tableData: [],
  groupDetailsList: [],
  selectedValue: [],
};

const GroupContribution = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;

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

  const handleGroupSelect = (value) => {
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

  const handleView = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = {
      project_bu_name: state.selectedValue,
      start_date: state.textStateValues.startMonth,
      // eslint-disable-next-line max-len, no-nested-ternary
      end_date: (state.textStateValues.startMonth >= moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? state.textStateValues.startMonth : (state.textStateValues.startMonth !== null && state.textStateValues.startMonth < moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.endMonth,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getGroupContribution`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.contributionArr.length !== 0) {
            if (state.textStateValues.startMonth !== null) {
              setState((prevState) => ({
                ...prevState,
                tableData: res.data.data.contributionArr,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                tableData: res.data.data.contributionArr,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'BU Contribution Report',
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
              modalsTitle: 'BU Contribution Report',
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
              modalsTitle: 'BU Contribution Report',
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
                modalsTitle: 'BU Contribution Report',
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
                modalsTitle: 'BU Contribution Report',
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
              modalsTitle: 'BU Contribution Report',
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
              modalsTitle: 'BU Contribution Report',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
              error: '',
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
              modalsTitle: 'BU Contribution Report',
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
              showTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'BU Contribution Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              error: '',
            },
          }));
        }
      });
  };

  const tableColumns = [
    {
      title: 'Project BU Name',
      dataIndex: 'project_bu_name',
      key: 'project_bu_name',
      width: 100,
      fixed: 'left',
      onCell: () => {
        return {
          style: { background: 'none' },
        };
      },
    },
    {
      title: 'Total Revenue',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      width: 100,
      onCell: () => {
        return {
          style: { background: 'none' },
        };
      },
    },
    {
      title: 'Total Planned Cost',
      dataIndex: 'totalPlannedCost',
      key: 'totalPlannedCost',
      width: 100,
      onCell: () => {
        return {
          style: { background: 'none' },
        };
      },
    },
    {
      title: 'Total Actual Cost',
      dataIndex: 'totalActualCost',
      key: 'totalActualCost',
      width: 100,
      onCell: () => {
        return {
          style: { background: 'none' },
        };
      },
    },
    {
      title: 'Contribution (in value based on Revenue)',
      dataIndex: 'contributionInvaluebasedonRevenue',
      key: 'contributionInvaluebasedonRevenue',
      width: 100,
      onCell: () => {
        return {
          style: { background: 'none' },
        };
      },
    },
    {
      title: 'Contribution (in % based on Revenue)',
      dataIndex: 'contributionInpercentbasedonRevenue',
      key: 'contributionInpercentbasedonRevenue',
      width: 100,
      onCell: (record) => {
        if (record.contributionInpercentbasedonRevenue <= 29) {
          return {
            style: { background: 'red' },
          };
        }
        if (record.contributionInpercentbasedonRevenue >= 30 && record.contributionInpercentbasedonRevenue <= 44) {
          return {
            style: { background: 'orange' },
          };
        }
        if (record.contributionInpercentbasedonRevenue >= 45 && record.contributionInpercentbasedonRevenue <= 59) {
          return {
            style: { background: 'yellow' },
          };
        }
        return {
          style: { background: 'green' },
        };
      },
    },
    {
      title: 'Contribution (in value based on planned cost)',
      dataIndex: 'contributionInvaluebasedonplannedcost',
      key: 'contributionInvaluebasedonplannedcost',
      width: 100,
      onCell: () => {
        return {
          style: { background: 'none' },
        };
      },
    },
    {
      title: 'Contribution (in % based on planned cost)',
      dataIndex: 'contributionInpercentbasedonplannedcost',
      key: 'contributionInpercentbasedonplannedcost',
      width: 100,
      onCell: () => {
        return {
          style: { background: 'none' },
        };
      },
    },
  ];

  // Export Excel
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    // eslint-disable-next-line max-len
    const fileName = `RM_Group_Contribution_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('BU Contribution', {
        views: [{ showGridLines: false }],
      });

      const tableColumnHeaders = [];
      if (tableColumns.length > 0) {
        Object.values(tableColumns).forEach((data) => {
          tableColumnHeaders.push(data.title);
        });
      }
      const groupContribution = [
        [],
        [' ', 'BU Contribution Report'],
        [],
        [' ', ...tableColumnHeaders],
      ];
      worksheet1.addRows(groupContribution);

      state.tableData.forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 25;
      worksheet1.getRow(2).height = 21;
      worksheet1.getColumn(1).width = 5;
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
              wrapText: true,
            };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          } else if (rowNumber >= 5 && !(colNumber === 1)) {
            if (colNumber === 7) {
              let color = '';
              if (cell.value <= 29) {
                color = 'FF0000';
              } else if (cell.value >= 30 && cell.value <= 44) {
                color = 'FFA500';
              } else if (cell.value >= 45 && cell.value <= 59) {
                color = 'FFFF00';
              } else {
                color = '008000';
              }
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: color },
              };
              cell.alignment = {
                vertical: 'middle',
                horizontal: 'left',
                indent: 0.5,
              };
              cell.font = {
                size: 12,
              };
              cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
              };
              // cell.height = '21';
            } else {
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
              cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
              };
              // cell.height = '21';
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
          modalsTitle: 'Export BU Contribution Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('BU Contribution');
    }
  };

  return (
    <div>
      {roles.includes(221) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <PageHeader>BU Contribution</PageHeader>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>BU:</Typography>
                    <Select
                      style={{ width: '160px' }}
                      mode="multiple"
                      maxTagCount="responsive"
                      placeholder="Select BU"
                      showArrow
                      allowClear
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      showSearch
                      value={state.selectedValue}
                      onChange={handleGroupSelect}
                      onInputKeyDown={handleBackspaceDisable}
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
                    <Tooltip placement="bottom" title="View BU Contribution">
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
                      <a href="/rm-tool/help/reports/contribution/group-contribution" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
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
                        dataSource={state.tableData}
                        bordered
                        pagination={false}
                        scroll={{ x: 200, y: 600 }}
                        rowKey="project_bu_name"
                        size="small"
                      />
                      <div style={{ marginTop: '20px' }}>
                        <Space>
                          <Space>
                            <div className="prj-contribution-color-info" style={{ backgroundColor: 'red' }} />
                            <Typography style={{ fontSize: '12px' }}>(Below to 30%)</Typography>
                          </Space>
                          <Space>
                            <div className="prj-contribution-color-info" style={{ backgroundColor: 'orange' }} />
                            <Typography style={{ fontSize: '12px' }}>(30% to 44%)</Typography>
                          </Space>
                          <Space>
                            <div className="prj-contribution-color-info" style={{ backgroundColor: 'yellow' }} />
                            <Typography style={{ fontSize: '12px' }}>(45% to 59%)</Typography>
                          </Space>
                          <Space>
                            <div className="prj-contribution-color-info" style={{ backgroundColor: 'green' }} />
                            <Typography style={{ fontSize: '12px' }}>(60% and Above)</Typography>
                          </Space>
                        </Space>
                      </div>
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

export default GroupContribution;
