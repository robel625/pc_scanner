import React from "react";
import './loading.css';

// const Loading = () => {
//     return (
//         <div className="position-fixed w-100 h-100 text-center loading"
//         style={{background: "#0008", color: "white", top: 0, left: 0, zIndex: 50}}>

//             <svg width="205" height="250" viewBox="0 0 40 50">
//                 <polygon stroke="#fff" strokeWidth="1" fill="none"
//                 points="20,1 40,40 1,40" />
//                 <text fill="#fff" x="5" y="47">Loading</text>
//             </svg>

//         </div>
//     )
// }

    

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center text-white">
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </div>
  );
};

export default Loading;


