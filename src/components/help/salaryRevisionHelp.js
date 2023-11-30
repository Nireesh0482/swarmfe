/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import SalaryRevisionAddBtn from './images/SalaryRevisionAddBtn.png';
import SaveBtn from './images/SaveBtn.PNG';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import EmployeeList from './images/EmpList.png';
import TriggerBtn from './images/TriggerRevisionBtn.png';
import ExportTemplate from './images/ExportTemplate.png';
import ExportData from './images/ExportData.png';

const SalaryRevisionHelp = () => {
  return (
    <div>
      <PageHeader>Salary Revision</PageHeader>
      <div className="role-allocation-container">
        <h1><b>Steps to Add Single/Multiple Salary Revision</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple Salary Revision.</li>
          <li>Enter/Select the Salary Revision fields.</li>
          <img
            src={SalaryRevisionAddBtn}
            alt="Add single/multiple Salary Revision"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Salary Revision(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the added Salary Revision.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>Steps to Export Salary Revision Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Import Salary Revision</b></h1>
        <ol>
          <li>Click on <b>Import Data</b> button to upload excel(Salary Revision Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
          <li>Click on <b>Save</b> button to save the uploaded excel data.</li>
        </ol>
        <h1><b>Steps to Export list of existing Salary Revision(s) into Excel</b></h1>
        <ol>
          <li>Click on <b>Export Data</b> button.</li>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Excel containing existing Salary Revision(s) details is generated and downloaded.</li>
        </ol>
        <h1><b>To View/Update the Salary Revision</b></h1>
        <ol>
          <li>
            Select the Employee from Dropdown List that needs to be Updated.
          </li>
          <img
            src={EmployeeList}
            alt="Employee List"
            height={250}
            width={300}
          />
          <li>Salary Revision details are showed in table.</li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
        <h1><b>To Trigger the Salary Revision</b></h1>
        <ol>
          <li>Click on Trigger Revision button after Save of Data.</li>
          <li>Trigger Revision button will be enabled only after the Save of Data.</li>
          <img src={TriggerBtn} alt="Trigger Button" height={50} width={150} />
        </ol>
      </div>
    </div>
  );
};

export default SalaryRevisionHelp;
