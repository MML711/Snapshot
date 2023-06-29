import React from "react";
import ReactDom from "react-dom";
import "./modal.scss";

/* const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  width: "50%",
  zIndex: 999,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 999,
};

const SPAN_STYLES = {
  position: "fixed",
  top: "5px",
  right: "20px",
  fontSize: "50px",
  fontWeight: "bolder",
  zIndex: 1000,
  cursor: "pointer",
  color: "black",
  userSelect: "none",
}; */

export default function Modal({ onClose, children }) {

  return ReactDom.createPortal(
    <>
      <div className="overlayStyles" /* style={OVERLAY_STYLES} */ onClick={onClose} />
      <div className="modalStyles" /* style={MODAL_STYLES} */>
        <span className="spanStyles" /* style={SPAN_STYLES} */ onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
