import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            // request to get welcome channel's id or create welcome channel - so can route to it
            const allChannels = await axios.get('/channels')

            const welcomeChannelExists = allChannels.data.filter(channel => channel.name.trim().includes('Welcome'))[0]

            // changed the backend to send back userId and accessToken
            const accessToken = response?.data?.accessToken;
            const id = response?.data?.id;

            setAuth({ user, accessToken, id });  // don't really need user anymore
            setUser('');
            setPwd('');
            //navigate(from, { replace: true }); // navigate to welcome channel

            if (welcomeChannelExists) {

                // have to check if you are already a member of welcome channel 
                // if you have already seen it - navigate to home component and pick what channel you want
                // otherwise you will always go to the welcome channel 

                if (welcomeChannelExists.members.includes(id)) {
                    navigate(from, { replace: true });
                } else {
                    navigate(`/channels/${welcomeChannelExists._id}`, { replace: true });
                }
            } else {

                try {
                    await axios.post('/channels',
                        JSON.stringify({ name: "Welcome", description: "Welcome to Chat Group application." }), {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                        withCredentials: true
                    }
                    );
                } catch (err) {
                    console.log(err)
                }

                navigate(`/channels/${welcomeChannelExists._id}`, { replace: true });
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <section className="login-section">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Devchallenges Chat Group</h1>
            <h2>Sign In</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login