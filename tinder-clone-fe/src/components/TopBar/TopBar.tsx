import React from 'react';
import './TopBar.scss';
import { Button } from 'primereact/button';

const TopBar: React.FC = () => {
	return (
		<div className="topbar-wrapper">
			<div className="logo">HERE WILL BE LOGO</div>
			<div className="details">
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
				<Button rounded text raised severity="secondary" icon="pi pi-user" />
				<Button rounded text raised severity="secondary" icon="pi pi-sign-out" />
			</div>
		</div>
	);
};

export default TopBar;
