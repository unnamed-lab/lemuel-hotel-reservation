import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import Error from "../routes/error/Error";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies, reset } from "../utils/company/companySlice";
import Loader from "../components/Loader";
import {
  amtFormater,
  getDateTimestamp,
  getMonthTimestamp,
  getRatingAvg,
  quoteFormater,
} from "../utils/utils";
// import { amtFormater, getCurDateFormat } from "../utils/utils";

function Reservation() {
  const { placeId } = useParams();
  const [dataset] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.company
  );

  const booking = JSON.parse(sessionStorage.getItem(`item-${placeId}`));
  console.log(booking);

  if (!dataset) {
    console.log("Still getting the data...");
    return <Loader />;
  }
  const hotel = dataset.find((item) => {
    return placeId === item._id;
  });

  if (!hotel) {
    return (
      <>
        <Error />
      </>
    );
  }

  const submitReserve = () => {
    navigate(`/place/${placeId}/reserve/success`);
  };

  return (
    <>
      <section className="reservation-section">
        <BookingNav pageId={placeId} navigate={navigate} />
        <div className="reservation-section--body">
          <div className="reservation-section--body_detail w-50-lg w-100-md">
            <BookingBubble booking={booking} />
            <div className="reservation-body--container btm-border">
              <h3 className="reservation-body--header">Your Stay</h3>
              <div className="reservation-body--sub_container">
                <div className="sub-container_segment">
                  <h6 className="segment-header">Dates</h6>
                  <p className="segment-info">
                    {`${getDateTimestamp(booking.checkIn, true)}`}
                    {` - ${getDateTimestamp(booking.checkOut, true)}`}
                    {/* Dec 15 – 22 */}
                  </p>
                </div>
                {/* <div className="sub-container_segment aln-left">
                  <a href="#" className="property-edit">
                    Edit
                  </a>
                </div> */}
              </div>
              <div className="reservation-body--sub_container">
                <div className="sub-container_segment">
                  <h6 className="segment-header">Guests</h6>
                  <p className="segment-info">
                    {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                  </p>
                </div>
                {/* <div className="sub-container_segment aln-left">
                  <a href="#" className="property-edit">
                    Edit
                  </a>
                </div> */}
              </div>
            </div>
            <div className="reservation-body--container">
              <h3 className="reservation-body--header">Choose how to pay</h3>
              <ul className="reservation-body--sub">
                <li className="reservation-body--sub_container selector ">
                  <div className="sub-container_segment">
                    <h6 className="segment-header">Pay with card</h6>
                    <p className="segment-info">
                      Pay the total (N{quoteFormater(booking.sumTotal, true)}).
                    </p>
                  </div>
                  <div className="sub-container_segment aln-left">
                    <div className="input-radio-group">
                      <label
                        htmlFor="btn1"
                        className="reserve-radio-icon"
                      ></label>
                      <input
                        type="radio"
                        className="reserve-radio-btn"
                        name="paymentType"
                        id="btn1"
                        defaultChecked
                      />
                    </div>
                  </div>
                </li>
                <li className="reservation-body--sub_container selector ">
                  <div className="sub-container_segment">
                    <h6 className="segment-header">Pay with bank</h6>
                    <p className="segment-info">
                      interest-free.{" "}
                      <a href="#" className="property-edit">
                        More info
                      </a>
                    </p>
                  </div>
                  <div className="sub-container_segment aln-left">
                    <div className="input-radio-group">
                      <label
                        htmlFor="btn2"
                        className="reserve-radio-icon"
                      ></label>
                      <input
                        type="radio"
                        className="reserve-radio-btn"
                        name="paymentType"
                        id="btn2"
                      />
                    </div>
                  </div>
                </li>
                <li className="reservation-body--sub_container selector">
                  <div className="sub-container_segment">
                    <h6 className="segment-header">Pay at hotel</h6>
                    <p className="segment-info">
                      Interest may apply.
                      <a href="#" className="property-edit">
                        More info
                      </a>
                    </p>
                  </div>
                  <div className="sub-container_segment aln-left">
                    <div className="input-radio-group">
                      <label
                        htmlFor="btn3"
                        className="reserve-radio-icon"
                      ></label>
                      <input
                        type="radio"
                        className="reserve-radio-btn"
                        name="paymentType"
                        id="btn3"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="reservation-section--body_summary w-50-lg w-100-md">
            <form className="booking-card">
              <BookingThumbnail hotel={hotel} />
              <BookingCard booking={booking} />
              <div className="booking-card--order">
                <button
                  onClick={submitReserve}
                  type="submit"
                  className="btn-submit-reserve"
                >
                  Reserve
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function BookingCard({ booking }) {
  const overAllSum = booking.sumTotal + booking.fee;
  return (
    <>
      <div className={`booking-card--additional order`}>
        <div className="booking-card--additional_quantity_summary">
          <span className="quantity-label">
            N {quoteFormater(booking.sumTotal / booking.days)} x{" "}
            {booking.days} nights
          </span>
          <span>N {amtFormater(booking.sumTotal, true)}</span>
        </div>
        <div className="booking-card--additional_quantity_summary">
          <span className="quantity-label">Weekly stay discount</span>
          <span className="discount">N 0.00</span>
        </div>
        <div className="booking-card--additional_quantity_summary btm-border">
          <span className="quantity-label">Rock service fee</span>
          <span>N {quoteFormater(booking.fee)}</span>
        </div>
        <div className="booking-card--additional_total">
          <span className="total-label">Total(NGN)</span>
          <span>N {quoteFormater(overAllSum)}</span>
        </div>
      </div>
    </>
  );
}

function BookingNav({pageId, navigate}) {
  return (
    <>
      <div className="reservation-section--nav">
        <button
          type="button"
          className="reservation-section--nav_redirect"
          onClick={() => navigate(`/place/${pageId}`)}
        >
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
    </>
  );
}

function BookingBubble({ booking }) {
  return (
    <>
      <div className="info-bubble">
        <p className="info-text">
          <strong className="fill">Good price</strong> Your dates are N
          {quoteFormater(
            (booking.sumTotal * (booking.days / 120)).toFixed(0) * 0.005
          )}{" "}
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
    </>
  );
}

function BookingThumbnail({ hotel }) {
  return (
    <>
      <div className="booking-card--thumbnail">
        <div className="booking-card--thumbnail_section">
          <div className="thumbnail-container">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              title={hotel.title}
              aria-description={hotel.description}
            />
          </div>
        </div>
        <div className="booking-card--thumbnail_section">
          <div className="booking-card-header_subtitle">
            <p>Overview</p>
            <h6>{hotel.name}</h6>
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
              {getRatingAvg(hotel.rating)}
            </li>
            <li className="booking-card-header_rating-item item-review">
              {`${hotel.review.length} reviews`}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Reservation;
