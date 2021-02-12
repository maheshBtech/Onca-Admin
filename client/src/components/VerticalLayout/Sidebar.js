import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import MetisMenu from "metismenujs";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRole: "",
    };
    this.getCurrentRole();
  }
  getCurrentRole() {
    let role = this.props.currentSelectedRole;
    if (role !== "" || role !== undefined) {
      this.currentRole = role.Role_Name;
      this.setState({ currentRole: role.Role_Name }, () => {
        this.initMenu();
        //this.forceUpdate()
        //this.sideNavHtml()
      });
    }
  }
  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
    if (this.props.currentSelectedRole !== prevProps.currentSelectedRole) {
      this.getCurrentRole();
    }
  }
  // Menu List based on Onca Active and Provider Users
  // For Onca Active and Provider - Dashboard
  returnDashboard() {
    if (this.currentRole) {
      if (
        this.currentRole.toLowerCase().includes("admin") ||
        this.currentRole.toLowerCase().includes("root")
      ) {
        return (
          <li>
            <Link to="/dashboard" className="waves-effect">
              <span>Dashboard</span>
            </Link>
          </li>
        );
      }
    }
  }
  // For Providers - Provider Data
  returnProviderData() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/pages-maintenance" className="waves-effect">
              <span>Provider Data</span>
            </Link>
          </li>
        );
      }
    }
  }
  // For Providers - Services
  returnServices() {
    if (this.currentRole) {
      if (
        this.currentRole.toLowerCase().includes("admin") ||
        this.currentRole.toLowerCase().includes("root")
      ) {
        return (
          <li>
            <Link to="/pages-maintenance" className="waves-effect">
              <span>Services</span>
            </Link>
          </li>
        );
      }
    }
  }
  // For Onca Active - Onca Data
  returnOncaData() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("root")) {
        return (
          <li>
            <Link to="/pages-maintenance" className="waves-effect">
              <span>Onca Data</span>
            </Link>
          </li>
        );
      }
    }
  }
  // For Provider - Users
  returnUsers() {
    if (this.currentRole) {
      if (
        this.currentRole.toLowerCase().includes("admin") ||
        this.currentRole.toLowerCase().includes("root")
      ) {
        return (
          <li>
            <Link to="/users" className="waves-effect">
              <span>Users</span>
            </Link>
          </li>
        );
      }
    }
  }
  // For Onca Active and Provider - Roles
  returnRole() {
    if (this.currentRole) {
      if (
        this.currentRole.toLowerCase().includes("admin") ||
        this.currentRole.toLowerCase().includes("root")
      ) {
        return (
          <li>
            <Link to="/role" className="waves-effect">
              <span>Roles</span>
            </Link>
          </li>
        );
      }
    }
  }
  // For Onca Active and Provider - Reports
  returnReports() {
    if (this.currentRole) {
      if (
        this.currentRole.toLowerCase().includes("admin") ||
        this.currentRole.toLowerCase().includes("root")
      ) {
        return (
          <li>
            <Link to="/pages-maintenance" className="waves-effect">
              <span>Reports</span>
            </Link>
          </li>
        );
      }
    }
  }
  // For Provider - Activities
  returnActivities() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Activity</span>
            </Link>

            <ul className="sub-menu" aria-expanded="true">
              <li>
                <Link to="/activity">Activities</Link>
              </li>
              <li>
                <Link to="/group">Group</Link>
              </li>
              <li>
                <Link to="/feedback-template">Feedback Template</Link>
              </li>
              <li>
                <Link to="/activity-template">Templates</Link>
              </li>
              {/* <li>
                <Link to="/tables-prime">Table Prime</Link>
              </li> */}
            </ul>
          </li>
        );
      }
    }
  }
  // For Provider - Finance
  returnFinance() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Finance</span>
            </Link>
            <ul className="sub-menu" aria-expanded="true">
              <li>
                <Link to="pugmark-list">PugMark Statement</Link>
              </li>
              <li>
                <Link to="pugmark-request">PugMark Request</Link>
              </li>
              <li>
                <Link to="/finance-promocode">Promocode</Link>
              </li>
              <li>
                <Link to="user-type">User Type</Link>
              </li>
            </ul>
          </li>
        );
      }
    }
  }
  // For Provider - Leaderboard
  returnLeaderboard() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Leaderboard</span>
            </Link>
            <ul className="sub-menu" aria-expanded="true">
              <li>
                <Link to="/leaderboard-result">Results</Link>
              </li>
              <li>
                <Link to="/race">Race</Link>
              </li>
              <li>
                <Link to="/workout">Activity Leaderboard</Link>
              </li>
            </ul>
          </li>
        );
      }
    }
  }
  // For Onca Active - Onca Bites
  returnOncaBites() {
    if (this.currentRole) {
      if (
        this.currentRole.toLowerCase().includes("admin") ||
        this.currentRole.toLowerCase().includes("root")
      ) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Onca Bites</span>
            </Link>
            <ul className="sub-menu" aria-expanded="true">
              <li>
                <Link to="/onca-article">Articles</Link>
              </li>
              <li>
                <Link to="/onca-blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/pages-maintenance">Runners Corner</Link>
              </li>
            </ul>
          </li>
        );
      }
    }
  }
  // For Onca Active - Providers
  returnProviders() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("root")) {
        return (
          <li>
            <Link to="/provider" className="waves-effect">
              <span>Providers</span>
            </Link>
          </li>
        );
      }
    }
  }

  returnCommunication() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Communication</span>
            </Link>
            <ul className="sub-menu" aria-expanded="true">
              <li>
                <Link to="/email-template">Email Template</Link>
              </li>
              <li>
                <Link to="/pages-maintenance">SMS Template</Link>
              </li>
              <li>
                <Link to="/comm-notify">Announcements</Link>
              </li>
              <li>
                <Link to="/pages-maintenance">Chat Settings</Link>
              </li>
              <li>
                <Link to="/comm-wishes">Wishes</Link>
              </li>
              <li>
                <Link to="/comm-faqs">FAQ</Link>
              </li>
              <li>
                <Link to="/comm-terms">Terms &#38; Conditions</Link>
              </li>
            </ul>
          </li>
        );
      }
    }
  }

  returnEvent() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/events" className="waves-effect">
              <span>Event</span>
            </Link>
          </li>
        );
      }
    }
  }

  returnSettings() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Settings</span>
            </Link>
            <ul className="sub-menu" aria-expanded="true">
              <li>
                <Link to="/training-location">Location</Link>
              </li>
              <li>
                <Link to="/distance">Distance</Link>
              </li>
              <li>
                <Link to="/predefined-str">Predefined Strings</Link>
              </li>
              <li>
                <Link to="/pages-maintenance">Sample Images</Link>
              </li>
              <li>
                <Link to="/unique-id">Unique ID</Link>
              </li>
              <li>
                <Link to="/settingsActivityType">Activity Type</Link>
              </li>
            </ul>
          </li>
        );
      }
    }
  }

  returneCommerce() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <li>
            <Link to="/ecom-alias" className="has-arrow waves-effect">
              <span>eCommerce</span>
            </Link>
            <ul className="sub-menu" aria-expanded="true">
              <li>
                <Link to="/pages-maintenance">Product</Link>
              </li>
              <li>
                <Link to="/pages-maintenance">Sale Order</Link>
              </li>
              <li>
                <Link to="/pages-maintenance">Batch / Purchase</Link>
              </li>
              <li>
                <Link to="/pages-maintenance">Retail Report</Link>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  Configuration
                </Link>
                <ul className="sub-menu" aria-expanded="true">
                  <li>
                    <Link to="/attributes">Attributes</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        );
      }
    }
  }
  returnAnalytics() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("root")) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Analytics</span>
            </Link>
          </li>
        );
      }
    }
  }
  returnTemplates() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("root")) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Templates</span>
            </Link>
          </li>
        );
      }
    }
  }
  returnWebPages() {
    if (this.currentRole) {
      if (
        this.currentRole.toLowerCase().includes("admin") ||
        this.currentRole.toLowerCase().includes("root")
      ) {
        return (
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <span>Web Pages</span>
            </Link>
          </li>
        );
      }
    }
  }
  conditionalSideNav() {
    if (this.currentRole) {
      if (this.currentRole.toLowerCase().includes("admin")) {
        return (
          <div>
            {this.returnDashboard()}
            {this.returnProviderData()}
            {this.returnServices()}
            {this.returnUsers()}
            {this.returnRole()}
            {this.returnReports()}
            {this.returnActivities()}
            {this.returnFinance()}
            {this.returnLeaderboard()}
            {this.returnCommunication()}
            {this.returnEvent()}
            {this.returnOncaBites()}
            {this.returnSettings()}
            {this.returneCommerce()}
            {this.returnWebPages()}
            {this.returnOncaData()}
            {this.returnProviders()}
            {/* {this.returnTemplates()} */}
          </div>
        );
      }
      if (this.currentRole.toLowerCase().includes("root")) {
        return (
          <div>
            {this.returnDashboard()}
            {this.returnOncaData()}
            {this.returnRole()}
            {this.returnProviders()}
            {this.returnReports()}
            {this.returnServices()}
            {this.returnAnalytics()}
            {this.returnTemplates()}
            {this.returnUsers()}
            {this.returnOncaBites()}
            {this.returnWebPages()}
          </div>
        );
      }
    }
  }
  sideNavHtml() {
    return (
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          {this.conditionalSideNav()}
        </ul>
      </div>
    );
    //window.location.reload();
  }

  initMenu() {
    if (this.props.type !== "condensed" || this.props.isMobile) {
      new MetisMenu("#side-menu");

      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (this.props.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("mm-active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active"); // li
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");
        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.type !== "condensed" ? (
          <SimpleBar style={{ maxHeight: "100%" }}>
            {this.sideNavHtml()}
          </SimpleBar>
        ) : (
          this.sideNavHtml()
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    currentSelectedRole: state.currentPageName.roleAndProvider.selectedRole,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    updateProfileData: (type, payload) => {
      dispatch({ type: type, payload: payload });
    },
  };
};
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Sidebar));