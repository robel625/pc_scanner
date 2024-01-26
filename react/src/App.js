import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import Alert from "./components/alert/Alert";
import Login from "./components/login";
import Register from "./components/register";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Check,
  Guest,
  All_Staff, 
  Staff,
  Staffs,
  Profile,
  Dashboard,
  InPremises,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

import io from "socket.io-client";
import SocketClient from './SocketClient';
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

import { GLOBALTYPES } from "./redux/actions/globalTypes";
import useGlobal from "./global"
import PrivateRoutes from './utils/PrivateRoutes'

import "./data/fontawesome";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const socketConnect = useGlobal(state => state.socketConnect)
	const socketClose = useGlobal(state => state.socketClose)

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {

    if (auth.token){
    socketConnect()
		return () => {
			socketClose()
		}
  }
  }, [auth]);


 

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Alert />
        <SocketClient />
        <div className="flex relative dark:bg-main-dark-bg">
          {auth.token && <div className="fixed right-4 bottom-4" style={{ zIndex: "999" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>}
          {auth.token && activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              auth.token && activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full"
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {auth.token && <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg nav  w-full " style={{ zIndex: "999" }}>
              <Navbar />
            </div> }
            <div>
              {auth.token && themeSettings && <ThemeSettings />}

              <Routes>
                {/* auth */}
                <Route exact path="/" element={auth.token ? <Dashboard /> : <Login/>} />
                <Route exact path="/register" element={auth.token ? <Dashboard /> : <Register/>} />
                
                <Route element={<PrivateRoutes />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/all_staff" element={<All_Staff />} />
                      <Route path="/staffs" element={<Staffs />} />
                      <Route path="/guest" element={<Guest />} />
                      <Route path="/check" element={<Check />} />
                      <Route path="/staff/:id" element={<Staff />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/inPremises" element={<InPremises />} />
                </Route>    
                
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
              </Routes>
            </div>
            {auth.token && <Footer />}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
