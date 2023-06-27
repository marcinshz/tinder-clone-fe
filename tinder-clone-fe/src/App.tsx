import MainTemplate from './templates/MainTemplate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from './model';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Homepage from './pages/Homepage/Homepage';
import Profile from './pages/Profile/Profile';
import SwipingArea from './pages/SwipingArea/SwipingArea';

function App() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        if (user) {
            let tmp = sessionStorage.getItem('user');
            if (!tmp) sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            let tmp = sessionStorage.getItem('user');
            if (tmp) {
                setUser(JSON.parse(tmp));
            }
        }
    }, [user]);

    return (
        <BrowserRouter>
            <MainTemplate>
                <Routes>
                    <Route path="/register" element={<RegisterPage setUser={setUser} user={user} />} />
                    <Route path="/login" element={<LoginPage setUser={setUser} user={user} />} />
                    <Route path="/" element={<Homepage user={user} />} />
                    {user && <Route path="/profile" element={<Profile user={user} />} />}
                    {user && <Route path="/swipes" element={<SwipingArea user={user} />} />}
                </Routes>
            </MainTemplate>
        </BrowserRouter>
    );
}

export default App;
