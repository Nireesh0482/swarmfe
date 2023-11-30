/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line, max-len */
import React from 'react';
import { PageHeader } from 'antd';
import ResourceSkillDetailsAdd from './images/ResourceSkillAddBtn.png';
import SaveBtn from './images/SaveBtn.PNG';
import ResourceList from './images/ResourceList.png';
import ExportData from './images/ExportData.png';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import ExportTemplate from './images/ExportTemplate.png';

const ResourceSkillData = () => {
  return (
    <div>
      <PageHeader>Resource Skill Data</PageHeader>
      <div className="role-allocation-container">
        <h1><b>Steps to Add Single/Multiple Resource Skill Details</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple Resource Skill Details.</li>
          <li>Enter/Select the Resource Skill Details field.</li>
          <img
            src={ResourceSkillDetailsAdd}
            alt="Add single/multiple Resource Skill Details"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Resource Skill Detail(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the added Resource Skill Details.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>Steps to Export Resource Skill Details Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Export list of existing Resource Skill into Excel</b></h1>
        <ol>
          <li>Click on <b>Export Data</b> button.</li>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Excel containing existing Resource Skill and their details is generated and downloaded.</li>
        </ol>
        <h1><b>Steps to Import Resource Skill Details</b></h1>
        <ol>
          <li>Click on <b>Import Data</b> button to upload excel(Resource Skill  Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
          <li>Click on <b>Save</b> button to save the uploaded excel data.</li>
        </ol>
        <h1><b>To View/Update the Resource Skill Details</b></h1>
        <ol>
          <li>
            Select the Resources from Employee dropdown.
          </li>
          <img
            src={ResourceList}
            alt="Resource List"
            height={200}
            width={300}
          />
          <li>Resource Skill Details are showed in table.</li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default ResourceSkillData;
