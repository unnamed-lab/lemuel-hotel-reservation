"use strict";

export const numToText = (num) => {
  return parseInt(num)
    .toString()
    .replace(/\D/g)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const findReview = (tag = "", reviews = []) => {
  const reviewType = reviews.filter((item) => {
    return item.tags.some(() => item.tags.includes(tag.toLowerCase()));
  });
  return reviewType.length;
};

