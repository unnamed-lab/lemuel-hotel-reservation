import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCompany, reset } from "../../utils/company/companySlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userIcon from "../../assets/user.svg";

// import "../../assets/admin/css/demo.css";
// import "../../assets/admin/vendor/css/pages/page-icons.css";
// import "../../assets/admin/vendor/css/core.css";
// import "../../assets/admin/vendor/css/theme-default.css";
// import "../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
// import "../../assets/admin/vendor/libs/apex-charts/apex-charts.css";
// import "../../assets/admin/vendor/fonts/boxicons.css";

function AdminLayout() {
  // const dispatch = useDispatch();
  // const { company } = useSelector((state) => state.company);
  // const storageCompany = localStorage.getItem('company')
  // useEffect(() => {
  //   if (!company && !storageCompany) {
  //     dispatch(removeCompany());
  //   }
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [company, storageCompany, dispatch]);
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />
          <div className="layout-page">
            <Navigation />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Outlet />
              </div>
            </div>
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
        </div>
      </div>
      <ScriptBundle />
      <ToastContainer />
    </>
  );
}

function ScriptBundle() {
  return (
    <>
      <script src="../../assets/admin/vendor/js/helpers.js"></script>

      <script src="../../assets/admin/js/config.js"></script>
      <script src="../../assets/admin/vendor/libs/jquery/jquery.js"></script>
      <script src="../../assets/admin/vendor/libs/popper/popper.js"></script>
      <script src="../../assets/admin/vendor/js/bootstrap.js"></script>
      <script src="../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

      <script src="../../assets/admin/vendor/js/menu.js"></script>

      <script src="../../assets/admin/vendor/libs/apex-charts/apexcharts.js"></script>

      <script src="../../assets/admin/js/main.js"></script>

      <script src="../../assets/admin/js/dashboards-analytics.js"></script>
    </>
  );
}

function Navigation() {
  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" href="#">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="#"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src={userIcon}
                    alt
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src={userIcon}
                            alt
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">John Doe</span>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Settings</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <span className="d-flex align-items-center align-middle">
                      <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                      <span className="flex-grow-1 align-middle">Billing</span>
                      <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                        4
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="auth-login-basic.html">
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

function SideBar() {
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <a href="index.html" className="app-brand-link">
            <span className="app-brand-logo demo">
              <svg
                width="62"
                height="20"
                viewBox="0 0 62 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 19L5.85 12.375H4.825V19H0.55V1.45H7.725C9.10833 1.45 10.2833 1.69167 11.25 2.175C12.2333 2.65833 12.9667 3.325 13.45 4.175C13.9333 5.00833 14.175 5.94167 14.175 6.975C14.175 8.14167 13.8417 9.18333 13.175 10.1C12.525 11.0167 11.5583 11.6667 10.275 12.05L14.325 19H9.5ZM4.825 9.35H7.475C8.25833 9.35 8.84167 9.15833 9.225 8.775C9.625 8.39167 9.825 7.85 9.825 7.15C9.825 6.48333 9.625 5.95833 9.225 5.575C8.84167 5.19167 8.25833 5 7.475 5H4.825V9.35ZM23.2086 19.2C21.8419 19.2 20.6086 18.9083 19.5086 18.325C18.4253 17.7417 17.5669 16.9083 16.9336 15.825C16.3169 14.7417 16.0086 13.475 16.0086 12.025C16.0086 10.5917 16.3253 9.33333 16.9586 8.25C17.5919 7.15 18.4586 6.30833 19.5586 5.725C20.6586 5.14167 21.8919 4.85 23.2586 4.85C24.6253 4.85 25.8586 5.14167 26.9586 5.725C28.0586 6.30833 28.9253 7.15 29.5586 8.25C30.1919 9.33333 30.5086 10.5917 30.5086 12.025C30.5086 13.4583 30.1836 14.725 29.5336 15.825C28.9003 16.9083 28.0253 17.7417 26.9086 18.325C25.8086 18.9083 24.5753 19.2 23.2086 19.2ZM23.2086 15.5C24.0253 15.5 24.7169 15.2 25.2836 14.6C25.8669 14 26.1586 13.1417 26.1586 12.025C26.1586 10.9083 25.8753 10.05 25.3086 9.45C24.7586 8.85 24.0753 8.55 23.2586 8.55C22.4253 8.55 21.7336 8.85 21.1836 9.45C20.6336 10.0333 20.3586 10.8917 20.3586 12.025C20.3586 13.1417 20.6253 14 21.1586 14.6C21.7086 15.2 22.3919 15.5 23.2086 15.5ZM31.9266 12.025C31.9266 10.575 32.2182 9.30833 32.8016 8.225C33.4016 7.14167 34.2266 6.30833 35.2766 5.725C36.3432 5.14167 37.5599 4.85 38.9266 4.85C40.6766 4.85 42.1349 5.30833 43.3016 6.225C44.4849 7.14167 45.2599 8.43333 45.6266 10.1H41.0766C40.6932 9.03333 39.9516 8.5 38.8516 8.5C38.0682 8.5 37.4432 8.80833 36.9766 9.425C36.5099 10.025 36.2766 10.8917 36.2766 12.025C36.2766 13.1583 36.5099 14.0333 36.9766 14.65C37.4432 15.25 38.0682 15.55 38.8516 15.55C39.9516 15.55 40.6932 15.0167 41.0766 13.95H45.6266C45.2599 15.5833 44.4849 16.8667 43.3016 17.8C42.1182 18.7333 40.6599 19.2 38.9266 19.2C37.5599 19.2 36.3432 18.9083 35.2766 18.325C34.2266 17.7417 33.4016 16.9083 32.8016 15.825C32.2182 14.7417 31.9266 13.475 31.9266 12.025ZM56.4383 19L52.1883 13.15V19H47.9133V0.5H52.1883V10.725L56.4133 5.05H61.6883L55.8883 12.05L61.7383 19H56.4383Z"
                  fill="#3D94FF"
                />
              </svg>
            </span>
          </a>

          <a
            href="#"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className="menu-item active">
            <a href="index.html" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </a>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Pages</span>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-dock-top"></i>
              <div data-i18n="Account Settings">Account Settings</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  href="pages-account-settings-account.html"
                  className="menu-link"
                >
                  <div data-i18n="Account">Account</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="pages-account-settings-notifications.html"
                  className="menu-link"
                >
                  <div data-i18n="Notifications">Notifications</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="pages-account-settings-connections.html"
                  className="menu-link"
                >
                  <div data-i18n="Connections">Connections</div>
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
              <div data-i18n="Authentications">Authentications</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  href="auth-login-basic.html"
                  className="menu-link"
                  target="_blank"
                >
                  <div data-i18n="Basic">Login</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="auth-register-basic.html"
                  className="menu-link"
                  target="_blank"
                >
                  <div data-i18n="Basic">Register</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="auth-forgot-password-basic.html"
                  className="menu-link"
                  target="_blank"
                >
                  <div data-i18n="Basic">Forgot Password</div>
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-cube-alt"></i>
              <div data-i18n="Misc">Misc</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="pages-misc-error.html" className="menu-link">
                  <div data-i18n="Error">Error</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="pages-misc-under-maintenance.html"
                  className="menu-link"
                >
                  <div data-i18n="Under Maintenance">Under Maintenance</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default AdminLayout;
