import React from 'react';
import { User } from '../../model';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }: { user: User }) => {
    console.log(user);
    return <div></div>;
};

export default Profile;
