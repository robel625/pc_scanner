import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { createDevice, updateDevice } from '../redux/actions/deviceAction';
import pica from "pica";

const Add_Device = ({ device, employee_id }) => {
  const { currentColor, setIsClicked, initialState  } = useStateContext();

  console.log("id check ", device);

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log("employee id", employee_id)
  
  const initialState1 = {
	  type : device?.type || '',
	  model: device?.model || '',
	 serial_number: device?.serial_number || '', 
	 barcode: device?.barcode || '',
   employee: employee_id 
  };


   const [deviceData, setDeviceData] = useState(initialState1);
  const { type, model, serial_number, barcode, employee } = deviceData;

  const [selectedImage, setSelectedImage ] = useState('');

  useEffect(() => {
    if(alert.success){
    setIsClicked(initialState)
    }
  }, [alert]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDeviceData({ ...deviceData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Access the selected image file
    setSelectedImage(file)
    
    setDeviceData({ ...deviceData, thumbnail: event.target.files[0] })
   };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("deviceDatbbbbbbbbbbbba", deviceData)

  //  setDeviceData({ ...deviceData, employee: employee }) 

    if (device) {
      dispatch(updateDevice({ id: device.id , deviceData, auth,}));
    } else {
      dispatch(createDevice({ deviceData, auth }));
    }
  };

  return (
    <div className=" absolute bg-half-transparent w-full h-full flex justify-center  nav-item top-0 right-0 ">
      <div className="fixed md:overflow-hidden overflow-auto md:hover:overflow-auto top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-max h-max max-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <p className="font-semibold text-lg dark:text-gray-200">
              {device ? "Edit Device" : "Add Device"}
            </p>
          </div>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        <div className="mt-5 ">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="md:flex md:gap-5 ">
              <div className="mb-5">
                <label
                  for="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name='type'
                  onChange={handleChangeInput}
                  value={type}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
              <div className="mb-5">
                <label
                  for="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name='model'
                  onChange={handleChangeInput}
                  value={model}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
            </div>

            <div className="md:flex md:gap-5 ">
              <div className="mb-5">
                <label
                  for="serial_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Serial Number
                </label>
                <input
                  type="text"
                  id="serial_number"
                  name='serial_number'
                  onChange={handleChangeInput}
                  value={serial_number}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
              <div className="mb-5">
                <label
                  for="barcode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Barcode
                </label>
                <input
                  type="text"
                  id="barcode"
                  name='barcode'
                  onChange={handleChangeInput}
                  value={barcode}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
            </div>

            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="user_avatar"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={handleImageChange} 
                accept="image/*"
              ></input>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Device;
