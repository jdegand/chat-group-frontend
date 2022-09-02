import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Messages = (props) => {
    const { auth } = useAuth();
    const {channelId} = useParams(); 

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [refreshMessages, setRefreshMessages] = useState(false);

    const getMessagesWithProps = async() => {
        try {
    
            const response = await axios.get(`/channels/${props.topChannelId}/messages`);

            //console.log('props response', response.data)

            setMessages(response.data);

        } catch(err){
            console.log(err)
        }
    }

    const getMessagesWithParams = async() => {
        try {
    
            const response = await axios.get(`/channels/${channelId}/messages`);

            //console.log('params response', response.data)

            //console.log('channelId', response?.data.channelInfo)
            //console.log('channel name', response?.data.channelInfo[0].name)

            setMessages(response.data);

        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {     

        if(channelId === undefined && props.channel === false){
            getMessagesWithProps()
        } else {
            getMessagesWithParams()
        }
        
    }, [refreshMessages, channelId, props.channel]) // messages

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleAddChannel = async (e) => {
        e.preventDefault()
        
        // get auth.accessToken and create header authorization `Bearer ${auth.accessToken}`
        
        // conditional to change post based on topChannelId && channelId

        if(channelId === undefined){
    
            try {

                const response = await axios.post(`/channels/${props.topChannelId}/messages`,
                JSON.stringify({ text }),  {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                }
            );

            // console.log('message id', response.data.success.split(' ')[0])
            // post to update channel and push the response's id to the messages array and channel.save()
            // done on the backend
        
            setText('')
            setRefreshMessages(prev => !prev)

            }catch(err) {
                    console.log(err)
            }

        } else {

            try {
        
            const response = await axios.post(`/channels/${channelId}/messages`,
                JSON.stringify({ text }),  {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                }
            );

            // console.log('message id', response.data.success.split(' ')[0])
            // post to update channel and push the response's id to the messages array and channel.save()
            // done on the backend
        
            setText('')
            setRefreshMessages(prev => !prev)
            } catch (err) {
                if (!err?.response) {
                    console.log('Upload Failed')
                }
        }
        
    }
}

return (
    <div>
        <div className="channel-name-div">
            <div className="mobile-only" onClick={()=> { 
                props.handleMobileToggle()
                props.handleMobileChannelToggle()
                }}> 
                <svg className="modal-icon-xl" viewBox="0 0 24 24">
                    <path fill="#fff" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
            </div>

            <div className={props.mobileToggle || props.mobileChannelToggle ? "close-button-visible" : "close-button-not-visible"} onClick={()=> {
                props.handleMobileToggle()
                props.handleMobileChannelToggle()
            }}>
                <svg className="modal-icon close-button-mobile" viewBox="0 0 24 24">
                    <path fill="#fff" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
            
            {props.topChannelName ? <h1 className="mbs-50">{props.topChannelName}</h1> : null}
            {!props.topChannelName && messages?.channelInfo ? <h1 className="mbs-50">{messages.channelInfo[0].name}</h1>: null}
            {!props.topChannelName && messages?.messages?.length >= 1 ? <h1 className="mbs-50">{messages?.messages[0].channel.name}</h1>: null}
        </div>
        <div className="messages-container">
            {messages?.messages && messages.messages.map(message => {
                return (
                    <div key={message._id} className="flex text-message"> 
                        <div>
                            <img className="message-img" src={message.user.picture} alt=""/>
                        </div>
                        <div className="flex-column">
                            <div className="flex align-baseline">
                                <div className="bolder capitalize">
                                    <p className="mr-20">{message.user.username}</p>
                                </div>
                                <div>
                                    <p className="fs-20">{new Date(`${message.createdAt}`).toLocaleString().replace(',', ' at ')}</p>
                                </div>
                            </div>
                            <div>
                                <p className="white-text">{message.text}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <div>
            <form onSubmit={handleAddChannel} className="message-form">
                <input id="messageInput" className="message-input" type="text" value={text} onChange={handleTextChange} required />
                <label htmlFor="messageInput" className="message-label">Type a message here</label>
                <button className="message-btn" aria-label="Submit message">
                <svg style={{width:"24px",height:"24px" }} viewBox="0 0 24 24">
                    <path fill="#fff" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                </svg>
                </button>
            </form>
        </div>
    </div>
)
}

export default Messages