/* eslint-disable react/function-component-definition, arrow-body-style, max-len */
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import 'antd/dist/antd.min.css';
import {
  HomeFilled, DatabaseFilled, UserOutlined, AppstoreAddOutlined, UsergroupAddOutlined, NodeExpandOutlined, EditFilled,
  FieldTimeOutlined, AccountBookFilled, SolutionOutlined, MoneyCollectOutlined, OneToOneOutlined, FileProtectOutlined,
  UserSwitchOutlined, ReadOutlined, TranslationOutlined, EuroCircleFilled, GroupOutlined, AuditOutlined, ProjectFilled,
  MenuUnfoldOutlined, IssuesCloseOutlined, ReconciliationOutlined, DollarCircleFilled, AppstoreFilled, ContainerFilled,
  FunnelPlotFilled, MoneyCollectFilled, InsuranceFilled, RedEnvelopeFilled, UngroupOutlined, MenuFoldOutlined,
  CreditCardFilled, GoldenFilled, TransactionOutlined, FileDoneOutlined, HddFilled, ProfileFilled, BoxPlotFilled, FundFilled,
} from '@ant-design/icons';

import IntroductionHelp from './introductionHelp';
import ResourceMgtHelp from './resourceMgtHelp';
import ResourceSkillData from './resourceSkillDataHelp';
import ResourceExperienceData from './resourceExperienceDataHelp';
import RoleAllocationHelp from './roleAllocationHelp';
import RoleGrpMgtHelp from './roleGrpMgtHelp';
import SalaryRevision from './salaryRevisionHelp';
import GroupDetails from './groupDetailsHelp';
import GroupAndOperationalPlan from './groupAndOperationalPlan';
import MaternityGroup from './maternityGroupHelp';
import ProjectDataHelp from './projectDataHelp';
import ResourceAllocationHelp from './resourceAllocationHelp';
import ApprovalsTimelogHelp from './approvalsTimelogHelp';
import AccountsMgtRevenueHelp from './accountsMgtRevenueHelp';
import AccountsMgtEngCostHelp from './accountsMgtEngCostHelp';
import ClaimsHelp from './claimsHelp';
import ResourceUtilizationOrganizationLevelHelp from './resourceUtilizationOrganizationLevelHelp';
import ResourceUtilizationResourceLevelHelp from './resourceUtilizationResourceLevelHelp';
import CostUtilizationCostSummaryHelp from './costUtilizationCostSummaryHelp';
import CostUtilizationCostAnalysisHelp from './costUtilizationCostAnalysisHelp';
import ResourceAndCostUtilizationHelp from './resourceAndCostUtilizationHelp';
import GroupRevenueHelp from './groupRevenueHelp';
import ProjectRevenueHelp from './projectRevenueHelp';
import GroupContributionHelp from './groupContributionHelp';
import ProjectContributionHelp from './projectContributionHelp';
import RevenueAndCostHelp from './revenueAndCostHelp';
import ClaimsReportsHelp from './claimsReportsHelp';
import GenericReportsHelp from './genericReportsHelp';
import AOPResourceUtilization from './resourceUtilizationAOPHelp';
import MonthlyAvgEnggCost from './monthlyAvgEnggCostHelp';

const {
  Header, Content, Sider, Footer,
} = Layout;
const { SubMenu } = Menu;

const Help = () => {
  const [state, setState] = useState(window.location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = () => {
    setState(window.location.pathname);
  };

  return (
    <Router>
      <Layout>
        <Sider
          theme="light"
          width="290px"
          collapsible
          trigger={null}
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {collapsed ? <div style={{ marginTop: '80px' }} /> : <div className="logo" />}
          <Menu theme="light" mode="inline" selectedKeys={[state]} onClick={handleMenuClick}>
            <Menu.Item key="/rm-tool/help/introduction" icon={<HomeFilled />}>
              <Link to="/rm-tool/help/introduction">INTRODUCTION</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<DatabaseFilled />}
              title="DATA MANAGEMENT"
            >
              <Menu.Item key="/rm-tool/help/data-management/resource-management" icon={<UserOutlined />}>
                <Link to="/rm-tool/help/data-management/resource-management">
                  Resource Management
                </Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/help/data-management/resource-skill-data" icon={<BoxPlotFilled />}>
                <Link to="/rm-tool/help/data-management/resource-skill-data">Resource Skill Data</Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/help/data-management/resource-experience-data" icon={<FundFilled />}>
                <Link to="/rm-tool/help/data-management/resource-experience-data">Resource Experience Data</Link>
              </Menu.Item>
              <SubMenu
                key="sub2"
                icon={<AppstoreAddOutlined />}
                title="Role Management"
              >
                <Menu.Item
                  key="/rm-tool/help/data-management/role-management/role-allocation"
                  icon={<UserSwitchOutlined />}
                >
                  <Link to="/rm-tool/help/data-management/role-management/role-allocation">
                    Role Allocation
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="/rm-tool/help/data-management/role-management/role-group-management"
                  icon={<GroupOutlined />}
                >
                  <Link to="/rm-tool/help/data-management/role-management/role-group-management">
                    Role Group Management
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/rm-tool/help/data-management/salary-revision" icon={<DollarCircleFilled />}>
                <Link to="/rm-tool/help/data-management/salary-revision">Salary Revision</Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/help/data-management/bu-details" icon={<MoneyCollectOutlined />}>
                <Link to="/rm-tool/help/data-management/bu-details">BU Details</Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/help/data-management/bu-and-operational-plan"
                icon={<AppstoreFilled />}
              >
                <Link to="/rm-tool/help/data-management/bu-and-operational-plan">BU & Operational Plan</Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/help/data-management/maternity-group"
                icon={<HddFilled />}
              >
                <Link to="/rm-tool/help/data-management/maternity-group">Maternity Group</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<AuditOutlined />}
              title="PROJECT MANAGEMENT"
            >
              <Menu.Item key="/rm-tool/help/project-management/project-data" icon={<ProjectFilled />}>
                <Link to="/rm-tool/help/project-management/project-data">
                  Project Data
                </Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/help/project-management/resource-allocation" icon={<UsergroupAddOutlined />}>
                <Link to="/rm-tool/help/project-management/resource-allocation">
                  Resource Allocation
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub4"
                icon={<NodeExpandOutlined />}
                title="Approvals"
              >
                <Menu.Item key="/rm-tool/help/project-management/approvals/timelog" icon={<FieldTimeOutlined />}>
                  <Link to="/rm-tool/help/project-management/approvals/timelog">
                    Timelog
                  </Link>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key="sub5"
              icon={<AccountBookFilled />}
              title="ACCOUNTS MANAGEMENT"
            >
              <Menu.Item key="/rm-tool/help/accounts-management/actual-revenue" icon={<MoneyCollectFilled />}>
                <Link to="/rm-tool/help/accounts-management/actual-revenue">
                  Actual Revenue
                </Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/help/accounts-management/average-engg-cost" icon={<InsuranceFilled />}>
                <Link to="/rm-tool/help/accounts-management/average-engg-cost">
                  Average Engg Cost
                </Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/help/accounts-management/claims" icon={<EditFilled />}>
                <Link to="/rm-tool/help/accounts-management/claims">Claims</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<MenuUnfoldOutlined />} title="REPORTS">
              <SubMenu
                key="sub7"
                icon={<SolutionOutlined />}
                title="Resource Utilization"
              >
                <Menu.Item key="/rm-tool/help/reports/resource-utilization/organization-level" icon={<TranslationOutlined />}>
                  <Link to="/rm-tool/help/reports/resource-utilization/organization-level">
                    Organization Level
                  </Link>
                </Menu.Item>
                <Menu.Item key="/rm-tool/help/reports/resource-utilization/resource-level" icon={<ReadOutlined />}>
                  <Link to="/rm-tool/help/reports/resource-utilization/resource-level">
                    Resource Level
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub8"
                icon={<FileDoneOutlined />}
                title="Cost Utilization"
              >
                <Menu.Item key="/rm-tool/help/reports/cost-utilization/cost-summary" icon={<TranslationOutlined />}>
                  <Link to="/rm-tool/help/reports/cost-utilization/cost-summary">
                    Cost Summary
                  </Link>
                </Menu.Item>
                <Menu.Item key="/rm-tool/help/reports/cost-utilization/cost-analysis" icon={<ReadOutlined />}>
                  <Link to="/rm-tool/help/reports/cost-utilization/cost-analysis">
                    Cost Analysis
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/rm-tool/help/reports/resource-and-cost-utilization" icon={<OneToOneOutlined />}>
                <Link to="/rm-tool/help/reports/resource-and-cost-utilization">
                  Resource & Cost Utilization
                </Link>
              </Menu.Item>
              <SubMenu key="sub9" icon={<RedEnvelopeFilled />} title="Revenue">
                <Menu.Item key="/rm-tool/help/reports/revenue/group-revenue" icon={<UngroupOutlined />}>
                  <Link to="/rm-tool/help/reports/revenue/group-revenue">
                    BU Revenue
                  </Link>
                </Menu.Item>
                <Menu.Item key="/rm-tool/help/reports/revenue/project-revenue" icon={<EuroCircleFilled />}>
                  <Link to="/rm-tool/help/reports/revenue/project-revenue">
                    Project Revenue
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub10" icon={<CreditCardFilled />} title="Contribution">
                <Menu.Item key="/rm-tool/help/reports/contribution/group-contribution" icon={<GoldenFilled />}>
                  <Link to="/rm-tool/help/reports/contribution/group-contribution">
                    BU Contribution
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="/rm-tool/help/reports/contribution/project-contribution"
                  icon={<FileProtectOutlined />}
                >
                  <Link to="/rm-tool/help/reports/contribution/project-contribution">
                    Project Contribution
                  </Link>
                </Menu.Item>
                <Menu.Item key="/rm-tool/help/reports/contribution/revenue-and-cost" icon={<TransactionOutlined />}>
                  <Link to="/rm-tool/help/reports/contribution/revenue-and-cost">
                    Revenue & Cost
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/rm-tool/help/reports/claims-reports" icon={<IssuesCloseOutlined />}>
                <Link to="/rm-tool/help/reports/claims-reports">
                  Claims Reports
                </Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/help/reports/generic-reports" icon={<ReconciliationOutlined />}>
                <Link to="/rm-tool/help/reports/generic-reports">
                  Generic Reports
                </Link>
              </Menu.Item>
              <SubMenu key="sub11" icon={<FunnelPlotFilled />} title="Operational Reports">
                <Menu.Item
                  key="/rm-tool/help/reports/operational-reports/resource-utilization"
                  icon={<ContainerFilled />}
                >
                  <Link to="/rm-tool/help/reports/operational-reports/resource-utilization">
                    Resource Utilization
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="/rm-tool/help/reports/monthly-average-engg-cost"
                icon={<ProfileFilled />}
              >
                <Link to="/rm-tool/help/reports/monthly-average-engg-cost">
                  Monthly Average Engg. Cost
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-help-header">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            RM TOOL HELP
            <div />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background">
              <Switch>
                <Route exact path="/rm-tool/help/introduction">
                  <IntroductionHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/data-management/resource-management"
                >
                  <ResourceMgtHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/data-management/resource-skill-data"
                >
                  <ResourceSkillData />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/data-management/resource-experience-data"
                >
                  <ResourceExperienceData />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/data-management/role-management/role-allocation"
                >
                  <RoleAllocationHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/data-management/role-management/role-group-management"
                >
                  <RoleGrpMgtHelp />
                </Route>
                <Route exact path="/rm-tool/help/data-management/salary-revision">
                  <SalaryRevision />
                </Route>
                <Route exact path="/rm-tool/help/data-management/bu-details">
                  <GroupDetails />
                </Route>
                <Route exact path="/rm-tool/help/data-management/bu-and-operational-plan">
                  <GroupAndOperationalPlan />
                </Route>
                <Route exact path="/rm-tool/help/data-management/maternity-group">
                  <MaternityGroup />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/project-management/project-data"
                >
                  <ProjectDataHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/project-management/resource-allocation"
                >
                  <ResourceAllocationHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/project-management/approvals/timelog"
                >
                  <ApprovalsTimelogHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/accounts-management/actual-revenue"
                >
                  <AccountsMgtRevenueHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/accounts-management/average-engg-cost"
                >
                  <AccountsMgtEngCostHelp />
                </Route>
                <Route exact path="/rm-tool/help/accounts-management/claims">
                  <ClaimsHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/resource-utilization/organization-level"
                >
                  <ResourceUtilizationOrganizationLevelHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/resource-utilization/resource-level"
                >
                  <ResourceUtilizationResourceLevelHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/cost-utilization/cost-summary"
                >
                  <CostUtilizationCostSummaryHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/cost-utilization/cost-analysis"
                >
                  <CostUtilizationCostAnalysisHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/resource-and-cost-utilization"
                >
                  <ResourceAndCostUtilizationHelp />
                </Route>
                <Route exact path="/rm-tool/help/reports/revenue/group-revenue">
                  <GroupRevenueHelp />
                </Route>
                <Route exact path="/rm-tool/help/reports/revenue/project-revenue">
                  <ProjectRevenueHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/contribution/group-contribution"
                >
                  <GroupContributionHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/contribution/project-contribution"
                >
                  <ProjectContributionHelp />
                </Route>
                <Route
                  exact
                  path="/rm-tool/help/reports/contribution/revenue-and-cost"
                >
                  <RevenueAndCostHelp />
                </Route>
                <Route exact path="/rm-tool/help/reports/claims-reports">
                  <ClaimsReportsHelp />
                </Route>
                <Route exact path="/rm-tool/help/reports/generic-reports">
                  <GenericReportsHelp />
                </Route>
                <Route exact path="/rm-tool/help/reports/operational-reports/resource-utilization">
                  <AOPResourceUtilization />
                </Route>
                <Route exact path="/rm-tool/help/reports/monthly-average-engg-cost">
                  <MonthlyAvgEnggCost />
                </Route>

                <Redirect from="/rm-tool/help" to="/rm-tool/help/introduction" />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            AVIN Systems Private Limited | Ver : 0.8
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Help;
