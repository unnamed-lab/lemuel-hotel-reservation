import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../utils/auth/authSlice";
import Loader from "../../components/Loader";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, firstname, lastname, password, password2 } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/admin/");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = { username, email, firstname, lastname, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="form-modal">
        <div className="form-modal-header">
          <h2 className="form-modal-header__title">Register or Create an account</h2>
        </div>
        <form className="form-modal-container" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Enter a username"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              placeholder="Enter a first name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={lastname}
              placeholder="Enter a last name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter a valid email address"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter a secured password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Verify Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              placeholder="Verify your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group btn-group">
            <button className="form-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
