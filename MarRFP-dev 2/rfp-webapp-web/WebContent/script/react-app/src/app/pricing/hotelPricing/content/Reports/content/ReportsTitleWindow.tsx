import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Settings from "../static/Settings";

export const ReportsWindow = ({
  children,
  closeWindowPortal,
  title,
  popup,
}) => {
  let externalWindow;
  const parms = Settings.popupParms;
  if (popup) {
    externalWindow = useRef(window.open("", "", parms));
  } else {
    externalWindow = useRef(window);
  }

  const containerEl = document.createElement("div");

  useEffect(() => {
    const currentWindow = externalWindow.current;
    return () => currentWindow.close();
  }, []);

  externalWindow.current.document.title = title;
  externalWindow.current.document.body.appendChild(containerEl);

  externalWindow.current.addEventListener("beforeunload", () => {
    closeWindowPortal();
  });

  return ReactDOM.createPortal(children, containerEl);
};
