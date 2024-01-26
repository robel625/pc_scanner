import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import barcodeScanner from '../data/barcode-scanner.svg';

const Login = () => {

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const history = useHistory();

  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  

  useEffect(() => {
    if (auth.token);
  }, [auth.token]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    // <div className="auth_page">
    //   <form onSubmit={handleSubmit}>
    //     <h3 className="text-uppercase text-center mb-4">R-Network</h3>

    //     <div className="form-group">
    //       <label htmlFor="exampleInputEmail1">Email address</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         name="email"
    //         aria-describedby="emailHelp"
    //         onChange={handleChangeInput}
    //         value={email}
    //       />

    //       <small id="emailHelp" className="form-text text-muted">
    //         We'll never share your email with anyone else.
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
    //         />

    //         <small onClick={() => setTypePass(!typePass)}>
    //           {typePass ? 'Hide' : 'Show'}
    //         </small>
    //       </div>
    //     </div>

    //     <button
    //       type="submit"
    //       className="btn btn-dark w-100"
    //       disabled={email && password ? false : true}
    //     >
    //       Login
    //     </button>

    //     <p className="my-2">
    //       You don't have an account?{' '}
    //       <Link to="/register" style={{ color: 'crimson' }}>
    //         Register Now
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
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
                ></input>
                <small className="text-sm font-medium text-red-500">
                  {alert.email ? alert.email : ""}
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
                  style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
                ></input>
                <small className="text-sm font-medium text-red-500">
                  {alert.password ? alert.password : ""}
                </small>
              </div>
              
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                 You don't have an account?{' '}
                <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  <Link to="/register" style={{ color: "crimson" }}>
                     Register here
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

export default Login;
