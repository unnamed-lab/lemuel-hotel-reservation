import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCompany, reset } from "../../utils/company/companySlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function CompanyDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { company, isLoading, isError, message } = useSelector(
    (state) => state.company
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/auth/login");
    }
    if (!company) {
      dispatch(getCompany());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, company, navigate, dispatch, isError, message]);

  const companyData = company[0];
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1>{companyData ? companyData.name : ""}</h1>
      <p>{companyData ? companyData.about : ""}</p>
    </>
  );
}

export default CompanyDetail;
