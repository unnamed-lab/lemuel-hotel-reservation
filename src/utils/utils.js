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

export const makeArrayToString = (arr = []) => {
  return arr.join(", ");
};

export const getStarRating = (value, rating = [], percentage = false) => {
  const lookUpStar = rating.filter((item) => item === value);
  const output = lookUpStar.length / rating.length;
  if (percentage === true) {
    return output * 100;
  }
  return output;
};

export const ratingText = (input) => {
  let output = "";
  switch (true) {
    case input <= 20:
      output = "Terrible";
      break;
    case input <= 40:
      output = "Poor";
      break;
    case input >= 60:
      output = "Good";
      break;
    case input >= 75:
      output = "Excellence";
      break;

    default:
      output = "Average";
      break;
  }

  return output;
};

export const amtFormater = (value, decimal = false) => {
  if (value >= 1000000000) return (value / 1000000000).toFixed(2) + "Bn";
  if (value >= 1000000) return (value / 1000000).toFixed(2) + "M";
  else if (value >= 1000) return (value / 1000).toFixed(2) + "K";
  else {
    if (decimal === true) return value.toFixed(2).toString();
    return value.toString();
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
