import {Link} from "react-router-dom";
import React from "react";

const BackButton = (props) => {
  return (
    <Link to={props.to} className="back-button">
      <i className="far fa-arrow-alt-circle-left"/>
    </Link>
  );
};

export default BackButton;