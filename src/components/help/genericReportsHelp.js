/* eslint-disable react/function-component-definition, arrow-body-style */
import React from 'react';
import { PageHeader } from 'antd';
import ExportData from './images/ExportData.png';

const GenericReportsHelp = () => {
  return (
    <div>
      <PageHeader>
        Generic Reports
      </PageHeader>
      <div className="role-allocation-container">
        <h1><b>Step 1. Select the desirable filters</b></h1>

        <h1><b>Step 2. Click on view button</b></h1>
        <ol>
          <li>The Table with details is displayed based on applied filters.</li>
        </ol>
        <h1><b>Step 3. Click on Export Data</b></h1>
        <ol>
          <img src={ExportData} alt="Export Data" height={50} width={150} />
          <li>Report containing table data is generated and downloaded.</li>
        </ol>
      </div>
    </div>
  );
};

export default GenericReportsHelp;
