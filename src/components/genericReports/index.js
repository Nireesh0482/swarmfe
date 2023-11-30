/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign, max-len */
import React, { useState, useEffect } from 'react';
import {
  DatePicker, Select, Table, PageHeader, Button, Tooltip, Typography, Row, Col, Modal, Spin, Space,
} from 'antd';
import axios from 'axios';
import {
  DownloadOutlined, EyeFilled, QuestionCircleOutlined, CloseCircleFilled, InfoCircleTwoTone,
} from '@ant-design/icons';
import moment from 'moment';
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
    selectedProjectType: '',
    selectedProjectGroupName: '',
    selectedProjectStatus: '',
    selectedEmployeeId: '',
    selectedEmployeeName: '',
    selectedEmployeeStatus: '',
    selectedMonth: '',
    error: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  tableData: [],
  projectList: [],
  projectTypeList: [],
  groupDetailsList: [],
  projectStatusList: [],
  resourceList: [],
  resourceStatusList: [],
};

const GenericReports = () => {
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
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllResourceStatus`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          resourceStatusList: res.data.data,
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
      project_code: state.textStateValues.selectedProjectCode,
      project_type: state.textStateValues.selectedProjectType,
      project_bu_name: state.textStateValues.selectedProjectGroupName,
      project_status: state.textStateValues.selectedProjectStatus,
      resource_emp_id: state.textStateValues.selectedEmployeeId,
      resource_status: state.textStateValues.selectedEmployeeStatus,
      date: state.textStateValues.selectedMonth,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getGenericReports`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.totalArr[0].length !== 0
            && res.data.data.totalArr[1].length !== 0
            && res.data.data.totalArr[2].length !== 0) {
            if (state.textStateValues.selectedMonth !== '') {
              setState((prevState) => ({
                ...prevState,
                tableData: res.data.data.totalArr,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                tableData: res.data.data.totalArr,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Generic Reports',
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
              modalsTitle: 'Generic Reports',
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
              modalsTitle: 'Generic Reports',
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
                modalsTitle: 'Generic Reports',
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
                modalsTitle: 'Generic Reports',
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
              modalsTitle: 'Generic Reports',
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
              modalsTitle: 'Generic Reports',
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
              modalsTitle: 'Generic Reports',
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
              modalsTitle: 'Generic Reports',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              error: '',
            },
          }));
        }
      });
  };

  const handleSelectChange = (value, name) => {
    if (name === 'project_code') {
      const [prjCode, prjName] = value;
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectCode: prjCode,
          selectedProjectName: prjName,
        },
      }));
    } else if (name === 'project_type') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectType: value,
        },
      }));
    } else if (name === 'project_bu') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectGroupName: value,
        },
      }));
    } else if (name === 'project_status') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectStatus: value,
        },
      }));
    } else if (name === 'emp_name') {
      const [empId, empName] = value;
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedEmployeeId: empId,
          selectedEmployeeName: empName,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedEmployeeStatus: value,
        },
      }));
    }
  };

  const handleMonthSelect = (_, dateString) => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        selectedMonth: dateString,
      },
    }));
  };

  const handleClear = (name) => {
    if (name === 'project_code') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectCode: '',
          selectedProjectName: '',
        },
      }));
    } else if (name === 'project_type') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectType: '',
        },
      }));
    } else if (name === 'project_bu') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectGroupName: '',
        },
      }));
    } else if (name === 'project_status') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedProjectStatus: '',
        },
      }));
    } else if (name === 'emp_name') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedEmployeeId: '',
          selectedEmployeeName: '',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedEmployeeStatus: '',
        },
      }));
    }
  };

  const tableColumnsOfProjectDetails = [];
  if (state.tableData.length > 0) {
    Object.keys(state.tableData[0][0]).forEach((col, i) => {
      let colTitle;
      if (col === 'project_bu_name') {
        colTitle = 'Project BU Name';
      } else if (col === 'project_bu_head') {
        colTitle = 'Project BU Head';
      } else if (col === 'project_type') {
        colTitle = 'Type of the Project';
      } else if (col === 'po_ro_sow_number') {
        colTitle = 'PO/RO/SOW Number';
      } else if (col === 'po_ro_sow_value') {
        colTitle = 'PO/RO/SOW Value';
      } else {
        colTitle = col.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`));
      }
      tableColumnsOfProjectDetails.push({
        title: colTitle,
        dataIndex: col,
        key: i,
        width: 100,
      });
    });
  }

  const tableColumnsOfEmployeesUnderProject = [];
  if (state.tableData.length > 0) {
    Object.keys(state.tableData[1][0]).forEach((col, i) => {
      tableColumnsOfEmployeesUnderProject.push({
        title: col === 'resource_emp_id' ? 'Resource Emp ID' : col.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`)),
        dataIndex: col,
        key: i,
        width: 100,
      });
    });
  }

  const tableColumnsOfResourceAllocation = [];
  if (state.tableData.length > 0) {
    Object.keys(state.tableData[2][0]).forEach((col, i) => {
      tableColumnsOfResourceAllocation.push({
        title: col === 'resource_emp_id' ? 'Resource Emp ID' : col.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`)),
        dataIndex: col,
        key: i,
        width: 100,
      });
    });
  }

  // const tableColumnsOfResAndCostUtilization = [];
  // if (state.tableData.length > 0) {
  //   Object.keys(state.tableData[3][0]).forEach((col, i) => {
  //     tableColumnsOfResAndCostUtilization.push({
  //       title: col.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`)),
  //       dataIndex: col,
  //       key: i,
  //       width: 100,
  //     });
  //   });
  // }

  // Export Excel
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    const fileName = `RM_Generic_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Generic Reports', {
        views: [{ showGridLines: false }],
      });

      const excelSheetTitle = [[], [' ', 'Generic Reports'], []];
      worksheet1.addRows(excelSheetTitle);

      let i = 1;
      const table1Title = 'Project Details';
      const table2Title = 'Resource Details of Project(s)';
      const table3Title = 'Resource Allocation';
      // const table4Title = 'Resource and Cost Utilization';
      // eslint-disable-next-line no-restricted-syntax
      for (const iterator of state.tableData) {
        let tableTitle;
        // eslint-disable-next-line no-unused-expressions
        i === 1 && (tableTitle = worksheet1.addRow(['', table1Title]));
        // eslint-disable-next-line no-unused-expressions
        i === 2 && (tableTitle = worksheet1.addRow(['', table2Title]));
        // eslint-disable-next-line no-unused-expressions
        i === 3 && (tableTitle = worksheet1.addRow(['', table3Title]));
        // eslint-disable-next-line no-unused-expressions
        // i === 4 && (tableTitle = worksheet1.addRow(['', table4Title]));
        tableTitle.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          if (colNumber !== 1) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'A9F5CB' },
            };
            cell.font = {
              name: 'Calibri',
              size: 12,
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
          }
        });
        const tableHeaders = Object.keys(iterator[0]);
        // eslint-disable-next-line no-loop-func
        const formattedTableHeaders = tableHeaders.map((header) => {
          if (i === 1) {
            if (header === 'project_bu_name') {
              return 'Project BU Name';
            } if (header === 'project_bu_head') {
              return 'Project BU Head';
            } if (header === 'project_type') {
              return 'Type of the Project';
            } if (header === 'po_ro_sow_number') {
              return 'PO/RO/SOW Number';
            } if (header === 'po_ro_sow_value') {
              return 'PO/RO/SOW Value';
            }
            return header.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`));
          }
          if (header === 'resource_emp_id') {
            return 'Resource Emp ID';
          }
          return header.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`));
        });
        const formattedExcelTableHeaders = worksheet1.addRow(['', ...formattedTableHeaders]);

        formattedExcelTableHeaders.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          if (colNumber !== 1) {
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
          }
        });

        iterator.forEach((ele) => {
          const excelTableData = worksheet1.addRow([' ', ...Object.values(ele)]);
          excelTableData.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (colNumber !== 1) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'F5F5F5' },
              };
              cell.font = {
                name: 'Calibri',
                size: 12,
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
            }
          });
        });

        worksheet1.addRow([]);
        // eslint-disable-next-line no-plusplus
        i++;
      }

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 25;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 30;
      worksheet1.getColumn(8).width = 30;

      worksheet1.mergeCells('B2:C2');

      // Fill Color
      worksheet1.getCell('B2').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'A9F5CB' },
      };
      worksheet1.getCell('B2').font = {
        name: 'Calibri',
        size: 13,
        bold: true,
      };
      worksheet1.getCell('B2').alignment = {
        vertical: 'middle',
        horizontal: 'left',
        indent: 0.5,
      };
      worksheet1.getCell('B2').border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

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
          modalsTitle: 'Export Generic Reports',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Generic Reports');
    }
  };

  return (
    <div>
      {roles.includes(225) ? (
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
                  <PageHeader>
                    Generic Reports
                  </PageHeader>
                  <Space>
                    <Tooltip placement="bottom" title="View">
                      <Button
                        type="primary"
                        disabled={!(state.textStateValues.selectedProjectName !== ''
                          || state.textStateValues.selectedEmployeeId !== ''
                          || state.textStateValues.selectedProjectType !== ''
                          || state.textStateValues.selectedProjectGroupName !== ''
                          || state.textStateValues.selectedProjectStatus !== ''
                          || state.textStateValues.selectedEmployeeStatus !== '')}
                        onClick={handleView}
                      >
                        <EyeFilled />
                        View
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/reports/generic-reports" target="_blank">
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
                      <Typography>Project:</Typography>
                      <Select
                        placeholder="Select Project"
                        style={{ width: '250px', marginLeft: '48px' }}
                        allowClear
                        onClear={() => handleClear('project_code')}
                        disabled={state.textStateValues.selectedProjectType !== ''
                          || state.textStateValues.selectedProjectGroupName !== ''
                          || state.textStateValues.selectedProjectStatus !== ''
                          || state.textStateValues.selectedEmployeeStatus !== ''}
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
                            <Select.Option key={prj.project_code} value={[prj.project_code, prj.project_name]}>
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
                      <Typography>Project Type:</Typography>
                      <Select
                        placeholder="Select Project Type"
                        style={{ width: '250px', marginLeft: '30px' }}
                        allowClear
                        disabled={state.textStateValues.selectedProjectCode === 'All'
                          || state.textStateValues.selectedProjectCode !== ''
                          || state.textStateValues.selectedProjectGroupName !== ''
                          || state.textStateValues.selectedProjectStatus !== ''
                          || state.textStateValues.selectedEmployeeStatus !== ''
                          || state.textStateValues.selectedEmployeeName !== ''}
                        onClear={() => handleClear('project_type')}
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        showSearch
                        value={state.textStateValues.selectedProjectType || null}
                        onSelect={(value) => handleSelectChange(value, 'project_type')}
                      >
                        {state.projectTypeList.length > 0
                          && <Select.Option key="All" value="All">All</Select.Option>}
                        {state.projectTypeList.map((projectType) => {
                          return (
                            <Select.Option key={projectType.project_type_id} value={projectType.project_type}>
                              {projectType.project_type}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>BU:</Typography>
                      <Select
                        placeholder="Select BU"
                        style={{ width: '250px', marginLeft: '72px' }}
                        allowClear
                        disabled={state.textStateValues.selectedProjectCode === 'All'
                          || state.textStateValues.selectedProjectCode !== ''
                          || state.textStateValues.selectedProjectType !== ''
                          || state.textStateValues.selectedProjectStatus !== ''
                          || state.textStateValues.selectedEmployeeStatus !== ''
                          || state.textStateValues.selectedEmployeeName !== ''}
                        onClear={() => handleClear('project_bu')}
                        filterSort={(optionA, optionB) => optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())}
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        showSearch
                        value={state.textStateValues.selectedProjectGroupName || null}
                        onSelect={(value) => handleSelectChange(value, 'project_bu')}
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
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Project Status:</Typography>
                      <Select
                        placeholder="Select Project Status"
                        style={{ width: '250px', marginLeft: '22px' }}
                        allowClear
                        onClear={() => handleClear('project_status')}
                        disabled={(state.textStateValues.selectedProjectCode !== 'All'
                          && state.textStateValues.selectedProjectCode !== '')
                          || (state.textStateValues.selectedProjectType !== ''
                            && state.textStateValues.selectedProjectType !== 'All')
                          || state.textStateValues.selectedEmployeeStatus !== ''
                          || state.textStateValues.selectedEmployeeName !== ''}
                        showSearch
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        value={state.textStateValues.selectedProjectStatus || null}
                        onSelect={(value) => handleSelectChange(value, 'project_status')}
                      >
                        {state.projectStatusList.length > 0
                          && <Select.Option key="All" value="All">All</Select.Option>}
                        {state.projectStatusList.map((projectStatus) => {
                          return (
                            <Select.Option key={projectStatus.project_status_id} value={projectStatus.project_status}>
                              {projectStatus.project_status}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Employee:</Typography>
                      <Select
                        placeholder="Select Employee"
                        style={{ width: '250px', marginLeft: '30px' }}
                        allowClear
                        onClear={() => handleClear('emp_name')}
                        disabled={state.textStateValues.selectedEmployeeStatus !== ''}
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        showSearch
                        value={state.textStateValues.selectedEmployeeName || null}
                        onSelect={(value) => handleSelectChange(value, 'emp_name')}
                      >
                        {state.resourceList.length > 0
                          && <Select.Option key="All" value={['All', 'All']}>All</Select.Option>}
                        {state.resourceList.map((emp) => {
                          return (
                            <Select.Option key={emp.resource_emp_id} value={[emp.resource_emp_id, emp.resource_name]}>
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
                      <Typography>Employee Status:</Typography>
                      <Select
                        placeholder="Select Employee Status"
                        style={{ width: '250px', marginLeft: '5px' }}
                        allowClear
                        onClear={() => handleClear('emp_status')}
                        disabled={state.textStateValues.selectedProjectCode === 'All'
                          || state.textStateValues.selectedProjectCode !== ''
                          || state.textStateValues.selectedProjectGroupName !== ''
                          || state.textStateValues.selectedProjectStatus !== ''}
                        showSearch
                        filterOption={(inputValue, option) => option.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())}
                        value={state.textStateValues.selectedEmployeeStatus || null}
                        onSelect={(value) => handleSelectChange(value, 'emp_status')}
                      >
                        {state.resourceStatusList.length > 0
                          && <Select.Option key="All" value="All">All</Select.Option>}
                        {state.resourceStatusList.map((resourceStatus) => {
                          return (
                            <Select.Option
                              key={resourceStatus.resource_status_id}
                              value={resourceStatus.resource_status}
                            >
                              {resourceStatus.resource_status}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Typography>Month:</Typography>
                      <DatePicker
                        placeholder="Select Month"
                        style={{ width: '250px', marginLeft: '50px' }}
                        picker="month"
                        value={state.textStateValues.selectedMonth
                          ? moment(state.textStateValues.selectedMonth) : null}
                        onChange={(date, dateString) => handleMonthSelect(date, dateString)}
                      />
                    </Space>
                  </Col>
                </Row>
                {state.booleanStateValues.showTable ? (
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
                    {state.tableData[0].length > 0
                      && (
                        <Table
                          title={() => 'Project Details'}
                          columns={tableColumnsOfProjectDetails}
                          dataSource={state.tableData[0].map((d, i) => ({ key: i, ...d }))}
                          pagination={false}
                          bordered
                          className="table-style"
                          scroll={{ x: 500, y: 600 }}
                          size="small"
                        />
                      )}
                    <br />
                    {state.tableData[1].length > 0
                      && (
                        <Table
                          title={() => 'Resource Details of Project(s)'}
                          columns={tableColumnsOfEmployeesUnderProject}
                          dataSource={state.tableData[1].map((d, i) => ({ key: i, ...d }))}
                          pagination={false}
                          bordered
                          className="table-style"
                          scroll={{ x: 500, y: 600 }}
                          size="small"
                        />
                      )}
                    <br />
                    {state.tableData[2].length > 0
                      && (
                        <Table
                          title={() => 'Resource Allocation'}
                          columns={tableColumnsOfResourceAllocation}
                          dataSource={state.tableData[2].map((d, i) => ({ key: i, ...d }))}
                          pagination={false}
                          bordered
                          className="table-style"
                          scroll={{ x: 500, y: 600 }}
                          size="small"
                        />
                      )}
                    <br />
                    {/* {state.tableData[3].length > 0
                      && (
                        <Table
                          title={() => 'Resource and Cost Utilization'}
                          columns={tableColumnsOfResAndCostUtilization}
                          dataSource={state.tableData[3].map((d, i) => ({ key: i, ...d }))}
                          pagination={false}
                          bordered
                          className="table-style"
                          scroll={{ x: 500, y: 600 }}
                          size="small"
                        />
                      )} */}
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

export default GenericReports;
