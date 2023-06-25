import React, { PropsWithChildren } from 'react';
import MaintemplateCSS from './MainTemplate.module.scss';
import TopBar from '../components/TopBar/TopBar';
const MainTemplate: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={MaintemplateCSS.wrapper}>
            <TopBar />
            {children}
        </div>
    );
};

export default MainTemplate;
