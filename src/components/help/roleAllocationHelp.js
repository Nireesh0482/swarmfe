/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import SearchEmployee from './images/searchEmployee.PNG';

const RoleAllocationHelp = () => {
  return (
    <div>
      <PageHeader>Role Allocation</PageHeader>
      <div className="role-allocation-container">
        <h1><b>View the Group/Role Names, the Features access and the related users under Group/Role Names.</b></h1>
        <h1><b>To Add/Remove users from Group/Role Names</b></h1>
        <ol>
          <li>Click on <b>Edit</b> button.</li>
          <li>A Modal appears displaying Group Name and list of employees.</li>
          <li>
            Search for a employee in search-bar or check/uncheck the checkbox(es) from employee list to add/remove resource from Group/Role Names.
          </li>
          <img
            src={SearchEmployee}
            alt="Search Employee"
            height={50}
            width={800}
          />
          <li>Click on <b>Update</b> button.</li>
          <p>Note: Single Employee can be allocated with multiple roles.</p>
        </ol>
      </div>
    </div>
  );
};

export default RoleAllocationHelp;
