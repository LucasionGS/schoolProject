import React, { ReactNode } from "react";
import "./Strike.css";

function Strike(props: {children: ReactNode}) {
  return (<span className="strike">{props.children}</span>);
}

export default Strike;