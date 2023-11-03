import { useState } from "react";
import "./App.css";
import Dashboard from "./components/DashBoard";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login"
import DashChartComponent from "./components/DashChartComponent";
import NavSidebar from "./components/NavSideBar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        {/* <Route index element={(<NavBar/>, <Dashboard/>)}/> */}

        <Route
          index
          element={
            <>
              <NavBar />
              <Dashboard />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      {/* <NavBar/>
    <Dashboard/>
    <DashChartComponent/> */}
      <RouterProvider router={router} />
    </>
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
