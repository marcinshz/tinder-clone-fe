import React from 'react';
import { User } from '../../model';
import ProfileCSS from './Profile.module.scss';
import Avatar from '../../components/Avatar/Avatar';
import DetailsForm from '../../components/DetailsForm/DetailsForm';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }: { user: User }) => {
    return (
        <div className={ProfileCSS.wrapper}>
            {user ? <>
                <Avatar imageUrl={user.photo} name={user.firstName} />
                <DetailsForm />
            </> : <></>}
        </div>
    );
};

export default Profile;
