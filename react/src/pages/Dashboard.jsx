import React, { useState, useEffect } from "react";
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot, GoDotFill } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import profile from '../data/profile.png';
import { getDashboard } from "../redux/actions/dashboardAction";
import { useSelector, useDispatch } from "react-redux";

import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { MdDevices } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const [startDate, setStartDate] = useState(moment().add(-7, 'days').toDate() );
  const [endDate, setEndDate] = useState(moment().toDate());

  const handleChangeStart = (startDate) => (
    setStartDate(startDate )
    )

  const handleChangeEnd = (endDate) => (
    setEndDate(endDate )
    )

    const { auth, dashboard  } = useSelector((state) => state);
    const dispatch = useDispatch();
 
    useEffect(() => {
      if (auth.token) {
        const formattedstartDate = startDate.toISOString().split("T")[0];
        const formattedendDate = endDate.toISOString().split("T")[0];
        dispatch(getDashboard(formattedstartDate, formattedendDate,auth.token));
      }

    }, [dispatch, startDate,  endDate, auth]);

    const [data, setdata] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guards, setGuards] = useState([]);
    const [InCountbyDay, setInCountbyDay] = useState("");
    const [OutCountbyDay, setOutCountbyDay] = useState("");

    useEffect(() => {
      setdata(dashboard?.dashboard)
      const data1 = dashboard?.dashboard?.check_date
      if (data1){
      const checkindata = data1.filter((item) => item.status == 1);
      const checkoutdata = data1.filter((item) => item.status == 0);
     
      handleUsers(data1)

      handleChart(checkindata, checkoutdata)

      setCheckIn(checkindata)
      setCheckOut(checkoutdata)
    }

    }, [dashboard]);


    const handleUsers = (data1) => {
           const user1 = data1.map((item) => {
             const user = item.user;  // Extract the user object
             user.status = item.status;  // Add the status property to the user object
             return user;
             })

           // Create an object to store the counts
           var result = {};
           
           // Loop through the items array
           for (var i = 0; i < user1.length; i++) {
            var currentItem = user1[i];
            
            // Check if the currentItem.id exists in the result object
            if (!result[currentItem.id]) {
              // If not, create a new object for the currentItem.id
              result[currentItem.id] = {
                id: currentItem.id,
                count_status_out: 0,
                count_status_in: 0,
                email: currentItem.email,
                full_name:currentItem.full_name
              };
            }
            
            // Increment the respective count based on the status value
            if (currentItem.status) {
              result[currentItem.id].count_status_in++;
            } else {
              result[currentItem.id].count_status_out++;
            }
           }
           
           // Convert the result object to an array of objects
           var finalResult = Object.values(result);

           setGuards(finalResult)

    }

    const handleChart = (checkindata, checkoutdata) => {
      
      const InCountsByDay = {};
      const OutCountsByDay = {};

      checkindata.forEach((item) => {
        const date = new Date(item.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        // const day = date.toLocaleDateString();
        InCountsByDay[formattedDate] = (InCountsByDay[formattedDate] || 0) + 1;
      });

      checkoutdata.forEach((item) => {
        const date = new Date(item.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        OutCountsByDay[formattedDate] = (OutCountsByDay[formattedDate] || 0) + 1;
      });
      
      setInCountbyDay(InCountsByDay)
      setOutCountbyDay(OutCountsByDay)
      console.log("itemCountsByDay",InCountsByDay,OutCountsByDay);


    }
    

    const dashBoardData = [
      {
        icon: <PiSignInBold />,
        amount: checkIn.length,
        title: 'Check In',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
      },
      {
        icon: <PiSignOutBold />,
        amount: checkOut.length,
        // percentage: '+23%',
        title: 'Check Out',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
      },
      {
        icon: <MdOutlineSupervisorAccount />,
        amount: data.count_staff,
        // percentage: '+38%',
        title: 'Staff',
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
    
        pcColor: 'green-600',
      },
      {
        icon: <FaPersonWalkingLuggage />,
        amount: data.count_guest,
        // percentage: '-12%',
        title: 'Guest',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
      },
      {
        icon: <MdDevices />,
        amount: data.count_devices,
        // percentage: '-12%',
        title: 'Registerd Devices',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
      },
      {
        icon: <MdDevices />,
        amount: data?.still_in?.length,
        // percentage: '-12%',
        title: 'Devices inside the premises',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'red-600',
        Link: "InPremises",
      },
    ];
    
  
  
  return (
    <div className="mt-24">
       <div className="flex flex-wrap lg:flex-nowrap justify-end items-center gap-5 mr-10 mb-5 ">
          <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={handleChangeStart}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
          
          <DatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              onChange={handleChangeEnd}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
          </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center items-center ">
         {/*<div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
          <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div>
        </div> */}
        

        <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
          {dashBoardData.map((item) => (
            <div key={item.title} className="bg-white h-44 min-w-40 shadow-lg  dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <Link
                to={`/${item?.Link || ''}`}>
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              </Link>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      


      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Guards Activity</p>
            {/* <DropDown currentMode={currentMode} /> */}
          </div>
          <div className="mt-10 w-80 sm:w-400">
            {guards?.map((item) => (
              <div key={item.title} className="flex justify-between mt-4  p-4 bg-white dark:bg-secondary-dark-bg rounded-xl shadow-lg  items-center">
                <div className="flex gap-4 items-center">
                  {/* <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button> */}
                  <img class=" shadow-xl border-2  block mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0" src={profile} alt="Woman's Face"/>
                  <div>
                    {/* <p className="text-md font-semibold">{item.title}</p> */}
                    <p className="font-semibold text-lg text-gray-500 dark:text-gray-200">{item.full_name || item.email}</p>
                  </div>
                </div>
                {/* <p className={`text-${item.pcColor}`}>{item.amount}</p> */}
                <div>
                  <div className="flex gap-2 items-center">
                     <p className="text-md font-semibold text-gray-400 dark:text-gray-200">  Checkin :</p>
                     <span className="text-base font-semibold text-gray-500 dark:text-gray-200">{item.count_status_in}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                     <p className="text-md font-semibold text-gray-400 dark:text-gray-200">CheckOut :</p>
                     <span className="text-base font-semibold text-gray-500 dark:text-gray-200">{item.count_status_out}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div> */}
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Check In Check Out Overview</p>
            {/* <DropDown currentMode={currentMode} /> */}
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart  checkin={InCountbyDay}  checkout={OutCountbyDay}/>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Weekly Stats</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {weeklyStats.map((item) => (
              <div key={item.title} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="area-sparkLine" height="160px" type="Area" data={SparklineAreaData} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>

        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">MedicalPro Branding</p>
            <button type="button" className="text-xl font-semibold text-gray-400">
              <IoIosMore />
            </button>
          </div>
          <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
            16 APR, 2021
          </p>

          <div className="flex gap-4 border-b-1 border-color mt-6">
            {medicalproBranding.data.map((item) => (
              <div key={item.title} className="border-r-1 border-color pr-4 pb-2">
                <p className="text-xs text-gray-400">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="border-b-1 border-color pb-4 mt-2">
            <p className="text-md font-semibold mb-2">Teams</p>

            <div className="flex gap-4">
              {medicalproBranding.teams.map((item) => (
                <p
                  key={item.name}
                  style={{ background: item.color }}
                  className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-md font-semibold mb-2">Leaders</p>
            <div className="flex gap-4">
              {medicalproBranding.leaders.map((item, index) => (
                <img key={index} className="rounded-full w-8 h-8" src={item.image} alt="" />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Daily Activities</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <img
              className="md:w-96 h-50 "
              src={product9}
              alt=""
            />
            <div className="mt-8">
              <p className="font-semibold text-lg">React 18 coming soon!</p>
              <p className="text-gray-400 ">By Johnathan Doe</p>
              <p className="mt-8 text-sm text-gray-400">
                This will be the small description for the news you have shown
                here. There could be some great info.
              </p>
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Read More"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      
    </div>
  )
}

export default Dashboard


