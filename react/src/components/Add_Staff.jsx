import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { createPost, updatePost } from '../redux/actions/postAction';
import pica from "pica";


const Add_Staff = ({id, guest = false, employee }) => {
  const { currentColor,setIsClicked, initialState } = useStateContext();

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log("employee id", employee)
  
  const initialState1 = {
    first_name: employee?.first_name || '',
    last_name: employee?.last_name|| '',
    mobile: employee?.mobile|| '',
    email: employee?.email|| '',
    gender: employee?.gender|| 'M',
    eeu_id: employee?.eeu_id|| '',
    department: employee?.department|| '',
    job_title: employee?.job_title|| '',
    staff: guest ? false : true ,
  };


  const [userData, setUserData] = useState(initialState1);
  const { first_name, last_name, mobile, email, gender,eeu_id, department, job_title, staff } = userData;

  const [selectedImage, setSelectedImage ] = useState('');
  const [employeeImage, setEmployeeImage ] = useState('');

  useEffect(() => {
    setEmployeeImage(employee?.thumbnail)
  }, [employee]);

  

  useEffect(() => {
    if(alert.success){
    setIsClicked(initialState)
    }
  }, [alert]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [base64Image, setBase64Image] = useState("");

  const calculateImageSize = (image, maxSize) => {
    let width = image.width;
    let height = image.height;
  
    if (width > maxSize || height > maxSize) {
      const aspectRatio = width / height;
      if (width > height) {
        width = maxSize;
        height = width / aspectRatio;
      } else {
        height = maxSize;
        width = height * aspectRatio;
      }
    }
  
    return { width, height };
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Access the selected image file
    setSelectedImage(file)
    setEmployeeImage("")
    
    setUserData({ ...userData, thumbnail: event.target.files[0] })
    
    // const file = event.target.files[0];
    // setSelectedImage(file)

    // const image = new Image();
    // const imageLoaded = new Promise((resolve) => {
    //   image.onload = resolve;
    // });
    // image.src = URL.createObjectURL(file);
    // await imageLoaded;

    // const canvas = document.createElement("canvas");
    // const MAX_SIZE = 800; // maximum desired width/height of the image
    // const { width, height } = calculateImageSize(image, MAX_SIZE);

    // canvas.width = width;
    // canvas.height = height;

    // const picaResizer = pica();
    // picaResizer
    //   .resize(image, canvas)
    //   .then((resizedImage) => picaResizer.toBlob(resizedImage, "image/jpeg", 80))
    //   .then((blob) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setBase64Image(reader.result);
    //         const base64Image = reader.result;
    //         const fileName = file.name;
    //         setUserData({ ...userData, image_str: base64Image , filename: fileName })
    //     };
    //     reader.readAsDataURL(blob);
    //   })
    //   .catch((error) => {
    //     console.error("Image resizing failed:", error);
    //   });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (selectedImage.length === 0)
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: 'Please add your photo.' },
    //   });

    

    // guest ? setUserData({ ...userData, staff: false }) : setUserData({ ...userData, staff: true })

    console.log("userDatbbbbbbbbbbbba", userData)

    if (id) {
      dispatch(updatePost({ userData, auth, id }));
    } else {
      dispatch(createPost({ userData, auth }));
    }

    
  };



  return (
    <div className=" absolute bg-half-transparent w-full h-full flex justify-center  nav-item top-0 right-0 ">
      <div className="relative md:fixed  top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-max h-max">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <p className="font-semibold text-lg dark:text-gray-200">
            {guest ? "Add Guest" : id? "Edit Employee": "Add Staff"}
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
          <form className="max-w-sm mx-auto"  onSubmit={handleSubmit}>
            <div className="md:flex md:gap-5 ">
              <div className="mb-5">
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  onChange={handleChangeInput}
                  value={first_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
              <div className="mb-5">
                <label
                  for="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={handleChangeInput}
                  value={last_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
            </div>
            <div className="md:flex md:gap-5 ">
              <div className="mb-5">
                <label
                  for="mobile"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  onChange={handleChangeInput}
                  value={mobile}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
              <div className="mb-5">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                ></input>
              </div>
            </div>

            <div className="md:flex md:gap-5 ">
              <div>
                <label
                  for="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <div className="flex mb-5">
                  <div className="flex items-center me-4">
                    <input
                      checked={gender === 'M'}
                      name="gender"
                      id="Male"
                      type="radio"
                      onChange={handleChangeInput}
                      value="M"
                      // name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                    <label
                      for="Male"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      checked={gender === 'F'}
                      name="gender"
                      id="Female"
                      type="radio"
                      onChange={handleChangeInput}
                      value="F"
                      // name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                    <label
                      for="Female"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>

              {!guest && <div className="mb-5">
                <label
                  for="eeu_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  EEU ID
                </label>
                <input
                  name="eeu_id"
                  type="text"
                  id="eeu_id"
                  onChange={handleChangeInput}
                  value={eeu_id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>}
            </div>

            {!guest && <div className="md:flex md:gap-5 ">
              <div className="mb-5">
                <label
                  for="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <input
                  name="department"
                  type="text"
                  id="department"
                  onChange={handleChangeInput}
                  value={department}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
              <div className="mb-5">
                <label
                  for="job_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job_Title
                </label>
                <input
                  name="job_title"
                  type="text"
                  id="job_title"
                  onChange={handleChangeInput}
                  value={job_title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>
            </div>}

            <div className="mb-5">
              {/* <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="user_avatar"
              >
                Upload file
              </label> */}
              <div className="flex  space-x-8">
              <input id="user_avatar" type="file" onChange={handleImageChange}
                       accept="image/*" style={{display: "none"}}
                       className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                     />
                     <label htmlFor="user_avatar" className="cursor-pointer flex items-center space-x-4">
                       <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                       <path
                        d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>   
                       <path
                         d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                       </svg>
                         Upload picture
                     </label>
    
            {/* {selectedImage || employeeImage && (
              <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src={ selectedImage? URL.createObjectURL(selectedImage) : employeeImage} alt="Selected Image" />
            )} */}

{selectedImage && (
  <img
    className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
    src={URL.createObjectURL(selectedImage)}
    alt="Selected Image"
  />
)}

{ employeeImage && <img
    className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
    src={employeeImage}
    alt="Selected Image"
  /> }



</div>
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

export default Add_Staff;
