import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import barcodeScanner from '../data/barcode-scanner.svg';

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const history = useHistory();

  

  const initialState = {
    full_name: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { full_name, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token);
  }, [auth.token]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
    console.log("userData", userData);
  };

  return (
    // <div className="auth_page">
    //   <form onSubmit={handleSubmit}>
    //     <h3 className="text-uppercase text-center mb-4">R-Network</h3>

    //     <div className="form-group">
    //       <label htmlFor="full_name">First Name</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="full_name"
    //         name="full_name"
    //         onChange={handleChangeInput}
    //         value={full_name}
    //         style={{ background: `${alert.full_name ? '#fd2d6a14' : ''}` }}
    //       />

    //       <small className="form-text text-danger">
    //         {alert.full_name ? alert.full_name : ''}
    //       </small>
    //     </div>

    //     <div className="form-group">
    //       <label htmlFor="username">User Name</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="username"
    //         name="username"
    //         onChange={handleChangeInput}
    //         value={username.toLowerCase().replace(/ /g, '')}
    //         style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
    //       />

    //       <small className="form-text text-danger">
    //         {alert.username ? alert.username : ''}
    //       </small>
    //     </div>

    //     <div className="form-group">
    //       <label htmlFor="exampleInputEmail1">Email address</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         name="email"
    //         onChange={handleChangeInput}
    //         value={email}
    //         style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
    //       />

    //       <small className="form-text text-danger">
    //         {alert.email ? alert.email : ''}
    //       </small>
    //     </div>

    //     <div className="form-group">
    //       <label htmlFor="exampleInputPassword1">Password</label>

    //       <div className="pass">
    //         <input
    //           type={typePass ? 'text' : 'password'}
    //           className="form-control"
    //           id="exampleInputPassword1"
    //           onChange={handleChangeInput}
    //           value={password}
    //           name="password"
    //           style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
    //         />

    //         <small onClick={() => setTypePass(!typePass)}>
    //           {typePass ? 'Hide' : 'Show'}
    //         </small>
    //       </div>

    //       <small className="form-text text-danger">
    //         {alert.password ? alert.password : ''}
    //       </small>
    //     </div>

    //     <div className="form-group">
    //       <label htmlFor="cf_password">Confirm Password</label>

    //       <div className="pass">
    //         <input
    //           type={typeCfPass ? 'text' : 'password'}
    //           className="form-control"
    //           id="cf_password"
    //           onChange={handleChangeInput}
    //           value={cf_password}
    //           name="cf_password"
    //           style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
    //         />

    //         <small onClick={() => setTypeCfPass(!typeCfPass)}>
    //           {typeCfPass ? 'Hide' : 'Show'}
    //         </small>
    //       </div>

    //       <small className="form-text text-danger">
    //         {alert.cf_password ? alert.cf_password : ''}
    //       </small>
    //     </div>

    //     <div className="row justify-content-around mx-0 mb-1">
    //       <label htmlFor="male">
    //         Male:{' '}
    //         <input
    //           type="radio"
    //           id="male"
    //           name="gender"
    //           value="male"
    //           defaultChecked
    //           onChange={handleChangeInput}
    //         />
    //       </label>

    //       <label htmlFor="female">
    //         Female:{' '}
    //         <input
    //           type="radio"
    //           id="female"
    //           name="gender"
    //           value="female"
    //           onChange={handleChangeInput}
    //         />
    //       </label>
    //     </div>

    //     <button type="submit" className="btn btn-dark w-100">
    //       Register
    //     </button>

    //     <p className="my-2">
    //       Already have an account?{' '}
    //       <Link to="/" style={{ color: 'crimson' }}>
    //         Login Now
    //       </Link>
    //     </p>
    //   </form>
    // </div>

    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-10 h-10 mr-2"
            src={barcodeScanner}
            alt="logo"
          ></img>
          Pc Scanner
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="fullname"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  required=""
                  style={{ background: `${alert.full_name ? '#fd2d6a14' : ''}` }}
                ></input>
                <small className="text-sm font-medium text-red-500">
                {alert.full_name ? alert.full_name : ''}
                 </small>
              </div>
              <div>
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChangeInput}
                  value={username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  required=""
                  style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
                  ></input>
                  <small className="text-sm font-medium text-red-500">
                  {alert.username ? alert.username : ''}
                   </small>
              </div>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChangeInput}
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
                ></input>
                <small className="text-sm font-medium text-red-500">
            {alert.email ? alert.email : ''}
             </small>
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChangeInput}
                  value={password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
                ></input>
                <small className="text-sm font-medium text-red-500">
                {alert.password ? alert.password : ''}
             </small>
              </div>
              <div>
                <label
                  for="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="cf_password"
                  id="cf_password"
                  onChange={handleChangeInput}
                  value={cf_password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
                ></input>
                <small className="text-sm font-medium text-red-500">
                {alert.cf_password ? alert.cf_password : ''}
             </small>
              </div>
              {/* <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </input>
                        </div>
                        <div className="ml-3 text-sm">
                          <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div> */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  <Link to="/" style={{ color: "crimson" }}>
                    Login here
                  </Link>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
