/* eslint-disable react/function-component-definition, arrow-body-style, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';
import AvgEnggCost from './images/AvgEnggCost.png';
import SaveBtn from './images/SaveBtn.PNG';
import Month from './images/Month.png';

const AccountsMgtEngCostHelp = () => {
  return (
    <div>
      <PageHeader>
        Average Engg. Cost
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>To Add Average Engineering Cost</b></h1>
        <ol>
          <li>Click on the <b>Add</b> button to add single/multiple Average Engineering Cost.</li>
          <li>Select the Month and Add Average Engineering Cost.</li>
          <img
            src={AvgEnggCost}
            alt="Add single/multiple Average Engineering Cost"
            height={150}
            width={800}
          />
          <li>To <b>Delete</b> Row</li>
          <ul>
            <li>Select the checkbox(es) of Average Engineering Cost(s) to be deleted.</li>
            <li>Click on <b>Delete</b> button to delete the Row.</li>
          </ul>
          <li>Click on <b>Save</b> button to save the changes.</li>
          <img src={SaveBtn} alt="Save Button" height={50} width={100} />
        </ol>
        <h1><b>To View/Update Avg Engg Cost of a month</b></h1>
        <ol>
          <li>Select the Month from Dropdown list.</li>
          <img
            src={Month}
            alt="Month List"
            height={200}
            width={250}
          />
          <li>Average Engineering Cost details are showed in table.</li>
          <li>Modify the fields you want to update and click on <b>Save</b> button.</li>
        </ol>
      </div>
    </div>
  );
};

export default AccountsMgtEngCostHelp;
