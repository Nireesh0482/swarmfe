/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import ResourceAllocation from './images/ResourceAllocation.png';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import SaveBtn from './images/SaveBtn.PNG';
import ProjectList from './images/ProjectList.png';
import ExportData from './images/ExportData.png';
import ExportTemplate from './images/ExportTemplate.png';

const ResourceAllocationHelp = () => {
  return (
    <div>
      <PageHeader>
        Resource Allocation
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>To Add Allocation to Resource(s)</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple Resource Allocation.</li>
          <li>Enter/Select the required Fields.</li>
          <img
            src={ResourceAllocation}
            alt="Add single/multiple Resource Allocation"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Resource Allocation(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the allocation.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>Steps to Export Resource Allocation Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Import Resource Allocation</b></h1>
        <ol>
          <li>Click on <b>Import Data</b> button to upload excel(Resource Allocation Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
          <li>Click on <b>Save</b> button to save the uploaded excel data.</li>
        </ol>
        <h1>Note: If an Employee is going on <b>Maternity Leave</b> change Project Resource status to buffer</h1>
        {/* <h1><b>Steps to Delete Resource Allocation</b></h1>
        <ol>
          <li>Select the Project from the Project dropdown.</li>
          <li>Select the corresponding checkboxes Record to be deleted.</li>
          <li>Click on <b>Delete</b> button to delete selected Resource Allocation Record.</li>
        </ol> */}
        <h1><b>Steps to Export list of existing Resource Allocation Details into Excel</b></h1>
        <ol>
          <li>Click on <b>Export Data</b> button.</li>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Excel containing existing Resource Allocation details is generated and downloaded.</li>
        </ol>
        <h1><b>To View/Update the Allocated Resource</b></h1>
        <ol>
          <li>Select the Project from Dropdown List that needs to be Updated.</li>
          <img
            src={ProjectList}
            alt="Project List"
            height={250}
            width={300}
          />
          <li>Allocated Resource details are showed in table.</li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default ResourceAllocationHelp;
