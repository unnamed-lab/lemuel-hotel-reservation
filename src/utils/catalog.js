"use strict";

export const catalogue = [
  {
    id: 12334495,
    title: "Jorgan beach",
    img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
    address: "jorgan beach",
    city: "delta",
    distance: 43,
    available: "Apr 7 - 12",
    price: "10,000",
    rating: 4.83,
    url: "#",
    tags: ["beach", "jorgan", "delta"],
  },
  {
    title: "Della beach Hotel",
    img: [
      "/resort-01.png",
      "/resort-02.png",
      "/resort-03.png",
      "/resort-04.png",
    ],
    distance: 53,
    address: "della beach",
    city: "delta",
    available: "May 6 - 11",
    price: "25,000",
    rating: 4.95,
    url: "#",
    tags: ["beach", "della", "hotel", "delta"],
  },
  {
    id: 12334495,
    title: "Jorgan beach",
    img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
    address: "jorgan beach",
    city: "delta",
    distance: 43,
    available: "Apr 7 - 12",
    price: "10,000",
    rating: 4.83,
    url: "#",
    tags: ["beach", "jorgan", "delta"],
  },
  {
    title: "Della beach Hotel",
    img: [
      "/resort-01.png",
      "/resort-02.png",
      "/resort-03.png",
      "/resort-04.png",
    ],
    distance: 53,
    address: "della beach",
    city: "delta",
    available: "May 6 - 11",
    price: "25,000",
    rating: 4.95,
    url: "#",
    tags: ["beach", "della", "hotel", "delta"],
  },
  {
    id: 12334495,
    title: "Jorgan beach",
    img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
    address: "jorgan beach",
    city: "delta",
    distance: 43,
    available: "Apr 7 - 12",
    price: "10,000",
    rating: 4.83,
    url: "#",
    tags: ["beach", "jorgan", "delta"],
  },
  {
    title: "Della beach Hotel",
    img: [
      "/resort-01.png",
      "/resort-02.png",
      "/resort-03.png",
      "/resort-04.png",
    ],
    distance: 53,
    address: "della beach",
    city: "delta",
    available: "May 6 - 11",
    price: "25,000",
    rating: 4.95,
    url: "#",
    tags: ["beach", "della", "hotel", "delta"],
  },
  {
    id: 12334495,
    title: "Jorgan beach",
    img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
    address: "jorgan beach",
    city: "delta",
    distance: 43,
    available: "Apr 7 - 12",
    price: "10,000",
    rating: 4.83,
    url: "#",
    tags: ["beach", "jorgan", "delta"],
  },
  {
    title: "Della beach Hotel",
    img: [
      "/resort-01.png",
      "/resort-02.png",
      "/resort-03.png",
      "/resort-04.png",
    ],
    distance: 53,
    address: "della beach",
    city: "delta",
    available: "May 6 - 11",
    price: "25,000",
    rating: 4.95,
    url: "#",
    tags: ["beach", "della", "hotel", "delta"],
  },
];

//  The schema blue print of a hotel
const catalogueItem = {
  name: "",
  company: {
    name: "",
    url: "",
    imgUrl: "",
    contact: {
      phone: "",
      email: "",
    },
    regDate: "",
    isVerified: true,
  },
  address: "",
  accomodation: {
    guest: 1,
    bed: 1,
    bathroom: 1,
    bath: 1,
  },
  rating: [5, 1, 4, 5, 5, 3, 2, 2],
  ratingAvg: function () {
    return (
      this.rating.reduce((acc, num) => acc + num, 0) / this.rating.length
    ).toFixed(2);
  },
  reviewAnalytics: {
    review: [
      {
        name: "Mikasa",
        tags: [
          "communication",
          "clean",
          "location",
          "frontdesk",
          "accuracy",
          "value",
        ],
        message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi harum quas animi minima fugit natus assumenda fugiat iusto?",
        timestamp: "May 21, 2023",
      },
      {
        name: "Eren",
        tags: ["communication", "clean", "location", "accuracy", "value"],
        message:
          "Illo iusto consequatur hic ad incidunt veniam facilis necessitatibus doloribus quaerat explicabo, nihil fuga earum voluptate fugit blanditiis numquam neque ab.",
        timestamp: "August 2, 2023",
      },
    ],
    reviewFunc: function (tag = "") {
      const reviewType = this.review.filter((item) => {
        return item.tags.some(() => item.tags.includes(tag.toLowerCase()));
      });

      return reviewType.length;
    },
    reviewCount: function () {
      return this.review.length;
    },
  },
  isSuperHost: true,
};

// function percent() {
//   return (reviewType.length/this.review.length)*100
// }

// function average() {
//   return (reviewType.length/this.review.length).toFixed(2)
// }