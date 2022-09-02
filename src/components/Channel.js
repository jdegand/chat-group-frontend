import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Messages from './Messages';
import LoggedInUser from "./LoggedInUser";

const Channel = (props) => {

    const {channelId} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [channel, setChannel] = useState();
    const { auth } = useAuth();
    const [refreshChannel, setRefreshChannel] = useState(false);

    // axios get to channels/:channelId
    // populated to get members - has username and picture for all members
    // map members into sidepanel

    // add auth id to channels array if not already there
    // when you navigate to channel - send post request to axios to add loggedIn user's id to that channels members array
    // create route to handle in backend

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getChannel = async () => {
            try {
                const response = await axiosPrivate.get(`/channels/${channelId}`, {
                    signal: controller.signal
                });
    
                isMounted && setChannel(response.data);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getChannel();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []) // channel  - updates when members array changes but causes many requests to be fired

    
    // Adding a cleanup to this - userInfo profile undefined
    useEffect(() => {
        const getChannel = async () => {
            try {
                const response = await axiosPrivate.get(`/channels/${channelId}`);
    
                setChannel(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getChannel();

    }, [refreshChannel])

    // add user to channel on first navigation to channel
    // need to use axios put to channel
    
    useEffect(()=> {
        const updateChannel = async () => {
            try {
                const response = await axiosPrivate.get(`/channels/channel/${channelId}/user/${auth.user}/userId/${auth.id}`);
    
                //console.log('updateChannel',response)
            } catch (err) {
                console.error(err);
            }
        }
        updateChannel();
        setRefreshChannel(prev => !prev) // move this into try block ?
    }, [])
    

    // replaced this useEffect by using populate when getting the channel to display the messages
    /*
    useEffect(()=> {
        const getChannelMessages = async () => {
            try {
                const response = await axiosPrivate.get(`/channels/${channelId}/messages`);
    
                console.log('getChannelMessages', response)
                setMessages(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getChannelMessages();
    }, [])
    */

    return (
        <div className="flex">
            <div>
            <section className={props.mobileToggle ? "channels-section channels-section-mobile" :"channels-section mobile-hidden"}>
            <div>
                <div className="flex align-center">
                    <div className="back-link">
                        <Link to="/" aria-label="Go Back to Channels">
                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                        </Link>
                    </div>
                    <h1 className="white-text">All Channels</h1>
                </div>
                <h2 className="ml-10 mb-20">
                    {channel?.name}
                </h2>
                <h3 className="ml-10 mb-20">
                    {channel?.description}
                </h3>
                <div className="channel-members-div">
                {
                    channel?.members.map(member => {
                        return (
                            <div className="channel-member-div" key={member._id}>
                                <span><img className="channel-member-div-img" src={member.picture} alt="" /></span>
                                <span className="ml-10">{member.username}</span>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            </section>
            <LoggedInUser mobileToggle={props.mobileToggle} channel={true} />
            </div>
            <div>
            <Messages 
                handleMobileToggle={props.handleMobileToggle} 
                mobileChannelToggle={props.mobileChannelToggle} 
                handleMobileChannelToggle={props.handleMobileChannelToggle} 
                channel={true} 
            />
            </div>
        </div>
    )
}

export default Channel