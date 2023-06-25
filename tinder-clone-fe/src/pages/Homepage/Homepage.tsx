import React, { useEffect } from 'react';
import ActionBar from '../../components/ActionBar/ActionBar';
import { User } from '../../model';
import { useNavigate } from 'react-router-dom';

const Homepage = (props: { user: User | undefined }) => {
    const navigate = useNavigate()

    useEffect(() => {
        console.log('home', props.user)
        if (!props.user) navigate('/login');
    }, [props])

    return <ActionBar />;
};

export default Homepage;
