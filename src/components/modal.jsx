import React from "react";
import "/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="modal-close-button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default Modal;
