import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./GoBackLink.css";

const GoBackLink = () => {
  const { pathname } = useLocation();
  const targetLocation = pathname
    .split("/")
    .slice(0, pathname.split("/").length - 2)
    .join("/");
  return (
    targetLocation && (
      <Link className="go_back_link" to={targetLocation}>
        <svg
          className="go_back_link__arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </svg>
      </Link>
    )
  );
};

export default GoBackLink;
