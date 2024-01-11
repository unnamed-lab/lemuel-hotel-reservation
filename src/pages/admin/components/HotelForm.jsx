import { useState, useEffect } from "react";
import { createHotel, reset } from "../../../utils/hotel/hotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

export default function HotelForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    title: "",
    description: "",
    language: "",
    images: "",
    address: "",
    street: "",
    city: "",
    tags: "",
    room: {
      available: "",
      total: "",
    },
    price: "",
    accomodation: {
      guest: "",
      max_guest: "",
      bed: "",
      bedroom: "",
      bath: "",
    },
    rating: "",
    review: "",
    policy: {
      rules: "",
      saftey: "",
      cancellation: "",
    },
  };
  const [formData, setFormData] = useState(initialState);
  const { name, title, description, price, images, address } =
    formData;
  const { user } = useSelector((state) => state.auth);
  const { hotels, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.hotel
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/auth/login");
    }
    if (!hotels) {
      dispatch(createHotel());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, hotels, navigate, dispatch, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createHotel(formData));
    setFormData({
      initialState,
    });
    if (isError) toast.error(message);
    if (isSuccess) navigate("/admin/");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter hotel name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Enter a name"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Enter compelling title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Enter a title"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Enter hotel price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            placeholder="Enter a price"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Enter hotel address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            placeholder="Enter an address"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Enter images</label>
          <input
            type="text"
            name="images"
            id="images"
            value={images}
            placeholder="Enter an images"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Enter hotel description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            placeholder="Enter a description"
            onChange={onChange}
          ></textarea>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
