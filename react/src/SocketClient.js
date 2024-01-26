import { MdOutlineCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import React , { useState, useEffect } from "react";
import useGlobal from "./global"
import { useStateContext } from './contexts/ContextProvider';
import { Header, Button2, Add_Staff, Check_Popup } from './components';
// import { CHECK_TYPES } from './redux/actions/checkAction'


export const SCAN_TYPES = {
  KNOW_SCANNED: 'KNOW_SCANNED',
};

const SocketClient = () => {

    const { currentColor, currentMode, handleClick, isClicked } = useStateContext();

    const barcodeValue = useGlobal(state => state.barcodeValue)

    const dispatch = useDispatch();

    useEffect(() => {
        if (barcodeValue){
        console.log("barcodeValue changed in popo", barcodeValue)
       
        dispatch({
            type: SCAN_TYPES.KNOW_SCANNED,
            payload: barcodeValue
          });


        handleClick('check')
        }
      },[barcodeValue])
    
  return (
    <div>

         {isClicked.check && (<Check_Popup />)}
    </div>
  )
}

export default SocketClient