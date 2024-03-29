import "../../styles/css/nav.css";
import logoImg from "../../assets/logo.svg";
import userImg from "../../assets/user.svg";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../utils/auth/authSlice";
// import { catalogue } from "../../utils/catalog";

function Navbar({ setData, noNavMobile, data }) {
  return (
    <>
      <header>
        <nav className={`navbar ${noNavMobile}`}>
          <BrandLogo logo={logoImg} />
          <SearchBar data={data} setData={setData} />
          <NavMenu />
        </nav>
        <MobileNavMenu />
      </header>
    </>
  );
}

function MobileNavMenu() {
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const navBar = document.querySelector(".nav-menu--mobile");
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const screenWidth = window.screen.availWidth;
    if (scrollTop > lastScrollTop && screenWidth <= 768) {
      navBar.classList.contains("hidden")
        ? null
        : navBar.classList.add("hidden");
    } else {
      navBar.classList.contains("hidden")
        ? navBar.classList.remove("hidden")
        : null;
    }
    lastScrollTop = scrollTop;
  });

  return (
    <>
      <section className="nav-menu--mobile">
        <ul className="menu-list">
          <li className="menu-item">
            <a href="#" className="nav-link">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9635 12.6063C9.61561 13.6832 7.90657 14.2031 6.18734 14.0593C4.46812 13.9155 2.86921 13.1189 1.71901 11.833C0.568806 10.5471 -0.045372 8.86965 0.00261415 7.14508C0.0506003 5.42052 0.757107 3.77978 1.97703 2.55986C3.19696 1.33993 4.83769 0.633425 6.56226 0.585439C8.28682 0.537453 9.9643 1.15163 11.2502 2.30183C12.5361 3.45203 13.3327 5.05094 13.4765 6.77017C13.6203 8.4894 13.1004 10.1984 12.0235 11.5463L17.1795 16.7013C17.2531 16.7699 17.3122 16.8527 17.3532 16.9447C17.3942 17.0367 17.4163 17.1361 17.418 17.2368C17.4198 17.3375 17.4013 17.4375 17.3636 17.5309C17.3259 17.6243 17.2697 17.7091 17.1985 17.7803C17.1273 17.8515 17.0424 17.9077 16.9491 17.9454C16.8557 17.9831 16.7556 18.0016 16.6549 17.9999C16.5542 17.9981 16.4549 17.9761 16.3629 17.9351C16.2709 17.8941 16.1881 17.835 16.1195 17.7613L10.9635 12.6063ZM3.03746 11.0443C2.3035 10.3102 1.80361 9.37511 1.60097 8.35705C1.39833 7.339 1.50203 6.28372 1.89897 5.32458C2.29591 4.36544 2.96827 3.5455 3.83107 2.96838C4.69388 2.39126 5.7084 2.08286 6.74643 2.08216C7.78445 2.08147 8.79939 2.3885 9.66297 2.96446C10.5266 3.54042 11.2 4.35945 11.5982 5.31805C11.9965 6.27665 12.1016 7.33179 11.9003 8.35012C11.6991 9.36845 11.2004 10.3043 10.4675 11.0393L10.4625 11.0443L10.4575 11.0483C9.47255 12.0309 8.13788 12.5824 6.74663 12.5817C5.35537 12.5809 4.0213 12.028 3.03746 11.0443Z"
                  fill="black"
                />
              </svg>
              Explore
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="nav-link">
              <svg
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.79197 2.17297C3.13297 2.93097 1.91797 4.73497 1.91797 6.88597C1.91797 9.08297 2.81797 10.777 4.10597 12.229C5.16897 13.425 6.45497 14.417 7.70897 15.383C8.00697 15.613 8.30297 15.842 8.59397 16.071C9.11997 16.486 9.58897 16.849 10.042 17.114C10.494 17.378 10.858 17.499 11.168 17.499C11.478 17.499 11.842 17.379 12.294 17.114C12.747 16.849 13.216 16.486 13.742 16.071C14.032 15.841 14.329 15.613 14.627 15.384C15.881 14.416 17.167 13.425 18.23 12.229C19.519 10.777 20.418 9.08297 20.418 6.88597C20.418 4.73597 19.203 2.93097 17.544 2.17297C15.932 1.43597 13.766 1.63097 11.708 3.76997C11.638 3.84256 11.5541 3.90029 11.4613 3.93973C11.3686 3.97916 11.2688 3.99949 11.168 3.99949C11.0672 3.99949 10.9674 3.97916 10.8746 3.93973C10.7818 3.90029 10.6979 3.84256 10.628 3.76997C8.56997 1.63097 6.40397 1.43597 4.79197 2.17297ZM11.168 2.20897C8.85597 0.13897 6.26697 -0.15103 4.16797 0.80797C1.95397 1.82297 0.417969 4.17497 0.417969 6.88697C0.417969 9.55197 1.52797 11.586 2.98497 13.226C4.15097 14.539 5.57797 15.638 6.83897 16.608C7.12497 16.828 7.40197 17.042 7.66497 17.25C8.17797 17.654 8.72797 18.084 9.28497 18.41C9.84197 18.735 10.478 19 11.168 19C11.858 19 12.494 18.735 13.051 18.41C13.609 18.084 14.158 17.654 14.671 17.25C14.9449 17.0341 15.2202 16.8201 15.497 16.608C16.757 15.638 18.185 14.538 19.351 13.226C20.808 11.586 21.918 9.55197 21.918 6.88697C21.918 4.17497 20.383 1.82297 18.168 0.80997C16.069 -0.15003 13.48 0.13997 11.168 2.20897Z"
                  fill="black"
                  fillOpacity="0.5"
                />
              </svg>
              Wishlist
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="nav-link">
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7354 15.667C16.2177 15.1659 15.7644 14.5915 15.3878 13.9591C14.9766 13.0863 14.7302 12.1331 14.6629 11.1554V8.27596C14.6665 6.7404 14.1534 5.25628 13.2201 4.10245C12.2868 2.94861 10.9975 2.20449 9.59448 2.00988V1.25796C9.59448 1.05158 9.51896 0.853648 9.38454 0.707715C9.25012 0.561782 9.0678 0.479797 8.8777 0.479797C8.6876 0.479797 8.50528 0.561782 8.37086 0.707715C8.23644 0.853648 8.16092 1.05158 8.16092 1.25796V2.02154C6.77046 2.23018 5.49675 2.9788 4.5757 4.12875C3.65466 5.27871 3.1487 6.75207 3.15153 8.27596V11.1554C3.08428 12.1331 2.83785 13.0863 2.42669 13.9591C2.0567 14.59 1.61069 15.1644 1.10052 15.667C1.04325 15.7216 0.997347 15.7889 0.965871 15.8642C0.934395 15.9396 0.918065 16.0214 0.917969 16.1042V16.8969C0.917969 17.0515 0.974536 17.1998 1.07523 17.3091C1.17592 17.4184 1.31248 17.4798 1.45488 17.4798H16.3811C16.5235 17.4798 16.66 17.4184 16.7607 17.3091C16.8614 17.1998 16.918 17.0515 16.918 16.8969V16.1042C16.9179 16.0214 16.9015 15.9396 16.8701 15.8642C16.8386 15.7889 16.7927 15.7216 16.7354 15.667ZM2.03475 16.314C2.5343 15.7901 2.97413 15.203 3.34481 14.5653C3.86273 13.5112 4.16491 12.348 4.23072 11.1554V8.27596C4.20943 7.59283 4.31497 6.91204 4.54108 6.27412C4.76719 5.6362 5.10922 5.0542 5.54683 4.56277C5.98443 4.07135 6.50865 3.68055 7.08827 3.41364C7.66789 3.14674 8.29105 3.0092 8.92065 3.0092C9.55026 3.0092 10.1734 3.14674 10.753 3.41364C11.3327 3.68055 11.8569 4.07135 12.2945 4.56277C12.7321 5.0542 13.0741 5.6362 13.3002 6.27412C13.5263 6.91204 13.6319 7.59283 13.6106 8.27596V11.1554C13.6764 12.348 13.9786 13.5112 14.4965 14.5653C14.8672 15.203 15.307 15.7901 15.8066 16.314H2.03475Z"
                  fill="black"
                  fillOpacity="0.5"
                />
                <path
                  d="M8.70464 19.9998C9.12459 19.9901 9.5276 19.8322 9.84237 19.5541C10.1571 19.2759 10.3634 18.8954 10.4246 18.4798H6.91797C6.98095 18.9067 7.19685 19.2961 7.5255 19.5757C7.85416 19.8553 8.27318 20.006 8.70464 19.9998Z"
                  fill="black"
                  fillOpacity="0.5"
                />
              </svg>
              Notification
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="nav-link">
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.4178 12.075C12.5317 12.075 13.6 11.6325 14.3876 10.8449C15.1753 10.0572 15.6178 8.98896 15.6178 7.87505C15.6178 6.76114 15.1753 5.69285 14.3876 4.9052C13.6 4.11755 12.5317 3.67505 11.4178 3.67505C10.3039 3.67505 9.23558 4.11755 8.44792 4.9052C7.66027 5.69285 7.21777 6.76114 7.21777 7.87505C7.21777 8.98896 7.66027 10.0572 8.44792 10.8449C9.23558 11.6325 10.3039 12.075 11.4178 12.075ZM11.4178 11.025C11.8314 11.025 12.2411 10.9436 12.6232 10.7853C13.0054 10.627 13.3527 10.3949 13.6452 10.1024C13.9377 9.80993 14.1697 9.46268 14.328 9.0805C14.4863 8.69833 14.5678 8.28871 14.5678 7.87505C14.5678 7.46138 14.4863 7.05177 14.328 6.6696C14.1697 6.28742 13.9377 5.94017 13.6452 5.64766C13.3527 5.35516 13.0054 5.12313 12.6232 4.96483C12.2411 4.80653 11.8314 4.72505 11.4178 4.72505C10.5823 4.72505 9.78113 5.05692 9.19039 5.64766C8.59965 6.2384 8.26777 7.03962 8.26777 7.87505C8.26777 8.71048 8.59965 9.5117 9.19039 10.1024C9.78113 10.6932 10.5823 11.025 11.4178 11.025Z"
                  fill="black"
                  fillOpacity="0.5"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.918 10.5C21.918 16.2991 17.2171 21 11.418 21C5.61882 21 0.917969 16.2991 0.917969 10.5C0.917969 4.70085 5.61882 0 11.418 0C17.2171 0 21.918 4.70085 21.918 10.5ZM16.4737 18.4852C14.9622 19.4447 13.2083 19.9529 11.418 19.95C9.58492 19.9528 7.79099 19.42 6.25669 18.417C6.13069 18.2595 6.00259 18.0968 5.87344 17.9287C5.72338 17.7319 5.64238 17.4911 5.64297 17.2436C5.64297 16.6782 6.04932 16.2041 6.59269 16.1248C10.1863 15.5998 12.6606 15.645 16.259 16.1432C16.5196 16.181 16.7577 16.3118 16.9294 16.5114C17.101 16.7111 17.1947 16.9661 17.193 17.2295C17.193 17.4814 17.1063 17.7261 16.9499 17.9172C16.7887 18.1135 16.6296 18.3031 16.4737 18.4852ZM18.2351 17.0446C18.1511 16.0618 17.4051 15.2418 16.4028 15.1032C12.7194 14.5934 10.1448 14.5446 6.44097 15.0859C5.43297 15.2329 4.69009 16.0603 4.60189 17.0457C2.90894 15.2875 1.96463 12.9408 1.96797 10.5C1.96797 5.28097 6.19894 1.05 11.418 1.05C16.637 1.05 20.868 5.28097 20.868 10.5C20.8713 12.9403 19.9274 15.2866 18.2351 17.0446Z"
                  fill="black"
                  fillOpacity="0.5"
                />
              </svg>
              Profile
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

function NavMenu() {
  const [userProfileImg, setProfileImg] = useState(userImg);
  const [isNotified, setNotified] = useState(true);
  const [showNotificationPanel, setNotificationPnanel] = useState(false);
  const [showMenuPanel, setMenuPanel] = useState(false);
  
  const panels = [...document.querySelectorAll(".panel")];
  const hasNotification = isNotified ? "show" : "";
  const showNotification = showNotificationPanel ? "show" : "";
  const showMenu = showMenuPanel ? "show" : "";
  const btnEl = useRef(null);

  const closePanels = () => {
    panels.map((el) => {
      el.classList.remove("show");
    });
  };
  const notifyBtn = () => {
    closePanels();
    setNotificationPnanel(!showNotificationPanel);
  };
  const menuBtn = () => {
    closePanels();
    setMenuPanel(!showMenuPanel);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  const isLogged = user ? (
    <NavMenuListLoggedIn onLogout={onLogout} />
  ) : (
    <NavMenuListLoggedOut />
  );
  
  return (
    <>
      <section className="nav-menu">
        <div className="menu-item">
          <a href="#" className="nav-link">
            Contact Us
          </a>
        </div>
        <div className="menu-item">
          <button
            type="button"
            className="btn-borderless notify-btn"
            onClick={notifyBtn}
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8174 15.1872C15.2997 14.6861 14.8464 14.1117 14.4698 13.4793C14.0586 12.6065 13.8122 11.6533 13.745 10.6756V7.79616C13.7485 6.2606 13.2354 4.77648 12.3021 3.62265C11.3688 2.46882 10.0795 1.72469 8.67651 1.53009V0.778159C8.67651 0.571778 8.60099 0.373851 8.46657 0.227917C8.33215 0.0819844 8.14983 0 7.95973 0C7.76963 0 7.58731 0.0819844 7.45289 0.227917C7.31847 0.373851 7.24295 0.571778 7.24295 0.778159V1.54175C5.85249 1.75038 4.57878 2.499 3.65773 3.64896C2.73669 4.79891 2.23073 6.27228 2.23356 7.79616V10.6756C2.16631 11.6533 1.91988 12.6065 1.50872 13.4793C1.13873 14.1102 0.692722 14.6846 0.18255 15.1872C0.125279 15.2418 0.0793779 15.3091 0.047902 15.3844C0.016426 15.4598 9.65349e-05 15.5416 0 15.6244V16.4171C0 16.5717 0.0565674 16.72 0.157258 16.8293C0.257949 16.9386 0.394515 17 0.536913 17H15.4631C15.6055 17 15.7421 16.9386 15.8427 16.8293C15.9434 16.72 16 16.5717 16 16.4171V15.6244C15.9999 15.5416 15.9836 15.4598 15.9521 15.3844C15.9206 15.3091 15.8747 15.2418 15.8174 15.1872ZM1.11678 15.8342C1.61633 15.3103 2.05616 14.7232 2.42685 14.0855C2.94476 13.0314 3.24694 11.8682 3.31275 10.6756V7.79616C3.29146 7.11303 3.39701 6.43224 3.62311 5.79432C3.84922 5.1564 4.19125 4.5744 4.62886 4.08297C5.06646 3.59155 5.59068 3.20075 6.1703 2.93385C6.74992 2.66695 7.37308 2.5294 8.00268 2.5294C8.63229 2.5294 9.25545 2.66695 9.83507 2.93385C10.4147 3.20075 10.9389 3.59155 11.3765 4.08297C11.8141 4.5744 12.1562 5.1564 12.3823 5.79432C12.6084 6.43224 12.7139 7.11303 12.6926 7.79616V10.6756C12.7584 11.8682 13.0606 13.0314 13.5785 14.0855C13.9492 14.7232 14.389 15.3103 14.8886 15.8342H1.11678Z"
                fill="black"
              />
              <path
                d="M7.78667 19.52C8.20662 19.5103 8.60963 19.3524 8.9244 19.0743C9.23917 18.7961 9.44542 18.4156 9.50667 18H6C6.06298 18.4269 6.27888 18.8163 6.60754 19.0959C6.93619 19.3755 7.35522 19.5262 7.78667 19.52Z"
                fill="black"
              />
            </svg>
            <div className={`notified ${hasNotification}`}></div>
          </button>

          <section
            className={`panel notification-panel ${showNotification}`}
            ref={btnEl}
          >
            <div className="header">
              <h3>Notification</h3>
              <a href="#" className="notificatiion-link--more">
                See more
              </a>
            </div>
            <div className="body">
              <div className="updated_msg">
                <p>You’re all caught up</p>
              </div>
            </div>
          </section>
        </div>
        <div className="menu-item user-profiler">
          <button type="button" className="btn-borderless" onClick={menuBtn}>
            <svg
              width="14"
              height="3"
              viewBox="0 0 14 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 3C1.60218 3 1.22064 2.84196 0.93934 2.56066C0.658035 2.27936 0.5 1.89782 0.5 1.5C0.5 1.10218 0.658035 0.720644 0.93934 0.43934C1.22064 0.158035 1.60218 0 2 0C2.39782 0 2.77936 0.158035 3.06066 0.43934C3.34196 0.720644 3.5 1.10218 3.5 1.5C3.5 1.89782 3.34196 2.27936 3.06066 2.56066C2.77936 2.84196 2.39782 3 2 3ZM7 3C6.60218 3 6.22064 2.84196 5.93934 2.56066C5.65804 2.27936 5.5 1.89782 5.5 1.5C5.5 1.10218 5.65804 0.720644 5.93934 0.43934C6.22064 0.158035 6.60218 0 7 0C7.39782 0 7.77936 0.158035 8.06066 0.43934C8.34196 0.720644 8.5 1.10218 8.5 1.5C8.5 1.89782 8.34196 2.27936 8.06066 2.56066C7.77936 2.84196 7.39782 3 7 3ZM12 3C11.6022 3 11.2206 2.84196 10.9393 2.56066C10.658 2.27936 10.5 1.89782 10.5 1.5C10.5 1.10218 10.658 0.720644 10.9393 0.43934C11.2206 0.158035 11.6022 0 12 0C12.3978 0 12.7794 0.158035 13.0607 0.43934C13.342 0.720644 13.5 1.10218 13.5 1.5C13.5 1.89782 13.342 2.27936 13.0607 2.56066C12.7794 2.84196 12.3978 3 12 3Z"
                fill="#707070"
              />
            </svg>
            <div className="user-avatar">
              <img src={userProfileImg} alt="User profile image" />
            </div>
          </button>

          <section className={`panel user-dropdown ${showMenu}`} ref={btnEl}>
            {isLogged}
          </section>
        </div>
      </section>
    </>
  );
}

function NavMenuListLoggedIn({onLogout}) {
  return (
    <>
      <ul className="menu-list">
        <li className="menu-item">
          <a href="#">Contact us</a>
        </li>
        <li className="menu-item">
          <a href="#">Wishlist</a>
        </li>
        <li className="menu-item">
          <a href="#">Account</a>
        </li>
      </ul>
      <hr />
      <div className="menu-item--extra">
        <a href="#" onClick={onLogout}>Log out</a>
      </div>
    </>
  );
}
function NavMenuListLoggedOut() {
  return (
    <>
      <ul className="menu-list">
        <li className="menu-item">
          <Link to={"/auth/login"}>Log in</Link>
        </li>
        <hr />
        <li className="menu-item">
          <Link to={"/auth/register"}>Register</Link>
        </li>
      </ul>
    </>
  );
}

function SearchBar({ data, setData }) {
  // const [data, getData] = useState("");
  const [searchedData, getSearchedData] = useState("");
  const [searchAddress, getSearchAddress] = useState("");
  const [searchCity, getSearchCity] = useState("");
  const addressInputPlaceholder = searchAddress || "Nearby Hotel";
  const cityInputPlaceholder = searchCity || "Delta";

  useEffect(() => {
    // getData(catalogue);
    searchedData === "" ? "" : setData(searchedData);
  }, [data, searchedData, setData]);

  const addressText = (e) => {
    getSearchAddress(e.target.value);
  };

  const cityText = (e) => {
    getSearchCity(e.target.value);
  };

  const searchData = (e) => {
    e.preventDefault();

    const searchedData = data
      .filter((el) => {
        const searchKeywords = searchAddress.split(/\s+/);
        const similarKeywords = searchKeywords.some((words) =>
          el.tags.includes(words.toLowerCase())
        );
        if (searchCity === "" && searchAddress === "") {
          return true;
        } else if (searchCity !== "" && searchAddress === "") {
          return el.city.toLowerCase() === searchCity.toLowerCase();
        } else if (searchCity !== "") {
          return (
            el.city.toLowerCase() == searchCity.toLowerCase() && similarKeywords
          );
        } else {
          return similarKeywords;
        }
      })
      .map((el, key) => {
        return el;
      });

    getSearchedData(searchedData);
  };

  return (
    <>
      <form onSubmit={searchData} className="search-input--form">
        <button className="btn-borderless filter-btn">
          <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.53488 9.99244C4.53488 9.70788 4.30061 9.47717 4.01163 9.47717H0.523256C0.234272 9.47717 0 9.70788 0 9.99244C0 10.277 0.234272 10.5077 0.523256 10.5077H4.01163C4.30061 10.5077 4.53488 10.277 4.53488 9.99244Z"
              fill="#3E3E3E"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4651 3.14515C10.4651 2.86058 10.6994 2.62988 10.9883 2.62988H14.4767C14.7657 2.62988 15 2.86058 15 3.14515C15 3.42972 14.7657 3.66042 14.4767 3.66042H10.9883C10.6994 3.66042 10.4651 3.42972 10.4651 3.14515Z"
              fill="#3E3E3E"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.9999 9.99244C14.9999 9.70788 14.7656 9.47717 14.4766 9.47717H8.19757C7.9086 9.47717 7.67432 9.70788 7.67432 9.99244C7.67432 10.277 7.9086 10.5077 8.19757 10.5077H14.4766C14.7656 10.5077 14.9999 10.277 14.9999 9.99244Z"
              fill="#3E3E3E"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 3.14515C0 2.86058 0.234272 2.62988 0.523256 2.62988H6.80232C7.0913 2.62988 7.32558 2.86058 7.32558 3.14515C7.32558 3.42972 7.0913 3.66042 6.80232 3.66042H0.523256C0.234272 3.66042 0 3.42972 0 3.14515Z"
              fill="#3E3E3E"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.10456 8.37782C6.97149 8.37782 7.67433 9.06993 7.67433 9.92363C7.67433 10.7773 6.97149 11.4694 6.10456 11.4694C5.2376 11.4694 4.53479 10.7773 4.53479 9.92363C4.53479 9.06993 5.2376 8.37782 6.10456 8.37782ZM8.72084 9.92363C8.72084 8.50073 7.54951 7.34729 6.10456 7.34729C4.65963 7.34729 3.48828 8.50073 3.48828 9.92363C3.48828 11.3465 4.65963 12.5 6.10456 12.5C7.54951 12.5 8.72084 11.3465 8.72084 9.92363Z"
              fill="#3E3E3E"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.89533 1.53053C8.0284 1.53053 7.32556 2.22261 7.32556 3.07633C7.32556 3.93006 8.0284 4.62214 8.89533 4.62214C9.76226 4.62214 10.4651 3.93006 10.4651 3.07633C10.4651 2.22261 9.76226 1.53053 8.89533 1.53053ZM6.27905 3.07633C6.27905 1.65346 7.45038 0.5 8.89533 0.5C10.3403 0.5 11.5116 1.65346 11.5116 3.07633C11.5116 4.49921 10.3403 5.65267 8.89533 5.65267C7.45038 5.65267 6.27905 4.49921 6.27905 3.07633Z"
              fill="#3E3E3E"
            />
          </svg>
        </button>
        <input
          type="search"
          name="search_address"
          id="search_input_address"
          className="search-input--text"
          aria-placeholder={addressInputPlaceholder}
          placeholder={addressInputPlaceholder}
          onChange={addressText}
        />
        <input
          type="search"
          name="search_town"
          id="search_input_town"
          className="search-input--text"
          aria-placeholder={cityInputPlaceholder}
          placeholder={cityInputPlaceholder}
          onChange={cityText}
        />
        <button type="submit" className="search-input--btn btn-borderless">
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.58057 0.5C3.05622 0.5 1 2.55622 1 5.08057C1 7.60492 3.05622 9.66113 5.58057 9.66113C6.6783 9.66113 7.68643 9.27132 8.47652 8.62424L11.2114 11.3592C11.2537 11.4031 11.3042 11.4382 11.3601 11.4624C11.4161 11.4866 11.4763 11.4994 11.5372 11.5C11.5982 11.5006 11.6586 11.4891 11.715 11.466C11.7715 11.443 11.8227 11.4089 11.8658 11.3658C11.9089 11.3227 11.943 11.2715 11.966 11.215C11.9891 11.1586 12.0006 11.0982 12 11.0372C11.9994 10.9763 11.9866 10.9161 11.9624 10.8601C11.9382 10.8042 11.9031 10.7537 11.8592 10.7114L9.12424 7.97652C9.77132 7.18643 10.1611 6.1783 10.1611 5.08057C10.1611 2.55622 8.10492 0.5 5.58057 0.5ZM5.58057 1.41611C7.60981 1.41611 9.24502 3.05132 9.24502 5.08057C9.24502 7.10981 7.60981 8.74502 5.58057 8.74502C3.55132 8.74502 1.91611 7.10981 1.91611 5.08057C1.91611 3.05132 3.55132 1.41611 5.58057 1.41611Z"
              fill="#F7F7F7"
              stroke="#F7F7F7"
            />
          </svg>
        </button>
      </form>
    </>
  );
}

function BrandLogo({ logo }) {
  return (
    <>
      <section className="nav-brand">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="brand-logo" title="Rock Logo" />
        </Link>
      </section>
    </>
  );
}

export default Navbar;
