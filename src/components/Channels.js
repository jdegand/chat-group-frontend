import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Channels = (props) => {
    // pass prop to run useEffect again
    const [channels, setChannels] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    // anything in the dependency array - causes many requests to be fired
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getChannels = async () => {
            try {
                const response = await axiosPrivate.get('/channels', {
                    signal: controller.signal
                });
                
                isMounted && setChannels(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getChannels();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    

    useEffect(() => {
        const getChannels = async () => {
            try {
                const response = await axiosPrivate.get('/channels');

                // add channelId to url ???
    
               setChannels(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getChannels();

    }, [props.refreshChannels])

    return (
        <section className={props.mobileToggle ? "channels-section channels-section-mobile" : "channels-section mobile-hidden"}>
            <div className="channel-flex">
                <div>
                    <h1 className="white-text">Channels</h1>
                </div>
                <div>
                    <button className="nav-btn" aria-label="Add channel" onClick={() => props.setIsOpen(prev => !prev)}>
                        <svg style={{width:"24px",height:"24px" }}  viewBox="0 0 24 24">
                            <path fill="#fff" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex wrap mbs-20">
                    <form onSubmit={props.handleSubmit}>
                        <div className="floatingGroup">
                        <input className="searchInput" id="search" maxLength={30} value={props.searchTerm} onChange={props.handleSearch} required />
                        <label className="floatingLabel" htmlFor="search">Search</label>
                        <button className="searchBtn" title="Search">
                        <svg style={{width:"24px",height:"24px" }}  viewBox="0 0 24 24">
                            <path fill="#fff" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                        </button>
                        </div>
                    </form>
                </div>
        <div className="channel-names-container">
            {props.searchTerm ? 
            channels.filter(channel => channel.name.toLowerCase().includes(props.searchTerm.toLowerCase())).map(channel => (
                <h2 key={channel._id} className="channel-names-container-h2">
                <Link to={`channels/${channel._id}`}>
                {channel.name}
                </Link>
                </h2>
            )): 
            channels.map(channel => (
                <h2 key={channel._id} className="channel-names-container-h2">
                <Link to={`channels/${channel._id}`}>
                {channel.name}
                </Link>
                </h2>
            ))
            }
        </div>
        </section>
    );
};

export default Channels;

