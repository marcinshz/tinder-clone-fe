import React, { PropsWithChildren } from 'react';
import './MainTemplate.scss';
import TopBar from '../components/TopBar/TopBar';

const MainTemplate: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="wrapper">
			<TopBar />
			{children}
		</div>
	);
};

export default MainTemplate;
