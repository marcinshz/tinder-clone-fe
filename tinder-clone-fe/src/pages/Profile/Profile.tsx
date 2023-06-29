import React from 'react';
import { User } from '../../model';
import ProfileCSS from './Profile.module.scss';
import Avatar from '../../components/Avatar/Avatar';
import DetailsForm from '../../components/DetailsForm/DetailsForm';
import { Button } from 'primereact/button';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }: { user: User }) => {
    const [readonly, setIsReadonly] = React.useState(true);
    const toggleReadOnly = (): void => setIsReadonly((prev) => !prev);

    return (
        <div className={ProfileCSS.wrapper}>
            <Avatar user={user} />
            <div className="w-12 flex justify-content-center mt-4">
                <Button icon="pi pi-pencil" label="Edit" onClick={toggleReadOnly} />
            </div>
            <DetailsForm user={user} readonly={readonly} />
        </div>
    );
};

export default Profile;
