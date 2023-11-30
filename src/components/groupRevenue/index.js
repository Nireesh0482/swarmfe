/* eslint-disable react/function-component-definition, arrow-body-style, no-param-reassign */
import React, { useState, useEffect } from 'react';
import {
  Spin, PageHeader, Typography, Space, DatePicker, Button, Tooltip, Table, Modal, Select, Switch, Divider,
} from 'antd';
import {
  EyeFilled, DownloadOutlined, QuestionCircleOutlined, CloseCircleFilled, InfoCircleTwoTone,
} from '@ant-design/icons';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ToolTip,
  Legend, ResponsiveContainer, LabelList, Label,
} from 'recharts';
import moment from 'moment';
import axios from 'axios';
import Excel from 'exceljs';
import SaveAs from 'file-saver';
import convertSVGtoPng from '../../utils/svgToImage';
import { convertStringRGBtoHex } from '../../utils/colorConversion';

const initialState = {
  booleanStateValues: {
    isLoading: false,
    showTable: false,
    showStatusModal: false,
    showTableWise: true,
  },
  textStateValues: {
    startMonth: null,
    endMonth: null,
    error: '',
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
  groupDetailsList: [],
  groupDetailsGraph: [],
  selectedValue: [],
  tableData: [],
  graphData: [],
  graphColor: [],
  graphBarColor: [],
};

const GroupRevenue = () => {
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
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/promReports/getGRPRevenueReports`, body)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.totalArr.length !== 0 && res.data.data.totalArr[0].monthWiseTableData.length !== 0) {
            if (state.textStateValues.startMonth !== null) {
              setState((prevState) => ({
                ...prevState,
                tableData: res.data.data.totalArr,
                graphData: res.data.data.graphArr,
                // eslint-disable-next-line max-len
                graphColor: Object.keys(res.data.data.graphArr[0][0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                groupDetailsGraph: res.data.data.allGroupsGraph,
                // eslint-disable-next-line max-len
                graphBarColor: Object.keys(res.data.data.allGroupsGraph[0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                  showTableWise: true,
                },
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                tableData: res.data.data.totalArr,
                graphData: res.data.data.graphArr,
                // eslint-disable-next-line max-len
                graphColor: Object.keys(res.data.data.graphArr[0][0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                groupDetailsGraph: res.data.data.allGroupsGraph,
                // eslint-disable-next-line max-len
                graphBarColor: Object.keys(res.data.data.allGroupsGraph[0]).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showTable: true,
                  showTableWise: true,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Project Revenue Report',
                  modalsIcon: infoIcon,
                  // eslint-disable-next-line max-len
                  modalsMessage: `Records will be displayed from ${moment(res.data.data.graphArr[0][0].month).format('MMM-YY')} to ${moment(new Date()).subtract(1, 'months').format('MMM-YY')} month.`,
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
              modalsTitle: 'Project Revenue Report',
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
              modalsTitle: 'Project Revenue Report',
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
                modalsTitle: 'Project Revenue Report',
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
                modalsTitle: 'Project Revenue Report',
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
              modalsTitle: 'Project Revenue Report',
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
              modalsTitle: 'Project Revenue Report',
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
              modalsTitle: 'Project Revenue Report',
              modalsIcon: failureIcon,
              modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              error: '',
            },
          }));
        }
      });
  };

  const tableColumns = [];
  if (state.tableData.length > 0) {
    Object.entries(state.tableData[0]).forEach((col, i) => {
      if (col[0] === 'monthWiseTableData') {
        col[1].forEach((val, j) => {
          const planned = `planned${j}`;
          const actual = `actual${j}`;
          tableColumns.push({
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

  const revenueTableData = [];
  if (state.tableData.length > 0) {
    state.tableData.forEach((row, i) => {
      revenueTableData.push({});
      let obj = {};
      row.monthWiseTableData.forEach((e, l) => {
        const planned = `planned${l}`;
        const actual = `actual${l}`;
        obj = {
          ...obj,
          [planned]: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(Object.values(e)[0].plannedRevenue),
          [actual]: new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(Object.values(e)[0].actualRevenue),
        };
      });
      const finalObj = {
        projectBUName: row.projectBUName,
        totalActualRevenue: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(row.totalActualRevenue),
        totalPlannedRevenue: new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(row.totalPlannedRevenue),
        ...obj,
      };
      revenueTableData[i] = { ...revenueTableData[i], ...finalObj };
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

  // Export Excel
  const handleExportExcel = async () => {
    // Creation of Excel Workbook
    const workbook = new Excel.Workbook();
    // eslint-disable-next-line max-len
    const fileName = `RM_Group_Revenue_Report_${moment().format('DD-MMM-YYYY')}_${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`; // Name to created/downloaded Excel file

    try {
      // creating worksheet1 in workbook
      const worksheet1 = workbook.addWorksheet('BU Revenue', {
        views: [{ showGridLines: false }],
      });

      const groupRevenue = [
        [],
        [' ', 'BU Revenue Report'],
        [],
      ];
      worksheet1.addRows(groupRevenue);

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
      worksheet1.getRow(5).values = [' ', '', '', ...excelTableSubHeaders];

      revenueTableData.forEach((ele) => {
        const rowData = [[' ', ...Object.values(ele)]];
        worksheet1.addRows(rowData);
      });

      // Formatting of sheet
      worksheet1.properties.defaultRowHeight = 21;
      worksheet1.properties.defaultColWidth = 20;
      worksheet1.getColumn(1).width = 5;
      worksheet1.mergeCells('B2:C2');
      worksheet1.mergeCells('B4:B5');
      worksheet1.mergeCells('C4:C5');

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

      const graphHeading = document.getElementsByTagName('h2');

      // select and all SVG images from the DOM in a Array
      const allSVGImages = document.getElementsByClassName('recharts-responsive-container');

      // eslint-disable-next-line max-len
      for (let index = 0, bRow = state.graphData.length + 8, gRow = state.graphData.length + 19; index < allSVGImages.length; index += 1, bRow += 16, gRow += 16) {
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
          modalsTitle: 'Export BU Revenue Report',
          modalsIcon: failureIcon,
          modalsMessage: 'Something went wrong.',
        },
      }));
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet('BU Revenue');
    }
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
      {roles.includes(219) ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {state.booleanStateValues.isLoading
            ? (
              <div className="pagecenter">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <PageHeader>BU Revenue</PageHeader>
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
                        return !d
                          || d.isBefore(moment(state.textStateValues.startMonth).startOf('month'));
                      }}
                      disabled={state.textStateValues.startMonth === null}
                    />
                  </Space>
                  <Space>
                    <Tooltip placement="bottom" title="View BU Revenue">
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
                      <a href="/rm-tool/help/reports/revenue/group-revenue" target="_blank">
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
                        <Table
                          columns={tableColumns}
                          dataSource={revenueTableData}
                          bordered
                          className="table-style"
                          pagination={false}
                          scroll={{ x: 200, y: 600 }}
                          rowKey="projectBUName"
                          size="small"
                        />
                      ) : (
                        <div>
                          <h2 style={{ textAlign: 'center' }}>BU&apos;s Revenue</h2>
                          <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                              margin={{
                                top: 40,
                                right: 0,
                                left: 30,
                                bottom: 0,
                              }}
                              // eslint-disable-next-line max-len
                              data={state.groupDetailsGraph.map((el) => { Object.keys(el).forEach((key) => { if (key !== 'month') { el[key] = +el[key]; } }); return el; })}
                            >
                              <XAxis dataKey="month">
                                <Label
                                  value="Months --->"
                                  offset={0}
                                  position="insideBottom"
                                  style={{ fontWeight: 'bold' }}
                                />
                              </XAxis>
                              <YAxis>
                                <Label
                                  value="Revenue --->"
                                  angle={-90}
                                  position="insideLeft"
                                  style={{ fontWeight: 'bold' }}
                                  dy={40}
                                  dx={-28}
                                />
                              </YAxis>
                              <ToolTip />
                              <Legend />
                              <CartesianGrid />
                              {Object.keys(state.groupDetailsGraph[0]).map((el, j) => {
                                if (el !== 'month') {
                                  return (
                                    <Bar key={el} dataKey={el} fill={state.graphBarColor[j]}>
                                      <LabelList
                                        dataKey={el}
                                        angle={-40}
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
                          <Divider />
                          {state.graphData.map((data, i) => {
                            return (
                              // eslint-disable-next-line react/no-array-index-key
                              <div key={i}>
                                <h2 style={{ textAlign: 'center' }}>{state.tableData[i].projectBUName}</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                  <LineChart
                                    // eslint-disable-next-line max-len
                                    data={data.map((el) => { Object.keys(el).forEach((key) => { if (key !== 'month') { el[key] = +el[key]; } }); return el; })}
                                    margin={{
                                      top: 40,
                                      right: 0,
                                      left: 30,
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
                                      />
                                    </XAxis>
                                    <YAxis>
                                      <Label
                                        value="Revenue --->"
                                        angle={-90}
                                        position="insideLeft"
                                        style={{ fontWeight: 'bold' }}
                                        dy={40}
                                        dx={-28}
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
                          })}
                        </div>
                      )}
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

export default GroupRevenue;
