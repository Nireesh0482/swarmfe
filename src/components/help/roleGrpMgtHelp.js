/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import AddBtn2 from './images/AddBtn2.PNG';
import CreateGroupsPopup from './images/CreateGroupsPopup.png';
import UpdateBtn from './images/UpdateBtn.PNG';
import UpdateGroups from './images/UpdateGroups.png';
import SaveBtn from './images/SaveBtn.PNG';

const RoleGrpMgtHelp = () => {
  return (
    <div>
      <PageHeader>Role Group Management</PageHeader>
      <div className="role-allocation-container">
        <h1><b>To Add a New Role</b></h1>
        <ol>
          <li>Click on <b>Add</b> button to add new role.</li>
          <img
            src={AddBtn2}
            alt="Add New Role"
            height={50}
            width={100}
          />
          <li>A Popup appears asking Group Name and Features to be made accessible.</li>
          <li>Enter the Desirable Group Name and Select the features from dropdown list.</li>
          <img
            src={CreateGroupsPopup}
            alt="Create Group"
            height={200}
            width={500}
          />
          <li>Click on <b>Add</b> button in the Popup to add new Group Name with accessible features.</li>
        </ol>
        <h1><b>To Update Existing Role</b></h1>
        <ol>
          <li>Click on <b>Update</b> button.</li>
          <img
            src={UpdateBtn}
            alt="Update Group"
            height={50}
            width={100}
          />
          <li>A Popup appears with dropdown containing existing Group names and Feature list.</li>
          <li>Select the Group Name from dropdown list and select/unselect the features as required.</li>
          <img
            src={UpdateGroups}
            alt="Update Group Modal"
            height={200}
            width={500}
          />
          <li>Click on <b>Save</b> button to save the changes.</li>
          <img
            src={SaveBtn}
            alt="Save Button"
            height={50}
            width={100}
          />
        </ol>
        <h1><b>To Delete the Role(s)</b></h1>
        <ol>
          <li>Select the checkbox(es) corresponding to Role(s).</li>
          <li>Click on Delete button to delete the selected role(s).</li>
        </ol>
        <p>Note: Admin Group/Role can&apos;t be deleted.</p>
      </div>
    </div>
  );
};

export default RoleGrpMgtHelp;
