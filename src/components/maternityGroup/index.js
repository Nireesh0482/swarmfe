/* eslint-disable no-param-reassign */
/* eslint-disable react/function-component-definition, arrow-body-style, max-len */
import React, { useEffect, useState } from 'react';
import {
  DatePicker, Input, Select, Table, Spin, PageHeader, Button, Space, Tooltip, Modal, Typography,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, QuestionCircleTwoTone, QuestionCircleOutlined,
  SaveFilled, CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, StarFilled,
  DownloadOutlined,
} from '@ant-design/icons';
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
    groupSelected: false,
    dependencyValue: false,
    saveIndication: false,
    focus: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedGroup: '',
    tempValue: '',
  },
  tableData: [
    {
      key: 1,
      resource_emp_id: '',
      bu_name: '',
      reporting_manager: '',
      maternity_start_date: '',
      maternity_end_date: '',
      remarks: '',
    },
  ],
  keyCount: 2,
  resourceList: [],
  selectedRowKeys: [],
  maternityDetails: [],
  duplicateRecord: [],
  joiTableValidation: [],
};

const MaternityGroup = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const lightRed = '#fc8f83';
  const enableSave = state.tableData.length > 0 && state.tableData[0].resource_emp_id !== '' && state.tableData[0].bu_name !== ''
    && state.tableData[0].reporting_manager !== '' && state.tableData[0].maternity_start_date !== '' && state.tableData[0].maternity_end_date !== '';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/maternity/maternityDetails`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          maternityDetails: res.data.data,
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

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      resource_emp_id: '',
      bu_name: '',
      reporting_manager: '',
      maternity_start_date: '',
      maternity_end_date: '',
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
        disabled: state.booleanStateValues.groupSelected,
      };
    },
  };

  const handleExportExcel = async (maternityData) => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    const date = new Date();
    // eslint-disable-next-line max-len
    const fileName = `RM_Maternity_Group_${moment().format('DD-MMM-YYYY')}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;

    try {
      if (maternityData.length > 0) {
        // creating worksheet1 in workbook
        const worksheet1 = workbook.addWorksheet('Maternity Group', {
          views: [{ showGridLines: false }],
        });
        const resourceMgtTable = [
          [],
          [
            ' ',
            'Resource Emp ID',
            'BU Name',
            'Reporting Manager',
            'Maternity Start Date',
            'Maternity End Date',
            'Remarks',
          ],
        ];
        worksheet1.addRows(resourceMgtTable);

        maternityData.forEach((ele) => {
          worksheet1.addRow([
            ' ',
            ele.resource_emp_id,
            ele.bu_name,
            ele.reporting_manager,
            moment(ele.maternity_start_date).format('DD-MM-YYYY'),
            moment(ele.maternity_end_date).format('DD-MM-YYYY'),
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
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export Maternity BU Data',
            modalsIcon: successIcon,
            modalsMessage: 'Exported data successfully.',
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export Maternity BU Data',
            modalsIcon: failureIcon,
            modalsMessage: 'No Records found.',
          },
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Export Maternity BU Data',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Maternity Group');
    }
  };

  const getMaternityDetails = (groupName, exportExcel) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = {
      bu_name: groupName,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/maternity/maternityDetails`, body)
      .then((res) => {
        if (exportExcel) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
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
              groupSelected: true,
              showActionModal: false,
              saveIndication: false,
            },
            textStateValues: {
              ...state.textStateValues,
              selectedGroup: groupName,
              tempValue: '',
            },
            duplicateRecord: [],
            joiTableValidation: [],
            selectedRowKeys: [],
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
              modalsTitle: 'Select BU',
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
              modalsTitle: 'Select BU',
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
                modalsTitle: 'Select BU',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              duplicateRecord: [],
              joiTableValidation: [],
              selectedRowKeys: [],
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
                modalsTitle: 'Select BU',
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
              modalsTitle: 'Select BU',
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
              modalsTitle: 'Select BU',
              modalsIcon: failureIcon,
              modalsMessage: 'No records found.',
            },
            duplicateRecord: [],
            joiTableValidation: [],
            selectedRowKeys: [],
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
              modalsTitle: 'Select BU',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            duplicateRecord: [],
            joiTableValidation: [],
            selectedRowKeys: [],
          }));
        }
      });
  };

  const handleActionModalOk = (key) => {
    if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
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
          saveIndication: false,
        },
        selectedRowKeys: [],
        joiTableValidation: [],
        duplicateRecord: [],
      }));
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
      if (state.textStateValues.modalsTitle === 'Clear BU') {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            groupSelected: false,
            saveIndication: false,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            selectedGroup: '',
          },
          tableData: initialState.tableData,
          keyCount: 2,
          selectedRowKeys: [],
          duplicateRecord: [],
          joiTableValidation: [],
        }));
      } else {
        getMaternityDetails(state.textStateValues.tempValue, false);
      }
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
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
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

  const handleSelectChange = (keyName, index) => (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? {
            ...item, [keyName]: value[0], bu_name: value[1], reporting_manager: value[2],
          } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? {
            ...item, [keyName]: value[0], bu_name: value[1], reporting_manager: value[2],
          } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
    }
  };

  const handleDateChange = (_, dateString, index, keyName) => {
    if (keyName === 'maternity_start_date') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString, maternity_end_date: '' } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString, maternity_end_date: '' } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    } else if (keyName === 'maternity_end_date') {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, [keyName]: dateString } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [name]: value } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [name]: value } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
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
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
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
                placeholder="Select Resource Emp ID"
                name="resource_emp_id"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                disabled={state.booleanStateValues.groupSelected}
                onSelect={handleSelectChange('resource_emp_id', index)}
              >
                {state.resourceList.map((emp) => {
                  if (emp.resource_status !== 'Inactive') {
                    return (
                      <Select.Option
                        key={emp.resource_emp_id}
                        value={[emp.resource_emp_id, emp.bu_name, emp.reporting_manager]}
                      >
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
            placeholder="Select Resource Emp ID"
            name="resource_emp_id"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            disabled={state.booleanStateValues.groupSelected}
            onSelect={handleSelectChange('resource_emp_id', index)}
          >
            {state.resourceList.map((emp) => {
              if (emp.resource_status !== 'Inactive') {
                return (
                  <Select.Option
                    key={emp.resource_emp_id}
                    value={[emp.resource_emp_id, emp.bu_name, emp.reporting_manager]}
                  >
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
      title: 'BU Name',
      dataIndex: 'bu_name',
      key: 'bu_name',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'bu_name',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'bu_name',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              null
            </Tooltip>
          );
        }
        return text;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.bu_name !== prevRecord.bu_name;
      },
    },
    {
      title: 'Reporting Manager',
      dataIndex: 'reporting_manager',
      key: 'reporting_manager',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'reporting_manager',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'reporting_manager',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              null
            </Tooltip>
          );
        }
        return text;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.reporting_manager !== prevRecord.reporting_manager;
      },
    },
    {
      title: 'Maternity Start Date',
      dataIndex: 'maternity_start_date',
      key: 'maternity_start_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'maternity_start_date',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'maternity_start_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Maternity Start Date"
                name="maternity_start_date"
                value={text ? moment(text) : undefined}
                disabled={state.booleanStateValues.groupSelected || state.tableData[index].resource_emp_id === ''}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'maternity_start_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Maternity Start Date"
            name="maternity_start_date"
            value={text ? moment(text) : undefined}
            disabled={state.booleanStateValues.groupSelected || state.tableData[index].resource_emp_id === ''}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'maternity_start_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.maternity_start_date !== prevRecord.maternity_start_date;
      },
    },
    {
      title: 'Maternity End Date',
      dataIndex: 'maternity_end_date',
      key: 'maternity_end_date',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'maternity_end_date',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'maternity_end_date',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <DatePicker
                placeholder="Select Maternity End Date"
                name="maternity_end_date"
                value={text ? moment(text) : undefined}
                disabledDate={(d) => {
                  return (!d || d.isBefore(moment(state.tableData[index].maternity_start_date).endOf('day')));
                }}
                disabled={state.booleanStateValues.groupSelected ? true : state.tableData[index].maternity_start_date.length === 0}
                onChange={(date, dateString) => handleDateChange(date, dateString, index, 'maternity_end_date')}
              />
            </Tooltip>
          );
        }
        return (
          <DatePicker
            placeholder="Select Maternity End Date"
            name="maternity_end_date"
            value={text ? moment(text) : undefined}
            disabledDate={(d) => {
              return (!d || d.isBefore(moment(state.tableData[index].maternity_start_date).endOf('day')));
            }}
            disabled={state.booleanStateValues.groupSelected ? true : state.tableData[index].maternity_start_date.length === 0}
            onChange={(date, dateString) => handleDateChange(date, dateString, index, 'maternity_end_date')}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.maternity_end_date !== prevRecord.maternity_end_date;
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
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <Input
            placeholder="Enter Remarks"
            name="remarks"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.remarks !== prevRecord.remarks;
      },
    },
  ];

  const handleSaveClick = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;
    if (state.booleanStateValues.groupSelected) {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/promTool/maternity/updateMaternity`, body)
        .then((res) => {
          if (res.status === 200) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                groupSelected: false,
                showStatusModal: true,
                saveIndication: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Maternity',
                modalsIcon: successIcon,
                modalsMessage: 'Data update successfully.',
                selectedGroup: '',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              duplicateRecord: [],
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
                modalsTitle: 'Update Maternity',
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
                modalsTitle: 'Update Maternity',
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
                  modalsTitle: 'Update Maternity',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                duplicateRecord: [],
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
                  modalsTitle: 'Update Maternity',
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
                modalsTitle: 'Update Maternity',
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
                modalsTitle: 'Update Maternity',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to update Maternity. Please try again.',
              },
              duplicateRecord: [],
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
                modalsTitle: 'Update Maternity',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              duplicateRecord: [],
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
                modalsTitle: 'Update Maternity',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
            }));
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/promTool/maternity/saveMaternity`, body)
        .then((res) => {
          if (res.status === 201) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
                saveIndication: false,
                dependencyValue: !state.booleanStateValues.dependencyValue,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Maternity',
                modalsIcon: successIcon,
                modalsMessage: 'Data saved successfully.',
              },
              tableData: initialState.tableData,
              keyCount: 2,
              selectedRowKeys: [],
              duplicateRecord: [],
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
                modalsTitle: 'Save Maternity',
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
                modalsTitle: 'Save Maternity',
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
                  modalsTitle: 'Save Maternity',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
                duplicateRecord: [],
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
                  modalsTitle: 'Save Maternity',
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
                modalsTitle: 'Save Maternity',
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
                modalsTitle: 'Save Maternity',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to save Maternity. Please try again.',
              },
              duplicateRecord: [],
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
                modalsTitle: 'Save Maternity',
                modalsIcon: failureIcon,
                // eslint-disable-next-line react/jsx-one-expression-per-line
                // modalsMessage: <p>Maternity {err.response.data.data.length > 1 ? 'are' : 'is'} already exists for the highlighted records.</p>,
                modalsMessage: 'Duplicate data found for highlighted records.',
              },
              duplicateRecord: err.response.data.data,
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
                modalsTitle: 'Save Maternity',
                modalsIcon: failureIcon,
                modalsMessage: 'Duplicate records found. Please check highlighted records.',
              },
              duplicateRecord: err.response.data.data,
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
                modalsTitle: 'Save Maternity',
                modalsIcon: failureIcon,
                modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
              },
              joiTableValidation: err.response.data.data.errorDetails,
              duplicateRecord: [],
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
                modalsTitle: 'Save Maternity',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
            }));
          }
        });
    }
  };

  const handleGroupSelect = (value) => {
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
          modalsTitle: 'Group Select',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      getMaternityDetails(value, false);
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
          modalsTitle: 'Clear BU',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          groupSelected: false,
          saveIndication: false,
        },
        textStateValues: {
          ...state.textStateValues,
          selectedGroup: '',
        },
        tableData: initialState.tableData,
        keyCount: 2,
        selectedRowKeys: [],
      }));
    }
  };

  return (
    <div>
      {roles.includes(207) ? (
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
                  <PageHeader>Maternity Group</PageHeader>
                  {state.booleanStateValues.saveIndication && (
                    <StarFilled className="save-indication" />
                  )}
                </div>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>BU:</Typography>
                    <Select
                      style={{ width: '200px' }}
                      placeholder="Select BU"
                      allowClear
                      showSearch
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      onClear={handleClear}
                      value={state.textStateValues.selectedGroup || null}
                      onSelect={handleGroupSelect}
                    >
                      {state.maternityDetails.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
                      {state.maternityDetails.map((groupName, i) => {
                        return (
                          <Select.Option
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            value={groupName}
                          >
                            {groupName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select BU Name to view/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Tooltip placement="bottom" title="Save Maternity Group">
                      <Button type="primary" onClick={handleSaveClick} disabled={!(enableSave && state.booleanStateValues.saveIndication)}>
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/data-management/maternity-group" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                <div className="table-border">
                  <div className="table-btn-flex">
                    <Space>
                      <Tooltip placement="bottom" title="Add Maternity">
                        <Button type="primary" disabled={state.booleanStateValues.groupSelected} onClick={handleAddClick}>
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
                    <Tooltip placement="bottom" title="Export Maternity Data to Excel">
                      <Button onClick={() => getMaternityDetails('All', true)}>
                        <DownloadOutlined />
                        Export Data
                      </Button>
                    </Tooltip>
                  </div>
                  <Table
                    columns={tableColumns}
                    dataSource={state.tableData}
                    pagination={false}
                    bordered
                    rowKey={state.booleanStateValues.groupSelected ? 'id' : 'key'}
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

export default MaternityGroup;
