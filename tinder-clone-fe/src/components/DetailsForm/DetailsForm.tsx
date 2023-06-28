import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Gender, Preferences } from '../../model';
import { classNames } from 'primereact/utils';
import { User } from '../../model';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { updateUser } from '../../DataService';

interface UserProfileInfo {
    name: string;
    sex: number;
    showingGender: number;
    city: string;
    aboutMe: string | undefined;
    education: string | undefined;
    facebookLink: string | undefined;
    instagramLink: string | undefined;
}

const DetailsForm: React.FC<{ user: User; readonly: boolean }> = ({
    user,
    readonly,
}: {
    user: User;
    readonly: boolean;
}) => {
    const toast = React.useRef(null);
    const [updatedUser, setUpdatedUser] = useState<User>(user);

    const show = () => {
        //@ts-ignore
        toast.current.show({ severity: 'success', summary: 'User updated.' });
    };

    const defaultValues: UserProfileInfo = {
        name: user.firstName,
        sex: user.sex,
        showingGender: user.showingGender,
        aboutMe: user.aboutMe,
        city: user.city,
        education: user.education,
        facebookLink: user.facebookLink,
        instagramLink: user.instagramLink,
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
        getValues,
    } = useForm({ defaultValues });

    const onSubmit = async (data: UserProfileInfo) => {
        try {
            toast!.current!.show({
                severity: 'info',
                summary: 'Updating',
                detail: 'Updating user data',
            });
            await setUpdatedUser({ ...data, ...user });
            console.log(updatedUser);
            await updateUser(`${user.id}`, updatedUser);
            await toast!.current!.clear();
            toast!.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Updatinging successfull',
                life: 3000,
            });
        } catch (e) {
            toast!.current!.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Updatinging failed',
                life: 3000,
            });
        }
    };

    const getFormErrorMessage = (name: string) => {
        //@ts-ignore
        return errors[name] ? (
            //@ts-ignore
            <small className="p-error">{errors[name].message}</small>
        ) : (
            <small className="p-error">&nbsp;</small>
        );
    };
    //readonly

    return (
        <div className="card flex justify-content-center mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2 w-4">
                <Toast ref={toast} />
                {/* name */}
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className="p-float-label">
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    disabled={readonly}
                                />
                                <label htmlFor={field.name}>Name</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {/* city */}
                <Controller
                    name="city"
                    control={control}
                    rules={{ required: 'City - City is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.city })}
                            ></label>
                            <span className="p-float-label">
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    disabled={readonly}
                                />
                                <label htmlFor={field.name}>City</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {/* education */}
                <Controller
                    name="education"
                    control={control}
                    rules={{ required: 'Education is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.education })}
                            ></label>
                            <span className="p-float-label">
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    disabled={readonly}
                                />
                                <label htmlFor={field.name}>Education</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {/* about me */}
                <Controller
                    name="aboutMe"
                    control={control}
                    rules={{ required: 'About me is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.aboutMe })}
                            ></label>
                            <span className="p-float-label">
                                <InputTextarea
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    disabled={readonly}
                                    autoResize
                                />
                                <label htmlFor={field.name}>About me</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {/* facebookLink */}
                <Controller
                    name="facebookLink"
                    control={control}
                    rules={{ required: 'Facebook link is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.facebookLink })}
                            ></label>
                            <span className="p-float-label">
                                <InputTextarea
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    disabled={readonly}
                                    autoResize
                                />
                                <label htmlFor={field.name}>Facebook link</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {/* instagram link */}
                <Controller
                    name="instagramLink"
                    control={control}
                    rules={{ required: 'Instagram link is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.instagramLink })}
                            ></label>
                            <span className="p-float-label">
                                <InputTextarea
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    disabled={readonly}
                                    autoResize
                                />
                                <label htmlFor={field.name}>Instagram link</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {!readonly && <Button label="Submit" type="submit" icon="pi pi-check" />}
            </form>
        </div>
    );
};

export default DetailsForm;
