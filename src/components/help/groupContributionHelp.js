/* eslint-disable react/function-component-definition, arrow-body-style */
import React from 'react';
import { PageHeader } from 'antd';
import GroupListData from './images/ReportsGroupList.png';
import StartMonth from './images/StartMonth.png';
import EndMonth from './images/EndMonth.png';
import ViewBtn from './images/ViewBtn.PNG';
import ExportData from './images/ExportData.png';

const GroupContributionHelp = () => {
  return (
    <div>
      <PageHeader>
        BU Contribution
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>Step 1. Select the BU Name from Dropdown list</b></h1>
        <ol>
          <img
            src={GroupListData}
            alt="Group List"
            height={250}
            width={300}
          />
          <li>On select of BU Name, by default All option is selected in Project dropdown.</li>
          <li>If All projects data is not required, then select the required projects from dropdown.</li>
        </ol>
        <h1><b>Step 2. Select the Start Month and End Month</b></h1>
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
        <h1><b>Step 3. Click on View button to display the Details of BU</b></h1>
        <ol>
          <img src={ViewBtn} alt="View Button" height={50} width={100} />
          <li>
            On Clicking of View button, BU Contribution Table of selected group(s) is displayed.
          </li>
        </ol>
        <h1><b>Step 4. Click on Export Data button</b></h1>
        <ol>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>BU Contribution Report is generated and downloaded.</li>
        </ol>
      </div>
    </div>
  );
};

export default GroupContributionHelp;
