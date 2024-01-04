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
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AppLayout layout={true} />} errorElement={<Error />}>
        <Route index path="/" element={<Home />} />
      </Route>
      <Route
        path="auth/"
        element={<AppLayout layout={false} />}
        errorElement={<Error />}
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route
        path="place/"
        element={<AppLayout layout={false} />}
        errorElement={<Error />}
      >
        <Route path=":placeId" element={<DetailPage />} />
        <Route path=":placeId/reserve" element={<Reservation />} />
      </Route>
      <ToastContainer />
    </Route>
  ),
  {
    basename: "/",
  }
);

export { routes };
