import React from 'react';
import AvatarCSS from './Avatar.module.scss';
import { User } from '../../model';

interface AvatarProps {
    user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }: { user: User }) => {
    return (
        <div className={AvatarCSS.wrapper}>
            <div className={AvatarCSS.image}>
                <img src={user.photo} alt="user_image" />
            </div>
        </div>
    );
};

export default Avatar;
