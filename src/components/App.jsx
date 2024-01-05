import { RouterProvider } from "react-router-dom"
import { routes } from "../routes/Routes"
import { Provider } from "react-redux";
import { store } from "../utils/app/store";

function App() { 
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
    </>
  )
}

export default App;
