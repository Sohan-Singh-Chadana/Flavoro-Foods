import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error";
import SingleProduce from "./components/SingleProduce";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {/* <Navbar /> */}
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error />} />
          <Route
            path="/success"
            element={
              <ProtectedRoute children={<Success />} />
              // <ProtectedRoute >
              //   <Success />
              // </ProtectedRoute>
            }
          />
          <Route path="/detailPage/:id" element={<SingleProduce />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
