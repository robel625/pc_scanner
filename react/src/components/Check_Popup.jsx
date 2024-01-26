import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { useSelector, useDispatch } from "react-redux";
import { getChecks, createCheck } from "../redux/actions/checkAction";
import React, { useState, useEffect } from "react";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useStateContext } from "../contexts/ContextProvider";
import profile from "../data/profile.png";

const Check_Popup = () => {
  // const { barcode } = useParams();

  // let barcode = 123

  const { setIsClicked, initialState } = useStateContext();
  const { auth, check } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [check1, setCheck1] = useState("");

  const [exceptions, setExceptions] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    setCheck1(check?.scan);
  }, [check]);

  // useEffect(() => {
  //   if (auth.token) {
  //     dispatch(getChecks(barcode, auth.token));
  //   }
  // }, [dispatch, auth.token, barcode]);

  const handleClick = (status) => {
    if (!reason) {
      if (
        (check1?.status == 0 && status == 0) ||
        (check1?.status == 1 && status == 1)
      ) {
        setExceptions(1);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: "write a reason" },
        });
        return;
      } else {
        setExceptions("");
      }
    }

    console.log("status", status);

    let checkData = {
      status: status,
      barcode: check1?.barcode,
      device: check1?.device?.id || check1?.id,
      employee: check1?.employee?.id,
      exceptions: exceptions ? 1 : 0,
      reason: reason,
    };

    console.log("status2", checkData);

    dispatch(createCheck({ checkData, auth }));

    setIsClicked(initialState);

    // guest ? setUserData({ ...userData, staff: false }) : setUserData({ ...userData, staff: true })

    // console.log("userDatbbbbbbbbbbbba", userData)

    // if (id) {
    //   dispatch(updatePost({ userData, auth, id }));
    // } else {
    //   dispatch(createPost({ userData, auth }));
    // }
  };

  return (
    // <div className=" absolute bg-half-transparent w-full h-full flex justify-center  nav-item top-0 right-0 ">
    //   <div className="fixed md:overflow-hidden overflow-auto md:hover:overflow-auto top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-max h-max max-h-screen">
    //     <div className="flex justify-between items-center">
    //       <div className="flex gap-3">
    //         <p className="font-semibold text-lg dark:text-gray-200">
    //             Checked
    //         </p>
    //       </div>
    //       <Button
    //         icon={<MdOutlineCancel />}
    //         color="rgb(153, 171, 180)"
    //         bgHoverColor="light-gray"
    //         size="2xl"
    //         borderRadius="50%"
    //       />
    //     </div>
    //     <div className="mt-5 ">

    //     </div>
    //   </div>
    // </div>

    <div className=" absolute bg-half-transparent w-full h-full flex justify-center items-center nav-item top-0 right-0 ">
      <div className="relative max-w-md mx-auto  min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl -mt-16 h-max">
        <div className="absolute right-0">
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>

        <div className="px-1">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={check1?.employee?.thumbnail || profile}
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div className="text-center mt-24">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {check1?.employee?.first_name || ""}{" "}
              {check1?.employee?.last_name || ""}
            </h3>
            <div className=" text-sm mt-0 mb-2 text-slate-400 font-bold uppercase">
              {check1?.employee?.job_title || ""}
            </div>
            <div className="text-x mt-0 mb-2 text-slate-400 font-bold ">
              {check1?.barcode || ""}
            </div>
          </div>

          {check1.msg == "nodata" && <div className="text-4xl text-slate-700 font-bold leading-normal mt-10 mb-20 flex justify-center"><div>no data found</div></div>}

          {check1.id && <div>
          <div className="w-full text-center ">
            <div className="flex justify-around">
              <div>
                <div className="flex items-center ml-3 ">
                  <span className="text-sm text-slate-400">Type:</span>
                  <span className="font-light leading-relaxed text-slate-500 ml-2">
                    {check1?.device?.type || check1?.type}
                  </span>
                </div>
                <div className="flex items-center ml-3 ">
                  <span className="text-sm text-slate-400">Model:</span>
                  <span className="font-light leading-relaxed text-slate-500 ml-2">
                    {check1?.device?.model || check1?.model}
                  </span>
                </div>
                <div className="flex items-center ml-3 ">
                  <span className="text-sm text-slate-400">Serial Number:</span>
                  <span className="font-light  text-slate-500 ml-2">
                    {check1?.device?.serial_number || check1?.serial_number}
                  </span>
                </div>
              </div>

              <div className=" flex  items-start mt-2">
                <span className="text-xl font-bold text-slate-700 mr-2">
                  Last Time:
                </span>
                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                  {check1?.status == 1 ? (
                    <span className="in-status">IN</span>
                  ) : check1?.status == 0 ? (
                    <span className="out-status">OUT</span>
                  ) : (
                    <span className="first-use-status">First Use</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {exceptions && (
            <div>
              <label
                for="reason"
                className="block mb-2 mt-3 mx-10 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reason
              </label>
              <textarea
                id="reason"
                name="reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows="3"
                className="block mx-10 p-2.5 w-10/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your reason here..."
              ></textarea>
            </div>
          )}

          <div className="w-full text-center mb-10">
            <div className="flex justify-around lg:pt-4 pt-8 pb-0">
              <div className="p-3 text-center">
                <button
                  className="inline-flex justify-center items-center w-16  h-16 p-2 text-xl font-bold text-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleClick(1)}
                >
                  IN
                </button>
              </div>

              <div className="p-3 text-center">
                <button
                  className="inline-flex justify-center items-center w-16  h-16 p-2 text-xl font-bold text-center text-gray-900 bg-white rounded-full border border-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                  onClick={() => handleClick(0)}
                >
                  Out
                </button>
              </div>
            </div>
          </div>
          </div>}

        </div>
      </div>
    </div>
  );
};

export default Check_Popup;
