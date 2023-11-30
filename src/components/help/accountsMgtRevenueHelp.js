/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import Revenue from './images/Revenue.png';
import SaveBtn from './images/SaveBtn.PNG';
import ProjectList from './images/ProjectList.png';

const AccountsMgtRevenueHelp = () => {
  return (
    <div>
      <PageHeader>
        Actual Revenue
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>To Add Actual Revenue of Project(s)</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple Actual Revenue.</li>
          <li>Enter/Select the required Fields.</li>
          <img
            src={Revenue}
            alt="Add single/multiple Actual Revenue"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Actual Revenue(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the Actual Revenue.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>To View/Update Project Actual Revenue of a Project</b></h1>
        <ol>
          <li>Select the Project from Dropdown list.</li>
          <img
            src={ProjectList}
            alt="Project List"
            height={150}
            width={300}
          />
          <li>Actual Revenue details are showed in table.</li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default AccountsMgtRevenueHelp;
