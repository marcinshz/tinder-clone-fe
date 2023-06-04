import React from 'react';
import AvatarCSS from './Avatar.module.scss';

interface AvatarProps {
    name: string;
    imageUrl: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, name }) => {
    return (
        <div className={AvatarCSS.wrapper}>
            <div className={AvatarCSS.image}>
                <img src={imageUrl} alt="user_image" />
            </div>
            <h2>{name}</h2>
        </div>
    );
};

export default Avatar;
