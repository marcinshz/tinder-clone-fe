import { useEffect } from 'react'
import { User } from '../model';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage';
import Profile from '../pages/Profile/Profile';

export default function UserAccessTemplate(props: { user: User | undefined }) {
    const { user } = props;
    const navigate = useNavigate()

    useEffect(() => {
        console.log('user', user)
        if (!user) navigate('/login')
    }, [user])
    return (
        <div className="user-access-template">
            {user ?
                <Routes>
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/profile" element={<Profile user={user} />} />
                </Routes>
                :
                <></>
            }
        </div>
    )
}
