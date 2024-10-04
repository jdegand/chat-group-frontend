import { useState, useEffect } from 'react';
import Channels from "./Channels";
import Modal from './Modal';
import ClickOutside from './ClickOutside';
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import LoggedInUser from './LoggedInUser';
import Messages from './Messages';

const Home = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshChannels, setRefreshChannels] = useState(false);
    const { auth, setAuth } = useAuth();
    const { id } = auth;

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [topChannelId, setTopChannelId] = useState('');
    const [topChannelName, setTopChannelName] = useState('');

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    // not really necessary
    const handleSubmit = async (e) => {
        e.preventDefault();
        // pass searchTerm to channels component to filter results
        //setSearchTerm('');
    }

    const handleAddChannel = async (e) => {
        e.preventDefault()

        // get auth.accessToken and create header authorization `Bearer ${auth.accessToken}`
        // Add the token to axios private?

        try {

            await axios.post('/channels',
                JSON.stringify({ name, description }), {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                withCredentials: true
            }
            );

            setName('')
            setDescription('')
            setRefreshChannels(prev => !prev) // this will cause a re-run of useEffect in Channels  
        } catch (err) {
            if (!err?.response) {
                console.log('Upload Failed')
            }
        }
    }

    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`/users/${id}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                withCredentials: true
            })

            // update auth state with user's picture and refreshToken
            // might not need to pass refreshToken but I did it for now

            // problem with picture not rendering with first load to welcome channel
            setAuth(prev => {
                return {
                    ...prev,
                    picture: response?.data.picture,
                    refreshToken: response?.data.refreshToken
                }
            });
        }
        fetchUser()
    }, [id, setAuth, auth.accessToken])

    // add useEffect to display latest channels messages

    useEffect(() => {
        const getChannels = async () => {
            try {
                const response = await axios.get('/channels')

                // add channelId to url ???

                setTopChannelName(response.data[0].name)

                setTopChannelId(response.data[0]._id)
            } catch (err) {
                console.error(err)
            }
        }

        getChannels()

    }, [])


    return (
        <div className="flex">
            <ClickOutside isOpen={isOpen} onClickOutside={handleClose}>
                <Modal isOpen={isOpen}>
                    <div>
                        <h1>NEW CHANNEL</h1>
                        <form className="add-channel-form" onSubmit={handleAddChannel}>
                            <label htmlFor="name">Channel name</label>
                            <input id="name" className="modal-input" value={name} onChange={handleName} required />
                            <br />
                            <label htmlFor="description">Channel description</label>
                            <input id="description" className="modal-input" type="text" value={description} onChange={handleDescription} required />
                            <div className="modal-btn-container">
                                <button className="cancel-btn" type="button" onClick={() => setIsOpen(prev => !prev)}>Cancel</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </ClickOutside>
            <div>
                <Channels
                    setIsOpen={setIsOpen}
                    refreshChannels={refreshChannels}
                    handleSubmit={handleSubmit}
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    mobileToggle={props.mobileToggle}
                    mobileChannelToggle={props.mobileChannelToggle}
                />
                <LoggedInUser mobileToggle={props.mobileToggle} />
            </div>
            {topChannelId &&
                <Messages
                    topChannelId={topChannelId}
                    topChannelName={topChannelName}
                    channel={false}
                    mobileToggle={props.mobileToggle}
                    handleMobileToggle={props.handleMobileToggle}
                    handleMobileChannelToggle={props.handleMobileChannelToggle}
                />
            }
        </div>
    )
}

export default Home