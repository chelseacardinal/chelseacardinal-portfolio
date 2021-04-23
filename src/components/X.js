import React from "react";

function xIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="22"
      fill="none"
      viewBox="0 0 16 22"
      style={{display: "block", width: "100%", height: "auto"}}
    >
      <path
        stroke={props.color}
        d="M0 -0.5L25.239 -0.5"
        transform="matrix(-.5547 .83205 -.5547 -.83205 15 0)"
      ></path>
      <path
        stroke={props.color}
        d="M0 -0.5L25.239 -0.5"
        transform="matrix(-.5547 -.83205 .5547 -.83205 15 21)"
      ></path>
    </svg>
  );
}

export default xIcon;