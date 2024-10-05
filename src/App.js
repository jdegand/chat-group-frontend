import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Home from './components/Home';
import Channel from './components/Channel';
import Profile from './components/Profile';
import './App.css';

function App() {

  // moved state up from Home 
  // needed to pass to channel component
  // had to duplicate to be able to have close button on mobile when on a specific channel
  // without duplication - toggling based on mobileToggle value 
  // 1. no close button - you could not see that channels' messages 
  // 2. close button wouldn't disappear - mobileToggle would be undefined
  // setValues of both on clicks in messages component so there should not be sync issues
  // don't want to add global state for just this little piece of logic

  const [mobileToggle, setMobileToggle] = useState(false);
  const [mobileChannelToggle, setMobileChannelToggle] = useState(false);

  const handleMobileToggle = () => {
    setMobileToggle(prev => !prev)
  }

  const handleMobileChannelToggle = () => {
    setMobileChannelToggle(prev => !prev)
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home mobileToggle={mobileToggle} handleMobileToggle={handleMobileToggle} mobileChannelToggle={mobileChannelToggle} handleMobileChannelToggle={handleMobileChannelToggle} />} />
            <Route path="/channels/:channelId" element={<Channel mobileToggle={mobileToggle} mobileChannelToggle={mobileChannelToggle} handleMobileToggle={handleMobileToggle} handleMobileChannelToggle={handleMobileChannelToggle} />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
