/* eslint-disable react/function-component-definition, arrow-body-style, max-len */
import React from 'react';
import { PageHeader, Tabs } from 'antd';
import ProjectList from './images/ProjectList.png';
import GroupList from './images/GrpList.png';
import StartMonth from './images/StartMonth.png';
import EndMonth from './images/EndMonth.png';
import ViewBtn from './images/ViewBtn.PNG';
import ExportData from './images/ExportData.png';
import GroupListData from './images/ReportsGroupList.png';

const ResourceUtilizationOrganizationLevelHelp = () => {
  const { TabPane } = Tabs;

  return (
    <div>
      <PageHeader>
        Resource Utilization - Organization Level
      </PageHeader>
      <Tabs type="card">
        <TabPane tab="Group Level" key="1">
          <div className="role-allocation-container">
            <h1><b>Step 1. Select the BU Names from Dropdown list</b></h1>
            <ol>
              <img
                src={GroupList}
                alt="Group List"
                height={250}
                width={300}
              />
            </ol>
            <h1><b>Step 2. Select the Start Month and End Month (Optional)</b></h1>
            <ol>
              <li> According to the requirement, Select the Start Month and End Month.</li>
              <img
                src={StartMonth}
                alt="Month List"
                height={200}
                width={300}
              />
              <img
                src={EndMonth}
                alt="Month List"
                height={200}
                width={300}
              />
            </ol>
            <h1><b>Step 3. Click on View button to Display the details</b></h1>
            <ol>
              <img src={ViewBtn} alt="View Button" height={50} width={100} />
              <li>
                On Clicking of View button, Resource Utilization Table of selected group names is displayed along with Graphical Representation.
              </li>
            </ol>
            <h1><b>Step 4. Click on Export Data button</b></h1>
            <ol>
              <img src={ExportData} alt="Export Data" height={50} width={150} />
              <li>
                Resource Utilization[Group Level] Report is generated and downloaded.
              </li>
            </ol>
          </div>
        </TabPane>
        <TabPane tab="Project Level" key="2">
          <div className="role-allocation-container">
            <h1><b>Step 1. Select the BU Name from Dropdown list</b></h1>
            <ol>
              <img
                src={GroupListData}
                alt="Group List"
                height={250}
                width={300}
              />
              <li>On select of BU Name, by default All option is selected in Project dropdown.</li>
              <li>If All projects data is not required, then select the required projects from dropdown.</li>
            </ol>
            <h1><b>Step 2. Select the Project from Dropdown list</b></h1>
            <ol>
              <img
                src={ProjectList}
                alt="Project List"
                height={200}
                width={300}
              />
            </ol>
            <h1><b>Step 3. Select the Start Month and End Month (Optional)</b></h1>
            <ol>
              <li>
                According to the requirement, Select the Start Month and End Month.
              </li>
              <img
                src={StartMonth}
                alt="Month List"
                height={200}
                width={300}
              />
              <img
                src={EndMonth}
                alt="Month List"
                height={200}
                width={300}
              />
            </ol>
            <h1><b>Step 4. Click on View button to Display the details</b></h1>
            <ol>
              <img src={ViewBtn} alt="View Button" height={50} width={100} />
              <li>
                On Clicking of View button, Resource Utilization Table of selected project is displayed.
              </li>
            </ol>
            <h1><b>Step 5. Click on Export Data button</b></h1>
            <ol>
              <img src={ExportData} alt="Export Data" height={50} width={150} />
              <li>
                Resource Utilization[Project Level] Report of selected project is generated and downloaded.
              </li>
            </ol>
          </div>
        </TabPane>
        <TabPane tab="Project - Resource Level" key="3">
          <div className="role-allocation-container">
            <h1><b>Step 1. Select the BU Name from Dropdown list</b></h1>
            <ol>
              <img
                src={GroupListData}
                alt="Group List"
                height={250}
                width={300}
              />
              <li>On select of BU Name, by default All option is selected in Project dropdown.</li>
              <li>If All projects data is not required, then select the required projects from dropdown.</li>
            </ol>
            <h1><b>Step 2. Select the Project from Dropdown list</b></h1>
            <ol>
              <img
                src={ProjectList}
                alt="Project List"
                height={200}
                width={300}
              />
            </ol>
            <h1><b>Step 3. Select the Start Month and End Month (Optional)</b></h1>
            <ol>
              <li>
                According to the requirement, Select the Start Month and End Month.
              </li>
              <img
                src={StartMonth}
                alt="Month List"
                height={200}
                width={300}
              />
              <img
                src={EndMonth}
                alt="Month List"
                height={200}
                width={300}
              />
            </ol>
            <h1><b>Step 4. Click on View button to Display the details</b></h1>
            <ol>
              <img src={ViewBtn} alt="View Button" height={50} width={100} />
              <li>
                On Clicking of View button, Resource Utilization Table of selected project is displayed.
              </li>
            </ol>
            <h1><b>Step 5. Click on Export Data button</b></h1>
            <ol>
              <img src={ExportData} alt="" height={50} width={150} />
              <li>
                Resource Utilization[Project-Resource Level] Report is generated and downloaded.
              </li>
            </ol>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ResourceUtilizationOrganizationLevelHelp;
