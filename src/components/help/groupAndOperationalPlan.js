/* eslint-disable react/function-component-definition, arrow-body-style,  react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import GroupOperationalPlan from './images/GroupOperationalPlan.png';
import SaveBtn from './images/SaveBtn.PNG';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import ExportData from './images/ExportData.png';
import GroupList from './images/GroupList.png';
import ExportTemplate from './images/ExportTemplate.png';

const GroupAndOperationalPlan = () => {
  return (
    <div>
      <PageHeader>BU & Operational Plan</PageHeader>
      <div className="role-allocation-container">
        <h1><b>Steps to Add Single/Multiple BU & Operational Plan</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple BU & Operational Plan.</li>
          <li>Enter/Select the BU & Operational Plan fields.</li>
          <img
            src={GroupOperationalPlan}
            alt="Add single/multiple Group & Operational Plan"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of BU & Operational Plan(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the added BU & Operational Plan.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>Steps to Export BU & Operational Plan Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Export list of existing BU and Operational Plan into Excel</b></h1>
        <ol>
          <li>Click on <b>Export Data</b> button.</li>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Excel containing existing BU and Operational Plan and their details is generated and downloaded.</li>
        </ol>
        <h1><b>Steps to Import BU & Operational Plan</b></h1>
        <ol>
          <li>Click on <b>Import Data</b> button to upload excel(BU & Operational Plan Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
          <li>Click on <b>Save</b> button to save the uploaded excel data.</li>
        </ol>
        <h1><b>To View/Update the BU & Operational Plan</b></h1>
        <ol>
          <li>
            Select the BU from Dropdown List that needs to be Updated.
          </li>
          <img
            src={GroupList}
            alt="Group List"
            height={250}
            width={300}
          />
          <li>BU & Operational Plan details are showed in table. </li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default GroupAndOperationalPlan;
