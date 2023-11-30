/* eslint-disable react/function-component-definition, arrow-body-style, max-len, react/jsx-one-expression-per-line */
import React from 'react';
import { PageHeader } from 'antd';

const ComputationsHelp = () => {
  const roles = JSON.parse(localStorage.getItem('Role'));

  return (
    <div>
      {roles.includes(228) ? (
        <div>
          <PageHeader>Computations</PageHeader>
          <div className="role-allocation-container">
            <h1><b>DATA MANAGEMENT</b></h1>
            <ul>
              <li>
                <b>Resource Management</b>
                <ol>
                  <li>Per Month = CTC / 12.</li>
                </ol>
              </li>
            </ul>
            <h1><b>PROJECT MANAGEMENT</b></h1>
            <ul>
              <li><b>Project Data</b></li>
              <ul>
                <li>
                  <b>Resource Planning</b>
                  <ol>
                    <li>Planned Cost = Planned Resource * Avg Engg. Cost of selected project BU.</li>
                  </ol>
                </li>
              </ul>
            </ul>
            <h1><b>REPORTS</b></h1>
            <ul>
              <li><b>Resource Utilization</b></li>
              <ul>
                <li><b>Organization Level</b></li>
                <ul>
                  <li>
                    <b>Group Level</b>
                    <ol>
                      <li>Total = Sum of resource count in resource allocation of selected groups on requested months.</li>
                    </ol>
                  </li>
                  <li>
                    <b>Project Level</b>
                    <ol>
                      <li>Month Wise Planned = Planned Resource is given by manager at the initial stage.</li>
                      <li>Month Wise Actual = Highest allocation of employee in that month.</li>
                    </ol>
                  </li>
                  <li>
                    <b>Project - Resource Level</b>
                    <ol>
                      <li>Month wise CW&apos;s = Calculating from Resource Allocation.</li>
                    </ol>
                  </li>
                </ul>
              </ul>
              <ul>
                <li><b>Resource Level</b></li>
                <ol>
                  <li>Month wise CW&apos;s = Calculating from Resource Allocation.</li>
                </ol>
              </ul>
            </ul>
            <ul>
              <li><b>Cost Utilization</b></li>
              <ul>
                <li><b>Cost Summary</b></li>
                <ol>
                  <li>Total Planned Cost = Planned Cost is given by manager at the initial stage.</li>
                  <li>Total Actual Cost = Salary Per Allocation + All the Expenses (food, travel, ..other expenses).</li>
                  <li>Salary Per Allocation = (CTC / 12) * Allocation of the employee for the month.</li>
                  <li>Allocation of the employee for the month = Highest allocation of all week in a month.</li>
                  <li>Month Wise Planned = Sum of all months Planned Cost.</li>
                  <li>Month Wise Actual = Sum of all months Actual Cost.</li>
                </ol>
              </ul>
              <ul>
                <li><b>Cost Analysis</b></li>
                <ol>
                  <li>Total Planned Cost = Planned Cost is given by manager at the initial stage.</li>
                  <li>Total Actual Cost = Salary Per Allocation + All the Expenses (food, travel, ..other expenses).</li>
                  <li>Salary Per Allocation = (CTC / 12) * Allocation of the employee for the month.</li>
                  <li>Allocation of the employee for the month = Highest allocation of all week in a month.</li>
                  <li>Month Wise Planned = Sum of all months Planned Cost.</li>
                  <li>Month Wise Actual = Sum of all months Actual Cost.</li>
                </ol>
              </ul>
            </ul>
            <ul>
              <li><b>Resource and Cost Utilization</b></li>
              <ul>
                <li><b>Item Names</b></li>
                <ol>
                  <li>Planned Resource Loading = Planned resource is given by manager at the initial stage.</li>
                  <li>Planned Resource Cost = Planned Cost is given by manager at the initial stage.</li>
                  <li>Actual Resource Loading = Sum of the employee allocation in the selected months.</li>
                  <li>Actual Cost = Salary Per Allocation + All the Expenses (food, travel, ..other expenses).</li>
                  <li>Diff in Cost = Planned Resource Cost - Actual Cost.</li>
                </ol>
              </ul>
            </ul>
            <ul>
              <li><b>Revenue</b></li>
              <ul>
                <li><b>Group Revenue</b></li>
                <ol>
                  <li>Total Revenue = Sum of the revenue of selected project on requested months.</li>
                </ol>
              </ul>
              <ul>
                <li><b>Project Revenue</b></li>
                <ol>
                  <li>Total Revenue = Sum of the revenue of selected project on requested months.</li>
                </ol>
              </ul>
            </ul>
            <ul>
              <li><b>Contribution</b></li>
              <ul>
                <li><b>Group Contribution</b></li>
                <ol>
                  <li>Total Revenue = Sum of the revenue of selected project on requested months.</li>
                  <li>Total Planned Cost = Sum of all months Planned Cost.</li>
                  <li>Total Actual Cost = Sum of all months Actual Cost.</li>
                  <li>Contribution (in value based on Revenue) = Total Actual Cost - Total Revenue.</li>
                  <li>Contribution (in % based on Revenue) = (Total Revenue / (Total Actual Cost - Total Revenue)) * 100.</li>
                  <li>Contribution (in value based on Planned Cost) = Total Planned Cost - Total Actual Cost.</li>
                  <li>Contribution (in % based on Planned Cost) = (Total Planned Cost / (Total Planned Cost - Total Actual Cost)) * 100.</li>
                </ol>
              </ul>
              <ul>
                <li><b>Project Contribution</b></li>
                <ol>
                  <li>Total Revenue = Sum of the revenue of selected project on requested months.</li>
                  <li>Total Planned Cost = Sum of all months Planned Cost.</li>
                  <li>Total Actual Cost = Sum of all months Actual Cost.</li>
                  <li>Contribution (in value based on Revenue) = Total Actual Cost - Total Revenue.</li>
                  <li>Contribution (in % based on Revenue) = (Total Revenue / (Total Actual Cost - Total Revenue)) * 100.</li>
                  <li>Contribution (in value based on Planned Cost) = Total Planned Cost - Total Actual Cost.</li>
                  <li>Contribution (in % based on Planned Cost) = (Total Planned Cost / (Total Planned Cost - Total Actual Cost)) * 100.</li>
                  <li>Contribution (in value based on PO/SOW) = PO/RO/SOW value - Total Actual Cost.</li>
                  <li>Contribution (in % based on PO/SOW) = (PO/RO/SOW value / (PO/RO/SOW value - Total Actual Cost)) * 100.</li>
                </ol>
              </ul>
              <ul>
                <li><b>Revenue and cost</b></li>
                <ul>
                  <li><b>Item Names</b></li>
                  <ol>
                    <li>Planned Revenue AOP = Planned Revenue by AVIN management at the start of the project / Beginning of Financial Year only for Project BU.</li>
                    <li>Planned Cost AOP = Planned Revenue by AVIN management at the start of the project / Beginning of Financial Year only for Project BU.</li>
                    <li>Actual Cost = Actual Cost value updated based on the allocation.</li>
                    <li>Actual Revenue = Actual Revenue Data will be update by AVIN finance team by 15th of every month for previous month.</li>
                    <li>Revenue Variance = Actual Revenue - Planned Revenue AOP.</li>
                    <li>Cost Variance = Actual Cost - Planned Cost AOP.</li>
                    <li>Contribution Value = Actual Revenue - Actual Cost.</li>
                    <li>Contribution % = Contribution Value / Actual Revenue.</li>
                  </ol>
                </ul>
              </ul>
            </ul>
            <ul>
              <li><b>Generic Reports</b></li>
              <ol>
                <li>Total Planned Resources = Planned resource is given by manager at the initial stage.</li>
                <li>Total Planned Cost = Planned Cost is given by manager at the initial stage.</li>
                <li>Total Actual Resources = Sum of the employee allocation in the selected months.</li>
                <li>Total Actual Cost = Salary Per Allocation + All the Expenses (food, travel, ..other expenses).</li>
              </ol>
            </ul>
            <ul>
              <li><b>Operational Reports</b></li>
              <ul>
                <li><b>Resource Utilization</b></li>
                <ol>
                  <li>AOP Approved = Number of resource planned by AVIN management at the start of the project / Beginning of Financial Year only for Project Group.</li>
                  <li>Group head planned resources = Number of resource planned for a respective project by Project Manager/Group head/Project lead at the start of the project / beginning of Financial Year / Monthly based on the project requirement.</li>
                  <li>Actual Resource Loading = Actual number of resources deployed by Project Manager/Group head/Project lead at the start of the project / beginning of Financial Year / Monthly based on the project requirement.</li>
                  <li>Actual Resource Loading_billable = Actual number of resources allocated as billable by Project Manager/Group head/Project lead at the start of the project / beginning of Financial Year / Monthly based on the project requirement.</li>
                  <li>Revenue Leakage = Actual Resource Loading_billable - Group head planned resources.</li>
                  <li>Variance w.r.t AOP = Actual Resource Loading - AOP Approved.</li>
                  <li>Utilization = (Actual Resource Loading_billable / Actual Resource Loading) * 100.</li>
                </ol>
              </ul>
            </ul>
            <ul>
              <li><b>Monthly Average Engg. Cost</b></li>
              <ol>
                <li>Total = Sum of selected months Average Engg. Cost.</li>
              </ol>
            </ul>
          </div>
        </div>
      ) : (
        <div className="pagecenter">
          <h1>No Access</h1>
        </div>
      )}
    </div>
  );
};

export default ComputationsHelp;
