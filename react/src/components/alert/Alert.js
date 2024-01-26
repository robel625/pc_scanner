import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { toast, Toaster } from 'react-hot-toast';

import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const { alert } = useSelector(state => state)
   
   
   const handleToast = (message, type) => {
     toast(message, { type, duration: 5000, id: Date.now() });
    };


    return (
        <div>
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
            {alert.loading && <Loading />}

            {alert.error && handleToast(alert.error, 'error')}
            {alert.success && handleToast(alert.success, 'success')}
        </div>
    )
}

export default Notify
