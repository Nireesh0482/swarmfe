/* eslint-disable react/function-component-definition, arrow-body-style,  react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import MaternityGroupAdd from './images/MaternityGroupAdd.png';
import SaveBtn from './images/SaveBtn.PNG';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import GroupList from './images/GroupList.png';
import ExportTemplate from './images/ExportTemplate.png';

const MaternityGroup = () => {
  return (
    <div>
      <PageHeader>Maternity Group</PageHeader>
      <div className="role-allocation-container">
        <h1><b>Steps to Add Single/Multiple Maternity Group</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple Maternity Group.</li>
          <li>Enter/Select the Maternity Group fields.</li>
          <img
            src={MaternityGroupAdd}
            alt="Add single/multiple Maternity Group"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Maternity Group to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the added Maternity Group.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>Steps to Export Maternity Group Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Import Maternity Group</b></h1>
        <ol>
          <li>Click on <b>Import Data</b> button to upload excel(Maternity Group Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
          <li>Click on <b>Save</b> button to save the uploaded excel data.</li>
        </ol>
        <h1><b>To View/Update the Maternity Group</b></h1>
        <ol>
          <li>
            Select the Group from Dropdown List that needs to be Updated.
          </li>
          <img
            src={GroupList}
            alt="Group List"
            height={250}
            width={300}
          />
          <li>Maternity Group details are showed in table. </li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default MaternityGroup;
