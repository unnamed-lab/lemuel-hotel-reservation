import { useParams } from "react-router-dom";
import { catalogues } from "../utils/catalog";
import Error from "../routes/error/Error";
import { amtFormater, getCurDateFormat } from "../utils/utils";

function Reservation() {
  const { placeId } = useParams();
  const hotel = catalogues.find((item) => {
    return parseInt(placeId) === item.id;
  });

  if (!hotel) {
    return (
      <>
        <Error />
      </>
    );
  }
  return (
    <>
      <section className="reservation-section">
        <div className="reservation-section--nav">
          <button type="button" className="reservation-section--nav_redirect">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2504 14L4.89419 8.35C4.79113 8.25654 4.7334 8.13088 4.7334 8C4.7334 7.86912 4.79113 7.74346 4.89419 7.65L11.2504 2"
                stroke="#222222"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <h3 className="reservation-section--nav_header">
            complete reservation
          </h3>
        </div>
        <div className="reservation-section--body">
          <div className="reservation-section--body_detail w-50-lg w-100-md">
            <div className="info-bubble">
              <p className="info-text">
                <strong className="fill">Good price</strong> Your dates are $27
                less than the avg. nightly rate over the last 3 months.
              </p>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_127_5602)">
                  <path
                    d="M17.0331 0.666626C17.8563 0.666482 18.6504 0.970915 19.2625 1.52129L19.3905 1.64263L30.8618 13.1146C31.2207 13.4736 31.4297 13.9555 31.4464 14.4629C31.4631 14.9702 31.2863 15.4648 30.9518 15.8466L30.8618 15.9426L18.6091 28.1953C18.3251 28.4795 17.962 28.6715 17.5672 28.7464C17.1724 28.8213 16.7642 28.7757 16.3958 28.6153L12.1158 31.1553C11.2518 31.6673 10.1505 31.4566 9.51981 30.6646L9.44314 30.5626L9.36447 30.4386L1.39581 16.6973C0.963575 15.9517 0.836939 15.0676 1.04247 14.2306L3.33247 4.89063L3.33314 3.99996C3.33319 3.14098 3.66484 2.31519 4.25891 1.69477C4.85299 1.07436 5.66364 0.707239 6.52181 0.669959L6.66647 0.666626H17.0331ZM3.33314 10.4886L2.33714 14.5486C2.22543 15.0038 2.2771 15.4837 2.48314 15.9046L2.54981 16.0286L10.5031 29.7446L10.5498 29.8193C10.6466 29.9564 10.7914 30.0519 10.9555 30.0869C11.1196 30.1219 11.2909 30.0937 11.4351 30.008L15.2998 27.714L4.30914 16.724C3.7271 16.1417 3.38111 15.3647 3.33781 14.5426L3.33314 14.3666V10.4886ZM17.0331 1.99996H6.66647C6.15633 1.99993 5.66546 2.19484 5.2943 2.54482C4.92314 2.89479 4.69974 3.37336 4.66981 3.88263L4.66647 3.99996V14.3666C4.66637 14.8515 4.8424 15.3199 5.16181 15.6846L5.25247 15.7806L16.7238 27.2533C16.8386 27.3681 16.9913 27.437 17.1534 27.4472C17.3154 27.4574 17.4755 27.4081 17.6038 27.3086L17.6665 27.2533L29.9198 15C30.0346 14.8852 30.1035 14.7324 30.1137 14.5704C30.1239 14.4084 30.0746 14.2482 29.9751 14.12L29.9198 14.0573L18.4465 2.58596C18.0717 2.21102 17.5633 2.00025 17.0331 1.99996ZM9.33314 4.66663C9.86357 4.66663 10.3723 4.87734 10.7474 5.25241C11.1224 5.62749 11.3331 6.13619 11.3331 6.66663C11.3331 7.19706 11.1224 7.70577 10.7474 8.08084C10.3723 8.45591 9.86357 8.66663 9.33314 8.66663C8.80271 8.66663 8.294 8.45591 7.91893 8.08084C7.54385 7.70577 7.33314 7.19706 7.33314 6.66663C7.33314 6.13619 7.54385 5.62749 7.91893 5.25241C8.294 4.87734 8.80271 4.66663 9.33314 4.66663ZM9.33314 5.99996C9.15633 5.99996 8.98676 6.0702 8.86174 6.19522C8.73671 6.32025 8.66647 6.48982 8.66647 6.66663C8.66647 6.84344 8.73671 7.01301 8.86174 7.13803C8.98676 7.26305 9.15633 7.33329 9.33314 7.33329C9.50995 7.33329 9.67952 7.26305 9.80455 7.13803C9.92957 7.01301 9.99981 6.84344 9.99981 6.66663C9.99981 6.48982 9.92957 6.32025 9.80455 6.19522C9.67952 6.0702 9.50995 5.99996 9.33314 5.99996Z"
                    fill="#3D94FF"
                  />
                  <path
                    d="M17.0373 3.33325H6.66667C6.50338 3.33327 6.34578 3.39322 6.22375 3.50173C6.10173 3.61023 6.02377 3.75975 6.00467 3.92192L6 3.99992V14.3706C5.99999 14.5171 6.04825 14.6596 6.13733 14.7759L6.19533 14.8426L17.1987 25.8459L28.5127 14.5319L17.5087 3.52859C17.4051 3.4251 17.2704 3.35857 17.1253 3.33925L17.0373 3.33325Z"
                    fill="#3D94FF"
                    fillOpacity="0.2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_127_5602">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="reservation-section--body_summary w-50-lg w-100-md">
            <form  className="booking-card">
              <div className="booking-card--header">
                <div className="booking-card-header_title">
                  <strong className="amount">N{amtFormater(10000)}</strong>
                  /night
                </div>
                <ul className="booking-card-header_rating">
                  <li className="booking-card-header_rating-item item-rating">
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.24498 10.9028C7.40221 10.8096 7.59779 10.8096 7.75502 10.9028L11.1212 12.8989C11.5008 13.124 11.9647 12.7827 11.8627 12.3533L10.9757 8.61786C10.9323 8.43506 10.9951 8.24335 11.1381 8.12158L14.0845 5.61391C14.4232 5.32565 14.2452 4.77182 13.802 4.73488L9.9063 4.41017C9.72237 4.39484 9.56184 4.27942 9.48873 4.10995L7.9591 0.564213C7.78542 0.161621 7.21458 0.161621 7.0409 0.564213L5.51127 4.10995C5.43816 4.27942 5.27763 4.39484 5.0937 4.41017L1.19803 4.73488C0.754811 4.77182 0.5768 5.32565 0.915492 5.61391L3.86187 8.12158C4.00494 8.24335 4.06768 8.43506 4.02427 8.61786L3.13729 12.3533C3.03533 12.7827 3.49916 13.124 3.87879 12.8989L7.24498 10.9028Z"
                        fill="black"
                      />
                    </svg>
                    3.2
                  </li>
                  <li className="booking-card-header_rating-item item-review">
                    {`${2} reviews`}
                  </li>
                </ul>
              </div>
              <div className={`booking-card--appointment =`}>
                <div className="booking-card--appointment_check">
                  <div className="check-date-selector">
                    <label htmlFor="checkIn">Check-in</label>
                    <input
                      type="date"
                      name="checkIn"
                      id="checkIn"
                      min={getCurDateFormat()}
                      placeholder={getCurDateFormat()}
                      // value={}
                      pattern="\d{4}-\d{2}-\d{2}"
                      required
                    />
                  </div>
                  <div className="check-date-selector">
                    <label htmlFor="checkOut">Checkout</label>
                    <input
                      type="date"
                      name="checkOut"
                      id="checkOut"
                      min={getCurDateFormat(1)}
                      placeholder={getCurDateFormat(1)}
                      // value={}
                      pattern="\d{4}-\d{2}-\d{2}"
                      required
                    />
                  </div>
                </div>
                <div className="booking-card--appointment_guest">
                  <label htmlFor="guestCount">Guests</label>
                  <input
                    type="number"
                    name="guests"
                    id="guestCount"
                    min={0}
                    defaultValue={0}
                    className="guest-number-input"
                    placeholder="0 guest"
                    required
                  />
                </div>
              </div>
              <div className="booking-card--reserve">
                <button type="submit" className="btn-submit-reserve">
                  Reserve
                </button>
              </div>
              <div className={`booking-card--additional`}>
                <p className="booking-card--additional_info">
                  You won’t be charged yet
                </p>
                <div className="booking-card--additional_quantity btm-border">
                  <span className="quantity-label">
                    N 10K x 1 nights
                  </span>
                  <span>N 10K</span>
                </div>
                <div className="booking-card--additional_total">
                  <span className="total-label">Total before taxes</span>
                  <span>N 10K</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reservation;
