const Modal = ({ isOpen, profile, children }) => {
    if (!isOpen) return null;

    return (
        <div>
            <div className={profile ? "profile-modal" : "modal"}>
                <div className={profile ? "profile-modal-content" : "modal-content"}>{children}</div>
            </div>
        </div>
    )
}

export default Modal;