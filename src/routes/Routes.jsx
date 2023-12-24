import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Error from "./error/Error";
import Home from "../pages/Home";
import DetailPage from "../pages/HotelDetail";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        element={<AppLayout layout={true} />}
        // errorElement={<Error />}
      >
        <Route index path="/" element={<Home />} />
      </Route>
      <Route path="place/" element={<AppLayout layout={false} />}>
        <Route path=":placeId" element={<DetailPage />} />
      </Route>
    </Route>
  ),
  {
    basename: "/",
  }
);

export { routes };
