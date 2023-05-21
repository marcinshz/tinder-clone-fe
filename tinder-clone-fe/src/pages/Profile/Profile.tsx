import React from 'react';
import { User } from '../../model';
import ProfileCSS from './Profile.module.scss';
import Avatar from '../../components/Avatar/Avatar';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }: { user: User }) => {
    console.log(user);
    return (
        <div className={ProfileCSS.wrapper}>
            <Avatar imageUrl={user.photo} name={user.firstName} />
        </div>
    );
};

export default Profile;
