import { Outlet } from "react-router-dom";
import Navbar from "./Navigation";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import "../../styles/css/main.css";
import { catalogue } from "../../utils/catalog";
import { ScrollToTop } from "../../utils/component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { getHotels, reset } from "../../utils/hotel/hotelSlice";
import { toast } from "react-toastify";

function AppLayout({ layout = true, footer = true }) {
  const [dataset, setData] = useState(false); // Uncomment on push
  // const [dataset, setData] = useState(catalogue); // For offline tests
  const [searchedData, setSearchData] = useState("");
  const [output, setOutput] = useState("");
  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    days: "",
    guests: "",
    sumTotal: "",
  });
  
  console.log("Booking Data: ", booking);
  useEffect(() => {
    searchedData !== "" ? setOutput(searchedData) : setOutput(dataset);
  }, [dataset, searchedData]);
  console.log(output)

  const dispatch = useDispatch();
  const { hotels, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.hotel
  );


  useEffect(() => {
    if (isError) toast.error(message);
    if (!dataset) {
      dispatch(getHotels());
    }
    if (isSuccess && hotels) {
      setData(hotels);
    }

    return () => {
      dispatch(reset());
    };
  }, [hotels, dataset, dispatch, isSuccess, isError, message]);


  if (isLoading) {
    return <Loader />;
  }
  const layoutSwitch = layout ? (
    <NormalLayout
      footerType={footer}
      dataset={output}
      setData={setSearchData}
      booking={booking}
      setBooking={setBooking}
    />
  ) : (
    <DetailLayout
      footerType={footer}
      dataset={output}
      setData={setSearchData}
      booking={booking}
      setBooking={setBooking}
    />
  );

  return <>{layoutSwitch}</>;
}

function NormalLayout({ footerType, dataset, setData, booking, setBooking }) {
  return (
    <>
      <InfoBanner />
      <Navbar setData={setData} data={dataset} />
      <Outlet context={[dataset, booking, setBooking]} />
      <Footer footerType={footerType} />
      <ToastContainer />
    </>
  );
}

function DetailLayout({ footerType, dataset, setData, booking, setBooking }) {
  return (
    <>
      <ScrollToTop />
      <Navbar noNavMobile={"no-nav-mobile"} setData={setData} />
      <Outlet context={[dataset, booking, setBooking]} />
      <Footer footerType={footerType} />
      <ToastContainer />
    </>
  );
}

function InfoBanner() {
  const [isDisplayed, setDisplay] = useState(true);
  const elShow =
    isDisplayed && sessionStorage.getItem("info_banner") !== "false"
      ? "show"
      : "";

  useEffect(() => {
    !isDisplayed ? sessionStorage.setItem("info_banner", false) : null;
  }, [isDisplayed]);

  const closeBtn = () => {
    setDisplay(false);
  };
  return (
    <>
      <section className={`info-banner ${elShow}`}>
        <p className="info-text">Hey, where are you booking? </p>
        <button className="icon-btn" onClick={closeBtn}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 0C3.7995 0 0 3.7995 0 8.5C0 13.2005 3.7995 17 8.5 17C13.2005 17 17 13.2005 17 8.5C17 3.7995 13.2005 0 8.5 0ZM12.75 11.5515L11.5515 12.75L8.5 9.6985L5.4485 12.75L4.25 11.5515L7.3015 8.5L4.25 5.4485L5.4485 4.25L8.5 7.3015L11.5515 4.25L12.75 5.4485L9.6985 8.5L12.75 11.5515Z"
              fill="#FF385C"
            />
          </svg>
        </button>
      </section>
    </>
  );
}

export default AppLayout;
