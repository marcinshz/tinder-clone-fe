import MainTemplate from './templates/MainTemplate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { User } from './model';
import LoginPage from './pages/LoginPage/LoginPage';
import UserAccessTemplate from './templates/UserAccessTemplate';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
    const [user, setUser] = useState<User>();

    return (
        <BrowserRouter>
            <MainTemplate>
                <Routes>
                    <Route path="/register" element={<RegisterPage setUser={setUser} />} />
                    <Route path="/login" element={<LoginPage setUser={setUser} />} />
                    <Route path="*" element={<UserAccessTemplate user={user} />} />
                </Routes>
            </MainTemplate>
        </BrowserRouter>
    );
}

export default App;
