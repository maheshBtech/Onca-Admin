import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import {
//   DropdownItem,
//   DropdownMenu,
//   Dropdown,
//   DropdownToggle
// } from "reactstrap";

// import images
import logodarkImg from "../../assets/images/logo-dark.png";
import logosmImg from "../../assets/images/Onca-Logo.png";
import logolightImg from "../../assets/images/Onca-Logo-full.png";
import JJSLogo from "../../assets/images/Group 3237.png"

// Import other Dropdown
//import LanguageDropdown from "../../components/LanguageDropdown";
import NotificationDropdown from "../../components/NotificationDropdown";
import ProfileMenu from "../../components/ProfileMenu";
import PortalMenu from "../../components/PortalMenu";
import RoleMenu from "../../components/RoleMenu";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchOpen: false,
      mainLogoUrl:logolightImg 
    };

    this.toggleRightbar = this.toggleRightbar.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    if(this.props.currentUserProvide != "")
    {
      this.changeLogo()
    }
  }

  /**
   * Toggle Search
   */
  componentDidUpdate(prevProps, prevState){     
    if(prevProps.currentUserProvide !== this.props.currentUserProvide)
    {
      this.changeLogo()
    }
  }
  changeLogo(){
    if(this.props.currentUserProvide.toLocaleLowerCase() === "Jayanagar Jaguars".toLocaleLowerCase()){
      this.state.mainLogoUrl = JJSLogo
      this.setState({mainLogoUrl:JJSLogo})
    }
    else{
      this.setState({mainLogoUrl:logolightImg})
    }
  
  }


  toggleSearch() {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  }

  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }

  /**
   * Toggle full screen
   */
  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/dashboard" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logosmImg} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logodarkImg} alt="" height="17" />
                  </span>
                </Link>

                <Link to="/dashboard" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logosmImg} alt="" height="22" />
                  </span>
                  <span className="logo-lg">                    
                    <img src={this.state.mainLogoUrl} alt="" height="44" />
                  </span>
                </Link>
              </div>
              <button
                type="button"
                onClick={this.toggleMenu}
                className="btn btn-sm px-3 font-size-24 header-item waves-effect"
                id="vertical-menu-btn"
              >
                <i className="mdi mdi-menu"></i>
              </button>

              <div className="d-none d-sm-block">
    <h1 className="mt-2">{this.props.currentActivePage}</h1>
              </div>
            </div>

            <div className="d-flex">
              <div className="dropdown d-none d-lg-inline-block">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  onClick={this.toggleFullscreen}
                  data-toggle="fullscreen"
                >
                  <i className="mdi mdi-fullscreen"></i>
                </button>
              </div>

              <NotificationDropdown />
              <RoleMenu />
              <PortalMenu />
              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {    
  return { 
    currentActivePage : state.currentPageName.currentPage,
    currentUserProvide: state.userProfileData.providerName
  };
};
export default connect(mapStatetoProps)(TopBar);
