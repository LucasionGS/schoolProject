import React, { ReactNode } from "react";
import "./Center.css";

function Center(props: React.HtmlHTMLAttributes<HTMLSpanElement>) {
  return (<span className="center" {...props}>{props.children}</span>);
}

export default Center;