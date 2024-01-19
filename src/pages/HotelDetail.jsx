import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import noImg from "../assets/no_image.png";
import userImg from "../assets/user.svg";
import {
  amtFormater,
  findReview,
  getCurDateFormat,
  getDateDiff,
  getRatingAvg,
  getRatingDecimal,
  getRatingPercent,
  getStarRating,
  getTimestamp,
  makeArrayToString,
  numToText,
  ratingText,
  sharePage,
} from "../utils/utils";
import Error from "../routes/error/Error";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies, reset } from "../utils/company/companySlice";
import Loader from "../components/Loader";
// import { catalogueItem } from "../utils/catalog";
// import MapComponent from "../utils/Maps";/

function DetailPage() {
  const { placeId } = useParams();
  const [dataset] = useOutletContext();
  const dispatch = useDispatch();
  const { company, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.company
  );
  const [business, setBusiness] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!company) {
      dispatch(getCompanies());
    }

    if (isSuccess) {
      setBusiness(company);
    }
    return () => {
      dispatch(reset());
    };
  }, [company, dispatch, isSuccess, isError, message]);

  if (!dataset || !business) {
    console.log("Still getting the data...");
    return <Loader />;
  }

  const hotel = dataset.find((item) => {
    return placeId === item._id; // Uncomment on push
  });

  const businessData = business.find((item) => {
    return hotel.company === item._id;
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
      <section className="catalogue-detail-section">
        <Header
          title={hotel.title}
          rating={getRatingAvg(hotel.rating)}
          reviews={hotel.review.length}
          isSuperHost={hotel.isSuperHost}
          address={hotel.address}
          hotelName={hotel.name}
          images={hotel.images}
        />
        <Thumbnail images={hotel.images} title={hotel.title} />
        <ItemDetails
          hotelName={hotel.name}
          accomodation={hotel.accomodation}
          company={business}
          about={businessData.about}
          rating={hotel.rating}
          ratingAvg={getRatingAvg(hotel.rating)}
          reviews={hotel.review}
          reviewCount={hotel.review.length}
          rooms={hotel.room}
          pricing={hotel.price}
          pageId={placeId}
          minGuests={hotel.accomodation.guest}
          maxGuests={hotel.accomodation.max_guest}
        />
        <Offers facility={0 ?? hotel.facility} />
        <Rating
          rating={hotel.rating}
          ratingAvg={getRatingAvg(hotel.rating)}
          reviews={hotel.review}
          reviewCount={hotel.review.length}
        />
        <Comments review={hotel.review} />
        {/* <Location /> */}
        <Additional
          isSuperHost={hotel.isSuperHost}
          reviewCount={hotel.review.length}
          ratingAvg={getRatingAvg(hotel.rating)}
          description={hotel.description}
          lang={hotel.language}
          company={businessData}
        />
        <Terms policies={hotel.policy} hotelName={hotel.name} />
      </section>
    </>
  );
}

function Header({
  title,
  rating,
  reviews,
  isSuperHost,
  address,
  hotelName,
  images,
}) {
  const hasSuperHost = isSuperHost ? (
    <li className="catalogue-item--mini item-badge">
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 9.59531C6.98527 9.59531 9 7.55929 9 5.04766C9 2.53606 6.98527 0.5 4.5 0.5C2.01472 0.5 0 2.53606 0 5.04766C0 7.55929 2.01472 9.59531 4.5 9.59531Z"
          fill="#292D32"
        />
        <path
          d="M7.02667 10.0215C7.24667 9.90253 7.5 10.0774 7.5 10.3363V13.7296C7.5 14.3592 7.08 14.6671 6.56 14.4082L4.77333 13.5197C4.62 13.4497 4.38 13.4497 4.22667 13.5197L2.44 14.4082C1.92 14.6601 1.5 14.3522 1.5 13.7226L1.51333 10.3363C1.51333 10.0774 1.77333 9.90952 1.98667 10.0215C2.74 10.4203 3.59333 10.6441 4.5 10.6441C5.40667 10.6441 6.26667 10.4203 7.02667 10.0215Z"
          fill="#292D32"
        />
      </svg>
      Superhost
    </li>
  ) : (
    ""
  );

  const [fave, addFave] = useState(false);
  const isFave = fave ? " active" : "";

  return (
    <>
      <section className="catalogue-detail--header">
        <div className="catalogue-detail-header--container text-field w-80-lg">
          <h1
            className="catalogue-item--name"
            title="Beautiful Hotel on the edge of iterigbi river"
          >
            {title}
          </h1>
          <ul className="catalogue-item--mini_container">
            <li className="catalogue-item--mini item-rating">
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
              {rating}
            </li>
            <li className="catalogue-item--mini item-review">
              {numToText(reviews)} reviews
            </li>
            {hasSuperHost}
            <li className="catalogue-item--mini item-address">{address}</li>
          </ul>
        </div>
        <div className="catalogue-detail-header--container w-20-lg w-100-md">
          <div className="catalogue-item--mini_container baseline">
            <Link to={"/"} className="item-redirect back-btn">
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.70948 16.2945C9.80205 16.3878 9.87535 16.4983 9.92519 16.6199C9.97504 16.7415 10.0005 16.8717 9.99999 17.003C9.99953 17.1344 9.97319 17.2644 9.92249 17.3856C9.87178 17.5068 9.7977 17.6169 9.70448 17.7095C9.61125 17.802 9.50071 17.8753 9.37915 17.9252C9.2576 17.975 9.12742 18.0005 8.99604 18C8.86466 17.9995 8.73466 17.9732 8.61346 17.9225C8.49226 17.8718 8.38224 17.7977 8.28967 17.7045L0.290754 9.70496C0.104528 9.51761 0 9.26417 0 9C0 8.73583 0.104528 8.4824 0.290754 8.29504L8.28967 0.295544C8.38224 0.202311 8.49226 0.128226 8.61346 0.0775172C8.73466 0.0268088 8.86466 0.000470513 8.99604 6.24672e-06C9.12742 -0.000458019 9.2576 0.0249608 9.37915 0.0748114C9.50071 0.124662 9.61125 0.197968 9.70448 0.290544C9.7977 0.38312 9.87178 0.493153 9.92249 0.614361C9.97319 0.735569 9.99953 0.865578 9.99999 0.996965C10.0005 1.12835 9.97504 1.25854 9.92519 1.38011C9.87535 1.50167 9.80205 1.61222 9.70948 1.70546L2.42046 8.995L9.70948 16.2945Z"
                  fill="#3E3E3E"
                />
              </svg>
            </Link>
            <a
              href="#"
              className="item-redirect share-btn"
              onClick={(e) => {
                e.preventDefault();
                sharePage(
                  `${title}`,
                  `${hotelName}: ${title} with a ${rating} rating.`,
                  `${window.location.href}`,
                  `${images[0]}`
                );
              }}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.98376 10.6626L4.68685 7.65381L4.10352 8.64788L9.40042 11.6566L9.98376 10.6626Z"
                  fill="#3E3E3E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.98376 4.33826L4.68685 7.34702L4.10352 6.35295L9.40042 3.34424L9.98376 4.33826Z"
                  fill="#3E3E3E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.45 8.75966C3.15877 8.75966 3.73333 8.19434 3.73333 7.49709C3.73333 6.79976 3.15877 6.23451 2.45 6.23451C1.74123 6.23451 1.16667 6.79976 1.16667 7.49709C1.16667 8.19434 1.74123 8.75966 2.45 8.75966ZM2.45 9.90746C3.8031 9.90746 4.9 8.82823 4.9 7.49709C4.9 6.16587 3.8031 5.08667 2.45 5.08667C1.0969 5.08667 0 6.16587 0 7.49709C0 8.82823 1.0969 9.90746 2.45 9.90746Z"
                  fill="#3E3E3E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5496 10.827C12.2583 10.827 12.8329 11.3923 12.8329 12.0896C12.8329 12.7869 12.2583 13.3522 11.5496 13.3522C10.8408 13.3522 10.2663 12.7869 10.2663 12.0896C10.2663 11.3923 10.8408 10.827 11.5496 10.827ZM11.5496 9.6792C12.9026 9.6792 13.9996 10.7584 13.9996 12.0896C13.9996 13.4208 12.9026 14.5 11.5496 14.5C10.1965 14.5 9.09961 13.4208 9.09961 12.0896C9.09961 10.7584 10.1965 9.6792 11.5496 9.6792Z"
                  fill="#3E3E3E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5496 4.17296C12.2583 4.17296 12.8329 3.60768 12.8329 2.91038C12.8329 2.21307 12.2583 1.6478 11.5496 1.6478C10.8408 1.6478 10.2663 2.21307 10.2663 2.91038C10.2663 3.60768 10.8408 4.17296 11.5496 4.17296ZM11.5496 5.32075C12.9026 5.32075 13.9996 4.24159 13.9996 2.91038C13.9996 1.57916 12.9026 0.5 11.5496 0.5C10.1965 0.5 9.09961 1.57916 9.09961 2.91038C9.09961 4.24159 10.1965 5.32075 11.5496 5.32075Z"
                  fill="#3E3E3E"
                />
              </svg>
              <span>Share</span>
            </a>
            <a
              href="#"
              className={`item-redirect fave-btn ${isFave}`}
              onClick={() => addFave(!fave)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.14239 2.0759L7.5 2.44185L7.85761 2.0759C9.67142 0.219748 12.9139 0.891377 14.077 3.15249C14.6416 4.2503 14.7311 5.77551 13.7835 7.63668C12.854 9.46231 10.9278 11.6007 7.49999 13.8998C4.07216 11.6009 2.14598 9.46265 1.21648 7.63707C0.268884 5.77595 0.35835 4.25071 0.923036 3.15284C2.08611 0.891563 5.32862 0.219786 7.14239 2.0759Z"
                  stroke="#3E3E3E"
                />
              </svg>
              <span>Save</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Thumbnail({ images, title }) {
  return (
    <>
      <section className="catalogue-detail--thumbnail">
        <div className="thumbnail--main">
          <img
            src={images[0]}
            alt={`${title} main preview`}
            title={`${title} main preview`}
          />
        </div>
        <div className="thumbnail--sub_group">
          {images
            .filter((el, key) => key > 0)
            .map((el, key) => {
              return (
                <div key={key} className="thumbnail--sub_container">
                  <img
                    src={el}
                    alt={`${title} sub preview ${key + 1}`}
                    title={`${title} main preview`}
                  />
                </div>
              );
            })}

          <button type="button" className="btn-more-thumbnail">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 1.71429C0.5 1.25963 0.680612 0.823594 1.0021 0.502103C1.32359 0.180612 1.75963 0 2.21429 0H5.64286C6.09751 0 6.53355 0.180612 6.85504 0.502103C7.17653 0.823594 7.35714 1.25963 7.35714 1.71429V5.14286C7.35714 5.59751 7.17653 6.03355 6.85504 6.35504C6.53355 6.67653 6.09751 6.85714 5.64286 6.85714H2.21429C1.75963 6.85714 1.32359 6.67653 1.0021 6.35504C0.680612 6.03355 0.5 5.59751 0.5 5.14286V1.71429ZM9.64286 1.71429C9.64286 1.25963 9.82347 0.823594 10.145 0.502103C10.4665 0.180612 10.9025 0 11.3571 0H14.7857C15.2404 0 15.6764 0.180612 15.9979 0.502103C16.3194 0.823594 16.5 1.25963 16.5 1.71429V5.14286C16.5 5.59751 16.3194 6.03355 15.9979 6.35504C15.6764 6.67653 15.2404 6.85714 14.7857 6.85714H11.3571C10.9025 6.85714 10.4665 6.67653 10.145 6.35504C9.82347 6.03355 9.64286 5.59751 9.64286 5.14286V1.71429ZM0.5 10.8571C0.5 10.4025 0.680612 9.96645 1.0021 9.64496C1.32359 9.32347 1.75963 9.14286 2.21429 9.14286H5.64286C6.09751 9.14286 6.53355 9.32347 6.85504 9.64496C7.17653 9.96645 7.35714 10.4025 7.35714 10.8571V14.2857C7.35714 14.7404 7.17653 15.1764 6.85504 15.4979C6.53355 15.8194 6.09751 16 5.64286 16H2.21429C1.75963 16 1.32359 15.8194 1.0021 15.4979C0.680612 15.1764 0.5 14.7404 0.5 14.2857V10.8571ZM9.64286 10.8571C9.64286 10.4025 9.82347 9.96645 10.145 9.64496C10.4665 9.32347 10.9025 9.14286 11.3571 9.14286H14.7857C15.2404 9.14286 15.6764 9.32347 15.9979 9.64496C16.3194 9.96645 16.5 10.4025 16.5 10.8571V14.2857C16.5 14.7404 16.3194 15.1764 15.9979 15.4979C15.6764 15.8194 15.2404 16 14.7857 16H11.3571C10.9025 16 10.4665 15.8194 10.145 15.4979C9.82347 15.1764 9.64286 14.7404 9.64286 14.2857V10.8571Z"
                fill="#3E3E3E"
              />
            </svg>
            Show all photos
          </button>
        </div>
      </section>
    </>
  );
}

function ItemDetails({
  hotelName,
  accomodation,
  company,
  about,
  rating,
  reviews,
  rooms,
  ratingAvg,
  reviewCount,
  pricing,
  pageId,
  minGuests,
  maxGuests,
}) {
  const [dataset] = useOutletContext();
  const [numGuest, setNumGuest] = useState(0);
  const [dateDiff, setDateDiff] = useState(0);
  const { guest, bed, bedroom, bath } = accomodation;
  const { name, url, imgUrl, contact } = company;
  const fiveStarRating = getStarRating(5, rating, true);
  const fiveCheckInRating = getRatingPercent(
    findReview("frontdesk", reviews, true).length,
    reviews.length
  );

  const orderHistory = JSON.parse(sessionStorage.getItem(`item-${pageId}`));
  let ratingQuote = ratingText(fiveStarRating);
  let reviewQuote = ratingText(fiveCheckInRating);
  let numGuestRender = numGuest === 0 ? 1 : numGuest;
  let dateDiffRender = dateDiff === "NaN" ? 0 : dateDiff;
  let sumTotal = pricing * numGuestRender * dateDiffRender;

  const [formData, setFormData] = useState({
    checkIn: orderHistory?.checkIn ?? "",
    checkOut: orderHistory?.checkOut ?? "",
    days: orderHistory?.days ?? dateDiffRender,
    guests: orderHistory?.guests ?? numGuestRender,
    sumTotal: orderHistory?.sumTotal ?? sumTotal,
    fee: orderHistory?.fee ?? sumTotal * 0.025,
  });
  
  // console.log(dateDiffRender, sumTotal);
  console.log(formData);

  useEffect(()=> {
    setFormData((prevState) => ({
      ...prevState,
      days: dateDiffRender,
      sumTotal,
      fee: sumTotal * 0.025,
    }));
  }, [dateDiffRender, sumTotal])

  useEffect(() => {
    setDateDiff(getDateDiff(formData.checkIn, formData.checkOut));
  }, [formData]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [makeReserve, setReserve] = useState(false);
  const hasReserve = makeReserve ? "show" : "";
  const reserveBlock = makeReserve ? "hide" : "";

  const navigate = useNavigate();

  const createReservation = (e) => {
    e.preventDefault();
    sessionStorage.setItem(`item-${pageId}`, JSON.stringify(formData));
    navigate(`/place/${pageId}/reserve`);
  };

  return (
    <>
      <section className="catalogue-detail--details">
        <div className="catalogue-item-detail w-60-lg w-100-md">
          <div className="catalogue-item-detail--header btm-border">
            <div className="catalogue-item-detail--header_segment w-80-lg w-80-md">
              <h3 className="item-detail-brand">{hotelName}</h3>
              <ul className="item-detail-extra-info">
                <li className="extra-info-item">{guest} guests</li>
                <li className="extra-info-item">{bedroom} bedroom</li>
                <li className="extra-info-item">{bed} bed</li>
                <li className="extra-info-item">{bath} bath</li>
              </ul>
            </div>
            <div className="catalogue-item-detail--header_segment w-20-lg w-20-md">
              <div className="item-brand-logo">
                <img
                  src={noImg}
                  alt={`${hotelName} by ${name}`}
                  title={`${hotelName} by ${name}`}
                  className="brand-logo"
                />
              </div>
            </div>
          </div>
          <div className="catalogue-item-detail_container">
            <div className="catalogue-item-detail--stats btm-border">
              <ul className="detail-stats-list">
                <li className="detail-stats-item">
                  <span>
                    <svg
                      width="20"
                      height="30"
                      viewBox="0 0 20 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9.74497C19 14.5506 14.995 18.4899 10 18.4899C5.00492 18.4899 1 14.5506 1 9.74497C1 4.93946 5.00493 1 10 1C14.995 1 19 4.93946 19 9.74497Z"
                        stroke="#3E3E3E"
                        strokeWidth="2"
                      />
                      <path
                        d="M10.0007 22.7373C12.0183 22.7373 13.9418 22.2914 15.6673 21.4892V28.3489C15.6673 28.8098 15.5126 28.9499 15.483 28.9706L15.4827 28.9708C15.4725 28.978 15.3502 29.0643 15.0112 28.9016L15.0108 28.9015L11.0405 26.9974L11.0257 26.9904L11.0108 26.9838C10.6813 26.8388 10.3176 26.7867 10.0007 26.7867C9.68367 26.7867 9.32005 26.8388 8.99051 26.9838L8.97556 26.9904L8.96084 26.9974L4.99562 28.899C4.65768 29.0557 4.53399 28.9685 4.52103 28.9594L4.52098 28.9594C4.48819 28.9363 4.3344 28.7941 4.33399 28.3357C4.33398 28.3351 4.33398 28.3345 4.33398 28.3339L4.36194 21.4899C6.07388 22.2919 7.98416 22.7373 10.0007 22.7373Z"
                        stroke="#3E3E3E"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <div className="item-detail">
                    <h4>{hotelName}</h4>
                    <p>{about}</p>
                  </div>
                </li>

                <li className="detail-stats-item">
                  <span>
                    <svg
                      width="21"
                      height="28"
                      viewBox="0 0 21 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5198 15.5275C16.6683 17.2533 15.5145 18.9725 14.3348 20.5163C13.2156 21.9716 12.019 23.3657 10.75 24.6925C9.48101 23.3657 8.28436 21.9717 7.16525 20.5163C5.9855 18.9725 4.83175 17.2533 3.98025 15.5275C3.119 13.7839 2.625 12.1508 2.625 10.75C2.625 8.59512 3.48102 6.52849 5.00476 5.00476C6.52849 3.48102 8.59512 2.625 10.75 2.625C12.9049 2.625 14.9715 3.48102 16.4952 5.00476C18.019 6.52849 18.875 8.59512 18.875 10.75C18.875 12.1508 18.3794 13.7839 17.5198 15.5275ZM10.75 27C10.75 27 20.5 17.7603 20.5 10.75C20.5 8.16414 19.4728 5.68419 17.6443 3.85571C15.8158 2.02723 13.3359 1 10.75 1C8.16414 1 5.68419 2.02723 3.85571 3.85571C2.02723 5.68419 1 8.16414 1 10.75C1 17.7603 10.75 27 10.75 27Z"
                        fill="#3E3E3E"
                        stroke="black"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M10.75 14C9.88805 14 9.0614 13.6576 8.4519 13.0481C7.84241 12.4386 7.5 11.612 7.5 10.75C7.5 9.88805 7.84241 9.0614 8.4519 8.4519C9.0614 7.84241 9.88805 7.5 10.75 7.5C11.612 7.5 12.4386 7.84241 13.0481 8.4519C13.6576 9.0614 14 9.88805 14 10.75C14 11.612 13.6576 12.4386 13.0481 13.0481C12.4386 13.6576 11.612 14 10.75 14ZM10.75 15.625C12.0429 15.625 13.2829 15.1114 14.1971 14.1971C15.1114 13.2829 15.625 12.0429 15.625 10.75C15.625 9.45707 15.1114 8.21709 14.1971 7.30285C13.2829 6.38861 12.0429 5.875 10.75 5.875C9.45707 5.875 8.21709 6.38861 7.30285 7.30285C6.38861 8.21709 5.875 9.45707 5.875 10.75C5.875 12.0429 6.38861 13.2829 7.30285 14.1971C8.21709 15.1114 9.45707 15.625 10.75 15.625Z"
                        fill="#3E3E3E"
                        stroke="black"
                        strokeWidth="0.3"
                      />
                    </svg>
                  </span>
                  <div className="item-detail">
                    <h4>{ratingQuote} location</h4>
                    <p>
                      {fiveStarRating}% of recent guests gave the location a
                      5-star rating.
                    </p>
                  </div>
                </li>

                <li className="detail-stats-item">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.7702 0.157727C19.1546 0.439385 20.436 1.09237 21.4765 2.04649C22.5171 3.00061 23.2774 4.21978 23.6758 5.57292C24.0449 6.81362 24.0998 8.12629 23.8355 9.3944C23.4533 11.1318 22.4916 12.6882 21.1078 13.809C19.7241 14.9297 18.0001 15.5483 16.2182 15.5636C15.4663 15.5636 14.7178 15.4556 13.9984 15.238L12.625 16.8454L11.9744 17.1453H10.3005V19.7158L9.44217 20.5727H6.86703V23.1432L6.00865 24H0.858379L0 23.1432V19.1897L0.250647 18.5848L8.7898 10.061C8.54746 9.28186 8.43154 8.46902 8.44645 7.65331C8.46209 6.51207 8.72976 5.38833 9.23038 4.36219C9.73099 3.33605 10.4522 2.43278 11.3426 1.71677C12.2331 1.00077 13.2708 0.489658 14.3818 0.219878C15.4928 -0.0499015 16.6497 -0.0699943 17.7702 0.157727ZM20.0328 12.4961C21.1113 11.6244 21.8613 10.413 22.1599 9.06024L22.1668 9.0688C22.3795 8.07968 22.3412 7.05318 22.0554 6.08257C21.7697 5.11196 21.2455 4.22802 20.5304 3.51105C19.8154 2.79409 18.9323 2.26683 17.9612 1.97719C16.9902 1.68755 15.962 1.6447 14.9701 1.85255C13.6324 2.14892 12.4325 2.88352 11.5614 3.93938C10.6903 4.99523 10.1981 6.31165 10.1632 7.67902C10.146 8.46045 10.2834 9.23503 10.5735 9.9582L10.3847 10.8887L1.71676 19.5445V22.2863H5.15027V19.7158L6.00865 18.859H8.58379V16.2885L9.44217 15.4317H11.5795L13.0834 13.6906L14.0465 13.4507C14.7407 13.7215 15.4797 13.8598 16.2251 13.8585C17.6123 13.8479 18.9548 13.3676 20.0328 12.4961ZM18.5942 7.8144C18.7296 7.62769 18.8258 7.41565 18.8772 7.19096C18.9285 6.96627 18.934 6.73355 18.8931 6.50671C18.8523 6.27988 18.7661 6.06359 18.6396 5.8708C18.5131 5.678 18.3489 5.51266 18.1569 5.38466C17.9649 5.25666 17.749 5.16863 17.5221 5.12585C17.2953 5.08306 17.0621 5.08639 16.8365 5.13565C16.611 5.1849 16.3977 5.27906 16.2095 5.41249C16.0212 5.54593 15.8619 5.7159 15.7409 5.91223C15.5083 6.2899 15.4314 6.74286 15.5263 7.17595C15.6212 7.60904 15.8806 7.98857 16.25 8.23479C16.6193 8.48102 17.0699 8.57478 17.507 8.49639C17.9441 8.418 18.3338 8.17355 18.5942 7.8144Z"
                        fill="#3E3E3E"
                      />
                    </svg>
                  </span>
                  <div className="item-detail">
                    <h4>{reviewQuote} check-in experience</h4>
                    <p>
                      {fiveCheckInRating}% of recent guests gave the check-in
                      process a 5-star rating. <br /> {name} are experienced,
                      highly rated hosts who are committed to providing great
                      stays for guests.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="catalogue-item-detail--info">
              <div className="info-bubble">
                <p className="info-text">
                  <strong>Only {rooms.available} hours left to book.</strong>{" "}
                  The hotel will stop accepting bookings for your dates soon.
                </p>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9704 1.91039C15.6491 1.88667 15.3271 1.87478 15.0049 1.87477V0C15.3734 0.000179654 15.7417 0.0139373 16.1092 0.0412448L15.9704 1.91039ZM19.7277 2.75403C19.1267 2.52213 18.5094 2.33477 17.8809 2.19348L18.2915 0.363705C19.0096 0.524934 19.7164 0.738658 20.4026 1.00487L19.7277 2.75403ZM22.2962 4.08511C22.0282 3.90635 21.7536 3.73751 21.4732 3.57893L22.3975 1.94788C23.0385 2.31109 23.652 2.72089 24.233 3.17398L23.0799 4.65317C22.8258 4.45488 22.5643 4.26602 22.2962 4.08699V4.08511ZM25.7348 7.44094C25.3639 6.91409 24.9547 6.4153 24.5105 5.94863L25.8679 4.65504C26.3741 5.18935 26.8428 5.76115 27.2684 6.36108L25.7348 7.44094ZM27.1297 9.97563C27.0066 9.6784 26.8728 9.38574 26.7284 9.09824L28.4027 8.25459C28.7338 8.91279 29.0158 9.59457 29.2464 10.2943L27.4653 10.8811C27.3645 10.5753 27.2526 10.2733 27.1297 9.97563ZM28.1233 14.6757C28.1082 14.0314 28.0455 13.3891 27.9358 12.754L29.7826 12.4353C29.9082 13.159 29.9813 13.8939 30.0001 14.6288L28.1252 14.6757H28.1233ZM27.8777 17.5591C27.9396 17.2403 27.9902 16.9235 28.0296 16.6029L29.8913 16.8335C29.8013 17.565 29.6571 18.2887 29.4601 18.9989L27.6527 18.4983C27.739 18.189 27.814 17.8759 27.8777 17.5591ZM26.0929 22.0191C26.4378 21.4754 26.7416 20.9055 27.004 20.3168L28.7177 21.0761C28.4177 21.751 28.0708 22.3997 27.6771 23.0221L26.0929 22.0191ZM24.2855 24.2782C24.5142 24.0495 24.7336 23.8133 24.9417 23.5696L26.3628 24.7938C26.1222 25.0728 25.8714 25.3429 25.611 25.6037L24.2855 24.2782Z"
                    fill="#3D94FF"
                  />
                  <path
                    d="M15.0048 1.87477C12.8466 1.87492 10.7217 2.40729 8.81845 3.42471C6.91514 4.44213 5.29213 5.9132 4.09318 7.70763C2.89422 9.50206 2.15632 11.5645 1.94483 13.7121C1.73335 15.8598 2.05481 18.0265 2.88074 20.0203C3.70666 22.0141 5.01157 23.7735 6.67987 25.1426C8.34818 26.5117 10.3284 27.4482 12.4451 27.8693C14.5618 28.2903 16.7497 28.1829 18.815 27.5565C20.8803 26.9301 22.7592 25.8041 24.2854 24.2782L25.6109 25.6037C23.8668 27.3487 21.7192 28.6365 19.3583 29.3532C16.9975 30.0699 14.4963 30.1932 12.0764 29.7122C9.65647 29.2312 7.39257 28.1608 5.48525 26.5958C3.57793 25.0309 2.08609 23.0196 1.1419 20.7403C0.197719 18.461 -0.169657 15.984 0.0723285 13.5288C0.314314 11.0736 1.15819 8.71597 2.52918 6.66483C3.90017 4.61368 5.75596 2.93234 7.9321 1.76978C10.1082 0.607227 12.5376 -0.000653791 15.0048 5.27668e-07V1.87477Z"
                    fill="#3D94FF"
                  />
                  <path
                    d="M14.0673 5.62433C14.3159 5.62433 14.5544 5.72309 14.7302 5.89888C14.906 6.07468 15.0048 6.3131 15.0048 6.56171V16.3292L21.0943 19.8088C21.3039 19.9352 21.4557 20.1386 21.5174 20.3755C21.579 20.6124 21.5455 20.864 21.424 21.0765C21.3026 21.289 21.1028 21.4456 20.8674 21.5128C20.6321 21.58 20.3797 21.5525 20.1644 21.4361L13.6023 17.6866C13.4589 17.6046 13.3396 17.4862 13.2566 17.3433C13.1737 17.2004 13.1299 17.0381 13.1299 16.8729V6.56171C13.1299 6.3131 13.2286 6.07468 13.4045 5.89888C13.5803 5.72309 13.8187 5.62433 14.0673 5.62433Z"
                    fill="#3D94FF"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="catalogue-item--booking w-40-lg w-100-md">
          <form onSubmit={createReservation} className="booking-card">
            <div className="booking-card--header">
              <div className="booking-card-header_title">
                <strong className="amount">N{amtFormater(pricing)}</strong>
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
                  {ratingAvg}
                </li>
                <li className="booking-card-header_rating-item item-review">
                  {`${reviewCount} review${reviewCount > 1 ? "s" : ""}`}
                </li>
              </ul>
            </div>
            <div className={`booking-card--appointment ${hasReserve}`}>
              <div className="booking-card--appointment_check">
                <div className="check-date-selector">
                  <label htmlFor="checkIn">Check-in</label>
                  <input
                    type="date"
                    name="checkIn"
                    id="checkIn"
                    min={getCurDateFormat()}
                    placeholder={getCurDateFormat()}
                    value={formData.checkIn}
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={onChange}
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
                    value={formData.checkOut}
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={onChange}
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
                  min={minGuests}
                  max={maxGuests}
                  className="guest-number-input"
                  placeholder={`${minGuests} guest`}
                  onChange={onChange}
                  value={formData?.guests ?? minGuests}
                  required
                />
              </div>
            </div>
            <div className="booking-card--reserve">
              <div
                className={`mobile-blocker ${reserveBlock}`}
                onClick={() => setReserve(!makeReserve)}
              ></div>
              <button type="submit" className="btn-submit-reserve">
                Reserve
              </button>
            </div>
            <div className={`booking-card--additional ${hasReserve}`}>
              <p className="booking-card--additional_info">
                You won’t be charged yet
              </p>
              <div className="booking-card--additional_quantity btm-border">
                <span className="quantity-label">
                  N {amtFormater(pricing * formData.guests)} x {dateDiffRender}{" "}
                  nights
                </span>
                <span>N {amtFormater(sumTotal, true)}</span>
              </div>
              <div className="booking-card--additional_total">
                <span className="total-label">Total before taxes</span>
                <span>N {amtFormater(sumTotal, true)}</span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Offers({ facility }) {
  if (!facility) {
    return <></>;
  }

  return (
    <>
      <section className="catalogue-detail--offer btm-border">
        <h3 className="item-offer-heading">What this place offers</h3>
        <ul className="item-offer-list w-70-lg w-100-md">
          <li className="offer-list-item">
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97501 22.0367C9.59628 22.3504 9.53386 22.9237 9.83558 23.3174C10.1373 23.711 10.6889 23.7759 11.0676 23.4623L9.97501 22.0367ZM16.0496 20.6582V19.7468C16.0421 19.7468 16.0348 19.7468 16.0274 19.7471L16.0496 20.6582ZM27.1113 21.5696C27.5955 21.5696 27.9881 21.1616 27.9881 20.6582C27.9881 20.1549 27.5955 19.7468 27.1113 19.7468V21.5696ZM11.0676 23.4623C12.493 22.282 14.25 21.6173 16.0718 21.5693L16.0274 19.7471C13.8239 19.8052 11.699 20.609 9.97501 22.0367L11.0676 23.4623ZM16.0496 21.5696H27.1113V19.7468H16.0496V21.5696Z"
                  fill="#3E3E3E"
                />
                <path
                  d="M25.7626 8.82241L26.0507 9.68316L26.0519 9.68274L25.7626 8.82241ZM26.0519 9.68274C26.3568 9.57196 26.6316 9.38685 26.8535 9.14293L25.5795 7.89058C25.55 7.9229 25.5137 7.94741 25.4732 7.96209L26.0519 9.68274ZM26.8535 9.14293C27.0755 8.89901 27.2379 8.60336 27.3272 8.28077L25.6422 7.77639C25.6303 7.81912 25.6088 7.85829 25.5795 7.89058L26.8535 9.14293ZM27.3272 8.28077C27.4166 7.95816 27.4303 7.61799 27.3672 7.28876L25.6474 7.64501C25.6558 7.68862 25.654 7.73368 25.6422 7.77639L27.3272 8.28077ZM27.3672 7.28876C27.304 6.95954 27.166 6.65082 26.9644 6.38847L25.5941 7.52577C25.6209 7.56052 25.6391 7.60141 25.6474 7.64501L27.3672 7.28876ZM26.9644 6.38847C25.3732 4.32188 23.2041 2.81792 20.7573 2.0852L20.2719 3.83674C22.3704 4.46514 24.2294 5.7534 25.5941 7.52577L26.9644 6.38847ZM20.7573 2.0852C18.3103 1.35249 15.705 1.42618 13.2999 2.29615L13.8763 4.01765C15.9389 3.27155 18.1732 3.20835 20.2719 3.83674L20.7573 2.0852ZM13.2999 2.29615C10.8949 3.16611 8.80836 4.78956 7.32759 6.94305L8.75416 8.00298C10.0241 6.15608 11.8136 4.76376 13.8763 4.01765L13.2999 2.29615ZM7.32759 6.94305C5.8468 9.09653 5.04456 11.6742 5.03127 14.3212L6.78477 14.3307C6.79617 12.0605 7.4842 9.84987 8.75416 8.00298L7.32759 6.94305ZM5.03127 14.3212C5.0299 14.6571 5.10602 14.9893 5.25322 15.2882L6.81417 14.4578C6.79467 14.4182 6.7846 14.3751 6.78477 14.3307L5.03127 14.3212ZM5.25322 15.2882C5.40042 15.5872 5.61444 15.8451 5.8773 16.0403L6.89682 14.5573C6.86201 14.5315 6.83367 14.4974 6.81417 14.4578L5.25322 15.2882ZM5.8773 16.0403C6.14017 16.2356 6.44425 16.3626 6.76403 16.4104L7.01428 14.6064C6.97192 14.6001 6.93165 14.5832 6.89682 14.5573L5.8773 16.0403ZM6.76403 16.4104C7.08381 16.4584 7.40999 16.426 7.71522 16.3158L7.14025 14.5939C7.09984 14.6084 7.05663 14.6127 7.01428 14.6064L6.76403 16.4104ZM7.71522 16.3158L26.0507 9.68316L25.4744 7.96166L7.14025 14.5939L7.71522 16.3158Z"
                  fill="#3E3E3E"
                />
                <path
                  d="M17.4098 11.8002C17.23 11.3329 16.7197 11.1055 16.2702 11.2924C15.8206 11.4794 15.6019 12.0097 15.7817 12.477L17.4098 11.8002ZM19.0596 20.9967C19.2394 21.464 19.7496 21.6913 20.1992 21.5044C20.6488 21.3175 20.8675 20.7871 20.6877 20.3198L19.0596 20.9967ZM15.7817 12.477L19.0596 20.9967L20.6877 20.3198L17.4098 11.8002L15.7817 12.477Z"
                  fill="#3E3E3E"
                />
                <path
                  d="M0.984544 26.1334C0.503989 26.0716 0.0662064 26.4264 0.00672995 26.9259C-0.0527466 27.4255 0.288606 27.8806 0.769161 27.9423L0.984544 26.1334ZM6.13742 25.2151L6.7882 24.6043C6.62909 24.4212 6.4053 24.3129 6.168 24.3043C5.93071 24.2957 5.70021 24.3876 5.5292 24.5588L6.13742 25.2151ZM14.0283 25.2151L14.6791 24.6043C14.5129 24.4129 14.2764 24.3037 14.0283 24.3037C13.7802 24.3037 13.5437 24.4129 13.3775 24.6043L14.0283 25.2151ZM21.9191 25.2151L22.5273 24.5588C22.3563 24.3876 22.1259 24.2957 21.8886 24.3043C21.6513 24.3129 21.4275 24.4212 21.2684 24.6043L21.9191 25.2151ZM27.2232 27.9503C27.7043 27.8929 28.0495 27.4411 27.9942 26.9409C27.939 26.4408 27.5042 26.082 27.0232 26.1395L27.2232 27.9503ZM0.769161 27.9423C1.85082 28.0815 2.94873 27.9678 3.98271 27.6095L3.42819 25.8803C2.64194 26.1527 1.80707 26.2392 0.984544 26.1334L0.769161 27.9423ZM3.98271 27.6095C5.01669 27.2513 5.96065 26.6575 6.74565 25.8715L5.5292 24.5588C4.93226 25.1564 4.21445 25.6078 3.42819 25.8803L3.98271 27.6095ZM5.48665 25.8258C6.06723 26.4943 6.77631 27.0288 7.56802 27.3944L8.28017 25.7288C7.71265 25.4666 7.20438 25.0836 6.7882 24.6043L5.48665 25.8258ZM7.56802 27.3944C8.35973 27.7602 9.21647 27.9491 10.0829 27.9491V26.1265C9.46182 26.1265 8.84768 25.991 8.28017 25.7288L7.56802 27.3944ZM10.0829 27.9491C10.9492 27.9491 11.806 27.7602 12.5976 27.3944L11.8856 25.7288C11.318 25.991 10.7039 26.1265 10.0829 26.1265V27.9491ZM12.5976 27.3944C13.3894 27.0288 14.0984 26.4943 14.6791 25.8258L13.3775 24.6043C12.9613 25.0836 12.453 25.4666 11.8856 25.7288L12.5976 27.3944ZM13.3775 25.8258C13.9582 26.4943 14.6672 27.0288 15.4588 27.3944L16.171 25.7288C15.6036 25.4666 15.0953 25.0836 14.6791 24.6043L13.3775 25.8258ZM15.4588 27.3944C16.2506 27.7602 17.1073 27.9491 17.9738 27.9491V26.1265C17.3527 26.1265 16.7386 25.991 16.171 25.7288L15.4588 27.3944ZM17.9738 27.9491C18.8401 27.9491 19.6968 27.7602 20.4886 27.3944L19.7764 25.7288C19.2088 25.991 18.5947 26.1265 17.9738 26.1265V27.9491ZM20.4886 27.3944C21.2802 27.0288 21.9894 26.4943 22.5699 25.8258L21.2684 24.6043C20.8522 25.0836 20.344 25.4666 19.7764 25.7288L20.4886 27.3944ZM21.3109 25.8715C22.096 26.6575 23.0399 27.2513 24.0739 27.6095L24.6283 25.8803C23.8422 25.6078 23.1243 25.1564 22.5273 24.5588L21.3109 25.8715ZM24.0739 27.6095C25.0874 27.9607 26.1623 28.077 27.2232 27.9503L27.0232 26.1395C26.2164 26.2357 25.3991 26.1474 24.6283 25.8803L24.0739 27.6095Z"
                  fill="#3E3E3E"
                />
                <path
                  d="M12.7601 3.45629C12.9192 3.93169 13.4189 4.18304 13.8763 4.01769C14.3336 3.85234 14.5755 3.3329 14.4164 2.85749L12.7601 3.45629ZM13.665 0.612233C13.506 0.136826 13.0063 -0.114523 12.549 0.050829C12.0916 0.216181 11.8498 0.735618 12.0089 1.21102L13.665 0.612233ZM14.4164 2.85749L13.665 0.612233L12.0089 1.21102L12.7601 3.45629L14.4164 2.85749Z"
                  fill="#3E3E3E"
                />
              </svg>
            </span>
            Beach access - Beachfront
          </li>
          <li className="offer-list-item">
            <span>
              <svg
                width="28"
                height="23"
                viewBox="0 0 28 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.67969 18.9156C1.29453 18.9156 1 18.6312 1 18.2594V1.65625C1 1.28437 1.29453 1 1.67969 1H26.6695C27.0547 1 27.3492 1.28437 27.3492 1.65625V18.2594C27.3492 18.6969 27.032 18.9156 26.7148 18.9156H1.67969ZM2.35938 17.7125H26.0352V2.35625H2.35938V17.7125Z"
                  fill="#3E3E3E"
                  stroke="#3E3E3E"
                  strokeWidth="0.6"
                />
                <path
                  d="M20.4613 15.9188C20.0762 15.9188 19.7816 15.6344 19.7816 15.2626C19.7816 14.8907 20.0762 14.6063 20.4613 14.6063H23.1121C23.4973 14.6063 23.7918 14.8907 23.7918 15.2626C23.7918 15.6344 23.4293 15.9188 23.1121 15.9188H20.4613ZM14.1855 21.9782C13.8004 21.9782 13.5059 21.6938 13.5059 21.3219V18.5438C13.5059 18.1719 13.8004 17.8876 14.1855 17.8876C14.5707 17.8876 14.8652 18.1719 14.8652 18.5438V21.3657C14.8426 21.6938 14.548 21.9782 14.1855 21.9782Z"
                  fill="#3E3E3E"
                  stroke="#3E3E3E"
                  strokeWidth="0.6"
                />
                <path
                  d="M8.63477 22.5469C8.24961 22.5469 7.95508 22.2625 7.95508 21.8906C7.95508 21.5187 8.24961 21.2344 8.63477 21.2344H19.759C20.1441 21.2344 20.4387 21.5187 20.4387 21.8906C20.4387 22.2625 20.0762 22.5469 19.759 22.5469H8.63477Z"
                  fill="#3E3E3E"
                  stroke="#3E3E3E"
                  strokeWidth="0.6"
                />
              </svg>
            </span>
            TV
          </li>
          <li className="offer-list-item">
            <span>
              <svg
                width="33"
                height="24"
                viewBox="0 0 33 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.88958 17.6546C6.9795 17.6546 6.07083 17.3217 5.37348 16.6593L5.33225 16.6202C4.3975 15.7328 2.9094 15.7089 1.94408 16.5661C1.71775 16.7673 1.36284 16.7555 1.15124 16.5409C0.939633 16.3261 0.951552 15.989 1.17774 15.7882C2.58758 14.5365 4.76069 14.571 6.1251 15.8667L6.16632 15.9057C7.10108 16.7934 8.58903 16.8172 9.55435 15.9599L9.74815 15.7879C11.1577 14.5362 13.331 14.5709 14.6952 15.8667L14.7365 15.9057C15.6713 16.7934 17.1593 16.8171 18.1246 15.9599L18.3181 15.788C19.7277 14.5365 21.9009 14.5709 23.2655 15.8666L23.3073 15.9063C24.2413 16.7934 25.7296 16.8171 26.6947 15.9598L26.8883 15.7879C28.2981 14.5362 30.4711 14.5707 31.8356 15.8665C32.0548 16.0744 32.0548 16.4117 31.8356 16.6197C31.6167 16.8278 31.2615 16.8277 31.0425 16.6197C30.1079 15.7324 28.6198 15.7088 27.6546 16.5658L27.4611 16.7377C26.0512 17.9893 23.8783 17.9549 22.5137 16.6591L22.4719 16.6195C21.5379 15.7324 20.0497 15.7087 19.0845 16.5659L18.891 16.7378C17.4811 17.9895 15.3082 17.955 13.9436 16.6593L13.9024 16.6202C12.9676 15.7326 11.4797 15.7089 10.5143 16.5661L10.3206 16.7381C9.63162 17.3499 8.75983 17.6545 7.88958 17.6546ZM7.88943 12.7087C6.9795 12.7087 6.07083 12.3759 5.37348 11.7135L5.33225 11.6745C4.3975 10.7869 2.9094 10.7632 1.94408 11.6204C1.71775 11.8214 1.36284 11.8099 1.15124 11.5951C0.939633 11.3803 0.951552 11.0432 1.17774 10.8424C2.58758 9.59074 4.76083 9.62536 6.1251 10.921L6.16632 10.96C6.83633 11.5963 7.791 11.7889 8.63278 11.5309V3.65271C8.63278 2.77735 7.88284 2.06524 6.96099 2.06524H6.91584C5.99398 2.06524 5.24405 2.77735 5.24405 3.65271V4.02448C5.24405 4.31862 4.9929 4.5571 4.68314 4.5571C4.37338 4.5571 4.12223 4.31862 4.12223 4.02448V3.65271C4.12223 2.19 5.37544 1 6.91584 1H6.96099C8.50139 1 9.7546 2.19 9.7546 3.65271V7.79449H15.8292V3.65271C15.8292 2.77735 15.0793 2.06524 14.1575 2.06524H14.1123C13.1906 2.06524 12.4405 2.77735 12.4405 3.65271V4.02448C12.4405 4.31862 12.1894 4.5571 11.8796 4.5571C11.5698 4.5571 11.3187 4.31862 11.3187 4.02448V3.65271C11.3187 2.19 12.5719 1 14.1123 1H14.1575C15.6978 1 16.9511 2.19 16.9511 3.65271V11.5939C17.3759 11.5104 17.783 11.3175 18.1246 11.014L18.3181 10.8423C19.7277 9.59048 21.9011 9.6251 23.2655 10.9208L23.3073 10.9605C24.2413 11.8475 25.7296 11.8713 26.6947 11.014L26.8883 10.8423C28.2981 9.59048 30.4711 9.62523 31.8356 10.9208C32.0548 11.1289 32.0548 11.4661 31.8356 11.6741C31.6167 11.8821 31.2612 11.8821 31.0425 11.6741C30.1079 10.7866 28.6196 10.763 27.6546 11.6203L27.4611 11.7921C26.0511 13.0437 23.878 13.0091 22.5137 11.7135L22.4719 11.6738C21.5379 10.7867 20.0497 10.763 19.0845 11.6203L18.891 11.7922C17.4808 13.0438 15.3079 13.0092 13.9436 11.7136L13.9024 11.6746C12.9676 10.787 11.4797 10.7632 10.5143 11.6204L10.3206 11.7925C9.63148 12.4042 8.75983 12.7087 7.88943 12.7087ZM12.1793 9.92576C13.0892 9.92576 13.9979 10.2585 14.6952 10.921L14.7365 10.96C15.0515 11.2592 15.4296 11.4602 15.8292 11.5624V8.85973H9.7546V10.8364C10.4426 10.2286 11.3115 9.92576 12.1793 9.92576Z"
                  fill="#3E3E3E"
                  stroke="#3E3E3E"
                  strokeWidth="0.5"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.37348 22.0047C6.07083 22.6671 6.9795 23 7.88958 23C8.75983 22.9999 9.63162 22.6953 10.3206 22.0835L10.5143 21.9115C11.4797 21.0543 12.9676 21.078 13.9024 21.9656L13.9436 22.0047C15.3082 23.3004 17.4811 23.3349 18.891 22.0832L19.0845 21.9113C20.0497 21.0541 21.5379 21.0778 22.4719 21.9648L22.5137 22.0045C23.8783 23.3003 26.0512 23.3347 27.4611 22.0831L27.6546 21.9112C28.6198 21.0542 30.1079 21.0778 31.0425 21.9651C31.2615 22.1731 31.6167 22.1732 31.8356 21.9651C32.0548 21.7571 32.0548 21.4198 31.8356 21.2119C30.4711 19.9161 28.2981 19.8816 26.8883 21.1333L26.6947 21.3052C25.7296 22.1624 24.2413 22.1387 23.3073 21.2517L23.2655 21.212C21.9009 19.9163 19.7277 19.8819 18.3181 21.1334L18.1246 21.3053C17.1593 22.1624 15.6713 22.1387 14.7365 21.2511L14.6952 21.2121C13.331 19.9163 11.1577 19.8816 9.74815 21.1333L9.55435 21.3053C8.58903 22.1626 7.10108 22.1387 6.16632 21.2511L6.1251 21.2121C4.76069 19.9164 2.58758 19.8819 1.17774 21.1336C0.951552 21.3344 0.939633 21.6715 1.15124 21.8863C1.36284 22.1009 1.71775 22.1126 1.94408 21.9115C2.9094 21.0543 4.3975 21.0782 5.33225 21.9656L5.37348 22.0047Z"
                  fill="#3E3E3E"
                />
                <path
                  d="M7.88958 23V23.25H7.88961L7.88958 23ZM5.37348 22.0047L5.54566 21.8234L5.54531 21.8231L5.37348 22.0047ZM10.3206 22.0835L10.1546 21.8965L10.1545 21.8966L10.3206 22.0835ZM10.5143 21.9115L10.6803 22.0984L10.6803 22.0984L10.5143 21.9115ZM13.9024 21.9656L13.7302 22.1469L13.7305 22.1472L13.9024 21.9656ZM13.9436 22.0047L14.1158 21.8234L14.1154 21.8231L13.9436 22.0047ZM18.891 22.0832L19.0569 22.2702L19.057 22.2701L18.891 22.0832ZM19.0845 21.9113L18.9185 21.7244L18.9184 21.7244L19.0845 21.9113ZM22.4719 21.9648L22.2998 22.1461L22.2998 22.1461L22.4719 21.9648ZM22.5137 22.0045L22.3416 22.1858L22.3416 22.1858L22.5137 22.0045ZM27.4611 22.0831L27.6271 22.27L27.6271 22.27L27.4611 22.0831ZM27.6546 21.9112L27.4886 21.7242L27.4886 21.7243L27.6546 21.9112ZM31.0425 21.9651L31.2146 21.7838L31.2146 21.7838L31.0425 21.9651ZM31.8356 21.9651L31.6635 21.7838L31.6634 21.7839L31.8356 21.9651ZM31.8356 21.2119L31.6635 21.3931L31.6635 21.3932L31.8356 21.2119ZM26.8883 21.1333L26.7223 20.9463L26.7222 20.9464L26.8883 21.1333ZM26.6947 21.3052L26.8608 21.4921L26.8608 21.4921L26.6947 21.3052ZM23.3073 21.2517L23.4794 21.0704L23.4794 21.0704L23.3073 21.2517ZM23.2655 21.212L23.4376 21.0307L23.4376 21.0307L23.2655 21.212ZM18.3181 21.1334L18.1522 20.9465L18.1521 20.9465L18.3181 21.1334ZM18.1246 21.3053L18.2906 21.4923L18.2907 21.4922L18.1246 21.3053ZM14.7365 21.2511L14.9086 21.0698L14.9083 21.0696L14.7365 21.2511ZM14.6952 21.2121L14.5231 21.3934L14.5234 21.3937L14.6952 21.2121ZM9.74815 21.1333L9.91412 21.3203L9.91414 21.3202L9.74815 21.1333ZM9.55435 21.3053L9.38838 21.1184L9.38835 21.1184L9.55435 21.3053ZM6.16632 21.2511L6.33847 21.0698L6.33816 21.0696L6.16632 21.2511ZM6.1251 21.2121L5.95294 21.3934L5.95326 21.3937L6.1251 21.2121ZM1.17774 21.1336L1.34371 21.3205L1.34372 21.3205L1.17774 21.1336ZM1.15124 21.8863L0.973147 22.0617L0.973202 22.0618L1.15124 21.8863ZM1.94408 21.9115L1.77809 21.7245L1.77798 21.7246L1.94408 21.9115ZM5.33225 21.9656L5.16012 22.1469L5.16042 22.1472L5.33225 21.9656ZM7.88958 22.75C7.03999 22.75 6.194 22.4393 5.54566 21.8234L5.2013 22.1859C5.94765 22.8949 6.91901 23.25 7.88958 23.25V22.75ZM10.1545 21.8966C9.51374 22.4657 8.70188 22.7499 7.88954 22.75L7.88961 23.25C8.81777 23.2499 9.7495 22.925 10.4866 22.2704L10.1545 21.8966ZM10.3484 21.7245L10.1546 21.8965L10.4865 22.2704L10.6803 22.0984L10.3484 21.7245ZM14.0745 21.7844C13.0454 20.8071 11.4105 20.7814 10.3484 21.7245L10.6803 22.0984C11.5488 21.3273 12.8899 21.349 13.7302 22.1469L14.0745 21.7844ZM14.1154 21.8231L14.0742 21.7841L13.7305 22.1472L13.7718 22.1862L14.1154 21.8231ZM18.725 21.8963C17.4119 23.062 15.3859 23.0294 14.1158 21.8234L13.7715 22.1859C15.2304 23.5713 17.5503 23.6078 19.0569 22.2702L18.725 21.8963ZM18.9184 21.7244L18.7249 21.8963L19.057 22.2701L19.2505 22.0982L18.9184 21.7244ZM22.6441 21.7836C21.6156 20.8068 19.9804 20.7812 18.9185 21.7244L19.2505 22.0982C20.1189 21.327 21.4602 21.3487 22.2998 22.1461L22.6441 21.7836ZM22.6859 21.8232L22.6441 21.7836L22.2998 22.1461L22.3416 22.1858L22.6859 21.8232ZM27.2951 21.8961C25.9821 23.0619 23.956 23.0293 22.6859 21.8232L22.3416 22.1858C23.8006 23.5712 26.1204 23.6076 27.6271 22.27L27.2951 21.8961ZM27.4886 21.7243L27.2951 21.8962L27.6271 22.27L27.8206 22.0981L27.4886 21.7243ZM31.2146 21.7838C30.1856 20.8068 28.5506 20.7813 27.4886 21.7242L27.8206 22.0981C28.689 21.3271 30.0302 21.3487 30.8704 22.1464L31.2146 21.7838ZM31.6634 21.7839C31.5411 21.9002 31.3373 21.9003 31.2146 21.7838L30.8703 22.1464C31.1858 22.4459 31.6924 22.4463 32.0079 22.1463L31.6634 21.7839ZM31.6635 21.3932C31.7788 21.5026 31.7788 21.6744 31.6635 21.7838L32.0077 22.1465C32.3308 21.8399 32.3308 21.3371 32.0077 21.0305L31.6635 21.3932ZM27.0542 21.3202C28.3673 20.1545 30.3934 20.1871 31.6635 21.3931L32.0078 21.0306C30.5488 19.6452 28.2289 19.6088 26.7223 20.9463L27.0542 21.3202ZM26.8608 21.4921L27.0543 21.3202L26.7222 20.9464L26.5287 21.1183L26.8608 21.4921ZM23.1351 21.4329C24.1636 22.4097 25.7988 22.4353 26.8608 21.4921L26.5287 21.1183C25.6603 21.8896 24.3191 21.8678 23.4794 21.0704L23.1351 21.4329ZM23.0933 21.3933L23.1351 21.433L23.4794 21.0704L23.4376 21.0307L23.0933 21.3933ZM18.4841 21.3204C19.7969 20.1548 21.8232 20.1872 23.0933 21.3933L23.4376 21.0307C21.9787 19.6453 19.6585 19.609 18.1522 20.9465L18.4841 21.3204ZM18.2907 21.4922L18.4842 21.3203L18.1521 20.9465L17.9586 21.1184L18.2907 21.4922ZM14.5643 21.4324C15.5936 22.4097 17.2285 22.4354 18.2906 21.4923L17.9586 21.1184C17.0901 21.8895 15.7491 21.8678 14.9086 21.0698L14.5643 21.4324ZM14.5234 21.3937L14.5646 21.4327L14.9083 21.0696L14.8671 21.0305L14.5234 21.3937ZM9.91414 21.3202C11.2269 20.1545 13.2532 20.1872 14.5231 21.3934L14.8674 21.0309C13.4087 19.6453 11.0885 19.6087 9.58215 20.9464L9.91414 21.3202ZM9.72032 21.4923L9.91412 21.3203L9.58218 20.9463L9.38838 21.1184L9.72032 21.4923ZM5.99418 21.4324C7.02331 22.4097 8.65818 22.4355 9.72036 21.4923L9.38835 21.1184C8.51988 21.8896 7.17885 21.8678 6.33847 21.0698L5.99418 21.4324ZM5.95326 21.3937L5.99448 21.4327L6.33816 21.0696L6.29694 21.0305L5.95326 21.3937ZM1.34372 21.3205C2.65678 20.1548 4.68297 20.1874 5.95294 21.3934L6.29725 21.0308C4.8384 19.6454 2.51839 19.609 1.01176 20.9466L1.34372 21.3205ZM1.32932 21.7108C1.21882 21.5987 1.22393 21.4269 1.34371 21.3205L1.01177 20.9466C0.679172 21.2419 0.660447 21.7443 0.973147 22.0617L1.32932 21.7108ZM1.77798 21.7246C1.65083 21.8376 1.4472 21.8304 1.32927 21.7108L0.973202 22.0618C1.27848 22.3715 1.78468 22.3877 2.11018 22.0983L1.77798 21.7246ZM5.50438 21.7843C4.47526 20.8073 2.84026 20.7814 1.77809 21.7245L2.11007 22.0984C2.97855 21.3273 4.31973 21.3491 5.16012 22.1469L5.50438 21.7843ZM5.54531 21.8231L5.50409 21.7841L5.16042 22.1472L5.20164 22.1862L5.54531 21.8231Z"
                  fill="#3E3E3E"
                />
              </svg>
            </span>
            Private Pool
          </li>
          <li className="offer-list-item">
            <span>
              <svg
                width="28"
                height="30"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.66667 1C6.92448 1 4.71429 2.99938 4.71429 5.48C4.71429 7.96063 6.92448 9.96 9.66667 9.96C11.502 9.96 13.0859 9.05656 13.942 7.72H21.4286C21.593 7.72438 21.755 7.6675 21.8735 7.5625L23.1116 6.4425C23.2277 6.33531 23.2906 6.18875 23.2857 6.04V4.92C23.2906 4.77125 23.2277 4.62469 23.1116 4.5175L21.8735 3.3975C21.755 3.2925 21.593 3.23563 21.4286 3.24H20.1905C20.026 3.23563 19.864 3.2925 19.7455 3.3975L19.2619 3.835L18.7783 3.3975C18.6598 3.2925 18.4978 3.23563 18.3333 3.24H17.0952C16.9719 3.23781 16.851 3.26844 16.747 3.3275L16.1667 3.6775L15.5863 3.3275C15.4823 3.26844 15.3614 3.23781 15.2381 3.24H13.942C13.0859 1.90344 11.502 1 9.66667 1ZM9.66667 2.12C11.7535 2.12 13.381 3.59219 13.381 5.48C13.381 7.36781 11.7535 8.84 9.66667 8.84C7.5798 8.84 5.95238 7.36781 5.95238 5.48C5.95238 3.59219 7.5798 2.12 9.66667 2.12ZM8.42857 4.36C7.74423 4.36 7.19048 4.86094 7.19048 5.48C7.19048 6.09906 7.74423 6.6 8.42857 6.6C9.11291 6.6 9.66667 6.09906 9.66667 5.48C9.66667 4.86094 9.11291 4.36 8.42857 4.36ZM14.4643 4.36H15.0446L15.8185 4.8325C16.0288 4.96156 16.3045 4.96156 16.5149 4.8325L17.2887 4.36H18.0625L18.817 5.0425C18.933 5.15188 19.0951 5.21313 19.2619 5.21313C19.4288 5.21313 19.5908 5.15188 19.7068 5.0425L20.4613 4.36H21.1577L22.0476 5.165V5.795L21.1577 6.6H14.4643C14.5658 6.24125 14.619 5.86719 14.619 5.48C14.619 5.09281 14.5658 4.71875 14.4643 4.36ZM8.23512 11.08C6.99702 11.08 5.86533 11.7669 5.39137 12.8125C5.38895 12.8212 5.37444 12.8212 5.37202 12.83L3.55357 16.68H2.85714C1.8391 16.68 1 17.4391 1 18.36C1 19.2809 1.8391 20.04 2.85714 20.04V27.32C2.85714 28.2409 3.69624 29 4.71429 29H6.57143C7.58947 29 8.42857 28.2409 8.42857 27.32V26.76H19.5714V27.32C19.5714 28.2409 20.4105 29 21.4286 29H23.2857C24.3038 29 25.1429 28.2409 25.1429 27.32V20.04C26.1609 20.04 27 19.2809 27 18.36C27 17.4391 26.1609 16.68 25.1429 16.68H24.4464L22.628 12.83C22.6256 12.8212 22.611 12.8212 22.6086 12.8125C22.1347 11.7669 21.003 11.08 19.7649 11.08H8.23512ZM8.23512 12.2H19.7649C20.4976 12.2 21.1916 12.6287 21.4673 13.25L21.4866 13.2675L23.2277 16.96L22.628 17.3275V17.345C22.1153 17.6688 21.5664 17.8 20.9256 17.8H7.07441C6.43359 17.8 5.88467 17.6688 5.37202 17.345V17.3275L4.77232 16.96L6.51339 13.2675L6.53274 13.25C6.80841 12.6287 7.50242 12.2 8.23512 12.2ZM2.85714 17.8H3.90179L4.6756 18.2725V18.255H4.69494C5.41797 18.7078 6.23531 18.92 7.07441 18.92H20.9256C21.7647 18.92 22.582 18.7078 23.3051 18.255C23.3099 18.2528 23.3196 18.2572 23.3244 18.255V18.2725L24.0982 17.8H25.1429C25.4862 17.8 25.7619 18.0494 25.7619 18.36C25.7619 18.6706 25.4862 18.92 25.1429 18.92H23.9048V25.64H4.09524V18.92H2.85714C2.51377 18.92 2.2381 18.6706 2.2381 18.36C2.2381 18.0494 2.51377 17.8 2.85714 17.8ZM7.5 20.6C6.31027 20.6 5.33333 21.4837 5.33333 22.56C5.33333 23.6362 6.31027 24.52 7.5 24.52C8.68973 24.52 9.66667 23.6362 9.66667 22.56C9.66667 21.4837 8.68973 20.6 7.5 20.6ZM20.5 20.6C19.3103 20.6 18.3333 21.4837 18.3333 22.56C18.3333 23.6362 19.3103 24.52 20.5 24.52C21.6897 24.52 22.6667 23.6362 22.6667 22.56C22.6667 21.4837 21.6897 20.6 20.5 20.6ZM7.5 21.72C8.04167 21.72 8.42857 22.07 8.42857 22.56C8.42857 23.05 8.04167 23.4 7.5 23.4C6.95833 23.4 6.57143 23.05 6.57143 22.56C6.57143 22.07 6.95833 21.72 7.5 21.72ZM20.5 21.72C21.0417 21.72 21.4286 22.07 21.4286 22.56C21.4286 23.05 21.0417 23.4 20.5 23.4C19.9583 23.4 19.5714 23.05 19.5714 22.56C19.5714 22.07 19.9583 21.72 20.5 21.72ZM4.09524 26.76H7.19048V27.32C7.19048 27.6306 6.91481 27.88 6.57143 27.88H4.71429C4.37091 27.88 4.09524 27.6306 4.09524 27.32V26.76ZM20.8095 26.76H23.9048V27.32C23.9048 27.6306 23.6291 27.88 23.2857 27.88H21.4286C21.0852 27.88 20.8095 27.6306 20.8095 27.32V26.76Z"
                  fill="#3E3E3E"
                  stroke="black"
                  strokeWidth="0.3"
                />
              </svg>
            </span>
            Free parking on premises
          </li>
          <li className="offer-list-item">
            <span>
              <svg
                width="27"
                height="21"
                viewBox="0 0 27 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3672 11.6693C21.094 11.6703 20.8302 11.5657 20.6291 11.3764C18.6288 9.54323 16.0381 8.52943 13.353 8.52943C10.668 8.52943 8.07721 9.54323 6.07697 11.3764C5.96625 11.4777 5.83709 11.5557 5.69687 11.606C5.55665 11.6562 5.40813 11.6777 5.25983 11.669C5.1115 11.6604 4.9663 11.622 4.83251 11.5559C4.69873 11.4897 4.579 11.3974 4.48016 11.2839C4.28569 11.0513 4.18785 10.7502 4.20757 10.4448C4.22728 10.1394 4.36296 9.85403 4.58561 9.64976C6.99217 7.43315 10.1153 6.2066 13.353 6.2066C16.5908 6.2066 19.7139 7.43315 22.1204 9.64976C22.3431 9.85403 22.4788 10.1394 22.4984 10.4448C22.5181 10.7502 22.4204 11.0513 22.2259 11.2839C22.1158 11.4042 21.9828 11.5005 21.8351 11.5668C21.6876 11.633 21.5284 11.668 21.3672 11.6693Z"
                  fill="black"
                />
                <path
                  d="M25.3592 7.36786C25.0745 7.36643 24.8006 7.25651 24.5909 7.05956C21.5457 4.08883 17.4999 2.43163 13.2927 2.43163C9.08555 2.43163 5.0398 4.08883 1.9945 7.05956C1.89081 7.18573 1.76196 7.28776 1.61658 7.35878C1.47121 7.42984 1.31267 7.46822 1.15161 7.47146C0.990538 7.47454 0.830676 7.44248 0.682729 7.37726C0.534783 7.31198 0.402187 7.21511 0.29383 7.09312C0.185458 6.97114 0.10384 6.82684 0.0544439 6.66993C0.00503309 6.51301 -0.0110107 6.34709 0.00739786 6.18331C0.0257913 6.01952 0.0782 5.86165 0.161099 5.7203C0.244012 5.57894 0.355488 5.45737 0.488069 5.36373C3.94649 2.01108 8.529 0.142517 13.2927 0.142517C18.0563 0.142517 22.6389 2.01108 26.0974 5.36373C26.2622 5.51993 26.3777 5.72287 26.4292 5.94661C26.4809 6.17036 26.4661 6.40474 26.3869 6.61984C26.3076 6.83495 26.1676 7.02102 25.9845 7.15426C25.8015 7.28749 25.5838 7.36188 25.3592 7.36786Z"
                  fill="black"
                />
                <path
                  d="M9.3606 16.0629C9.18519 16.0629 9.01221 16.0212 8.85533 15.9408C8.69844 15.8607 8.56198 15.7441 8.45674 15.6004C8.36576 15.4797 8.29934 15.3416 8.26139 15.1942C8.22344 15.0468 8.21475 14.8931 8.23581 14.7423C8.25687 14.5914 8.30728 14.4463 8.38403 14.3158C8.46078 14.185 8.56235 14.0716 8.68271 13.9817C10.0125 12.9403 11.6404 12.376 13.315 12.376C14.9895 12.376 16.6174 12.9403 17.9472 13.9817C18.0659 14.0728 18.166 14.187 18.2416 14.3176C18.3171 14.4482 18.3668 14.593 18.3879 14.7433C18.4088 14.8936 18.4007 15.0465 18.3638 15.1937C18.327 15.3408 18.2622 15.479 18.1732 15.6004C17.9911 15.8425 17.7237 16.002 17.4283 16.0452C17.1329 16.0884 16.8325 16.0117 16.5915 15.8317C15.6496 15.0978 14.4987 14.7003 13.315 14.7003C12.1312 14.7003 10.9802 15.0978 10.0385 15.8317C9.84147 15.9789 9.60454 16.0597 9.3606 16.0629Z"
                  fill="black"
                />
                <path
                  d="M13.3076 20.8575C13.0079 20.8575 12.7205 20.7357 12.5087 20.5188C12.2967 20.302 12.1777 20.0079 12.1777 19.7012C12.1777 19.3946 12.2967 19.1004 12.5087 18.8837C12.7205 18.6668 13.0079 18.545 13.3076 18.545C13.6072 18.545 13.8946 18.6668 14.1064 18.8837C14.3184 19.1004 14.4374 19.3946 14.4374 19.7012C14.4374 20.0079 14.3184 20.302 14.1064 20.5188C13.8946 20.7357 13.6072 20.8575 13.3076 20.8575Z"
                  fill="black"
                />
              </svg>
            </span>
            Wifi
          </li>
          <li className="offer-list-item">
            <span>
              <svg
                width="31"
                height="27"
                viewBox="0 0 31 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2296 27C11.0978 27 11.0187 26.9745 10.9133 26.9234C10.4388 26.6172 8.19813 25.0095 10.0697 21.8195C10.5706 20.9518 10.7024 20.2628 10.5179 19.7013C10.307 19.0633 9.6216 18.8081 9.6216 18.8081C9.30527 18.6805 9.14711 18.3233 9.27891 18.017C9.38435 17.7618 9.59524 17.6087 9.85884 17.6087C9.93793 17.6087 10.017 17.6342 10.0961 17.6597C10.2015 17.6597 11.3087 18.1191 11.7568 19.2675C12.0995 20.1862 11.915 21.258 11.2032 22.4575C9.8852 24.7032 11.2823 25.6985 11.5723 25.8771C11.8622 26.0302 11.9677 26.413 11.8095 26.7193C11.6514 26.9234 11.4141 27 11.2296 27ZM15.5 25.6474C15.3682 25.6474 15.2891 25.6219 15.1837 25.5709C14.2347 25.035 12.8903 23.3762 14.3929 20.7732C14.841 19.982 14.9728 19.344 14.7883 18.8592C14.6037 18.2977 13.9974 18.0681 13.9974 18.0681C13.6548 17.9405 13.4966 17.6087 13.6284 17.2769C13.7338 17.0217 13.9447 16.8686 14.2083 16.8686C14.2874 16.8686 14.3665 16.8941 14.4456 16.9197C14.7092 17.0217 15.6318 17.4301 16.0009 18.4509C16.3172 19.3185 16.159 20.3138 15.5 21.4112C14.2347 23.6059 15.7636 24.4991 15.8427 24.5246C15.9745 24.6011 16.0799 24.7287 16.1327 24.8819C16.1854 25.035 16.159 25.2136 16.0799 25.3667C15.9218 25.5709 15.6845 25.6474 15.5 25.6474ZM6.7483 25.6474C6.6165 25.6474 6.53742 25.6219 6.43197 25.5709C5.48299 25.035 4.13861 23.3762 5.64116 20.7732C6.08929 19.982 6.22109 19.344 6.03657 18.8592C5.85204 18.2977 5.24575 18.0681 5.24575 18.0681C4.90306 17.9405 4.7449 17.6087 4.8767 17.2769C4.98214 17.0217 5.19303 16.8686 5.45663 16.8686C5.53571 16.8686 5.6148 16.8941 5.69388 16.9197C5.95748 17.0217 6.8801 17.4556 7.24915 18.4509C7.56548 19.3185 7.38095 20.3138 6.7483 21.4367C5.48299 23.6314 7.01191 24.5246 7.09099 24.5501C7.22279 24.6267 7.32823 24.7543 7.38095 24.9074C7.43367 25.0605 7.40731 25.2391 7.32823 25.3923C7.19643 25.5709 6.93282 25.6474 6.7483 25.6474ZM22.8019 23.3762C22.591 23.3762 22.4328 23.2996 22.301 23.172C22.1692 23.0444 22.0901 22.8658 22.0901 22.6871C22.0901 22.4064 22.2747 22.1512 22.5383 22.0236H22.5646V20.6456L21.2202 21.3856V21.4112C21.2202 21.6153 21.1412 21.8705 20.8776 21.9981C20.7721 22.0747 20.6403 22.1002 20.5085 22.1002C20.2449 22.1002 20.0077 21.9726 19.9022 21.7684C19.7968 21.5898 19.7704 21.4112 19.8231 21.2325C19.8759 21.0539 19.9813 20.9008 20.1658 20.8242C20.2713 20.7476 20.4031 20.7221 20.5085 20.7221C20.6403 20.7221 20.7721 20.7476 20.8776 20.8242L22.0901 20.1607L20.9039 19.4972C20.7457 19.5482 20.6139 19.5737 20.5085 19.5737C20.3767 19.5737 20.2713 19.5482 20.1658 19.4972C19.8495 19.293 19.7177 18.8592 19.9022 18.5529C20.034 18.3488 20.2713 18.2212 20.5349 18.2212C20.6667 18.2212 20.7985 18.2467 20.9039 18.3233C21.1148 18.4509 21.2466 18.655 21.2466 18.9102V18.9357L22.591 19.6758V18.2977H22.5646C22.301 18.1701 22.1165 17.9149 22.1165 17.6342C22.1165 17.2514 22.4328 16.9452 22.8282 16.9452C23.0391 16.9452 23.2236 17.0217 23.3554 17.1493C23.4872 17.2769 23.5663 17.4556 23.5663 17.6342C23.5663 17.8639 23.4345 18.0936 23.1973 18.2212H23.1182V19.5482L24.2781 18.9102V18.8847C24.2781 18.6805 24.3571 18.4253 24.6207 18.2977C24.7262 18.2212 24.858 18.1957 24.9898 18.1957C25.2534 18.1957 25.4906 18.3233 25.5961 18.5274C25.7015 18.7061 25.7279 18.8847 25.6752 19.0633C25.6224 19.242 25.517 19.3951 25.3325 19.4716C25.227 19.5482 25.0952 19.5737 24.9898 19.5737C24.858 19.5737 24.7262 19.5482 24.6207 19.4716L23.4082 20.1352L24.5944 20.7987C24.7526 20.7476 24.8844 20.7221 24.9898 20.7221C25.1216 20.7221 25.227 20.7476 25.3325 20.7987C25.6488 21.0028 25.7806 21.4367 25.5961 21.7429C25.4643 21.9471 25.227 22.0747 24.9634 22.0747C24.8316 22.0747 24.6998 22.0492 24.5944 21.9726C24.3835 21.845 24.2517 21.6408 24.2517 21.3856V21.3601L23.1182 20.7476V22.0747H23.1446C23.3818 22.1768 23.5136 22.4064 23.5136 22.6616C23.5136 23.0699 23.1973 23.3762 22.8019 23.3762ZM3.61139 15.3119C1.60799 15.3119 0 13.7552 0 11.8157V3.49622C0 1.55671 1.60799 0 3.61139 0H27.3886C29.392 0 31 1.55671 31 3.49622V11.8157C31 13.7552 29.392 15.3119 27.3886 15.3119H3.61139ZM3.24235 1.53119C2.29337 1.53119 1.52891 2.29679 1.52891 3.26654V12.1474C1.52891 13.0917 2.29337 13.8828 3.24235 13.8828H27.7313C28.6803 13.8828 29.4447 13.1172 29.4447 12.1474V3.26654C29.4447 2.32231 28.6803 1.53119 27.7313 1.53119H3.24235ZM3.95408 11.4839C3.61139 11.4839 3.32143 11.2032 3.32143 10.8715C3.32143 10.5397 3.61139 10.259 3.95408 10.259H26.4396C26.7823 10.259 27.0723 10.5397 27.0723 10.8715C27.0723 11.2032 26.7823 11.4839 26.4396 11.4839H3.95408ZM3.95408 8.90643C3.61139 8.90643 3.32143 8.62571 3.32143 8.29395C3.32143 7.96219 3.61139 7.68148 3.95408 7.68148H26.4396C26.7823 7.68148 27.0723 7.96219 27.0723 8.29395C27.0723 8.62571 26.7823 8.90643 26.4396 8.90643H3.95408Z"
                  fill="black"
                />
              </svg>
            </span>
            Air conditioning
          </li>
        </ul>
        <div className="item-offer-btn--container w-30-lg w-100-md">
          <button
            type="button"
            className="btn-more-thumbnail btn-normal w-100-md"
          >
            Show all {facility.length} facilities
          </button>
        </div>
      </section>
    </>
  );
}

function Rating({ rating, ratingAvg, reviews, reviewCount }) {
  const reviewTotal = reviewCount;
  const reviewTotalText = numToText(reviewTotal);
  const ratingObj = [
    {
      type: "communication",
      value: findReview("communication", reviews, true).length,
      reviews: reviewTotal,
    },
    {
      type: "clean",
      value: findReview("clean", reviews, true).length,
      reviews: reviewTotal,
    },
    {
      type: "location",
      value: findReview("location", reviews, true).length,
      reviews: reviewTotal,
    },
    {
      type: "checkin",
      value: findReview("frontdesk", reviews, true).length,
      reviews: reviewTotal,
    },
    {
      type: "accuracy",
      value: findReview("accuracy", reviews, true).length,
      reviews: reviewTotal,
    },
    {
      type: "value",
      value: findReview("value", reviews, true).length,
      reviews: reviewTotal,
    },
  ];
  return (
    <>
      <section className="catalogue-detail-rating">
        <h3 className="rating-heading">
          <span>
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6246 16.9195C10.8537 16.774 11.1463 16.774 11.3754 16.9195L16.3742 20.0954C16.9002 20.4296 17.5679 19.9616 17.433 19.3531L16.0817 13.2556C16.0274 13.0109 16.1082 12.7559 16.2934 12.5869L20.8235 8.45599C21.2737 8.0455 21.0209 7.29572 20.4141 7.24153L14.518 6.71497C14.2559 6.69157 14.0292 6.52323 13.9309 6.2792L11.6493 0.61271C11.4139 0.0279777 10.5861 0.0279773 10.3507 0.61271L8.06911 6.2792C7.97085 6.52323 7.74406 6.69157 7.48203 6.71497L1.58589 7.24153C0.979083 7.29572 0.726331 8.0455 1.17649 8.45599L5.70656 12.5869C5.89179 12.7559 5.97256 13.0109 5.91832 13.2556L4.56698 19.3531C4.43214 19.9616 5.09977 20.4296 5.62577 20.0954L10.6246 16.9195Z"
                fill="black"
              />
            </svg>
          </span>
          {ratingAvg} &bull; {reviewTotalText} reviews
        </h3>
        <ul className="item-rating-list">
          {ratingObj.map((el, key) => {
            return (
              <RatingItem
                key={key}
                type={el.type}
                value={el.value}
                reviews={el.reviews}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

function RatingItem({ type, value, reviews }) {
  let ratingType = "";
  switch (type) {
    case "communication":
      ratingType = "Communication";
      break;
    case "clean":
      ratingType = "Cleanliness";
      break;
    case "location":
      ratingType = "Location";
      break;
    case "checkin":
      ratingType = "Check-In";
      break;
    case "accuracy":
      ratingType = "Accuracy";
      break;
    case "value":
      ratingType = "Value";
      break;

    default:
      break;
  }

  const ratingValue = getRatingDecimal(value, reviews);
  const ratingPercent = getRatingPercent(value, reviews);

  return (
    <>
      <li className="rating-item">
        <h6 className="rating-item--title">{ratingType}</h6>
        <div className="rating-loader">
          <div className="rating-loader--bar">
            <div
              className="loader--bar-fill"
              style={{ width: `${ratingPercent}%` }}
            ></div>
          </div>
          {ratingValue}
        </div>
      </li>
    </>
  );
}

function Comments({ review }) {
  const reviewCount = numToText(review.length);
  if (review.length === 0) {
    return <></>;
  }
  return (
    <>
      <section className="catalogue-detail--comments btm-border">
        <ul className="people-review-list">
          {review
            .filter((el, key) => key <= 5)
            .map((el, key) => {
              const output =
                key != 5 ? (
                  <li key={key} className="people-review-item">
                    <div className="item-header">
                      <div className="user-image">
                        <img src={userImg} alt="" title="" />
                      </div>
                      <div className="user-info">
                        <h6 className="user-info--name">{el.name}</h6>
                        <time className="user-info--timestamp">
                          {getTimestamp(el.timestamp)}
                        </time>
                      </div>
                    </div>
                    <p className="user-comment" title="User comment">
                      {el.message}
                    </p>
                  </li>
                ) : (
                  <li className="people-review-item next-btn-container">
                    <button
                      type="button"
                      className="btn-more-thumbnail btn-normal w-100-md"
                    >
                      Show all {reviewCount} reviews
                    </button>
                  </li>
                );

              return output;
            })}
        </ul>
      </section>
    </>
  );
}

function Location() {
  // const map = React.memo(MapComponent);
  return (
    <>
      <section className="catalogue-detail--location btm-border">
        <h3 className="location-header">Hotel located at</h3>
        <p className="location-header--sub" title="location: ">
          Delta sate, iterigbi
        </p>

        <div className="map-container">{/* {map} */}</div>
      </section>
    </>
  );
}

function Additional({
  isSuperHost,
  reviewCount,
  ratingAvg,
  description,
  lang,
  company,
}) {
  const { name, url, imgUrl, contact, regDate, isVerified } = company;
  const { phone, email } = contact;
  const hasSuperhost = isSuperHost ? (
    <li className="achievement-item">
      <span>
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 9.59531C6.98527 9.59531 9 7.55929 9 5.04766C9 2.53606 6.98527 0.5 4.5 0.5C2.01472 0.5 0 2.53606 0 5.04766C0 7.55929 2.01472 9.59531 4.5 9.59531Z"
            fill="#292D32"
          />
          <path
            d="M7.02667 10.0215C7.24667 9.90253 7.5 10.0774 7.5 10.3363V13.7296C7.5 14.3592 7.08 14.6671 6.56 14.4082L4.77333 13.5197C4.62 13.4497 4.38 13.4497 4.22667 13.5197L2.44 14.4082C1.92 14.6601 1.5 14.3522 1.5 13.7226L1.51333 10.3363C1.51333 10.0774 1.77333 9.90952 1.98667 10.0215C2.74 10.4203 3.59333 10.6441 4.5 10.6441C5.40667 10.6441 6.26667 10.4203 7.02667 10.0215Z"
            fill="#292D32"
          />
        </svg>
      </span>
      Superhost
    </li>
  ) : (
    ""
  );
  const hasVerified = isVerified ? (
    <li className="achievement-item">
      <span>
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.21234 1.41996C6.08846 0.193347 7.91149 0.193347 8.78768 1.41996L8.92718 1.61524C9.08132 1.83112 9.34026 1.94671 9.60389 1.91742L10.2256 1.84833C11.6249 1.69287 12.8071 2.87516 12.6517 4.27437L12.5826 4.8961C12.5533 5.15976 12.6689 5.41865 12.8848 5.57285L13.0801 5.71234C14.3066 6.58846 14.3066 8.41149 13.0801 9.28768L12.8848 9.42718C12.6689 9.58132 12.5533 9.84026 12.5826 10.1039L12.6517 10.7256C12.8071 12.1249 11.6249 13.3071 10.2256 13.1517L9.60389 13.0826C9.34026 13.0533 9.08132 13.1689 8.92718 13.3848L8.78768 13.5801C7.91149 14.8066 6.08853 14.8066 5.21234 13.5801L5.07285 13.3848C4.91865 13.1689 4.65976 13.0533 4.39609 13.0826L3.77437 13.1517C2.37516 13.3071 1.19287 12.1249 1.34833 10.7256L1.41742 10.1039C1.44671 9.84026 1.33112 9.58132 1.11524 9.42718L0.91996 9.28768C-0.306653 8.41149 -0.306653 6.58853 0.91996 5.71234L1.11524 5.57285C1.33112 5.41865 1.44671 5.15976 1.41742 4.89609L1.34833 4.27437C1.19287 2.87516 2.37516 1.69287 3.77437 1.84833L4.3961 1.91742C4.65976 1.94671 4.91865 1.83112 5.07285 1.61524L5.21234 1.41996ZM9.71468 5.51762C10.0006 5.8036 10.0006 6.26728 9.71468 6.55323L6.91814 9.34977C6.55895 9.70903 5.97649 9.70903 5.6173 9.34977L4.28533 8.01781C3.99936 7.73185 3.99936 7.26817 4.28533 6.98221C4.57132 6.69625 5.03497 6.69625 5.32095 6.98221L6.26772 7.92899L8.67908 5.51762C8.96504 5.23165 9.42872 5.23165 9.71468 5.51762Z"
            fill="#323232"
          />
        </svg>
      </span>
      Identity verified
    </li>
  ) : (
    ""
  );
  return (
    <>
      <section className="catalogue-detail--additional">
        <div className="additional-header">
          <img src={noImg} alt="" className="brand-logo" />
          <div className="company-info">
            <h3 className="company-info--name">{name}</h3>
            <h6 className="company-info--established">
              Joined in {getTimestamp(regDate)}
            </h6>
          </div>
        </div>
        <div className="additional-context">
          <div className="additional-context--extra">
            <ul className="additional-context--achievements">
              <li className="achievement-item">
                <span>
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
                </span>
                {ratingAvg}
              </li>
              <li className="achievement-item">{`${reviewCount} review${
                reviewCount > 1 ? "s" : ""
              }`}</li>
              {hasVerified}
              {hasSuperhost}
            </ul>
            <p>{description}</p>
          </div>
          <div className="additional-context--info">
            <ul className="info-list">
              <li className="info-list-item">
                Languages: {makeArrayToString(lang)}
              </li>
              <li className="info-list-item">Response rate: 100%</li>
              <li className="info-list-item">Response time: within an hour</li>
            </ul>
          </div>
          <div className="additional-context--experience">
            <h6 className="experience-heading">During your stay</h6>
            <ul>
              <li>24/7 full management</li>
            </ul>
          </div>
          <div className="additional-context--contact">
            <Link to={url}>
              <button
                type="button"
                className="btn-more-thumbnail btn-normal w-100-md"
              >
                Contact Hotel
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Terms({ policies, hotelName }) {
  const { rules, safety, cancellation } = policies;

  const outputRule =
    rules === true ? (
      <li className="policy-list-item">
        <h6 className="policy-list-item--heading">House rules</h6>
        <ul className="policy-list-item--mini_list">
          {rules.map((el, key) => {
            return (
              <>
                <PolicyItem key={key} text={el} />
              </>
            );
          })}
        </ul>
      </li>
    ) : (
      ""
    );

  const outputSafety = safety ? (
    <li className="policy-list-item">
      <h6 className="policy-list-item--heading">Safety & Property</h6>
      <ul className="policy-list-item--mini_list">
        {safety.map((el, key) => {
          return (
            <>
              <PolicyItem key={key} text={el} />
            </>
          );
        })}
      </ul>
    </li>
  ) : (
    ""
  );

  const outputCancel = cancellation ? (
    <li className="policy-list-item">
      <h6 className="policy-list-item--heading">Cancellation policy</h6>
      <ul className="policy-list-item--mini_list">
        {cancellation.map((el, key) => {
          return (
            <>
              <PolicyItem key={key} text={el} />
            </>
          );
        })}
      </ul>
    </li>
  ) : (
    ""
  );
  return (
    <>
      <section className="catalogue-detail--terms">
        <h3 className="terms-heading">{hotelName}</h3>
        <ul className="policy-list">
          {outputRule}
          {outputSafety}
          {outputCancel}
        </ul>
      </section>
    </>
  );
}

function PolicyItem({ text }) {
  return (
    <>
      <li className="policy-list-item--mini_list_item">{text}</li>
    </>
  );
}

export default DetailPage;
