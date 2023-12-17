import { useEffect, useRef, useState } from "react";
import "../../styles/css/app.css";

function CatalogueItem({
  id,
  img,
  title,
  distance,
  available,
  price,
  rating,
  url,
}) {
  const [fave, addFave] = useState(false);
  let currentIndex = 0;
  let prevIndex = null;

  const isFave = fave ? " active" : "";

  //  References States
  const carouselBody = useRef(null);
  const carouselItems = useRef(null);
  const carouselItemButton = useRef(null);
  const carouselPrevBtn = useRef(null);
  const carouselNextBtn = useRef(null);

  useEffect(() => {
    carouselBody.current = document.querySelector(
      `.card-thumbnail.carousel-key--${id}`
    );
    carouselItems.current = document.querySelectorAll(
      `.card-thumbnail--image.container-key--${id}`
    );
    carouselItemButton.current = document.querySelectorAll(
      `.card-thumbnail-switch--btn.card-switch-key-${id}`
    );
    carouselItemButton.current[0].classList.add("active");
    carouselPrevBtn.current = document.querySelector(
      `.card-thumbnail--swipe_btn.btn-left.swipe-btn-${id}`
    );
    carouselNextBtn.current = document.querySelector(
      `.card-thumbnail--swipe_btn.btn-right.swipe-btn-${id}`
    );
  }, [id]);

  function updateCarousel() {
    const itemWidth = carouselItems.current[0].clientWidth;
    carouselItemButton.current[prevIndex].classList.remove("active");
    carouselItemButton.current[currentIndex].classList.add("active");
    carouselBody.current.style.transform = `translateX(${
      -currentIndex * itemWidth
    }px)`;
  }

  function nextSlide() {
    prevIndex = currentIndex;
    const newCurrentValue = (currentIndex + 1) % carouselItems.current.length;
    currentIndex = newCurrentValue;
    // Get the index of the next item.
    updateCarousel();
  }

  function prevSlide() {
    prevIndex = currentIndex;
    const newCurrentValue =
      (currentIndex - 1 + carouselItems.current.length) %
      carouselItems.current.length;
    currentIndex = newCurrentValue;
    updateCarousel();
  }

  return (
    <>
      <div key={id} className="catalogue-item--card">
        <button
          type="button"
          className={`card-favourite${isFave} btn-borderless`}
          onClick={() => addFave(!fave)}
        >
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.64033 1.83658L9 2.20903L9.35967 1.83658C11.5873 -0.470167 15.5552 0.366452 16.9802 3.16974C17.6766 4.53983 17.7786 6.43054 16.6283 8.71671C15.4968 10.9654 13.1547 13.5871 8.99999 16.3979C4.8453 13.5873 2.50319 10.9659 1.37174 8.71719C0.221452 6.43107 0.32336 4.54032 1.01981 3.17016C2.4448 0.366687 6.41275 -0.470128 8.64033 1.83658Z"
              fill="#222222"
              fillOpacity="0.2"
              stroke="white"
            />
          </svg>
        </button>
        <div className={`card-thumbnail--carousel`}>
          <div className="card-thumbnail--carousel_container">
            <div className={`card-thumbnail carousel-key--${id}`}>
              {img.map((el, key) => {
                return (
                  <img
                    key={key}
                    src={el}
                    alt={`${title}: Preview image ${key}`}
                    title={`${title}: Preview image ${key}`}
                    className={`card-thumbnail--image container-key--${id}`}
                  />
                );
              })}
            </div>
            <div className="card-thumbnail--swipe">
              <button
                type="button"
                className={`card-thumbnail--swipe_btn btn-left swipe-btn-${id}`}
                onClick={() => {
                  prevSlide();
                  updateIndex();
                }}
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
              <button
                type="button"
                className={`card-thumbnail--swipe_btn btn-right swipe-btn-${id}`}
                onClick={() => {
                  nextSlide();
                  updateIndex();
                }}
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
            </div>
            <div className="card-thumbnail-switch">
              {img.map((el, key) => {
                return (
                  <>
                    <button
                      key={key}
                      type="button"
                      className={`card-thumbnail-switch--btn btn-borderless card-switch-key-${id}`}
                    ></button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <a href={url} className="card-redirect">
          <div className="card-details">
            <h3 className="card-details--title">{title}</h3>
            <p className="card-details--distance">{distance} kilometers away</p>
            <p className="card-details--availability">{available}</p>
            <p className="card-details--pricing">
              <span className="pricing-amount">N{price}</span>/night
            </p>
            <span className="card-details--rating">
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
            </span>
          </div>
        </a>
      </div>
    </>
  );
}

export default CatalogueItem;
