import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const Button2 = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, customFunc }) => {
  // const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-14 p-2 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button2;
