/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line, max-len */
import React from 'react';
import { PageHeader } from 'antd';
import GroupDetailsAdd from './images/GroupDetailsAddBtn.png';
import SaveBtn from './images/SaveBtn.PNG';
import SearchBy from './images/SearchBy.PNG';
import ExportData from './images/ExportData.png';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import GroupDetailsList from './images/GroupsList.png';
import ExportTemplate from './images/ExportTemplate.png';

const GroupDetails = () => {
  return (
    <div>
      <PageHeader>BU Details</PageHeader>
      <div className="role-allocation-container">
        <h1><b>Steps to Add Single/Multiple BU Details</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple BU Details.</li>
          <li>Enter/Select the BU Details fields.</li>
          <img
            src={GroupDetailsAdd}
            alt="Add single/multiple BU Details"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of BU Detail(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the added BU Details.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>Steps to Export BU Details Template</b></h1>
        <ol>
          <li>Click on the <b>Export Template</b> button to export template.</li>
          <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
        </ol>
        <h1><b>Steps to Export list of existing BU Details into Excel</b></h1>
        <ol>
          <li>Click on <b>Export Data</b> button.</li>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Excel containing existing BU and their details is generated and downloaded.</li>
        </ol>
        <h1><b>Steps to Import BU Details</b></h1>
        <ol>
          <li>Click on <b>Import Data</b> button to upload excel(BU Details Data Excel).</li>
          <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
          <li>View or Modify the data, according to requirement.</li>
          <li>Click on <b>Save</b> button to save the uploaded excel data.</li>
        </ol>
        <h1><b>Steps to Search particular BU Details data</b></h1>
        <ol>
          <li>
            You can search for particular BU Details details by using Search option provided in the top right of the page.
          </li>
          <img
            src={SearchBy}
            alt="Search By"
            height={50}
            width={200}
          />
        </ol>
        <h1><b>To View/Update the BU Details</b></h1>
        <ol>
          <li>
            Select the BU Details from Dropdown List that needs to be Updated.
          </li>
          <img
            src={GroupDetailsList}
            alt="Cost Center List"
            height={250}
            width={300}
          />
          <li>BU Details are showed in table. </li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default GroupDetails;
