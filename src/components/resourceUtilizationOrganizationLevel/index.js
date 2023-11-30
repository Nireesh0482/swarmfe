/* eslint-disable react/function-component-definition, arrow-body-style, prefer-destructuring, no-param-reassign, max-len */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Tabs, Select, Typography, Space, DatePicker, Button, Tooltip, Table, Modal, Row, Col,
} from 'antd';
import {
  EyeFilled, DownloadOutlined, QuestionCircleOutlined, CloseCircleFilled, InfoCircleTwoTone,
} from '@ant-design/icons';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ToolTip, Legend, LabelList, Label,
} from 'recharts';
import { useCurrentPng } from 'recharts-to-png';
import moment from 'moment';
import axios from 'axios';
import Excel from 'exceljs';
import SaveAs from 'file-saver';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    isLoadingResource: false,
    isLoadingGroup: false,
    projectSelected: false,
    enableProjectSelect: true,
    showGroupLevelTable: false,
    showProjectLevelTable: false,
    showResourceLevelTable: false,
    showStatusModal: false,
  },
  textStateValues: {
    projectLevelGroup: '',
    projectResourceLevelGroup: '',
    projectLevelStartMonth: null,
    projectLevelEndMonth: null,
    groupLevelStartMonth: null,
    groupLevelEndMonth: null,
    projectResourceLevelStartMonth: null,
    projectResourceLevelEndMonth: null,
    error: '',
    resourceError: '',
    groupError: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  groupDetailsList: [],
  groupDetailsGraph: [],
  projectList: [],
  projectLevelProjectCode: [],
  projectResourceLevelProjectCode: [],
  projectTableData: [],
  resourceTableData: [],
  selectedValue: [],
  groupTableData: [],
  graphBarColor: [],
};

const { TabPane } = Tabs;

const OrganizationLevel = () => {
  const [state, setState] = useState(initialState);
  const [getBarPng, { ref: barRef }] = useCurrentPng();
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
    if (id === 1) {
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
    } else if (id === 2) {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectLevelGroup: value,
        },
        projectLevelProjectCode: ['All'],
      }));
    } else if (id === 3) {
      if (value[value.length - 1] !== 'All') {
        const newArr = value.filter((val) => val !== 'All');
        setState((prevState) => ({
          ...prevState,
          projectLevelProjectCode: newArr,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          projectLevelProjectCode: ['All'],
        }));
      }
    } else if (id === 4) {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectResourceLevelGroup: value,
        },
        projectResourceLevelProjectCode: ['All'],
      }));
    } else if (id === 5) {
      if (value[value.length - 1] !== 'All') {
        const newArr = value.filter((val) => val !== 'All');
        setState((prevState) => ({
          ...prevState,
          projectResourceLevelProjectCode: newArr,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          projectResourceLevelProjectCode: ['All'],
        }));
      }
    }
  };

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
    }
  };

  const handleClear = (id) => {
    if (id === 1) {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectLevelGroup: '',
        },
        projectLevelProjectCode: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectResourceLevelGroup: '',
        },
        projectResourceLevelProjectCode: [],
      }));
    }
  };

  const handleMonthSelect = (_, dateString, id) => {
    if (id === 1 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectLevelStartMonth: dateString,
          projectLevelEndMonth: null,
        },
      }));
    } else if (id === 1 && dateString === '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectLevelStartMonth: null,
          projectLevelEndMonth: null,
        },
      }));
    } else if (id === 2 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectLevelEndMonth: dateString,
        },
      }));
    } else if (id === 2 && dateString === '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectLevelEndMonth: null,
        },
      }));
    } else if (id === 3 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectResourceLevelStartMonth: dateString,
          projectResourceLevelEndMonth: null,
        },
      }));
    } else if (id === 3 && dateString === '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectResourceLevelStartMonth: null,
          projectResourceLevelEndMonth: null,
        },
      }));
    } else if (id === 4 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectResourceLevelEndMonth: dateString,
        },
      }));
    } else if (id === 4 && dateString === '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          projectResourceLevelEndMonth: null,
        },
      }));
    } else if (id === 5 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          groupLevelStartMonth: dateString,
          groupLevelEndMonth: null,
        },
      }));
    } else if (id === 5 && dateString === '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          groupLevelStartMonth: null,
          groupLevelEndMonth: null,
        },
      }));
    } else if (id === 6 && dateString !== '') {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          groupLevelEndMonth: dateString,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          groupLevelEndMonth: null,
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

  const projectLevelColumns = [];
  if (state.projectTableData.length > 0) {
    Object.entries(state.projectTableData[0]).forEach((col, i) => {
      if (col[0] === 'highLevelDetails') {
        col[1].forEach((val, j) => {
          const planned = `planned${j}`;
          const actual = `actual${j}`;
          projectLevelColumns.push({
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
        projectLevelColumns.push({
          title: col[0] === 'projectBUName' ? 'Project BU Name' : col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 100,
          fixed: 'left',
        });
      }
    });
  }

  const projectLevelData = [];
  if (state.projectTableData.length > 0) {
    state.projectTableData.forEach((row, i) => {
      projectLevelData.push({});
      let obj = {};
      row.highLevelDetails.forEach((e, l) => {
        const planned = `planned${l}`;
        const actual = `actual${l}`;
        obj = {
          ...obj,
          [planned]: Object.values(e)[0].plannedResource,
          [actual]: Object.values(e)[0].allocatedResource,
        };
      });
      const finalObj = {
        projectCode: row.projectCode,
        projectName: row.projectName,
        projectBUName: row.projectBUName,
        ...obj,
      };
      projectLevelData[i] = { ...projectLevelData[i], ...finalObj };
    });
  }

  const handleProjectLevelView = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = {
      project_bu_name: state.textStateValues.projectLevelGroup,
      project_code: state.projectLevelProjectCode,
      start_date: state.textStateValues.projectLevelStartMonth,
      // eslint-disable-next-line no-nested-ternary
      end_date: (state.textStateValues.projectLevelStartMonth >= moment().format('YYYY-MM') && state.textStateValues.projectLevelEndMonth === null) ? state.textStateValues.projectLevelStartMonth : (state.textStateValues.projectLevelStartMonth !== null && state.textStateValues.projectLevelStartMonth < moment().format('YYYY-MM') && state.textStateValues.projectLevelEndMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.projectLevelEndMonth,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/highLevelResourceUtilization`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data[0].highLevelDetails.length !== 0) {
            if (state.textStateValues.projectLevelStartMonth !== null) {
              setState((prevState) => ({
                ...prevState,
                projectTableData: res.data.data,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showProjectLevelTable: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                projectTableData: res.data.data,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showProjectLevelTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Resource Utilization Report',
                  modalsIcon: infoIcon,
                  modalsMessage: `Records will be displayed from ${Object.keys(res.data.data[0].highLevelDetails[0])[0]} to ${moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.`,
                },
              }));
            }
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showProjectLevelTable: false,
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
              showProjectLevelTable: false,
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
              showProjectLevelTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
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
              showProjectLevelTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
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
                showProjectLevelTable: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization Report',
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
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              error: '',
            },
          }));
        }
      });
  };

  const handleGroupLevelView = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoadingGroup: true,
      },
    }));
    const body = {
      projectGroup: state.selectedValue,
      startDate: state.textStateValues.groupLevelStartMonth,
      // eslint-disable-next-line no-nested-ternary
      endDate: (state.textStateValues.groupLevelStartMonth >= moment().format('YYYY-MM') && state.textStateValues.groupLevelEndMonth === null) ? state.textStateValues.groupLevelStartMonth : (state.textStateValues.groupLevelStartMonth !== null && state.textStateValues.groupLevelStartMonth < moment().format('YYYY-MM') && state.textStateValues.groupLevelEndMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.groupLevelEndMonth,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/resourceUtilizationCount`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.projectGroupMonthWiseDataWithTotal.length !== 0) {
            if (state.textStateValues.groupLevelStartMonth !== null) {
              setState((prevState) => ({
                ...prevState,
                groupTableData: res.data.data.projectGroupMonthWiseDataWithTotal,
                groupDetailsGraph: res.data.data.projectGroupMonthWiseChartData,
                graphBarColor: Object.keys(res.data.data.projectGroupMonthWiseChartData[0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoadingGroup: false,
                  showGroupLevelTable: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                groupTableData: res.data.data.projectGroupMonthWiseDataWithTotal,
                groupDetailsGraph: res.data.data.projectGroupMonthWiseChartData,
                graphBarColor: Object.keys(res.data.data.projectGroupMonthWiseChartData[0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoadingGroup: false,
                  showGroupLevelTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Resource Utilization Report',
                  modalsIcon: infoIcon,
                  modalsMessage: `Records will be displayed from ${moment(res.data.data.projectGroupMonthWiseChartData[0].month).format('MMM-YY')} to ${moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.`,
                },
              }));
            }
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingGroup: false,
                showGroupLevelTable: false,
              },
              textStateValues: {
                ...state.textStateValues,
                groupError: 'No Records Found.',
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
              isLoadingGroup: false,
              showGroupLevelTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Server error. Please try again.',
              groupError: '',
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingGroup: false,
              showGroupLevelTable: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
              groupError: '',
            },
          }));
        } else if (err.response.status === 500) {
          if (err.response.data.message === 'Data not saved') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingGroup: false,
                showGroupLevelTable: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization Report',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
                groupError: '',
              },
            }));
          } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingGroup: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Resource Utilization Report',
                modalsMessage: 'Your session has expired. Please Login again.',
                modalsIcon: failureIcon,
              },
            }));
          }
        } else if (err.response.status === 412) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingGroup: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Your Role access has changed. Please Login again.',
            },
          }));
        } else if (err.response.status === 409) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingGroup: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to fetch records. Please try again.',
              groupError: '',
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingGroup: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              groupError: '',
            },
          }));
        }
      });
  };

  const groupLevelColumns = [];
  if (state.groupTableData.length > 0) {
    Object.entries(state.groupTableData[0]).forEach((col, i) => {
      if (col[0] === 'monthWisePlannedData') {
        col[1].forEach((val, j) => {
          const planned = `planned${j}`;
          const actual = `actual${j}`;
          groupLevelColumns.push({
            title: moment(Object.keys(val)[0]).format('MMM-YY'),
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
        groupLevelColumns.push({
          title: col[0] === 'projectBUName' ? 'Project BU Name' : col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 100,
          fixed: 'left',
        });
      }
    });
  }

  const groupLevelTableData = [];
  if (state.groupTableData.length > 0) {
    state.groupTableData.forEach((row, i) => {
      groupLevelTableData.push({});
      let obj = {};
      row.monthWisePlannedData.forEach((e, l) => {
        const planned = `planned${l}`;
        const actual = `actual${l}`;
        obj = {
          ...obj,
          [planned]: Object.values(e)[0].plannedResourceCount,
          [actual]: Object.values(e)[0].actualResourceCount,
        };
      });
      const finalObj = {
        projectBUName: row.projectBUName,
        totalPlannedResource: row.totalPlannedResource,
        totalActualResource: row.totalActualResource,
        ...obj,
      };
      groupLevelTableData[i] = { ...groupLevelTableData[i], ...finalObj };
    });
  }

  const handleProjectResourceLevelView = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoadingResource: true,
      },
    }));
    const body = {
      project_bu_name: state.textStateValues.projectResourceLevelGroup,
      project_code: state.projectResourceLevelProjectCode,
      start_date: state.textStateValues.projectResourceLevelStartMonth,
      // eslint-disable-next-line max-len, no-nested-ternary
      end_date: (state.textStateValues.projectResourceLevelStartMonth >= moment().format('YYYY-MM') && state.textStateValues.projectResourceLevelEndMonth === null) ? state.textStateValues.projectResourceLevelStartMonth : (state.textStateValues.projectResourceLevelStartMonth !== null && state.textStateValues.projectResourceLevelStartMonth < moment().format('YYYY-MM') && state.textStateValues.projectResourceLevelEndMonth === null) ? moment().subtract(1, 'month').format('YYYY-MM') : state.textStateValues.projectResourceLevelEndMonth,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getAllocationByProjResource`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.length !== 0 && Object.keys(res.data.data[0]).length > 5) {
            if (state.textStateValues.projectResourceLevelStartMonth !== null) {
              setState((prevState) => ({
                ...prevState,
                resourceTableData: res.data.data,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoadingResource: false,
                  showResourceLevelTable: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                resourceTableData: res.data.data,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoadingResource: false,
                  showResourceLevelTable: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Resource Utilization Report',
                  modalsIcon: infoIcon,
                  modalsMessage: `Records will be displayed from ${moment(Object.keys(res.data.data[0])[5]).format('MMM-YY')} to ${moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.`,
                },
              }));
            }
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoadingResource: false,
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
              isLoadingResource: false,
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
              isLoadingResource: false,
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
                isLoadingResource: false,
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
                isLoadingResource: false,
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
              isLoadingResource: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Resource Utilization Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Your Role access has changed. Please Login again.',
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingResource: false,
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

  const resourceLevelColumns = [];
  if (state.resourceTableData.length > 0) {
    Object.entries(state.resourceTableData[0]).forEach((col, i) => {
      if (i <= 4) {
        resourceLevelColumns.push({
          title: col[0] === 'projectBUName' ? 'Project BU Name' : col[0].replace(/^\w/, (c) => c.toUpperCase()).replace(/([a-z])([A-Z])/g, '$1 $2'),
          dataIndex: col[0],
          key: i,
          width: 100,
          fixed: 'left',
          onCell: () => {
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
              width: 80,
              onCell: (record) => {
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
        resourceLevelColumns.push(
          {
            title: moment(col[0]).format('MMM-YY'),
            children: weeks,
          },
        );
      }
    });
  }

  const resourceLevelData = [];
  if (state.resourceTableData.length > 0) {
    state.resourceTableData.forEach((row, l) => {
      resourceLevelData.push({});
      Object.entries(row).forEach((val, n) => {
        if (n <= 4) {
          resourceLevelData[l][val[0]] = val[1];
        } else {
          const { total, ...weekWise } = val[1];
          resourceLevelData[l] = { ...resourceLevelData[l], ...weekWise };
        }
      });
    });
  }

  // Export Excel of Project Level
  const handleExportExcelProjectLevel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    // Name to created/downloaded Excel file
    const fileName = `RM_Resource_Utilization_Organization_Level_Project_Level_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`;

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('Project Level', {
        views: [{ showGridLines: false }],
      });
      const projectLevelTable = [
        [],
        [' ', 'Resource Utilization Report - Organization Level - Project Level'],
        [],
      ];
      worksheet1.addRows(projectLevelTable);

      const excelTableSubHeaders = [];
      const excelTableHeaders = [];
      if (projectLevelColumns.length > 0) {
        Object.values(projectLevelColumns).forEach((data) => {
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
      worksheet1.getRow(5).values = [' ', '', '', '', ...excelTableSubHeaders];

      projectLevelData.forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 25;
      worksheet1.getColumn(1).width = 5;
      worksheet1.mergeCells('B2:D2');
      worksheet1.mergeCells('B4:B5');
      worksheet1.mergeCells('C4:C5');
      worksheet1.mergeCells('D4:D5');

      // eslint-disable-next-line dot-notation
      const mergeCellRow = worksheet1.getRow(4)['_cells'];
      if (mergeCellRow.length > 0) {
        let startCellAddress = '';
        let endCellAddress = '';
        mergeCellRow.forEach((row, k) => {
          if (k > 3) {
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
          modalsTitle: 'Export Resource Utilization Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Project Level');
    }
  };

  const handleExportExcelGroupLevel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    const fileName = `RM_Resource_Utilization_Organization_Level_Group_Level_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file
    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('BU Level', {
        views: [{ showGridLines: false }],
      });

      const groupLevelTable = [
        [],
        [' ', 'Resource Utilization Report - Organization Level - BU Level'],
        [],
      ];
      worksheet1.addRows(groupLevelTable);

      const excelTableSubHeaders = [];
      const excelTableHeaders = [];
      if (groupLevelColumns.length > 0) {
        Object.values(groupLevelColumns).forEach((data) => {
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
      worksheet1.getRow(5).values = [' ', '', '', '', ...excelTableSubHeaders];

      groupLevelTableData.forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 25;
      worksheet1.getColumn(4).width = 25;
      worksheet1.mergeCells('B2:D2');
      worksheet1.mergeCells('B4:B5');
      worksheet1.mergeCells('C4:C5');
      worksheet1.mergeCells('D4:D5');

      // eslint-disable-next-line dot-notation
      const mergeCellRow = worksheet1.getRow(4)['_cells'];
      if (mergeCellRow.length > 0) {
        let startCellAddress = '';
        let endCellAddress = '';
        mergeCellRow.forEach((row, k) => {
          if (k > 3) {
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

      const barPng = await getBarPng();
      const barChartImg = workbook.addImage({ base64: barPng, extension: 'png' });
      worksheet1.addImage(barChartImg, `B${groupLevelTableData.length + 7}:E${groupLevelTableData.length + 19}`);

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
      workbook.removeWorksheet('BU Level');
    }
  };

  // Export Excel of Project-Resource Level
  const handleExportExcelProjResourceLevel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    // Name to created/downloaded Excel file
    const fileName = `RM_Resource_Utilization_Organization_Level_Project-Resource_Level_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`;

    try {
      // creating worksheet2 in workbook
      const worksheet1 = workbook.addWorksheet('Project-Resource Level', {
        views: [{ showGridLines: false }],
      });

      const projectResourceLevelTable = [
        [],
        [' ', 'Resource Utilization Report - Organization Level - Project-Resource Level'],
        [],
      ];
      worksheet1.addRows(projectResourceLevelTable);

      const excelCalendarWeekHeaders = [];
      const excelTableHeaders = [];
      if (resourceLevelColumns.length > 0) {
        Object.values(resourceLevelColumns).forEach((data) => {
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
      }
      worksheet1.getRow(5).values = [' ', '', '', '', '', '', ...excelCalendarWeekHeaders];

      resourceLevelData.forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.getColumn(1).width = 5;
      worksheet1.getColumn(2).width = 25;
      worksheet1.getColumn(3).width = 25;
      worksheet1.getColumn(4).width = 25;
      worksheet1.getColumn(5).width = 25;
      worksheet1.getColumn(6).width = 25;

      worksheet1.mergeCells('B2:D2');
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

      // Fill Color- Sheet2_Table1
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
      workbook.removeWorksheet('Project-Resource Level');
    }
  };

  return (
    <div>
      {roles.includes(214) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoadingGroup
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <PageHeader style={{ marginBottom: '16px' }}>Resource Utilization - Organization Level</PageHeader>
                <div>
                  <Tabs type="card">
                    <TabPane tab="BU Level" key="1">
                      <div>
                        {state.booleanStateValues.isLoading ? (
                          <div className="pagecenter">
                            <Spin size="large" />
                          </div>
                        ) : (
                          <>
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
                                  onChange={(value) => handleSelectChange(value, 1)}
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
                                  value={state.textStateValues.groupLevelStartMonth
                                    ? moment(state.textStateValues.groupLevelStartMonth) : null}
                                  onChange={(date, dateString) => handleMonthSelect(date, dateString, 5)}
                                />
                              </Space>
                              <Space>
                                <Typography>End Month:</Typography>
                                <DatePicker
                                  picker="month"
                                  placeholder="Select End Month"
                                  style={{ width: '160px' }}
                                  value={state.textStateValues.groupLevelEndMonth
                                    ? moment(state.textStateValues.groupLevelEndMonth) : null}
                                  onChange={(date, dateString) => handleMonthSelect(date, dateString, 6)}
                                  disabledDate={(d) => {
                                    return !d
                                      || d.isBefore(moment(state.textStateValues.groupLevelStartMonth).startOf('month'));
                                  }}
                                  disabled={state.textStateValues.groupLevelStartMonth === null}
                                />
                              </Space>
                              <Space>
                                <Tooltip placement="bottom" title="View BU Level">
                                  <Button
                                    type="primary"
                                    disabled={state.selectedValue.length === 0}
                                    onClick={handleGroupLevelView}
                                  >
                                    <EyeFilled />
                                    View
                                  </Button>
                                </Tooltip>
                                <Tooltip placement="bottom" title="Help">
                                  <a href="/rm-tool/help/reports/resource-utilization/organization-level" target="_blank">
                                    <QuestionCircleOutlined className="help-icon" />
                                  </a>
                                </Tooltip>
                              </Space>
                            </div>
                            {state.booleanStateValues.showGroupLevelTable
                              ? (
                                <div className="table-border">
                                  <Tooltip placement="bottom" title="Export Data">
                                    <Button
                                      type="primary"
                                      className="report-export-excel-btn"
                                      onClick={handleExportExcelGroupLevel}
                                    >
                                      <DownloadOutlined />
                                      Export Data
                                    </Button>
                                  </Tooltip>
                                  <Table
                                    columns={groupLevelColumns}
                                    dataSource={groupLevelTableData}
                                    bordered
                                    className="table-style"
                                    pagination={false}
                                    scroll={{ x: 200, y: 600 }}
                                    rowKey="projectBUName"
                                    size="small"
                                  />
                                  <ResponsiveContainer width="100%" height={400}>
                                    <BarChart
                                      ref={barRef}
                                      data={state.groupDetailsGraph.map((el) => { Object.keys(el).forEach((key) => { if (key !== 'month') { el[key] = +el[key]; } }); return el; })}
                                      margin={{
                                        top: 40,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                      }}
                                    >
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
                                        />
                                      </YAxis>
                                      <ToolTip />
                                      <Legend />
                                      <CartesianGrid />
                                      {Object.keys(state.groupDetailsGraph[0]).map((el, j) => {
                                        if (el !== 'month') {
                                          // const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                                          return (
                                            <Bar key={el} dataKey={el} fill={state.graphBarColor[j]}>
                                              <LabelList
                                                dataKey={el}
                                                position="top"
                                                fill={state.graphBarColor[j]}
                                              />
                                            </Bar>
                                          );
                                        }
                                        return null;
                                      })}
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              ) : (
                                <div className="report-no-records-found-msg">
                                  {state.textStateValues.groupError}
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    </TabPane>
                    <TabPane tab="Project Level" key="2">
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
                        style={{ marginBottom: '16px' }}
                      >
                        <Col flex="auto">
                          <Space>
                            <Typography>BU:</Typography>
                            <Select
                              style={{ width: '250px', marginLeft: '62px' }}
                              placeholder="Select BU"
                              allowClear
                              onClear={() => handleClear(1)}
                              filterOption={(inputValue, option) => option.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())}
                              showSearch
                              value={state.textStateValues.projectLevelGroup || null}
                              onSelect={(value) => handleSelectChange(value, 2)}
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
                        <Col flex="auto">
                          <Space>
                            <Typography>Project:</Typography>
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
                              disabled={state.textStateValues.projectLevelGroup === ''}
                              value={state.projectLevelProjectCode}
                              onChange={(value) => handleSelectChange(value, 3)}
                              onInputKeyDown={handleBackspaceDisable}
                            >
                              {state.projectList.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
                              {state.projectList.map((prj) => {
                                if (prj.project_bu_name === state.textStateValues.projectLevelGroup) {
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
                        <Col flex="100px" />
                        <Col flex="auto">
                          <Space style={{ paddingRight: '36px' }}>
                            <Typography>Start Month:</Typography>
                            <DatePicker
                              picker="month"
                              placeholder="Select Start Month"
                              style={{ width: '250px', marginLeft: '6px' }}
                              value={state.textStateValues.projectLevelStartMonth
                                ? moment(state.textStateValues.projectLevelStartMonth) : null}
                              onChange={(date, dateString) => handleMonthSelect(date, dateString, 1)}
                            />
                          </Space>
                        </Col>
                        <Col flex="auto">
                          <Space>
                            <Typography>End Month:</Typography>
                            <DatePicker
                              picker="month"
                              placeholder="Select End Month"
                              style={{ width: '250px' }}
                              value={state.textStateValues.projectLevelEndMonth
                                ? moment(state.textStateValues.projectLevelEndMonth) : null}
                              onChange={(date, dateString) => handleMonthSelect(date, dateString, 2)}
                              disabledDate={(d) => {
                                return !d
                                  || d.isBefore(moment(state.textStateValues.projectLevelStartMonth).startOf('month'));
                              }}
                              disabled={state.textStateValues.projectLevelStartMonth === null}
                            />
                          </Space>
                        </Col>
                        <Col flex="100px">
                          <Space>
                            <Tooltip placement="bottom" title="View Project Level">
                              <Button
                                type="primary"
                                disabled={state.projectLevelProjectCode.length === 0}
                                onClick={handleProjectLevelView}
                              >
                                <EyeFilled />
                                View
                              </Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Help">
                              <a href="/rm-tool/help/reports/resource-utilization/organization-level" target="_blank">
                                <QuestionCircleOutlined className="help-icon" />
                              </a>
                            </Tooltip>
                          </Space>
                        </Col>
                      </Row>
                      {state.booleanStateValues.showProjectLevelTable
                        ? (
                          <div className="table-border">
                            <Tooltip placement="bottom" title="Export Data">
                              <Button
                                type="primary"
                                className="report-export-excel-btn"
                                onClick={handleExportExcelProjectLevel}
                              >
                                <DownloadOutlined />
                                Export Data
                              </Button>
                            </Tooltip>
                            <Table
                              columns={projectLevelColumns}
                              dataSource={projectLevelData}
                              bordered
                              className="table-style"
                              pagination={false}
                              scroll={{ x: 200 }}
                              rowKey="projectCode"
                              size="small"
                            />
                          </div>
                        ) : (
                          <div className="report-no-records-found-msg">
                            {state.textStateValues.error}
                          </div>
                        )}
                    </TabPane>
                    <TabPane tab="Project - Resource Level" key="3">
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
                        style={{ marginBottom: '16px' }}
                      >
                        <Col flex="auto">
                          <Space>
                            <Typography>BU:</Typography>
                            <Select
                              style={{ width: '250px', marginLeft: '62px' }}
                              placeholder="Select BU"
                              allowClear
                              onClear={() => handleClear(2)}
                              filterOption={(inputValue, option) => option.children
                                .toString()
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())}
                              showSearch
                              value={state.textStateValues.projectResourceLevelGroup || null}
                              onSelect={(value) => handleSelectChange(value, 4)}
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
                        <Col flex="auto">
                          <Space>
                            <Typography>Project:</Typography>
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
                              disabled={state.textStateValues.projectResourceLevelGroup === ''}
                              value={state.projectResourceLevelProjectCode}
                              onChange={(value) => handleSelectChange(value, 5)}
                              onInputKeyDown={handleBackspaceDisable}
                            >
                              {state.projectList.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
                              {state.projectList.map((prj) => {
                                if (prj.project_bu_name === state.textStateValues.projectResourceLevelGroup) {
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
                        <Col flex="100px" />
                        <Col flex="auto">
                          <Space style={{ paddingRight: '36px' }}>
                            <Typography>Start Month:</Typography>
                            <DatePicker
                              picker="month"
                              placeholder="Select Start Month"
                              style={{ width: '250px', marginLeft: '6px' }}
                              value={state.textStateValues.projectResourceLevelStartMonth
                                ? moment(state.textStateValues.projectResourceLevelStartMonth) : null}
                              onChange={(date, dateString) => handleMonthSelect(date, dateString, 3)}
                            />
                          </Space>
                        </Col>
                        <Col flex="auto">
                          <Space>
                            <Typography>End Month:</Typography>
                            <DatePicker
                              picker="month"
                              placeholder="Select End Month"
                              style={{ width: '250px' }}
                              value={state.textStateValues.projectResourceLevelEndMonth
                                ? moment(state.textStateValues.projectResourceLevelEndMonth) : null}
                              onChange={(date, dateString) => handleMonthSelect(date, dateString, 4)}
                              disabledDate={(d) => {
                                return !d
                                  || d.isBefore(moment(state.textStateValues.projectResourceLevelStartMonth).startOf('month'));
                              }}
                              disabled={state.textStateValues.projectResourceLevelStartMonth === null}
                            />
                          </Space>
                        </Col>
                        <Col flex="100px">
                          <Space>
                            <Tooltip placement="bottom" title="View Project - Resource Level">
                              <Button
                                type="primary"
                                disabled={state.projectResourceLevelProjectCode.length === 0}
                                onClick={handleProjectResourceLevelView}
                              >
                                <EyeFilled />
                                View
                              </Button>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Help">
                              <a href="/rm-tool/help/reports/resource-utilization/organization-level" target="_blank">
                                <QuestionCircleOutlined className="help-icon" />
                              </a>
                            </Tooltip>
                          </Space>
                        </Col>
                      </Row>
                      {state.booleanStateValues.isLoadingResource ? (
                        <div className="pagecenter">
                          <Spin size="large" />
                        </div>
                      ) : (
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        <>
                          {state.booleanStateValues.showResourceLevelTable
                            ? (
                              <div className="table-border">
                                <Tooltip placement="bottom" title="Export Data">
                                  <Button
                                    type="primary"
                                    className="report-export-excel-btn"
                                    onClick={handleExportExcelProjResourceLevel}
                                  >
                                    <DownloadOutlined />
                                    Export Data
                                  </Button>
                                </Tooltip>
                                <Table
                                  columns={resourceLevelColumns}
                                  dataSource={resourceLevelData}
                                  bordered
                                  pagination={false}
                                  scroll={{ x: 200, y: 600 }}
                                  rowKey="empId"
                                  size="small"
                                />
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
                        </>
                      )}
                    </TabPane>
                  </Tabs>
                  {statusModal}
                </div>
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

export default OrganizationLevel;
