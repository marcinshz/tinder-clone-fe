import React, { PropsWithChildren } from 'react';
import MaintemplateCSS from './MainTemplate.module.scss';
import TopBar from '../components/TopBar/TopBar';
const MainTemplate = (props:{ children:JSX.Element, loggedIn:boolean, setUser:Function }) => {
    return (
        <div className={MaintemplateCSS.wrapper}>
            <TopBar loggedIn={props.loggedIn} setUser={props.setUser}/>
            {props.children}
        </div>
    );
};

export default MainTemplate;
