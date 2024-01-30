import { Header, Button2, Add_Staff, Check_Popup } from "../components";
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
import avatar from "../data/avatar.jpg";
import avatar2 from "../data/avatar2.jpg";
import avatar3 from "../data/avatar3.png";
import avatar4 from "../data/avatar4.jpg";
import { GrView } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contextMenuItems } from "../data/dummy";
import { useSelector, useDispatch } from "react-redux";
import { getCheckList } from "../redux/actions/checkAction";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Check = () => {
  // const [open, setOpen] = useState(false);
  const { currentColor, currentMode, handleClick, isClicked } =
    useStateContext();
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };

  const { auth, check } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [check1, setCheck1] = useState("");
  const [device, setDevice] = useState("");
  const [employee, setEmployee] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log("selectedDate", selectedDate);

  console.log("check1", check1);

  useEffect(() => {
    setCheck1(check?.checkList);
    setDevice(check?.checkList?.device);
    setEmployee(check?.checkList?.employee);
  }, [check]);

  useEffect(() => {
    if (auth.token) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      dispatch(getCheckList(formattedDate, auth.token));
    }
  }, [dispatch, auth.token, selectedDate]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="md:flex  justify-between">
        <div className="flex gap-10">
          <Header category="Page" title="Check" />
          {/* <div className="mt-3">
            <Button2
              color="white"
              bgColor={currentColor}
              text="Check"
              borderRadius="10px"
              customFunc={() => handleClick("check")}
            />
          </div> */}
        </div>

        <div
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderColor: "#f0f0f0",
          }}
          className="md:flex items-center"
            >
              <div className="mr-5">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          ></DatePicker>
          </div>
          <div style={{ position: "relative" }}>
            <input
              style={{
                backgroundColor: "#e1e2e4",
                height: 42,
                borderRadius: 26,
                padding: 16,
                fontSize: 16,
                paddingLeft: 50,
              }}
              // value={query}
              // onChangeText={setQuery}
              placeholder="Search..."
              placeholderTextColor="#b0b0b0"
            />
            <IoMdSearch
              style={{
                fontSize: "25px",
                color: "#505050",
                position: "absolute",
                left: 18,
                top: 10,
              }}
            />
          </div>
        </div>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={check1}
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

      {/* {isClicked.check && (<Check_Popup />)} */}
    </div>
  );
};

export default Check;

export const ordersData = [
  {
    id: "1",
    Name: "Robel Gulima",
    status: 1,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
    Gender: "M",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579339",
    Job_Title: "Software Developer",
    Department: "IT",
    EmployeeImage: avatar3,
  },
  {
    id: "2",
    Name: "Emily Nguyen",
    status: 0,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
    Gender: "F",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579340",
    Job_Title: "Product Manager",
    Department: "Marketing",
    EmployeeImage: avatar4,
  },
  {
    id: "3",
    Name: "Jonathan Lee",
    status: 0,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
    Gender: "M",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579341",
    Job_Title: "Data Scientist",
    Department: "Analytics",
    EmployeeImage: avatar2,
  },
  {
    id: "4",
    Name: "Anna Smith",
    status: 1,
    Checked_at: "Friday, 05-04-2021",
    Type: "LapTop",
    Brand: "HP",
    Serial_number: "4A185d48w",
    reason: "",
    Gender: "F",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579342",
    Job_Title: "Graphic Designer",
    Department: "Design",
    EmployeeImage: avatar,
  },
];

const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.employee?.thumbnail}
      alt="employee"
    />
    <p>
      {props.employee?.first_name} {props.employee?.last_name}
    </p>
  </div>
);

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

const gridChecked_at = (props) => (
  <div>
    <label>
      {props.created_at &&
        new Date(props.created_at).toLocaleString("en-US", { hour12: true })}
    </label>
  </div>
);

export const ordersGrid = [
  {
    headerText: "Employee",
    width: "150",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
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
    field: "created_at",
    headerText: "Checked_at",
    template: gridChecked_at,
    width: "200",
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
    field: "barcode",
    headerText: "barcode",
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
