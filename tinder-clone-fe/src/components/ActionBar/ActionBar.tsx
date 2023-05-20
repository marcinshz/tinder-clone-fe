import React from 'react';
import './ActionBar.scss';
import { Button } from 'primereact/button';

const ActionBar: React.FC = () => {
	return (
		<div className="actionbar-wrapper">
			<Button rounded severity="danger" icon="pi pi-times" />
			<Button rounded severity="secondary" icon="pi pi-undo" />
			<Button rounded severity="success" icon="pi pi-heart" />
		</div>
	);
};

export default ActionBar;
