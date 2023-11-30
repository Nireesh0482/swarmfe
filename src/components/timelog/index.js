/* eslint-disable react/function-component-definition, arrow-body-style */
import React from 'react';

const Timelog = () => {
  const roles = JSON.parse(localStorage.getItem('Role'));
  return (
    <div>
      {roles.includes(210) ? (
        <div className="pagecenter">
          <h1>TBD</h1>
        </div>
      ) : (
        <div className="pagecenter">
          <h1>No Access</h1>
        </div>
      )}
    </div>
  );
};

export default Timelog;
