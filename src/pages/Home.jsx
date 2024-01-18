/* eslint-disable react/prop-types */
import { useOutletContext } from "react-router-dom";
import "../styles/css/app.css";
import { useEffect, useRef, useState } from "react";
import CatalogueItem from "../components/layout/Catalogue";
import { amtFormater, getRatingAvg, numToText, sortData } from "../utils/utils";
import FilterIcon from "../utils/icons/FilterIcon";
import { hotelCategory } from "../utils/hotelcategory";

function Home() {
  const [dataset] = useOutletContext();
  const [data, setOutput] = useState(dataset);
  useEffect(() => {
    setOutput(dataset);
  }, [dataset]);

  return (
    <>
      <main>
        <CategoryCarousel data={dataset} setOutput={setOutput} />
        <Catalogue data={data} />
      </main>
    </>
  );
}

function CategoryCarousel({ data, setOutput }) {
  let currentIndex = 0;
  const carouselBody = useRef(null);
  const carouselItems = useRef(null);

  useEffect(() => {
    carouselBody.current = document.querySelector(".carousel-box-list");
    carouselItems.current = document.querySelectorAll(".box-item");
  }, []);

  function updateCarousel() {
    const itemWidth = carouselItems.current[0].clientWidth + 26;
    // console.log(`${-currentIndex * itemWidth}px`);
    carouselBody.current.style.transform = `translateX(${
      -currentIndex * itemWidth
    }px)`;
  }

  function nextSlide() {
    if (currentIndex <= carouselItems.current.length) {
      currentIndex = (currentIndex + 1) % carouselItems.current.length; // Get the index of the next item.
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex >= 1 && currentIndex <= carouselItems.current.length) {
      currentIndex =
        (currentIndex - 1 + carouselItems.current.length) %
        carouselItems.current.length;
      updateCarousel();
    }
  }

  return (
    <>
      <section className="category-carousel">
        <button
          type="button"
          className="category-carousel-btn category-carousel-btn--left"
          onClick={prevSlide}
        >
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10.59L2.67341 6L7 1.41L5.66802 0L0 6L5.66802 12L7 10.59Z"
              fill="#3E3E3E"
            />
          </svg>
        </button>

        <div className="category-carousel-box">
          <ul className="carousel-box-list">
            {/* {carousel.map((el, key) => {
              return (
                <li key={key} className="box-item">
                  {el.icon}
                  {el.title}
                  <div className="active-item"></div>
                </li>
              );
            })} */}
            {Object.entries(hotelCategory).map(([prop, value], key) => {
              // console.log(key, prop, value)
              return (
                <li
                  key={key}
                  className="box-item"
                  onClick={() => {
                    setOutput(sortData(data, value.tags));
                  }}
                >
                  <FilterIcon type={prop} />
                  {value.title}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className="category-carousel-btn category-carousel-btn--right"
          onClick={nextSlide}
        >
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 10.59L4.32659 6L0 1.41L1.33198 0L7 6L1.33198 12L0 10.59Z"
              fill="#3E3E3E"
            />
          </svg>
        </button>
      </section>
    </>
  );
}

function Catalogue({ data }) {
  if (!data) return <NoCatalogue />;
  return (
    <>
      <section className="catalogue-section">
        <ul className="catalogue-section--list">
          {data
            .filter((x, k) => k <= 11)
            .map((el, key) => {
              return (
                <>
                  <CatalogueItem
                    key={key}
                    id={key}
                    title={el.name}
                    img={el.images}
                    distance={el.distance}
                    available={el.available}
                    price={numToText(el.price)}
                    rating={getRatingAvg(el.rating)}
                    url={el._id}
                  />
                </>
              );
            })}
        </ul>
      </section>
    </>
  );
}

function NoCatalogue() {
  return (
    <>
      <section className="catalogue-section--empty">
        <h1>No catalogue available at the moment!</h1>
        <p>Please come back later or report to support.</p>
        <a href="#">
          <button type="button" className="support-redirect btn-borderless">
            Contact support
          </button>
        </a>
      </section>
    </>
  );
}

export default Home;
