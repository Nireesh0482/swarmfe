/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign, max-len */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Space, Typography, Select, Upload,
  Tooltip, Button, Table, Modal, InputNumber,
} from 'antd';
import {
  StarFilled, UploadOutlined, PlusOutlined, SaveFilled, QuestionCircleOutlined, InfoCircleOutlined,
  CloseCircleFilled, InfoCircleTwoTone, QuestionCircleTwoTone, CheckCircleFilled, DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import axios from 'axios';
import moment from 'moment';
import { Prompt } from 'react-router-dom';
import Excel from 'exceljs';
import SaveAs from 'file-saver';

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showActionModal: false,
    showStatusModal: false,
    saveIndication: false,
    dependencyValue: false,
    focus: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedEmployee: '',
  },
  tableData: [
    {
      key: 1,
      resource_emp_id: '',
      skill: '',
      relevant_exp: '',
      competency_level: '',
    },
  ],
  keyCount: 2,
  resourceList: [],
  skillDataList: [],
  resourceSkillList: [],
  tempValue: [],
  selectedRowKeys: [],
  selectedRows: [],
  joiTableValidation: [],
  duplicateRecord: [],
};

const ResourceSkillData = () => {
  const [state, setState] = useState(initialState);
  const roles = JSON.parse(localStorage.getItem('Role'));
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const optionIcon = <QuestionCircleTwoTone className="option-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const infoIcon = <InfoCircleTwoTone className="info-icon" />;
  const lightRed = '#fc8f83';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceSkill/getAllResourceSkill`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          resourceSkillList: res.data.data,
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

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/resourceManagement/getAllSkills`)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          skillDataList: res.data.data,
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

  const beforeUpload = (file, fileList) => {
    if (state.booleanStateValues.saveIndication) {
      const files = { file, fileList };
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Import Resource Skill Data',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: [files],
      }));
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  // onclick of import button call function
  const handleUploadExcel = (e) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const reader = new FileReader();
    let errRow = [];
    // evt = on_file_select event
    reader.onload = (evt) => {
      try {
        // Parse data
        const data = evt.target.result;
        const wb = XLSX.read(data, { type: 'binary' });
        const sheet = wb.SheetNames[0];
        const excel = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: null });
        const excelData = excel.map((row, index) => Object.keys(row).reduce((obj, key) => {
          const object = obj;
          object.key = index + 1;
          if (key.trim() === '' || key.trim() === '__EMPTY' || key.trim() === null) {
            delete object[key];
            // eslint-disable-next-line max-len
          } else if (key.trim() === 'Resource Emp ID' && row[key] !== null && row[key].toString().split('-')[0].trim().length >= 4) {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = row[key].toString().split('-')[0].trim();
          } else if (key.trim() === 'Resource Emp ID'
            // eslint-disable-next-line max-len
            && (row[key] === null || row[key].toString().split('-')[0].trim().length !== 4 || row[key].toString().split('-')[0].trim().length === undefined)) {
            errRow.push(row['Resource Emp ID']);
          } else if (key.trim() === 'Relevant Exp.') {
            object.relevant_exp = row[key].toString().trim();
          } else if (row[key] === null) {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = '';
          } else {
            object[key.replace(/\s+/g, '_').toLowerCase().trim()] = row[key].toString().trim();
          }
          return object;
        }, {}));
        if (errRow.length > 0) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              saveIndication: false,
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Resource Skill Data',
              modalsIcon: failureIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line, max-len
              modalsMessage: <p>Minimum length of &apos;Resource Emp ID&apos; should be 4. Please check the records of &apos;Resource Emp ID&apos; (<b>{errRow.join(', ')}</b>).</p>,
            },
            tempValue: [],
          }));
          errRow = [];
        } else if (excelData[0].resource_emp_id !== undefined && excelData[0].skill !== undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              saveIndication: true,
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Resource Skill Data',
              modalsIcon: infoIcon,
              // eslint-disable-next-line react/jsx-one-expression-per-line
              modalsMessage: <p>Click on <b>&quot;Save&quot;</b> button after importing the data.</p>,
              selectedEmployee: '',
            },
            selectedRowKeys: [],
            selectedRows: [],
            tableData: excelData,
            keyCount: excelData.length + 1,
            joiTableValidation: [],
            duplicateRecord: [],
            tempValue: [],
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              saveIndication: false,
              showStatusModal: true,
              showActionModal: false,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Import Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Invalid excel for Resource Skill Data.',
            },
            tempValue: [],
          }));
        }
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
            saveIndication: false,
            showStatusModal: true,
            showActionModal: false,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Import Resource Skill Data',
            modalsIcon: failureIcon,
            modalsMessage: 'Invalid excel for Resource Skill Data.',
          },
          tempValue: [],
        }));
      }
    };
    reader.readAsBinaryString(e.file);
  };

  const handleInputChange = (e, index) => {
    if (e === null) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, relevant_exp: '' } : item;
        }),
      }));
    } else if (e.target === undefined) {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, relevant_exp: e === 0 ? '0' : e } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          tableData: prevState.tableData.map((item, i) => {
            return index === i ? { ...item, relevant_exp: e === 0 ? '0' : e } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    }
  };

  const handleSelectChange = (keyName, index) => (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: value } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: prevState.tableData.map((item, i) => {
          return index === i ? { ...item, [keyName]: value } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
    }
  };

  const tableColumnsData = [
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
                placeholder="Select Employee"
                name="resource_emp_id"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                disabled={!!record.skill_id}
                onSelect={handleSelectChange('resource_emp_id', index)}
              >
                {state.resourceList.map((emp) => {
                  if (emp.resource_status !== 'Inactive') {
                    return (
                      <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
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
            placeholder="Select Employee"
            name="resource_emp_id"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            disabled={!!record.skill_id}
            onSelect={handleSelectChange('resource_emp_id', index)}
          >
            {state.resourceList.map((emp) => {
              if (emp.resource_status !== 'Inactive') {
                return (
                  <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
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
      title: 'Skill',
      dataIndex: 'skill',
      key: 'skill',
      width: 170,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'skill',
        );
        const duplicateError = state.duplicateRecord.find((index) => index === rowIndex);
        const colorOfBackground = (validationError || duplicateError) === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'skill',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Skill"
                name="skill"
                value={text || null}
                showSearch
                disabled={!!record.skill_id}
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onChange={handleSelectChange('skill', index)}
              >
                {state.skillDataList.map((skills) => {
                  return (
                    <Select.Option key={skills.skill_id} value={skills.skill}>
                      {skills.skill}
                    </Select.Option>
                  );
                })}
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Select Skill"
            name="skill"
            value={text || null}
            showSearch
            disabled={!!record.skill_id}
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onChange={handleSelectChange('skill', index)}
          >
            {state.skillDataList.map((skills) => {
              return (
                <Select.Option key={skills.skill_id} value={skills.skill}>
                  {skills.skill}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.skill !== prevRecord.skill;
      },
    },
    {
      title: 'Relevant Exp.',
      dataIndex: 'relevant_exp',
      key: 'relevant_exp',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'relevant_exp',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'relevant_exp',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <InputNumber
                type="number"
                style={{ width: '100%' }}
                controls={false}
                placeholder="Enter Relevant Exp"
                name="relevant_exp"
                value={text || null}
                onChange={(e) => handleInputChange(e, index)}
              />
            </Tooltip>
          );
        }
        return (
          <InputNumber
            type="number"
            style={{ width: '100%' }}
            controls={false}
            placeholder="Enter Relevant Exp"
            name="relevant_exp"
            value={text || null}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.relevant_exp !== prevRecord.relevant_exp;
      },
    },
    {
      title: 'Competency Level',
      dataIndex: 'competency_level',
      key: 'competency_level',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'competency_level',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'competency_level',
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              <Select
                style={{ width: '100%' }}
                placeholder="Select Competency Level"
                name="competency_level"
                value={text || null}
                showSearch
                filterOption={(inputValue, option) => option.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                onChange={handleSelectChange('competency_level', index)}
              >
                <Select.Option value="1.00">1.00</Select.Option>
                <Select.Option value="2.00">2.00</Select.Option>
                <Select.Option value="3.00">3.00</Select.Option>
                <Select.Option value="4.00">4.00</Select.Option>
                <Select.Option value="5.00">5.00</Select.Option>
                <Select.Option value="6.00">6.00</Select.Option>
                <Select.Option value="7.00">7.00</Select.Option>
                <Select.Option value="8.00">8.00</Select.Option>
                <Select.Option value="9.00">9.00</Select.Option>
                <Select.Option value="10.00">10.00</Select.Option>
              </Select>
            </Tooltip>
          );
        }
        return (
          <Select
            style={{ width: '100%' }}
            placeholder="Select Competency Level"
            name="competency_level"
            value={text || null}
            showSearch
            filterOption={(inputValue, option) => option.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
            onChange={handleSelectChange('competency_level', index)}
          >
            <Select.Option value="1.00">1.00</Select.Option>
            <Select.Option value="2.00">2.00</Select.Option>
            <Select.Option value="3.00">3.00</Select.Option>
            <Select.Option value="4.00">4.00</Select.Option>
            <Select.Option value="5.00">5.00</Select.Option>
            <Select.Option value="6.00">6.00</Select.Option>
            <Select.Option value="7.00">7.00</Select.Option>
            <Select.Option value="8.00">8.00</Select.Option>
            <Select.Option value="9.00">9.00</Select.Option>
            <Select.Option value="10.00">10.00</Select.Option>
          </Select>
        );
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.competency_level !== prevRecord.competency_level;
      },
    },
  ];

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

  const handleActionModalOk = (key, row) => {
    if (key.length > 0) {
      if (state.tableData.length === key.length) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showActionModal: false,
            saveIndication: false,
          },
          tableData: initialState.tableData,
          keyCount: 2,
          selectedRowKeys: [],
          selectedRows: [],
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
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showActionModal: false,
              focus: false,
            },
            tableData: prevState.tableData.filter((item) => !row.some((keyValue) => keyValue.key === item.key)),
            selectedRowKeys: [],
            selectedRows: [],
          }));
        }, 10);
      }
    } else if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        tempValue: [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        selectedRowKeys: [],
        selectedRows: [],
      }));
    }
  };

  const handleActionModalCancel = () => {
    if (state.textStateValues.modalsMessage === 'Do you want to save the changes?') {
      if (state.tempValue.length > 0) {
        if (state.textStateValues.modalsTitle === 'Import Resource Skill Data') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
            },
            tableData: initialState.tableData,
          }));
          setTimeout(() => {
            handleUploadExcel(state.tempValue[0]);
          }, 10);
        } else {
          setState((prevState) => ({
            ...prevState,
            tableData: state.tempValue[0] !== 'All' ? state.resourceSkillList.filter((emp) => state.tempValue.includes(emp.resource_emp_id)) : state.resourceSkillList,
            booleanStateValues: {
              ...state.booleanStateValues,
              showActionModal: false,
              saveIndication: false,
            },
            textStateValues: {
              ...state.textStateValues,
              selectedEmployee: state.tempValue[0],
            },
            tempValue: [],
            selectedRowKeys: [],
            selectedRows: [],
            joiTableValidation: [],
            duplicateRecord: [],
          }));
        }
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
        },
        selectedRowKeys: [],
        selectedRows: [],
      }));
    }
  };

  const actionModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      maskClosable={false}
      keyboard={false}
      centered
      destroyOnClose
      closable={false}
      visible={state.booleanStateValues.showActionModal}
      onOk={handleActionModalCancel}
      onCancel={() => handleActionModalOk(state.selectedRowKeys, state.selectedRows)}
      okText={state.textStateValues.modalsMessage.length === 32 ? 'No' : 'Cancel'}
      cancelText={state.textStateValues.modalsMessage.length === 32 ? 'Yes' : 'OK'}
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

  const handleEmployeeSelect = (value) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: 'Select Employee',
          modalsIcon: optionIcon,
          modalsMessage: 'Do you want to save the changes?',
        },
        tempValue: [value],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        tableData: value !== 'All' ? state.resourceSkillList.filter((emp) => value.includes(emp.resource_emp_id)) : state.resourceSkillList,
        textStateValues: {
          ...state.textStateValues,
          selectedEmployee: value,
        },
        keyCount: 2,
        selectedRowKeys: [],
        selectedRows: [],
        joiTableValidation: [],
        duplicateRecord: [],
      }));
    }
  };

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      tableData: initialState.tableData,
      keyCount: 2,
      selectedRowKeys: [],
      selectedRows: [],
      booleanStateValues: {
        ...state.booleanStateValues,
        saveIndication: false,
      },
      textStateValues: {
        ...state.textStateValues,
        selectedEmployee: '',
      },
      joiTableValidation: [],
      duplicateRecord: [],
    }));
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys,
        selectedRows,
      }));
    },
    getCheckboxProps: (record) => {
      return {
        disabled: !!record.skill_id,
      };
    },
  };

  const handleAddClick = () => {
    const newRow = {
      key: state.keyCount,
      resource_emp_id: '',
      skill: '',
      relevant_exp: '',
      competency_level: '',
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
        tableData: [...prevState.tableData, newRow],
        keyCount: state.keyCount + 1,
        booleanStateValues: {
          ...state.booleanStateValues,
          focus: true,
        },
      }));
    }
  };

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

  const handleSave = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = state.tableData;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/resourceSkill/saveResourceSkillData`, body)
      .then((res) => {
        if (res.status === 200) {
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
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: successIcon,
              modalsMessage: 'Data saved successfully.',
              selectedEmployee: '',
            },
            tableData: initialState.tableData,
            keyCount: 2,
            selectedRowKeys: [],
            selectedRows: [],
            joiTableValidation: [],
            duplicateRecord: [],
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
              modalsTitle: 'Save Resource Skill Data',
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
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Server down. Please try again.',
            },
          }));
        } else if (err.response.status === 400) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Database error. Please contact the Admin.',
            },
            joiTableValidation: [],
            duplicateRecord: [],
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
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Failed to save Resource Skill Data. Please try again.',
            },
            joiTableValidation: [],
            duplicateRecord: [],
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
                modalsTitle: 'Save Resource Skill Data',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal server error. Please contact the Admin.',
              },
              joiTableValidation: [],
              duplicateRecord: [],
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
                modalsTitle: 'Save Resource Skill Data',
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
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Your Role access has changed. Please Login again.',
            },
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
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory fields are not available/incorrect. Please check highlighted records.',
            },
            joiTableValidation: err.response.data.data.errorDetails,
            duplicateRecord: [],
          }));
        } else if (err.response.status === 406) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Duplicate records found. Please check highlighted records.',
            },
            joiTableValidation: [],
            duplicateRecord: err.response.data.data,
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
              modalsTitle: 'Save Resource Skill Data',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
            },
            joiTableValidation: [],
            duplicateRecord: [],
          }));
        }
      });
  };

  const enableSave = state.tableData.length > 0 && state.tableData[0].resource_emp_id !== ''
    && state.tableData[0].skill !== '' && state.tableData[0].relevant_exp !== '' && state.tableData[0].competency_level !== '';

  const handleExportExcel = async (exportData) => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();

    // eslint-disable-next-line max-len
    const fileName = exportData ? `RM_Resource_Skill_Data_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}` : 'RM_Resource_Skill_Data_Template';

    try {
      const worksheet1 = workbook.addWorksheet('Resource Skill Data', {
        views: [{ showGridLines: false }],
      });
      const resourceSkillTable = [
        [],
        [
          ' ',
          'Sl. No.',
          'Resource Emp ID',
          'Skill',
          'Relevant Exp.',
          'Competency Level',
        ],
      ];
      if (exportData) {
        resourceSkillTable[1].splice(1, 1);
      }
      worksheet1.addRows(resourceSkillTable);

      if (exportData && state.resourceSkillList.length > 0) {
        state.resourceSkillList.forEach((ele) => {
          worksheet1.addRow([
            ' ',
            ele.resource_emp_id,
            ele.skill,
            ele.relevant_exp,
            ele.competency_level,
          ]);
        });
      } else {
        const worksheet2 = workbook.addWorksheet('Resource List');
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < 10; k++) {
          worksheet1.addRow(['', '', '', '', '', '']);
        }
        let j = 0;
        if (state.resourceList.length > 0) {
          state.resourceList.forEach((emp) => {
            if (emp.resource_status !== 'Inactive') {
              // eslint-disable-next-line max-len
              worksheet2.getCell(`A${j + 1}`).value = `${emp.resource_emp_id} - ${emp.resource_name}`;
              j += 1;
            }
          });
        }
      }

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
            if (!exportData) {
              row.getCell('C').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: [`'Resource List'!$A$1:$A$${state.resourceList.length}`],
              };
              row.getCell('D').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                // eslint-disable-next-line prefer-template, no-useless-concat
                formulae: ['"' + state.skillDataList.map((skill) => skill.skill).join(',') + '"'],
              };
              row.getCell('F').dataValidation = {
                type: 'list',
                allowBlank: true,
                error: 'Please use the drop down to select a valid value',
                errorTitle: 'Invalid Selection',
                showErrorMessage: true,
                formulae: ['"1.00, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00"'],
              };
            }
          }
        });
        // Commit the changed row to the stream
        row.commit();
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      SaveAs(new Blob([buf]), `${fileName}.xlsx`);
      if (exportData) {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            showStatusModal: true,
          },
          textStateValues: {
            ...state.textStateValues,
            modalsTitle: 'Export Resource Skill Data',
            modalsIcon: successIcon,
            modalsMessage: 'Exported data successfully. Same excel can be used to edit and import again.',
          },
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showActionModal: false,
          showStatusModal: true,
        },
        textStateValues: {
          ...state.textStateValues,
          modalsTitle: exportData ? 'Export Resource Skill Data' : 'Export Resource Skill Data Template',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('Resource Skill Data');
      workbook.removeWorksheet('Resource List');
    }
  };

  return (
    <div>
      {roles.includes(229) ? (
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
                  <PageHeader>Resource Skill Data</PageHeader>
                  {state.booleanStateValues.saveIndication && (
                    <StarFilled className="save-indication" />
                  )}
                </div>
                <div className="dropdown-btns-flex">
                  <Space>
                    <Typography>Employee:</Typography>
                    <Select
                      style={{ width: '200px' }}
                      placeholder="Select Employee"
                      allowClear
                      showSearch
                      filterOption={(inputValue, option) => option.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())}
                      onClear={handleClear}
                      value={state.textStateValues.selectedEmployee || null}
                      onSelect={handleEmployeeSelect}
                    >
                      {state.resourceList.length > 0 && <Select.Option key="All" value="All">All</Select.Option>}
                      {state.resourceList.map((emp) => {
                        return (
                          <Select.Option key={emp.resource_emp_id} value={emp.resource_emp_id}>
                            {emp.resource_emp_id}
                            {' - '}
                            {emp.resource_name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <Tooltip placement="bottom" title="Select Employee to view/update existing data">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Space>
                    <Upload
                      accept=".xlsx, .xlsm"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadExcel}
                    >
                      <Tooltip placement="bottom" title="Import Resource Skill Data">
                        <Button type="primary">
                          <UploadOutlined />
                          Import Data
                        </Button>
                      </Tooltip>
                    </Upload>
                    <Tooltip placement="bottom" title="Save Resource Skill Data">
                      <Button
                        type="primary"
                        onClick={handleSave}
                        disabled={!(enableSave && state.booleanStateValues.saveIndication)}
                      >
                        <SaveFilled />
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Help">
                      <a href="/rm-tool/help/data-management/resource-skill-data" target="_blank">
                        <QuestionCircleOutlined className="help-icon" />
                      </a>
                    </Tooltip>
                  </Space>
                </div>
                {statusModal}
                {actionModal}
                <div className="table-border">
                  <div className="table-btn-flex">
                    <Space>
                      <Tooltip placement="bottom" title="Add Resource Skill Data">
                        <Button
                          type="primary"
                          // disabled={state.textStateValues.selectedEmployee !== ''}
                          onClick={handleAddClick}
                        >
                          <PlusOutlined />
                          Add
                        </Button>
                      </Tooltip>
                      <Tooltip
                        placement="bottom"
                        title="Select Row(s) to Delete"
                      >
                        <Button
                          type="primary"
                          onClick={handleDeleteClick}
                          disabled={state.selectedRowKeys.length === 0}
                        >
                          <DeleteOutlined />
                          Delete
                        </Button>
                      </Tooltip>
                    </Space>
                    <Space>
                      <Tooltip placement="bottom" title="Export Template to add new Resource Skill Data">
                        <Button onClick={() => handleExportExcel(false)}>
                          <DownloadOutlined />
                          Export Template
                        </Button>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Export Existing Resource Skill Data to Excel">
                        <Button
                          type="primary"
                          disabled={state.resourceSkillList.length === 0}
                          onClick={() => handleExportExcel(true)}
                        >
                          <DownloadOutlined />
                          Export Data
                        </Button>
                      </Tooltip>
                    </Space>
                  </div>
                  <Table
                    rowSelection={rowSelection}
                    columns={tableColumnsData}
                    dataSource={state.tableData.map((d, i) => ({ key: `key${i}`, ...d }))}
                    size="small"
                    pagination={false}
                    bordered
                    scroll={{ x: 200, y: 400 }}
                  />
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

export default ResourceSkillData;
