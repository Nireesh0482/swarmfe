/* eslint-disable react/function-component-definition, arrow-body-style */
import React from 'react';
import { PageHeader } from 'antd';
import GroupList from './images/GrpList.png';
import StartMonth from './images/StartMonth.png';
import EndMonth from './images/EndMonth.png';
import ViewBtn from './images/ViewBtn.PNG';
import ExportData from './images/ExportData.png';

const ResourceUtilization = () => {
  return (
    <div>
      <PageHeader>
        Operational Reports - Resource Utilization
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>Step 1. Select the BU(s) from Dropdown list</b></h1>
        <ol>
          <li>According to the requirement, Select the BU(s) from Dropdown list.</li>
          <img
            src={GroupList}
            alt="Group List"
            height={250}
            width={300}
          />
        </ol>
        <h1><b>Step 2. Select the Start Month and End Month (Optional)</b></h1>
        <ol>
          <li>
            According to the requirement, Select the Start Month and End Month.
          </li>
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
          <li>
            On Clicking of View button, Resource Utilization Table of selected BU is displayed.
          </li>
        </ol>
        <h1><b>Step 4.Click on Export Data button</b></h1>
        <ol>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>
            Resource Utilization Report of selected BU is generated and downloaded.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ResourceUtilization;
