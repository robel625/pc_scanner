import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  import { contextMenuItems } from "../data/dummy";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InPremises() {

    const { auth, dashboard  } = useSelector((state) => state);
    const dispatch = useDispatch();

    const editing = { allowDeleting: true, allowEditing: true };

    const [Inside, setInside] = useState("");

    useEffect(() => {
        setInside(dashboard?.dashboard?.still_in);
      }, [dashboard]);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="md:flex  justify-between">

            </div>
            <GridComponent
                id="gridcomp"
                dataSource={Inside}
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
    )
}

export default InPremises

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
  