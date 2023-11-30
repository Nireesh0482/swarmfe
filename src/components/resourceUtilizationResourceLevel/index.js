/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign, prefer-destructuring */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Select, Typography, Space, DatePicker, Button, Tooltip, Table, Modal, Switch,
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
    showResourceLevelTable: false,
    showStatusModal: false,
    showMonthWise: true,
  },
  textStateValues: {
    startMonth: null,
    endMonth: null,
    resourceError: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  resourceList: [],
  selectedValue: [],
  resourceTableData: [],
};

const ResourceLevel = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;

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

  const handleEmployeeSelect = (value) => {
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
      resource_emp_id: state.selectedValue,
      start_date: state.textStateValues.startMonth,
      // eslint-disable-next-line max-len, no-nested-ternary
      end_date: (state.textStateValues.startMonth >= moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? state.textStateValues.startMonth : (state.textStateValues.startMonth !== null && state.textStateValues.startMonth < moment().format('YYYY-MM') && state.textStateValues.endMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.endMonth,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getAllocationByProjResourceDetailedLevel`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.length !== 0 && Object.keys(res.data.data[0]).length > 2) {
            if (state.textStateValues.startMonth !== null) {
              setState((prevState) => ({
                ...prevState,
                resourceTableData: res.data.data,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showResourceLevelTable: true,
                  showMonthWise: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                resourceTableData: res.data.data,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showResourceLevelTable: true,
                  showMonthWise: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Resource Utilization Report',
                  modalsIcon: infoIcon,
                  // eslint-disable-next-line max-len
                  modalsMessage: `Records will be displayed from ${moment(Object.keys(res.data.data[0])[2]).format('MMM-YY')} to ${moment(Object.keys(res.data.data[0])[Object.keys(res.data.data[0]).length - 1]).format('MMM-YY')} month.`,
                },
              }));
            }
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showResourceLevelTable: false,
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
              showResourceLevelTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
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
              showResourceLevelTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
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
                showResourceLevelTable: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization Report',
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
                modalsTitle: 'Resource Utilization Report',
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
              modalsTitle: 'Resource Utilization Report',
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
              showResourceLevelTable: false,
            },
            textStateValues: {
              ...state.textStateValues,
              resourceError: 'No Records Found.',
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showResourceLevelTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              resourceError: '',
            },
          }));
        }
      });
  };

  const monthWiseColumn = [];
  const tableColumns = [];
  if (state.resourceTableData.length > 0) {
    Object.entries(state.resourceTableData[0]).forEach((col, i) => {
      if (i === 0 || i === 1) {
        monthWiseColumn.push({
          title: col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 150,
          fixed: 'left',
          onCell: () => {
            return {
              style: { background: 'none' },
            };
          },
        });
        tableColumns.push({
          title: col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 150,
          onCell: () => {
            return {
              style: { background: 'none' },
            };
          },
        });
      } else if (state.booleanStateValues.showMonthWise) {
        monthWiseColumn.push({
          title: moment(col[0]).format('MMM-YY'),
          dataIndex: col[0],
          key: i,
          width: 150,
          onCell: (record) => {
            // eslint-disable-next-line max-len
            if ((record[col[0]] <= '0.7') && (moment(col[0]).format('YYYY-MM') === `${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString() < 10 ? `0${(new Date().getMonth() + 1).toString()}` : (new Date().getMonth() + 1).toString()}`)) {
              return {
                style: { background: 'orange' },
              };
            }
            if (record[col[0]] <= '0.7') {
              return {
                style: { background: 'yellow' },
              };
            }
            return {
              style: { background: 'none' },
            };
          },
        });
      } else {
        const weeks = [];
        Object.keys(col[1]).forEach((column, j) => {
          if (column !== 'total') {
            weeks.push({
              title: column.slice(0, 3),
              dataIndex: column,
              key: j,
              width: 100,
              onCell: (record) => {
                // eslint-disable-next-line max-len
                if ((record[column] <= '0.7') && (moment(col[0]).format('YYYY-MM') === `${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString() < 10 ? `0${(new Date().getMonth() + 1).toString()}` : (new Date().getMonth() + 1).toString()}`)) {
                  return {
                    style: { background: 'orange' },
                  };
                }
                if (record[column] <= '0.7') {
                  return {
                    style: { background: 'yellow' },
                  };
                }
                return {
                  style: { background: 'none' },
                };
              },
            });
          }
        });
        tableColumns.push(
          {
            title: moment(col[0]).format('MMM-YY'),
            children: weeks,
          },
        );
      }
    });
  }

  const monthWiseData = [];
  const tableData = [];
  if (state.resourceTableData.length > 0) {
    state.resourceTableData.forEach((row, l) => {
      monthWiseData.push({});
      tableData.push({});
      Object.entries(row).forEach((val, n) => {
        if (n === 0) {
          monthWiseData[l].empId = val[1];
          tableData[l].empId = val[1];
        } else if (n === 1) {
          monthWiseData[l].resourceName = val[1];
          tableData[l].resourceName = val[1];
        } else {
          monthWiseData[l][val[0]] = val[1].total;
          const { total, ...weekWise } = val[1];
          tableData[l] = { ...tableData[l], ...weekWise };
        }
      });
    });
  }

  // Export Excel
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    // eslint-disable-next-line max-len
    const fileName = `RM_Resource_Utilization_Resource_Level_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Resource Level', {
        views: [{ showGridLines: false }],
      });

      const tableColumnHeaders = [];
      if (state.booleanStateValues.showMonthWise && monthWiseColumn.length > 0) {
        Object.values(monthWiseColumn).forEach((data) => {
          tableColumnHeaders.push(data.title);
        });
      }

      // Initializing default rows
      const detailedLevel = [
        [],
        [' ', 'Resource Utilization Report - Resource Level'],
        [' '],
        state.booleanStateValues.showMonthWise && [' ', ...tableColumnHeaders],
      ];
      // Pushing default rows to sheet
      worksheet1.addRows(detailedLevel);

      if (!state.booleanStateValues.showMonthWise && tableColumns.length > 0) {
        const excelCalendarWeekHeaders = [];
        const excelTableHeaders = [];
        Object.values(tableColumns).forEach((data) => {
          const excelTableHeadersData = [];
          excelTableHeadersData.push(data.title);
          if (!data.dataIndex) {
            for (let index = 1; index < Object.keys(data.children).length; index += 1) {
              excelTableHeadersData.push(data.title);
            }
            Object.values(data.children).forEach((ele) => {
              excelCalendarWeekHeaders.push(ele.title);
            });
          }
          excelTableHeaders.push(...excelTableHeadersData);
        });
        worksheet1.getRow(4).values = [' ', ...excelTableHeaders];
        worksheet1.getRow(5).values = [' ', '', '', ...excelCalendarWeekHeaders];
        worksheet1.mergeCells('B4:B5');
        worksheet1.mergeCells('C4:C5');
      }

      (state.booleanStateValues.showMonthWise ? monthWiseData : tableData).forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.mergeCells('B2:C2');
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 25;
      worksheet1.getColumn(3).width = 25;

      // eslint-disable-next-line dot-notation
      const mergeCellRow = worksheet1.getRow(4)['_cells'];
      if (mergeCellRow.length > 0) {
        let startCellAddress = '';
        let endCellAddress = '';
        mergeCellRow.forEach((row, k) => {
          if (k > 2) {
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
          } else if (!state.booleanStateValues.showMonthWise && rowNumber === 5 && !(colNumber === 1)) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'DEEAF6' },
            };
            cell.font = {
              name: 'Calibri',
              size: 12,
              bold: true,
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'center',
            };
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          } else if ((state.booleanStateValues.showMonthWise ? rowNumber >= 5 : rowNumber >= 6) && !(colNumber === 1)) {
            // eslint-disable-next-line max-len
            if ((cell.value === 0 || cell.value === '0.00') && worksheet1.getCell(`${cell.address.replace(/[0-9]/g, '')}4`).value === moment(`${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString()}`).format('MMM-YY')) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFA500' },
              };
            } else {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: (cell.value === 0 || cell.value === '0.00') ? 'FFFF00' : 'F5F5F5' },
              };
            }
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
          modalsTitle: 'Export Resource Utilization Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource Level');
    }
  };

  const handleSwitchChange = (checked) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showMonthWise: checked,
      },
    }));
  };

  return (
    <div>
      {roles.includes(215) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <PageHeader>Resource Utilization - Resource Level</PageHeader>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>Employee: </Typography>
                    <Select
                      style={{ width: '160px' }}
                      mode="multiple"
                      maxTagCount="responsive"
                      placeholder="Select Employee"
                      showArrow
                      allowClear
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      showSearch
                      value={state.selectedValue}
                      onChange={handleEmployeeSelect}
                    >
                      {state.resourceList.length > 0
                        && (<Select.Option key="All" value="All">All</Select.Option>)}
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
                    <Tooltip placement="bottom" title="View Resource Level">
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
                      <a href="/rm-tool/help/reports/resource-utilization/resource-level" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                {state.booleanStateValues.showResourceLevelTable
                  ? (
                    <div className="table-border">
                      <Switch
                        checkedChildren="Month Wise"
                        unCheckedChildren="Week Wise"
                        defaultChecked
                        onChange={handleSwitchChange}
                      />
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
                      {state.booleanStateValues.showMonthWise
                        ? (
                          <Table
                            columns={monthWiseColumn}
                            dataSource={monthWiseData}
                            bordered
                            pagination={false}
                            scroll={{ x: 200, y: 600 }}
                            rowKey="empId"
                            size="small"
                          />
                        ) : (
                          <Table
                            columns={tableColumns}
                            dataSource={tableData}
                            bordered
                            pagination={false}
                            scroll={{ x: 200, y: 600 }}
                            rowKey="empId"
                            size="small"
                          />
                        )}
                      <div style={{ marginTop: '20px' }}>
                        <Space>
                          <Space>
                            <div className="prj-contribution-color-info" style={{ backgroundColor: 'orange' }} />
                            <Typography style={{ fontSize: '12px' }}>
                              Less than &apos;0.7&apos; Allocation for Current Month
                            </Typography>
                          </Space>
                          <Space>
                            <div className="prj-contribution-color-info" style={{ backgroundColor: 'yellow' }} />
                            <Typography style={{ fontSize: '12px' }}>
                              Less than &apos;0.7&apos; Allocation for Previous/Future Month
                            </Typography>
                          </Space>
                        </Space>
                      </div>
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

export default ResourceLevel;
