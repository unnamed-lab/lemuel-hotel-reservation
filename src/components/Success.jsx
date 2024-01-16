import { Link, useNavigate } from "react-router-dom";

function Success() {
  return (
    <>
      <section className="component">
        <div className="component-container">
          <span className="icon">
            <svg
              width="181"
              height="181"
              viewBox="0 0 181 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="90.5" cy="90.5" r="90.5" fill="#3D94FF" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M128.301 61.1002C128.841 61.5634 129.285 62.1286 129.607 62.7634C129.929 63.3982 130.122 64.0903 130.177 64.8C130.231 65.5097 130.145 66.2232 129.924 66.8996C129.702 67.5761 129.349 68.2022 128.886 68.7423L85.5498 119.304C85.0639 119.871 84.4661 120.331 83.7939 120.656C83.1217 120.981 82.3896 121.163 81.6436 121.192C80.8976 121.22 80.1537 121.094 79.4587 120.822C78.7637 120.549 78.1325 120.136 77.6048 119.608L52.3255 94.3266C51.3392 93.3044 50.7939 91.9357 50.8069 90.5153C50.8199 89.0949 51.3902 87.7364 52.395 86.7325C53.3999 85.7285 54.7588 85.1594 56.1791 85.1477C57.5995 85.1361 58.9676 85.6828 59.9888 86.6701L81.1367 107.812L120.666 61.6925C121.602 60.6032 122.931 59.9296 124.362 59.8199C125.794 59.7102 127.21 60.1661 128.301 61.1002Z"
                fill="white"
              />
            </svg>
          </span>
          <h1>Booked successfully </h1>
          <p>A confirmation email will be sent to you shortly</p>

          <p className="redirect">
            <Link to={"/"}>back home</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Success;
