import React, { useState, useEffect } from "react";
import { Button2 } from "../components";
import { useSelector, useDispatch } from "react-redux";
import avatar from "../data/avatar.jpg";
import profile from '../data/profile.png';
import { useStateContext } from "../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateUser, changepassword } from "../redux/actions/authAction";

const Profile = () => {
    const { currentColor, currentMode, handleClick, isClicked } =
        useStateContext();

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const fullName = auth?.user?.full_name || "";
    const nameParts = fullName.split(" ");

    const initialState = {
        // first_name: nameParts[0] || "",
        // last_name: nameParts[nameParts.length - 1] || "",
        id: auth?.user?.id || "",
        full_name: auth?.user?.full_name || "",
        username: auth?.user?.username || "",
        mobile: auth?.user?.mobile || "",
        email: auth?.user?.email || "d@d.com",
        gender: auth?.user?.gender || "M",
        eeu_id: auth?.user?.eeu_id || "",
        role: auth?.user?.role || "",
        country: auth?.user?.country || "",
        city: auth?.user?.city || "",
        organization: auth?.user?.organization || "",
        department: auth?.user?.department || "",
        job_title: auth?.user?.job_title || "",
        address: auth?.user?.address || "",
        birthday: auth?.user?.birthday || "",
    };

    const [userData, setUserData] = useState(initialState);
    const {
        // first_name,
        // last_name,
        id,
        full_name,
        username,
        mobile,
        email,
        gender,
        eeu_id,
        role,
        country,
        city,
        organization,
        department,
        job_title,
        address,
        birthday,
    } = userData;

    const [selectedImage, setSelectedImage] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date(birthday));

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [cf_password, setCfpassword] = useState('');
    const [errpassword, setErrpassword] = useState('');

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Access the selected image file
        setSelectedImage(file);

        setUserData({ ...userData, profile_pic: event.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log("userDatbbbbbbbbbbbbauu", userData)
    
        dispatch(updateUser({ userData, auth, id }));
           
      };

    const handleChangePassword = (e) => {
        e.preventDefault();

      if(newPassword.length < 8){
        setErrpassword("new Password must be at least 8 characters.")
            return
        }

        if(newPassword !== cf_password) {
            setErrpassword("Confirm password did not match.")
            return
        }
    
        dispatch(changepassword({ oldPassword, newPassword, auth}));
    
        
      };

    return (
        <div>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                {/* <!-- Right Content --> */}
                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <img
                                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                                src={
                                    selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : auth?.user?.profile_pic || profile
                                }
                                alt="picture"
                            />

                            <div>
                                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                    Profile picture
                                </h3>
                                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    JPG, GIF or PNG. Max size of 2mb
                                    <div className="flex items-center space-x-4">
                                        <input
                                            id="user_avatar"
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            style={{ display: "none" }}
                                        //  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        />
                                        <label
                                            htmlFor="user_avatar"
                                            className="py-2 px-3 mt-5 cursor-pointer flex items-center space-x-4 rounded-lg border border-gray-200 bg-primary-700 hover:bg-primary-800 hover:text-blue-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2 -ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                                                <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                                            </svg>
                                            Upload picture
                                        </label>
                                        {/* <button
                                            type="button"
                                            className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                            Delete
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">
                                Language & Time
                            </h3>
                            <div className="mb-4">
                                <label
                                    for="settings-language"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select language
                                </label>
                                <select
                                    id="settings-language"
                                    name="countries"
                                    className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option>English (US)</option>
                                    <option>Amharic</option>
                                    <option>oromifa</option>
                                    <option>Tigregna</option>
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-full">
                                <button
                                    style={{ backgroundColor: currentColor }}
                                    className={`text-white  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">
                            General information
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="first-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        id="full_name"
                                        onChange={handleChangeInput}
                                        value={full_name}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Bety"
                                        required
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="last-name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        onChange={handleChangeInput}
                                        value={username}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="kebede"
                                        required
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="country"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        id="country"
                                        onChange={handleChangeInput}
                                        value={country}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Ethiopia"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="city"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        onChange={handleChangeInput}
                                        value={city}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Addis Ababa"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="address"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        onChange={handleChangeInput}
                                        value={address}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder=""
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={handleChangeInput}
                                        value={email}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="example@company.com"
                                        required
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="phone-number"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        name="mobile"
                                        id="mobile"
                                        onChange={handleChangeInput}
                                        value={mobile}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="e.g. +(251)912 345 789"
                                        required
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="birthday"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Birthday
                                    </label>
                                      <DatePicker
                                      selected={selectedDate}
                                      onChange={(date) =>{setSelectedDate(date); setUserData({ ...userData, birthday:date.toISOString().split("T")[0] })}}
                                    //   className="mr-5"
                                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    ></DatePicker>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="organization"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Organization
                                    </label>
                                    <input
                                        type="text"
                                        name="organization"
                                        id="organization"
                                        onChange={handleChangeInput}
                                        value={organization}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Company Name"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        id="role"
                                        onChange={handleChangeInput}
                                        value={role}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="React Developer"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="department"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        id="department"
                                        onChange={handleChangeInput}
                                        value={department}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Development"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="department"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="job_title"
                                        id="job_title"
                                        onChange={handleChangeInput}
                                        value={job_title}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Software Engineer"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="department"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        EEU ID
                                    </label>
                                    <input
                                        type="text"
                                        name="eeu_id"
                                        id="eeu_id"
                                        onChange={handleChangeInput}
                                        value={eeu_id}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       
                                    />
                                </div>
                                
                                <div className="col-span-6 sm:col-full">
                                    <button
                                        style={{ backgroundColor: currentColor }}
                                        className={`text-white  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">
                            Password information
                        </h3>
                        <form action="#"  onSubmit={handleChangePassword}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="current-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Current password
                                    </label>
                                    <input
                                        type="password"
                                        name="current-password"
                                        id="current-password"
                                        onChange={(e) =>{setOldPassword(e.target.value)}}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        New password
                                    </label>
                                    <input
                                        data-popover-target="popover-password"
                                        data-popover-placement="bottom"
                                        type="password"
                                        id="password"
                                        onChange={(e) =>{setNewpassword(e.target.value)}}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <div
                                        data-popover
                                        id="popover-password"
                                        role="tooltip"
                                        className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                                    >
                                        <div className="p-3 space-y-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                Must have at least 6 characters
                                            </h3>
                                            <div className="grid grid-cols-4 gap-2">
                                                <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                                <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                                <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                                <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                            </div>
                                            <p>It’s better to have:</p>
                                            <ul>
                                                <li className="flex items-center mb-1">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    Upper & lower case letters
                                                </li>
                                                <li className="flex items-center mb-1">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    A symbol (#$&)
                                                </li>
                                                <li className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    A longer password (min. 12 chars.)
                                                </li>
                                            </ul>
                                        </div>
                                        <div data-popper-arrow></div>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        for="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        onChange={(e) =>{setCfpassword(e.target.value)}}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <div className="mt-3" style={{ color: "crimson" }}>{errpassword}</div>
                                </div>
                                <div className="col-span-6 sm:col-full">
                                    <button
                                        style={{ backgroundColor: currentColor }}
                                        className={`text-white  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
