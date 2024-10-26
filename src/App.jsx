import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {useContext} from "react";
import {BackdropLoaderContext} from "./context/BackdropLoaderContext.jsx";
import BackdropLoader from "./components/backdrop-loader/BackdropLoader.jsx";

function App() {
    const backdropLoaderContext = useContext(BackdropLoaderContext);
  return (
      <>
          <BackdropLoader open={backdropLoaderContext.show}/>
          <ToastContainer autoClose={2000}/>
          <RouterProvider router={router}/>
      </>
  )
}

export default App
