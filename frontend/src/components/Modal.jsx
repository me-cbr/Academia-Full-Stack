import React from 'react';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content-container">
                <button onClick={onClose} className="modal-close-btn">
                    <span className="text-xl">&times;</span>
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;