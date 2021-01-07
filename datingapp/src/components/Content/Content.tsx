import React, { ReactNode } from "react";
import "./Content.css";

function Content(props: {children: ReactNode}) {
  return (<div className="content">{props.children}</div>);
}

export default Content;