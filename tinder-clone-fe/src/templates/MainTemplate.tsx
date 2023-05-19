import React from 'react';
import './MainTemplate.scss';
import TopBar from '../components/TopBar/TopBar';

const MainTemplate: React.FC = () => {
	return (
		<div className="wrapper">
			<TopBar />
		</div>
	);
};

export default MainTemplate;
