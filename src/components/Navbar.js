import { Link } from "react-router-dom"

const NavBar = (props) => {
    return (
        <nav>
            <div>
                <h1>Chat Group</h1>
            </div>
            <div className="right-side-nav">
                <div>
                    <Link to="/">Home</Link>
                </div>
                <button className="nav-btn log-out" onClick={props.signOut}>Log Out</button>
            </div>
        </nav>
    )
}

export default NavBar