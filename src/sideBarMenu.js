/* eslint-disable react/function-component-definition, arrow-body-style */
import React, { useEffect, useState } from 'react';
import {
  Layout, Menu, Modal, Avatar, Upload, Spin, Typography,
} from 'antd';
import {
  HomeFilled, DatabaseFilled, UserOutlined, AppstoreAddOutlined, UsergroupAddOutlined, NodeExpandOutlined, EditFilled,
  FieldTimeOutlined, AccountBookFilled, SolutionOutlined, MoneyCollectOutlined, OneToOneOutlined, FileProtectOutlined,
  UserSwitchOutlined, ReadOutlined, TranslationOutlined, EuroCircleFilled, GroupOutlined, AuditOutlined,
  QuestionCircleFilled, ProjectFilled, PoweroffOutlined, QuestionCircleTwoTone, CloseCircleFilled, MenuUnfoldOutlined,
  MoneyCollectFilled, InsuranceFilled, IssuesCloseOutlined, ReconciliationOutlined, DollarCircleFilled, AppstoreFilled,
  ContainerFilled, FunnelPlotFilled, RedEnvelopeFilled, CreditCardFilled, UngroupOutlined, GoldenFilled, BoxPlotFilled,
  TransactionOutlined, FileDoneOutlined, MenuFoldOutlined, HddFilled, ProfileFilled, CalculatorFilled, FundFilled,
  CameraOutlined, CheckCircleFilled,
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import 'antd/dist/antd.min.css';
import {
  BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect,
} from 'react-router-dom';
import axios from 'axios';

import Home from './components/home';
import ResourceManagement from './components/resourceManagement';
import ResourceSkillData from './components/resourceSkillData';
import ResourceExperienceData from './components/resourceExperienceData';
import RoleAllocation from './components/roleAllocation';
import RoleGroupManagement from './components/roleGroupManagement';
import SalaryRevision from './components/salaryRevision';
import GroupDetails from './components/groupDetails';
import GroupAndOperationalPlan from './components/groupAndOperationalPlan';
import MaternityGroup from './components/maternityGroup';
import ProjectData from './components/projectData';
import ResourceAllocation from './components/resourceAllocation';
import Timelog from './components/timelog';
import AccountManagementRevenue from './components/accountManagementRevenue';
import AverageEnggCost from './components/averageEnggCost';
import Claims from './components/claims';
import Computations from './components/computations';
import OrganizationLevel from './components/resourceUtilizationOrganizationLevel';
import ResourceLevel from './components/resourceUtilizationResourceLevel';
import CostSummary from './components/costUtilizationCostSummary';
import CostAnalysis from './components/costUtilizationCostAnalysis';
import ResourceAndCostUtilization from './components/resourceAndCostUtilization';
import GroupRevenue from './components/groupRevenue';
import ProjectRevenue from './components/projectRevenue';
import GroupContribution from './components/groupContribution';
import ProjectContribution from './components/projectContribution';
import RevenueAndCost from './components/revenueAndCost';
import ClaimsReports from './components/claimsReports';
import GenericReports from './components/genericReports';
import AOPResourceUtilization from './components/resourceUtilizationAOP';
import MonthlyAverageEnggCost from './components/monthlyAverageEnggCost';
import Help from './components/help';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

const initialState = {
  booleanStateValues: {
    isLoading: true,
    showLogoutModal: false,
    showStatusModal: false,
    profileImageUpdated: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedKey: '',
    profileImage: '',
  },
};

const SideBarMenu = () => {
  const history = useHistory();
  const [state, setState] = useState(initialState);
  const [collapsed, setCollapsed] = useState(false);
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const successIcon = <CheckCircleFilled className="success-icon" />;

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      textStateValues: {
        ...state.textStateValues,
        selectedKey: window.location.pathname,
      },
    }));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line max-len
    axios.post(`${process.env.REACT_APP_BASE_URL}/promTool/promUser/fetchUserProfilePicture`, { resourceEmpId: localStorage.getItem('userEmpId') })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          booleanStateValues: {
            ...state.booleanStateValues,
            isLoading: false,
          },
          textStateValues: {
            ...state.textStateValues,
            profileImage: res.data.data.profile_picture,
          },
        }));
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else if (err.response.status === 404) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
        }
      });
  }, [state.booleanStateValues.profileImageUpdated]);

  const handleOkLogout = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
        showLogoutModal: false,
      },
    }));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/promTool/logout`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
          localStorage.clear();
          history.push('/');
        }
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Logout',
              modalsIcon: failureIcon,
              modalsMessage: 'Server error. Please try again.',
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Logout',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Down',
            },
          }));
        } else if (err.response.status === 500) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
          localStorage.clear();
          history.push('/');
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
          localStorage.clear();
          history.push('/');
        }
      });
  };

  const handleCancelLogout = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showLogoutModal: false,
      },
    }));
  };

  const handleMenuClick = (item) => {
    if (item.key === '20') {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showLogoutModal: true,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        textStateValues: {
          ...state.textStateValues,
          selectedKey: window.location.pathname,
        },
      }));
    }
  };

  const handleStatusModalOk = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showStatusModal: false,
      },
    }));
  };

  const handleUploadProfilePicture = (file) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const body = {
        image: reader.result.split(',')[1],
        resourceEmpId: localStorage.getItem('userEmpId'),
      };
      axios.put(`${process.env.REACT_APP_BASE_URL}/promTool/promUser/uploadUserProfilePicture`, body)
        .then(() => {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
              profileImageUpdated: !state.booleanStateValues.profileImageUpdated,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Upload Profile Picture',
              modalsIcon: successIcon,
              modalsMessage: 'Profile picture uploaded successfully.',
            },
          }));
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Upload Profile Picture',
                modalsIcon: failureIcon,
                modalsMessage: 'Server error. Please try again.',
              },
            }));
          } else if (err.response === undefined) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Upload Profile Picture',
                modalsIcon: failureIcon,
                modalsMessage: 'Server down. Please try again.',
              },
            }));
          } else if (err.response.status === 500) {
            if (err.response.data.message === 'Data not saved') {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Upload Profile Picture',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Internal server error. Please contact the Admin.',
                },
              }));
            } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
              setState((prevState) => ({
                ...prevState,
                booleanStateValues: {
                  ...state.booleanStateValues,
                  isLoading: false,
                  showStatusModal: true,
                },
                textStateValues: {
                  ...state.textStateValues,
                  modalsTitle: 'Upload Profile Picture',
                  modalsIcon: failureIcon,
                  modalsMessage: 'Your session has expired. Please Login again.',
                },
              }));
            }
          } else if (err.response.status === 412) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Upload Profile Picture',
                modalsIcon: failureIcon,
                modalsMessage: 'Your Role access has changed. Please Login again.',
              },
            }));
          } else if (err.response.status === 409) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Upload Profile Picture',
                modalsIcon: failureIcon,
                modalsMessage: 'Failed to upload Profile Picture. Please try again.',
              },
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                isLoading: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Upload Profile Picture',
                modalsIcon: failureIcon,
                modalsMessage: 'Something went wrong. Try again/Please contact the Admin.',
              },
            }));
          }
        });
    };
    return false;
  };

  const statusModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      visible={state.booleanStateValues.showStatusModal}
      centered
      closable={false}
      onOk={handleStatusModalOk}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

  return (
    <Router>
      <Layout hasSider>
        <Sider
          width="290px"
          collapsible
          trigger={null}
          collapsed={collapsed}
          // onCollapse={() => setCollapsed(!collapsed)}
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
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[state.textStateValues.selectedKey]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="/rm-tool/home" icon={<HomeFilled />}>
              <Link to="/rm-tool/home">
                HOME
              </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<DatabaseFilled />} title="DATA MANAGEMENT">
              <Menu.Item
                key="/rm-tool/data-management/resource-management"
                icon={<UserOutlined />}
              >
                <Link to="/rm-tool/data-management/resource-management">
                  Resource Management
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/data-management/resource-skill-data"
                icon={<BoxPlotFilled />}
              >
                <Link to="/rm-tool/data-management/resource-skill-data">
                  Resource Skill Data
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/data-management/resource-experience-data"
                icon={<FundFilled />}
              >
                <Link to="/rm-tool/data-management/resource-experience-data">
                  Resource Experience Data
                </Link>
              </Menu.Item>
              <SubMenu key="sub2" icon={<AppstoreAddOutlined />} title="Role Management">
                <Menu.Item
                  key="/rm-tool/data-management/role-management/role-allocation"
                  icon={<UserSwitchOutlined />}
                >
                  <Link to="/rm-tool/data-management/role-management/role-allocation">
                    Role Allocation
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="/rm-tool/data-management/role-management/role-group-management"
                  icon={<GroupOutlined />}
                >
                  <Link to="/rm-tool/data-management/role-management/role-group-management">
                    Role Group Management
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="/rm-tool/data-management/salary-revision"
                icon={<DollarCircleFilled />}
              >
                <Link to="/rm-tool/data-management/salary-revision">
                  Salary Revision
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/data-management/bu-details"
                icon={<MoneyCollectOutlined />}
              >
                <Link to="/rm-tool/data-management/bu-details">
                  BU Details
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/data-management/bu-and-operational-plan"
                icon={<AppstoreFilled />}
              >
                <Link to="/rm-tool/data-management/bu-and-operational-plan">
                  BU & Operational Plan
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/data-management/maternity-group"
                icon={<HddFilled />}
              >
                <Link to="/rm-tool/data-management/maternity-group">
                  Maternity Group
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<AuditOutlined />} title="PROJECT MANAGEMENT">
              <Menu.Item
                key="/rm-tool/project-management/project-data"
                icon={<ProjectFilled />}
              >
                <Link to="/rm-tool/project-management/project-data">
                  Project Data
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/project-management/resource-allocation"
                icon={<UsergroupAddOutlined />}
              >
                <Link to="/rm-tool/project-management/resource-allocation">
                  Resource Allocation
                </Link>
              </Menu.Item>
              <SubMenu key="sub4" icon={<NodeExpandOutlined />} title="Approvals">
                <Menu.Item
                  key="/rm-tool/project-management/approvals/timelog"
                  icon={<FieldTimeOutlined />}
                >
                  <Link to="/rm-tool/project-management/approvals/timelog">
                    Timelog
                  </Link>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub5" icon={<AccountBookFilled />} title="ACCOUNTS MANAGEMENT">
              <Menu.Item
                key="/rm-tool/accounts-management/actual-revenue"
                icon={<MoneyCollectFilled />}
              >
                <Link to="/rm-tool/accounts-management/actual-revenue">
                  Actual Revenue
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/accounts-management/average-engg-cost"
                icon={<InsuranceFilled />}
              >
                <Link to="/rm-tool/accounts-management/average-engg-cost">
                  Average Engg. Cost
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/accounts-management/claims"
                icon={<EditFilled />}
              >
                <Link to="/rm-tool/accounts-management/claims">
                  Claims
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/rm-tool/accounts-management/computations"
                icon={<CalculatorFilled />}
              >
                <Link to="/rm-tool/accounts-management/computations">
                  Computations
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<MenuUnfoldOutlined />} title="REPORTS">
              <SubMenu key="sub7" icon={<SolutionOutlined />} title="Resource Utilization">
                <Menu.Item
                  key="/rm-tool/reports/resource-utilization/organization-level"
                  icon={<TranslationOutlined />}
                >
                  <Link to="/rm-tool/reports/resource-utilization/organization-level">
                    Organization Level
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="/rm-tool/reports/resource-utilization/resource-level"
                  icon={<ReadOutlined />}
                >
                  <Link to="/rm-tool/reports/resource-utilization/resource-level">
                    Resource Level
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub8" icon={<FileDoneOutlined />} title="Cost Utilization">
                <Menu.Item
                  key="/rm-tool/reports/cost-utilization/cost-summary"
                  icon={<TranslationOutlined />}
                >
                  <Link to="/rm-tool/reports/cost-utilization/cost-summary">
                    Cost Summary
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="/rm-tool/reports/cost-utilization/cost-analysis"
                  icon={<ReadOutlined />}
                >
                  <Link to="/rm-tool/reports/cost-utilization/cost-analysis">
                    Cost Analysis
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="/rm-tool/reports/resource-and-cost-utilization"
                icon={<OneToOneOutlined />}
              >
                <Link to="/rm-tool/reports/resource-and-cost-utilization">
                  Resource & Cost Utilization
                </Link>
              </Menu.Item>
              <SubMenu key="sub9" icon={<RedEnvelopeFilled />} title="Revenue">
                <Menu.Item
                  key="/rm-tool/reports/group-revenue"
                  icon={<UngroupOutlined />}
                >
                  <Link to="/rm-tool/reports/group-revenue">
                    BU Revenue
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="/rm-tool/reports/project-revenue"
                  icon={<EuroCircleFilled />}
                >
                  <Link to="/rm-tool/reports/project-revenue">
                    Project Revenue
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub10" icon={<CreditCardFilled />} title="Contribution">
                <Menu.Item
                  key="/rm-tool/reports/group-contribution"
                  icon={<GoldenFilled />}
                >
                  <Link to="/rm-tool/reports/group-contribution">
                    BU Contribution
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="/rm-tool/reports/project-contribution"
                  icon={<FileProtectOutlined />}
                >
                  <Link to="/rm-tool/reports/project-contribution">
                    Project Contribution
                  </Link>
                </Menu.Item>
                <Menu.Item key="/rm-tool/reports/revenue-and-cost" icon={<TransactionOutlined />}>
                  <Link to="/rm-tool/reports/revenue-and-cost">
                    Revenue & Cost
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="/rm-tool/reports/claims-reports" icon={<IssuesCloseOutlined />}>
                <Link to="/rm-tool/reports/claims-reports">
                  Claims Reports
                </Link>
              </Menu.Item>
              <Menu.Item key="/rm-tool/reports/generic-reports" icon={<ReconciliationOutlined />}>
                <Link to="/rm-tool/reports/generic-reports">
                  Generic Reports
                </Link>
              </Menu.Item>
              <SubMenu key="sub11" icon={<FunnelPlotFilled />} title="Operational Reports">
                <Menu.Item
                  key="/rm-tool/reports/operational-reports/resource-utilization"
                  icon={<ContainerFilled />}
                >
                  <Link to="/rm-tool/reports/operational-reports/resource-utilization">
                    Resource Utilization
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="/rm-tool/reports/monthly-average-engg-cost"
                icon={<ProfileFilled />}
              >
                <Link to="/rm-tool/reports/monthly-average-engg-cost">
                  Monthly Average Engg. Cost
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="20" icon={<PoweroffOutlined />}>
              LOGOUT
            </Menu.Item>
            <Menu.Item key="/rm-tool/help/introduction" icon={<QuestionCircleFilled />}>
              <Link to="/rm-tool/help/introduction" target="_blank">
                HELP
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-header">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            RM TOOL
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <ImgCrop>
                <Upload
                  beforeUpload={handleUploadProfilePicture}
                  showUploadList={false}
                >
                  <div className="avatar-upload-container">
                    <Avatar
                      size={60}
                      src={`data:image/png;base64,${state.textStateValues.profileImage}`}
                      icon={<UserOutlined />}
                      className="avatar"
                    />
                    <div className="upload-icon">
                      <CameraOutlined />
                    </div>
                  </div>
                </Upload>
              </ImgCrop>
              <Typography className="user-info">
                Welcome
                {' '}
                {localStorage.getItem('userName')}
              </Typography>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {state.booleanStateValues.isLoading
              ? (
                <div className="pagecenter">
                  <Spin size="large" />
                </div>
              ) : (
                <div className="site-layout-background">
                  <Switch>
                    <Route exact path="/rm-tool/home">
                      <Home />
                    </Route>
                    <Route exact path="/rm-tool/data-management/resource-management">
                      <ResourceManagement />
                    </Route>
                    <Route exact path="/rm-tool/data-management/resource-skill-data">
                      <ResourceSkillData />
                    </Route>
                    <Route exact path="/rm-tool/data-management/resource-experience-data">
                      <ResourceExperienceData />
                    </Route>
                    <Route exact path="/rm-tool/data-management/role-management/role-allocation">
                      <RoleAllocation />
                    </Route>
                    <Route exact path="/rm-tool/data-management/role-management/role-group-management">
                      <RoleGroupManagement />
                    </Route>
                    <Route exact path="/rm-tool/data-management/salary-revision">
                      <SalaryRevision />
                    </Route>
                    <Route exact path="/rm-tool/data-management/bu-details">
                      <GroupDetails />
                    </Route>
                    <Route exact path="/rm-tool/data-management/bu-and-operational-plan">
                      <GroupAndOperationalPlan />
                    </Route>
                    <Route exact path="/rm-tool/data-management/maternity-group">
                      <MaternityGroup />
                    </Route>
                    <Route exact path="/rm-tool/project-management/project-data">
                      <ProjectData />
                    </Route>
                    <Route exact path="/rm-tool/project-management/resource-allocation">
                      <ResourceAllocation />
                    </Route>
                    <Route exact path="/rm-tool/project-management/approvals/timelog">
                      <Timelog />
                    </Route>
                    <Route exact path="/rm-tool/accounts-management/actual-revenue">
                      <AccountManagementRevenue />
                    </Route>
                    <Route exact path="/rm-tool/accounts-management/average-engg-cost">
                      <AverageEnggCost />
                    </Route>
                    <Route exact path="/rm-tool/accounts-management/claims">
                      <Claims />
                    </Route>
                    <Route exact path="/rm-tool/accounts-management/computations">
                      <Computations />
                    </Route>
                    <Route exact path="/rm-tool/reports/resource-utilization/organization-level">
                      <OrganizationLevel />
                    </Route>
                    <Route exact path="/rm-tool/reports/resource-utilization/resource-level">
                      <ResourceLevel />
                    </Route>
                    <Route exact path="/rm-tool/reports/cost-utilization/cost-summary">
                      <CostSummary />
                    </Route>
                    <Route exact path="/rm-tool/reports/cost-utilization/cost-analysis">
                      <CostAnalysis />
                    </Route>
                    <Route exact path="/rm-tool/reports/resource-and-cost-utilization">
                      <ResourceAndCostUtilization />
                    </Route>
                    <Route exact path="/rm-tool/reports/group-revenue">
                      <GroupRevenue />
                    </Route>
                    <Route exact path="/rm-tool/reports/project-revenue">
                      <ProjectRevenue />
                    </Route>
                    <Route exact path="/rm-tool/reports/group-contribution">
                      <GroupContribution />
                    </Route>
                    <Route exact path="/rm-tool/reports/project-contribution">
                      <ProjectContribution />
                    </Route>
                    <Route exact path="/rm-tool/reports/revenue-and-cost">
                      <RevenueAndCost />
                    </Route>
                    <Route exact path="/rm-tool/reports/claims-reports">
                      <ClaimsReports />
                    </Route>
                    <Route exact path="/rm-tool/reports/generic-reports">
                      <GenericReports />
                    </Route>
                    <Route exact path="/rm-tool/reports/operational-reports/resource-utilization">
                      <AOPResourceUtilization />
                    </Route>
                    <Route exact path="/rm-tool/reports/monthly-average-engg-cost">
                      <MonthlyAverageEnggCost />
                    </Route>
                    <Route exact path="/rm-tool/help/introduction">
                      <Help />
                    </Route>
                    <Redirect from="/rm-tool" to="/rm-tool/home" />
                  </Switch>
                  <Modal
                    title="Logout"
                    centered
                    closable={false}
                    visible={state.booleanStateValues.showLogoutModal}
                    keyboard={false}
                    maskClosable={false}
                    onOk={handleCancelLogout}
                    onCancel={handleOkLogout}
                    okText="Cancel"
                    cancelText="OK"
                  >
                    <div className="action-modal">
                      <QuestionCircleTwoTone className="option-icon" />
                      <div>Are you sure to logout?</div>
                    </div>
                  </Modal>
                  {statusModal}
                </div>
              )}
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

export default SideBarMenu;
