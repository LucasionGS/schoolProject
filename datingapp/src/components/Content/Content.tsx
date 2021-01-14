import React, { ReactNode } from "react";
import "./Content.css";

function Content(props: {children: ReactNode, className?: string}) {
  return (<div className={["content"].concat(props.className ? props.className.split(" ") : []).join(" ")}>{props.children}</div>);
}

export default Content;