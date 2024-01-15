import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../utils/auth/authSlice";
import Loader from "../../components/Loader";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="form-modal">
        <div className="form-modal-header">
          <h2 className="form-modal-header__title">Log in or sign up</h2>
        </div>
        <form className="form-modal-container" onSubmit={onSubmit}>
          <div className="form-group input-group input-curve">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </div>

          <div className="form-group input-group input-curve">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>

          <div className="form-group btn-group">
            <button className="form-btn" type="submit">Sign In</button>
          </div>
        </form>
        <div className="form-modal-divider">Or</div>
        <div className="form-modal-container">
          <Link to={"/auth/register"}>
            <button className="form-btn outline" type="button">Sign Up</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Login;
