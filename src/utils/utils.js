"use strict";

export const numToText = (num) => {
  return parseInt(num)
    .toString()
    .replace(/\D/g)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const findReview = (tag = "", reviews = [], getArr = false) => {
  const reviewType = reviews.filter((item) => {
    return item.tags.some(() => item.tags.includes(tag.toLowerCase()));
  });
  if (getArr === true) {
    return reviewType;
  }
  return reviewType.length;
};

export const getRatingDecimal = (value, arr) => ((value / arr) * 5).toFixed(2);

export const getRatingPercent = (value, arr) => (value / arr) * 100;

export const getTimestamp = (time) => {
  const date = new Date(time);
  const monthsInWords = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthsInWords[date.getMonth()]} ${date.getFullYear()}`;
};

export const getMonthTimestamp = (time, abbr = false) => {
  const date = new Date(time);
  const monthsInWords = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return abbr
    ? monthsInWords[date.getMonth()] === "September"
      ? `${monthsInWords[date.getMonth()].slice(0, 3)}`
      : `${monthsInWords[date.getMonth()].slice(0, 2)}`
    : `${monthsInWords[date.getMonth()]}`;
};

export const makeArrayToString = (arr) => {
  return arr.join(", ");
};

export const getStarRating = (value, rating = [], percentage = false) => {
  const lookUpStar = rating.filter((item) => item === value);
  const output = lookUpStar.length / rating.length;
  return percentage ? output * 100 : output;
};

export const ratingText = (input) => {
  switch (true) {
    case input <= 20:
      return "Terrible";
    case input <= 40:
      return "Poor";
    case input >= 60:
      return "Good";
    case input >= 75:
      return "Excellence";
    default:
      return "Average";
  }
};

export const amtFormater = (value, decimal = false) => {
  if (value >= 1000000000)
    return decimal
      ? (value / 1000000000).toFixed(2) + "Bn"
      : (value / 1000000000).toFixed(0) + "Bn";
  else if (value >= 1000000)
    return decimal
      ? (value / 1000000).toFixed(2) + "M"
      : (value / 1000000).toFixed(0) + "M";
  else if (value >= 1000)
    return decimal
      ? (value / 1000).toFixed(2) + "K"
      : (value / 1000).toFixed(0) + "K";
  else {
    return decimal ? value.toFixed(2).toString() : value.toString();
  }
};

export const getDateDiff = (date1, date2) => {
  if (date1 === "") return 0;
  if (date2 === "") return 0;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const timeDiff = Math.abs(d2 - d1);
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return daysDiff;
};

export const getCurDateFormat = (spread = 0) => {
  const maxSpread = 7;
  if (spread > maxSpread) {
    console.error("Spread exceeds maximum allowed value");
    return;
  }
  const currentDate = new Date();
  const yr = currentDate.getFullYear();
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  const dd = String(currentDate.getDate() + spread).padStart(2, "0");
  return `${yr}-${mm}-${dd}`;
};

export const sharePage = (title, text, url, img) => {
  const sharedData = {
    title: title,
    text: text,
    url: url,
    icon: img,
  };
  console.log(navigator.canShare);
  if (navigator.canShare(sharedData)) {
    navigator
      .share()
      .then(() => console.log("Successful share!"))
      .catch((error) => console.error("Error sharing item: ", error));
  } else {
    console.log("Web Share API not supported.");
  }
};
