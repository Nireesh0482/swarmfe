/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader, Space } from 'antd';
import ClaimsStatusList from './images/ClaimsStatusList.png';
import ViewBtn from './images/ViewBtn.PNG';
import ExportData from './images/ExportData.png';
import ProjectList from './images/ProjectList.png';
import EmpList from './images/EmployeesList.png';

const ClaimsReportsHelp = () => {
  return (
    <div>
      <PageHeader>
        Claims Report
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>Step 1. Select the desirable filters</b></h1>
        <ol>
          <Space>
            <img
              src={ProjectList}
              alt="Project List"
              height={200}
              width={300}
            />
            <img
              src={EmpList}
              alt="Employee List"
              height={200}
              width={300}
            />
            <img
              src={ClaimsStatusList}
              alt="Claims Status List"
              height={200}
              width={300}
            />
          </Space>
          <ol>
            <li>
              Based on the requirement, Select Project(s) or Employee(s) to filter out.
            </li>
            <li>
              Select month to see if any claims requested on particular month (Optional).
            </li>
            <li>Details of Claim(s) is displayed based on applied filters.</li>
          </ol>
        </ol>
        <h1><b>Step 2. Click on View button to Display the details</b></h1>
        <ol>
          <img src={ViewBtn} alt="View Button" height={50} width={100} />
          <li>
            On Clicking of View button, Claims Table of selected status is displayed.
          </li>
        </ol>
        <h1><b>Step 3. Click on Export Data button</b></h1>
        <ol>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Claims Report of selected status is generated and downloaded.</li>
        </ol>
      </div>
    </div>
  );
};

export default ClaimsReportsHelp;
