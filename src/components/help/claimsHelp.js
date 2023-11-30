/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import Claims from './images/Claims.png';
import SaveBtn from './images/SaveBtn.PNG';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import ExportTemplate from './images/ExportTemplate.png';

const ClaimsHelp = () => {
  return (
    <div>
      <PageHeader>Claims</PageHeader>
      <div className="role-allocation-container">
        <h1><b>Steps to Add Single/Multiple Claims</b></h1>
        <ol>
          <li>Enter/Select the Claims fields.</li>
          <li>Click on <b>Add</b> button to add 2 or more resources.</li>
          <img
            src={Claims}
            alt="Add Claims"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Claims(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the changes.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>Steps to Export Claims Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Import Claims Data</b></h1>
        <ol>
          <li>Click on the <b>Import Data</b> button to upload excel (Claims Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
        </ol>
      </div>
    </div>
  );
};

export default ClaimsHelp;
