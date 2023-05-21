import React from 'react';
import ActionBarCSS from './ActionBar.module.scss';
import { Button } from 'primereact/button';

const ActionBar: React.FC = () => {
    return (
        <div className={ActionBarCSS.wrapper}>
            <Button rounded severity="danger" icon="pi pi-times" />
            <Button rounded severity="secondary" icon="pi pi-undo" />
            <Button rounded severity="success" icon="pi pi-heart" />
        </div>
    );
};

export default ActionBar;
