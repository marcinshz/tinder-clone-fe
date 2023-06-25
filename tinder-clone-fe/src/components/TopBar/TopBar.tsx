import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import TopBarCSS from './TopBar.module.scss';

const TopBar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={TopBarCSS.wrapper}>
            <div className="logo">
                <Button
                    rounded
                    label="Tinder clone"
                    text
                    severity="help"
                    icon="pi pi-users"
                    onClick={() => navigate('/')}
                />
            </div>
            <div className={TopBarCSS.details}>
                <Button
                    severity="secondary"
                    type="button"
                    label="Notifications"
                    icon="pi pi-inbox"
                    text
                    raised
                    rounded
                    badge="2"
                    badgeClassName="p-badge-danger"
                />
                <Button
                    rounded
                    text
                    raised
                    severity="secondary"
                    icon="pi pi-arrow-right-arrow-left"
                    onClick={() => navigate('/swipes')}
                />
                <Button
                    rounded
                    text
                    raised
                    severity="secondary"
                    icon="pi pi-user"
                    onClick={() => navigate('/profile')}
                />
                <Button rounded text raised severity="secondary" icon="pi pi-sign-out" />
            </div>
        </div>
    );
};

export default TopBar;
