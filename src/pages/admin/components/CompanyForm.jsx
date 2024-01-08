import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany, reset } from "../../../utils/company/companySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

function CompanyForm() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    about: "",
    phone: "",
    email: "",
    logo: "",
  });

  const { name, url, about, phone, email, logo } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { company, isLoading, isError, message } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }if (!user) {
      navigate("/auth/login");
    }
    if (company) {
      navigate("/admin/business/");
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, user, company, message, navigate, dispatch])

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
    dispatch(createCompany(formData));
    setFormData({
      name: "",
      url: "",
      about: "",
      phone: "",
      email: "",
      logo: "",
    });
    if (isError) toast.error(message);
    if (isSuccess || company) navigate("/admin/");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter company name</label>
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
          <label htmlFor="email">Enter company email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter an email"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Enter company phone number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            placeholder="Enter your phone number"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Enter company website url</label>
          <input
            type="url"
            name="url"
            id="url"
            value={url}
            placeholder="Enter a website link"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="logo">Enter company website logo</label>
          <input
            type="text"
            name="logo"
            id="logo"
            value={logo}
            placeholder="Enter a website logo"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Enter company bio</label>
          <textarea
            name="about"
            id="about"
            cols="30"
            rows="10"
            value={about}
            placeholder="Enter a bio detail"
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

export default CompanyForm;
