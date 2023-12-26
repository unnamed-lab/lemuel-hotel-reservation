"use strict";
import brandImg from "../assets/brand.svg";

// export const catalogue = [
//   {
//     id: 12334495,
//     title: "Jorgan beach",
//     img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
//     address: "jorgan beach",
//     city: "delta",
//     distance: 43,
//     available: "Apr 7 - 12",
//     price: "10,000",
//     rating: 4.83,
//     url: "#",
//     tags: ["beach", "jorgan", "delta"],
//   },
//   {
//     title: "Della beach Hotel",
//     img: [
//       "/resort-01.png",
//       "/resort-02.png",
//       "/resort-03.png",
//       "/resort-04.png",
//     ],
//     distance: 53,
//     address: "della beach",
//     city: "delta",
//     available: "May 6 - 11",
//     price: "25,000",
//     rating: 4.95,
//     url: "#",
//     tags: ["beach", "della", "hotel", "delta"],
//   },
//   {
//     id: 12334495,
//     title: "Jorgan beach",
//     img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
//     address: "jorgan beach",
//     city: "delta",
//     distance: 43,
//     available: "Apr 7 - 12",
//     price: "10,000",
//     rating: 4.83,
//     url: "#",
//     tags: ["beach", "jorgan", "delta"],
//   },
//   {
//     title: "Della beach Hotel",
//     img: [
//       "/resort-01.png",
//       "/resort-02.png",
//       "/resort-03.png",
//       "/resort-04.png",
//     ],
//     distance: 53,
//     address: "della beach",
//     city: "delta",
//     available: "May 6 - 11",
//     price: "25,000",
//     rating: 4.95,
//     url: "#",
//     tags: ["beach", "della", "hotel", "delta"],
//   },
//   {
//     id: 12334495,
//     title: "Jorgan beach",
//     img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
//     address: "jorgan beach",
//     city: "delta",
//     distance: 43,
//     available: "Apr 7 - 12",
//     price: "10,000",
//     rating: 4.83,
//     url: "#",
//     tags: ["beach", "jorgan", "delta"],
//   },
//   {
//     title: "Della beach Hotel",
//     img: [
//       "/resort-01.png",
//       "/resort-02.png",
//       "/resort-03.png",
//       "/resort-04.png",
//     ],
//     distance: 53,
//     address: "della beach",
//     city: "delta",
//     available: "May 6 - 11",
//     price: "25,000",
//     rating: 4.95,
//     url: "#",
//     tags: ["beach", "della", "hotel", "delta"],
//   },
//   {
//     id: 12334495,
//     title: "Jorgan beach",
//     img: ["/beach-01.png", "/beach-02.png", "/beach-03.png", "/beach-04.png"],
//     address: "jorgan beach",
//     city: "delta",
//     distance: 43,
//     available: "Apr 7 - 12",
//     price: "10,000",
//     rating: 4.83,
//     url: "#",
//     tags: ["beach", "jorgan", "delta"],
//   },
//   {
//     title: "Della beach Hotel",
//     img: [
//       "/resort-01.png",
//       "/resort-02.png",
//       "/resort-03.png",
//       "/resort-04.png",
//     ],
//     distance: 53,
//     address: "della beach",
//     city: "delta",
//     available: "May 6 - 11",
//     price: "25,000",
//     rating: 4.95,
//     url: "#",
//     tags: ["beach", "della", "hotel", "delta"],
//   },
// ];

//  The schema blue print of a hotel
export const catalogueItem = {
  id: 1,
  name: "Jorgan Hotel",
  title: "Beautiful Hotel on the edge of iterigbi river",
  description: `A passionate host, who loves to welcome guest from all over the world and share the beauty of this amazing natural spot that is Blue Lagoon`,
  about:
    "Jorgan are experienced, highly rated hosts who are committed to providing great stays for guests.",
  language: [
    "中文",
    "English",
    "Brazil",
    "Français",
    "Bahasa Indonesia",
    "Español",
  ],
  company: {
    name: "Jorgan",
    url: "#",
    imgUrl: brandImg,
    contact: {
      phone: "",
      email: "",
    },
    regDate: "September 2023",
    isVerified: true,
  },
  images: [
    "/beach-01.png",
    "/beach-02.png",
    "/beach-03.png",
    "/beach-04.png",
    "/beach-02.png",
  ],
  address: "Jorgan hotel, Delta, Iterigbi",
  street: "jorgan beach",
  city: "delta",
  distance: 43,
  available: "Apr 7 - 12",
  tags: ["beach", "jorgan", "delta"],
  room: {
    available: 3,
    total: 8,
  },
  price: 10000,
  accomodation: {
    guest: 1,
    bed: 1,
    bedroom: 1,
    bath: 1,
  },
  rating: [5, 1, 4, 5, 5, 3, 2, 2],
  ratingAvg: function () {
    return (
      this.rating.reduce((acc, num) => acc + num, 0) / this.rating.length
    ).toFixed(2);
  },
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
      tags: ["communication", "clean", "location", "value"],
      message:
        "Illo iusto consequatur hic ad incidunt veniam facilis necessitatibus doloribus quaerat explicabo, nihil fuga earum voluptate fugit blanditiis numquam neque ab.",
      timestamp: "August 2, 2023",
    },
  ],
  reviewCount: function () {
    return this.review.length;
  },
  faves: [{id:123,username: "unnamed"}],
  isSuperHost: true,
  customerExp: ["24/7 full management"],
  policy: {
    rules: [
      "Check-in after 2:00 PM",
      "Checkout before 12:00 PM",
      "2 guests maximum",
    ],
    safety: ["Carbon monoxide alarm", "Smoke alarm"],
    cancellation: [
      "Free cancellation for 48 hours.",
      "Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.",
    ],
  },
};

export const catalogue = [catalogueItem];

export const catalogues = [catalogueItem];
