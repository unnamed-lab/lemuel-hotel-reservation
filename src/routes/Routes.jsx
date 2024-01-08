import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Error from "./error/Error";
import Home from "../pages/Home";
import DetailPage from "../pages/HotelDetail";
import Reservation from "../pages/Reservation";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/admin/Dashboard";
import CompanyForm from "../pages/admin/components/CompanyForm";
import AdminLayout from "../components/layout/AdminLayout";
import CompanyDetail from "../pages/admin/CompanyDetail";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AppLayout layout={true} />} errorElement={<Error />}>
        <Route index path="/" element={<Home />} />
      </Route>
      <Route element={<AppLayout layout={false} />} errorElement={<Error />}>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/business/new" element={<CompanyForm />} />
        <Route path="/admin/business/" element={<CompanyDetail />} />
      </Route>
      <Route
        path="place/"
        element={<AppLayout layout={false} />}
        errorElement={<Error />}
      >
        <Route path=":placeId" element={<DetailPage />} />
        <Route path=":placeId/reserve" element={<Reservation />} />
      </Route>
    </Route>
  ),
  {
    basename: "/",
  }
);

export { routes };
