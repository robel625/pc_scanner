import React from 'react'

// const Toast = ({msg, handleShow, bgColor}) => {
//     return (
//         <div className={`toast show position-fixed text-light ${bgColor}`}
//         style={{top: '5px', right: '5px', minWidth: '200px', zIndex: 50}}>
//             <div className={`toast-header text-light ${bgColor}`}>
//                 <strong className="mr-auto text-light">{msg.title}</strong>
//                 <button className="ml-2 mb-1 close text-light"
//                 data-dismiss="toast" style={{outline: 'none'}}
//                 onClick={handleShow}>
//                     &times;
//                 </button>
//             </div>
//             <div className="toast-body">
//                 {msg.body}
//             </div>
//         </div>
//     )
// }

const Toast = ({ msg, handleShow, bgColor }) => {
    return (
      <div className={`fixed top-5 right-5 bg-${bgColor} text-white px-4 py-3 rounded-md shadow-md min-w-200`} style={{ zIndex: "1000" }}>
        <div className="flex items-center justify-between">
          <strong className="mr-auto">{msg.title}</strong>
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            data-dismiss="toast"
            onClick={handleShow}
          >
            &times;
          </button>
        </div>
        <div className="mt-2">{msg.body}</div>
      </div>
    );
  };

export default Toast
