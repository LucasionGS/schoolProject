import React, { ReactNode } from "react";
import "./Underline.css";

function Underline(props: {children: ReactNode}) {
  return (<span className="underline">{props.children}</span>);
}

export default Underline;