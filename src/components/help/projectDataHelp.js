/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader, Tabs } from 'antd';
import ProjectAddBtn from './images/ProjectAddBtn.png';
import SaveBtn from './images/SaveBtn.PNG';
import UploadDataBtn from './images/UploadDataBtn.PNG';
import ResourcePlanning from './images/ResourcePlanning.png';
import AllProjectList from './images/AllProjectList.png';
import SearchBy from './images/SearchBy.PNG';
import SaveProject from './images/SaveProject.png';
import ProjectList from './images/ProjectList.png';
import ExportTemplate from './images/ExportTemplate.png';

const ProjectDataHelp = () => {
  const { TabPane } = Tabs;
  return (
    <div>
      <Tabs type="card">
        <TabPane tab="Project Data" key="1">
          <PageHeader>Project Data</PageHeader>
          <div className="role-allocation-container">
            <h1><b>Steps to Add Single/Multiple projects</b></h1>
            <ol>
              <li>Click on the <b>Add</b> button to add single/multiple projects.</li>
              <li>Enter/Select the Project fields.</li>
              <img
                src={ProjectAddBtn}
                alt="Add single/multiple projects"
                height={150}
                width={800}
              />
              <li>To <b>Delete</b> Row</li>
              <ul>
                <li>Select the checkbox(es) of Project(s) to be deleted.</li>
                <li>Click on <b>Delete</b> button to delete the Row.</li>
              </ul>
            </ol>
            <h1><b>Steps to Export Project Data Template</b></h1>
            <ol>
              <li>Click on the <b>Export Template</b> button to export template.</li>
              <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
            </ol>
            <h1><b>Steps to Import projects</b></h1>
            <ol>
              <li>Click on <b>Import Data</b> button to upload excel(Project Data Excel).</li>
              <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
              <li>View or Modify the data, according to requirement.</li>
            </ol>
            <h1><b>Steps to Save Project Data</b></h1>
            <ol>
              <li>Click on <b>Save</b> button to save the added projects.</li>
              <img
                src={SaveBtn}
                alt="Save Button"
                height={50}
                width={100}
              />
              <li>On click of save a popup will appear with Radio Options.</li>
              <img
                src={SaveProject}
                alt="Save Project Modal"
                height={200}
                width={400}
              />
              <li>Select any 1 of the option based on your requirement.</li>
              <li>Then Click on <b>OK</b> button.</li>
            </ol>
            <h1><b>Steps to Search particular Project data</b></h1>
            <ol>
              <li>
                You can search for particular Project Details by using Search option provided in the top right of the page.
              </li>
              <img
                src={SearchBy}
                alt="Search By"
                height={50}
                width={200}
              />
            </ol>
            <h1><b>Steps to Update existing Project data</b></h1>
            <ol>
              <li>Select the Project(s) from Project dropdown.</li>
              <img
                src={ProjectList}
                alt="Project List"
                height={200}
                width={300}
              />
              <li>Project details are showed in table.</li>
              <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
            </ol>
          </div>
        </TabPane>
        <TabPane tab="Resource Planning" key="2">
          <PageHeader>Resource Planning</PageHeader>
          <div className="role-allocation-container">
            <h1><b>Steps to Add Resource Planning</b></h1>
            <ol>
              <li>Click on the <b>Add</b> button to add single/multiple Resource Planning.</li>
              <li>Enter/Select the required fields</li>
              <img
                src={ResourcePlanning}
                alt="add single/multiple Resource Planning"
                height={150}
                width={800}
              />
              <li>To <b>Delete</b> Row</li>
              <ul>
                <li>Select the checkbox(es) of Resource Planning(s) to be deleted.</li>
                <li>Click on <b>Delete</b> button to delete the Row.</li>
              </ul>
              <li>Click on <b>Save</b> button to save the changes.</li>
              <img
                src={SaveBtn}
                alt="Save Button"
                height={50}
                width={100}
              />
            </ol>
            <h1><b>Steps to Export Resource Planning Template</b></h1>
            <ol>
              <li>Click on the <b>Export Template</b> button to export template.</li>
              <img src={ExportTemplate} alt="Export Template Button" height={70} width={140} />
            </ol>
            <h1><b>Steps to Import Resource Planning</b></h1>
            <ol>
              <li>Click on <b>Import Data</b> button to upload excel(Resource Planning Excel).</li>
              <img src={UploadDataBtn} alt="Upload Button" height={70} width={120} />
              <li>View or Modify the data, according to requirement.</li>
            </ol>
            <h1><b>Steps to View/Update Existing Resource Planning(s)</b></h1>
            <ol>
              <li>Select the desirable Project from Dropdown list. The option of Selecting <b>All</b> projects is also provided.</li>
              <img
                src={AllProjectList}
                alt="Project List"
                height={200}
                width={300}
              />
              <li>Resource details are showed in table.</li>
              <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
            </ol>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProjectDataHelp;
