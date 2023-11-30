/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import EmployeeList from './images/EmployeeList.png';
import StartMonth from './images/StartMonth.png';
import EndMonth from './images/EndMonth.png';
import ViewBtn from './images/ViewBtn.PNG';
import ExportData from './images/ExportData.png';

const ResourceUtilizationResourceLevelHelp = () => {
  return (
    <div>
      <PageHeader>
        Resource Utilization - Resource Level
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>Step 1. Select the Employee(s) from Dropdown list</b></h1>
        <ol>
          <li>According to the requirement, Select the Employee(s) from Dropdown list. Option of Selecting <b>All</b> Employees is also provided.</li>
          <img
            src={EmployeeList}
            alt="Employee List"
            height={250}
            width={300}
          />
        </ol>
        <h1><b>Step 2.Select the Start Month and End Month (Optional)</b></h1>
        <ol>
          <li>According to the requirement, Select the Start Month and End Month.</li>
          <img
            src={StartMonth}
            alt="Month List"
            height={200}
            width={300}
          />
          <img
            src={EndMonth}
            alt="Month List"
            height={200}
            width={300}
          />
        </ol>
        <h1><b>Step 3. Click on View button to Display the details</b></h1>
        <ol>
          <img src={ViewBtn} alt="View Button" height={50} width={100} />
          <li>On Clicking of View button, Resource Utilization Table of selected Employee(s) is displayed.</li>
        </ol>
        <h1><b>Step 4. Click on Export Data button</b></h1>
        <ol>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Resource Utilization Report of selected project is generated and downloaded.</li>
        </ol>
      </div>
    </div>
  );
};

export default ResourceUtilizationResourceLevelHelp;
