import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Button2, Add_Staff, Add_Device } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { CiEdit } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

import { contextMenuItems } from "../data/dummy";
import checkin from "../data/checkin.png";
import checkout from "../data/checkout.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions/employeeAction';
import { getDevices, deleteDevice, getdevice_byid } from '../redux/actions/deviceAction';
import { getall_byid } from '../redux/actions/checkAction';
import { deletePost } from '../redux/actions/postAction';
import React, { useState, useEffect } from "react";


export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short', // Adjust time zone display as needed
  };

  return date.toLocaleString('en-US', options); // Adjust locale if needed
}



const Staff = () => {
  const { id } = useParams();
  const { currentColor, currentMode, handleClick, isClicked } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };

  const { auth, check } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [data, setdata] = useState("");

  // useEffect(() => {
  //   setdata(check?.byid)
  // }, [check]);

  const [staff, setStaff] = useState(true);

  const [deviceItem, setDeviceItem] = useState("");

  console.log("staff_id", staff)
 

  useEffect(() => {
    if (auth.token) {
      dispatch(getall_byid(id, auth.token));
      // dispatch(getdevice_byid(id, auth.token));
      // dispatch(getemployee_byid(id, auth.token));
    }
  }, [dispatch, auth.token, id]);

  useEffect(() => {
     if (check?.employee?.staff){
       setStaff(true)
     }
     else { setStaff(false) }

  }, [check]);

  return (
    <div>
      {/* className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900"> */}
      <div className="bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg md:h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          ></img>
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src={check?.employee?.thumbnail || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"}
            alt="Woman looking front"
          ></img>
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{check?.employee?.first_name || ''} {check?.employee?.last_name || ''}</h2>
          <p className="text-gray-500">{check?.employee?.job_title || ''}</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-center">
          <li className="flex flex-col items-center justify-around">
            {/* <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg> */}
            <div className="flex-1 items-center px-8 py-4 border-r border-gray-200 ">
              <p className="font-bold text-xl">Last Check In</p>
              <p className="text-gray-600 text-base"> {!isNaN(new Date(check?.last_CheckIn?.updated_at)) ?
                new Date(check?.last_CheckIn?.updated_at).toLocaleString() :
                ''}</p>
            </div>
          </li>
          <li className="flex flex-col items-center justify-around">
            {/* <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg> */}
            <div className="flex-1 items-center px-8 py-4">
              <p className="font-bold text-xl">Last Check Out</p>
              <p className="text-gray-600 text-base"> {!isNaN(new Date(check?.last_CheckOut?.updated_at)) ?
                new Date(check?.last_CheckOut?.updated_at).toLocaleString() :
                ''}</p>
            </div>
          </li>
        </ul>

        <div className="bg-white mt-2 overflow-hidden shadow rounded-lg border">
          <div className="flex justify-between">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the employee .
              </p>
              <div className="flex items-center justify-start gap-6">
                <FaUserEdit style={{ fontSize: "25px", color: `${currentColor}` }}
                  onClick={() => handleClick("add_Staff")} />
                <div onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${check?.employee?.first_name || ''} ${check?.employee?.last_name || ''}`)) {
                    dispatch(deletePost({ id, auth }));
                  }
                }}>
                  <MdOutlineDeleteForever
                    style={{ fontSize: "25px", color: `${currentColor}` }}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <Button2
                color="white"
                bgColor={currentColor}
                text="+ Device"
                borderRadius="10px"
                size={20}
                customFunc={() => handleClick("add_device")}
              />
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {check?.employee?.first_name || ''} {check?.employee?.last_name || ''}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {check?.employee?.email || ''}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {check?.employee?.mobile || ''}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Staff</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {check?.employee?.staff ? "True" : "False"}
                </dd>
              </div>
              {staff && <> <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">EEU ID</dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {check?.employee?.eeu_id || ''}
                </div>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {check?.employee?.department || ''}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Job Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {check?.employee?.job_title || ''}
                </dd>
              </div>
             </> }
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Device Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the Device.
          </p>

        </div>

        {check?.device && check?.device?.length > 0 ? (
          <div>
            {check?.device?.map((item) => (
              <>
                {/* <div className="flex items-center justify-start gap-6">
                  <CiEdit style={{ fontSize: "25px", color: `${currentColor}` }}
                    onClick={() => { handleClick("add_device"); setDeviceItem(item); }} />
                  <MdOutlineDeleteForever
                    style={{ fontSize: "25px", color: `${currentColor}` }}
                  />
                </div> */}



                <div className="flex shadow m-5 rounded-lg border">

                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Type</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {item.type}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Model</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {item.model}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Serial_number</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {item.serial_number}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">barcode</dt>
                      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {item.barcode}
                      </div>
                    </div>
                  </dl>
                </div>

                <div>
                <img
                                className="mb-4 mt-4 rounded-lg  max-h-52 max-w-52 sm:mb-0 xl:mb-4 2xl:mb-0"
                                src={item.thumbnail
                                }
                                alt="picture"
                            />

               <div className="flex items-center justify-start gap-6 mt-5 mb-5">
                  <CiEdit style={{ fontSize: "25px", color: `${currentColor}` }}
                    onClick={() => { handleClick("add_device"); setDeviceItem(item); }} />
                  <div onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${item.model} ${item.serial_number}?`)) {
                         dispatch(deleteDevice(item.id, auth)); // Pass props.id and auth directly
                      }
                    }}>
                  <MdOutlineDeleteForever
                    style={{ fontSize: "25px", color: '#96153e' }}

                  />
                  </div>
                </div>

                </div>


                </div>
              </>
            ))} </div>) : (
          <p>No devices found.</p>
        )}
      </div>

      <div className="bg-white mt-2 overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">checked</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the checkin and checkout.
          </p>
        </div>

        <GridComponent
          id="gridcomp"
          dataSource={check?.check}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
            ]}
          />
        </GridComponent>
      </div>

      
      {isClicked.add_Staff && <Add_Staff guest={!staff} id={id} employee={check?.employee} />}
     
      {isClicked.add_device && <Add_Device employee_id={check?.employee?.id} device={deviceItem} />}
    </div>
  );
};

export default Staff;

export const ordersData = [
  {
    id: "1",
    status: 1,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
  },
  {
    id: "1",
    status: 0,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
  },
  {
    id: "1",
    status: 0,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
  },
  {
    id: "1",
    status: 1,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
  },
];

export const gridOrderImage = (props) => (
  <div>
    {props.status ? (
      <FontAwesomeIcon
        icon="fa-sign-in"
        size={30}
        color="#20d080"
        style={{
          marginRight: 10,
        }}
      />
    ) : (
      <FontAwesomeIcon
        icon="fa-sign-out"
        size={30}
        color="#F85B5B"
        style={{
          marginRight: 10,
        }}
      />
    )}
  </div>
);

export const gridOrderStatus = (props) => (
  <div>
    <label>{props.status ? "checked in" : "checked out"}</label>
  </div>
);

export const gridOrderdate = (props) => (
  <div>
    <label>{new Date(props.updated_at).toLocaleString()}</label>
  </div>
);


export const ordersGrid = [
  {
    headerText: "Icon",
    template: gridOrderImage,
    textAlign: "Center",
    width: "120",
  },
  {
    headerText: "status",
    template: gridOrderStatus,
    width: "150",
    textAlign: "Center",
  },
  {
    field: "updated_at",
    headerText: "Checked_at",
    template: gridOrderdate,
    width: "150",
    textAlign: "Center",
  },
  {
    field: "device.type",
    headerText: "Type",
    textAlign: "Center",
    width: "150",
  },
  {
    field: "device.model",
    headerText: "Model",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "device.serial_number",
    headerText: "Serial_number",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "reason",
    headerText: "reason",
    width: "150",
    textAlign: "Center",
  },
];
