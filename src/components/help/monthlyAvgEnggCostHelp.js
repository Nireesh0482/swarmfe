/* eslint-disable react/function-component-definition, arrow-body-style */
import React from 'react';
import { PageHeader } from 'antd';
import StartMonth from './images/StartMonth.png';
import EndMonth from './images/EndMonth.png';
import ViewBtn from './images/ViewBtn.PNG';
import ExportData from './images/ExportData.png';

const MonthlyAvgEnggCost = () => {
  return (
    <div>
      <PageHeader>
        Monthly Average Engg. Cost
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>Step 1. Select the Start Month and End Month</b></h1>
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
        <h1><b>Step 2. Click on View button</b></h1>
        <ol>
          <img src={ViewBtn} alt="View Button" height={50} width={100} />
          <li>
            On Clicking of View button, Monthly Average Engg. Cost Table is displayed.
          </li>
        </ol>
        <h1><b>Step 3. Click on Export Data button</b></h1>
        <ol>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Monthly Average Engg. Cost Report is generated and downloaded.</li>
        </ol>
      </div>
    </div>
  );
};

export default MonthlyAvgEnggCost;
