/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader, Space } from 'antd';
import ResourceAddBtn from './images/ResourceAddBtn.png';
import SaveBtn from './images/SaveBtn.PNG';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import VerifyBtn from './images/VerifyBtn.PNG';
import ExportData from './images/ExportData.png';
import SearchBy from './images/SearchBy.PNG';
import SaveResource from './images/SaveResource.png';
import ResourceList from './images/ResourceList.png';
import SupervisorList from './images/SupervisorList.png';
import ExportTemplate from './images/ExportTemplate.png';

const resourceMgtHelp = () => {
  return (
    <div>
      <PageHeader>
        Resource Management
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>Steps to Add Single/Multiple Resources</b></h1>
        <ol>
          <li>Enter/Select the Resource fields.</li>
          <li>Click on <b>Add</b> button to add 2 or more resources.</li>
          <img
            src={ResourceAddBtn}
            alt="Add Single/Multiple Resources"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Resource(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
        </ol>
        <h1><b>Steps to Export Resource Management Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Import Resources Data</b></h1>
        <ol>
          <li>Click on the <b>Import Data</b> button to upload excel (Resource Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
        </ol>
        <h1><b>Steps to Verify resources already present or not</b></h1>
        <ol>
          <li>Click on <b>Verify</b> button.</li>
          <img
            src={VerifyBtn}
            alt="Verify Button"
            height={50}
            width={120}
          />
          <li>Duplicate data with information containing Resource Employee ID and Name is displayed in modal.</li>
          <li>Check and confirm duplicate data before moving on to save.</li>
        </ol>
        <h1><b>Steps to Save Resources Data</b></h1>
        <ol>
          <li>Click on <b>Save</b> button to save the added resources.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
          <li>On click of save a popup will appear with Radio Options.</li>
          <img
            src={SaveResource}
            alt="Save Resource Modal"
            height={200}
            width={400}
          />
          <li>Select any 1 of the option based on your requirement.</li>
          <li>Then Click on <b>OK</b> button.</li>
        </ol>
        <h1><b>Steps to Export list of existing Resource into Excel</b></h1>
        <ol>
          <li>Click on <b>Export Data</b> button.</li>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Excel containing existing Resource and their details is generated and downloaded.</li>
        </ol>
        <h1><b>Steps to Delete Resources</b></h1>
        <ol>
          <li>Select the Resources you want to delete from the Employee/Supervisor dropdown.</li>
          <li>Select the corresponding checkboxes to be deleted.</li>
          <li>Click on <b>Delete</b> button to delete selected resources.</li>
        </ol>
        <h1><b>Steps to Search particular Resource data</b></h1>
        <ol>
          <li>
            You can search for particular resource details by using Search option provided in the top right of the page.
          </li>
          <img
            src={SearchBy}
            alt="Search By"
            height={50}
            width={200}
          />
        </ol>
        <h1><b>Steps to Update existing Resources data</b></h1>
        <ol>
          <li>Select the Resources from Employee/Supervisor dropdown.</li>
          <Space>
            <img
              src={ResourceList}
              alt="Resource List"
              height={200}
              width={300}
            />
            <img
              src={SupervisorList}
              alt="Supervisor List"
              height={200}
              width={300}
            />
          </Space>
          <li>Resource details are showed in table.</li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default resourceMgtHelp;
