import React from "react";
import "/Users/bashshesh/Downloads/gh/mortgage-calculator/src/App.css";
import { useTranslation } from 'react-i18next';

const Modal = ({ isOpen, onClose, children }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="modal-close-button" onClick={onClose}>
                    {t('Закрыть')}
                </button>
            </div>
        </div>
    );
};

export default Modal;
