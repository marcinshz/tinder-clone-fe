import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { CreateUserDto, User } from '../../model';
import { InputTextarea } from 'primereact/inputtextarea';
import { updateUser } from '../../DataService';
import { formatDate } from '../../utils';

// interface UserProfileInfo {
//     firstName: string;
//     sex: number;
//     showingGender: number;
//     city: string;
//     aboutMe: string | undefined;
//     education: string | undefined;
//     facebookLink: string | undefined;
//     instagramLink: string | undefined;
// }

const DetailsForm: React.FC<{ user: User; readonly: boolean }> = ({
    user,
    readonly,
}: {
    user: User;
    readonly: boolean;
}) => {
    const defaultValues: CreateUserDto = {
        mail: user.mail,
        password: user.password,
        firstName: user.firstName,
        birthDate: formatDate(user.birthDate),
        sex: user.sex,
        city: user.city,
        aboutMe: user.aboutMe,
        height: user.height,
        education: user.education,
        job: user.job,
        photo: user.photo,
        facebookLink: user.facebookLink,
        instagramLink: user.instagramLink,
        showingGender: user.showingGender,
    };

    const toast = React.useRef(null);

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    const onSubmit = async (data: CreateUserDto) => {
        console.log(data);
        try {
            toast!.current!.show({
                severity: 'info',
                summary: 'Updating',
                detail: 'Updating user data',
            });
            await updateUser(`${user.id}`, data);
            console.log('data:', data);
            await toast!.current!.clear();
            toast!.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Updatinging successfull',
                life: 3000,
            });
        } catch (e) {
            console.log(e);
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

    return (
        <div className="card flex justify-content-center mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2 w-4">
                <Toast ref={toast} />
                {/* name */}
                <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: 'Name - Surname is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.firstName })}
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
