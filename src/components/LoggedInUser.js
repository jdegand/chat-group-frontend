import Modal from "./Modal"
import ClickOutside from "./ClickOutside"
import useLogout from "../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const LoggedInUser = (props) => {

    const { auth } = useAuth();
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    const handleProfileModalClose = () => {
        setProfileModalOpen(false)
    }

    // profile necessary so I don't have to rework Modal component or duplicate it

    // props.mobileToggle || props.channel - moved mobileToggle update in state to just use that

    return (
        <>
        <div className={props.mobileToggle ? "loggedin-user-div desktop-flex-mobile": "loggedin-user-div desktop-flex"}>
        {auth && <img className="loggedin-user-picture" src={auth?.picture} alt="" />}
        {auth && <p className="capitalize">{auth.user}</p>}
        <button className={profileModalOpen ? "profile-menu-btn profile-menu-btn-open" : "profile-menu-btn"} aria-label="Toggle Profile Menu" onClick={() => setProfileModalOpen(prev => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#fff" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
        </button>
    </div>
    <ClickOutside onClickOutside={handleProfileModalClose}>
        <Modal isOpen={profileModalOpen} profile={true}>
            <ul>
                <li className="modal-li mbe-20">
                    <svg className="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="#FFF" d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                    </svg>
                    <span><Link to={`/profile/${auth.id}`}>My Profile</Link></span></li>
                <li className="modal-li mbe-20">
                <svg className="modal-icon" viewBox="0 0 24 24">
                    <path fill="#fff" d="M21.8 18.36L16.03 8.08C15.93 8 15.63 7.43 15.03 7.43C14.78 7.43 14.43 7.53 14.07 8.08L13.33 9.26L11.31 5.65C11.26 5.55 10.91 5 10.31 5C10.06 5 9.66 5.1 9.36 5.65L2.18 18.31C2.13 18.41 1.83 19 2.13 19.5C2.23 19.75 2.53 20 3.19 20H20.85C20.95 20 21.6 20 21.9 19.5C22 19.26 22.1 18.86 21.8 18.36M8.1 18.31L7.95 18.86H3.24L10.36 6.34L12.66 10.47L8.1 18.31M9.21 18.86L13.32 11.66L17.5 18.86H9.21M18.74 18.86L18.54 18.31L14 10.46L15.03 8.73L20.75 18.86H18.74Z" />
                </svg>
                <span> Tweeter</span>
                </li>
                <hr />
                <li className="modal-li">
                <svg className="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="red" d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
                </svg>
                    <button className="nav-btn log-out" onClick={signOut}>Log Out</button>
                </li>
            </ul>
        </Modal>
    </ClickOutside>
    </>
    )
}

export default LoggedInUser