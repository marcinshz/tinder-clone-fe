import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Gender } from '../../model';
import { classNames } from 'primereact/utils';
import { User } from '../../model';
import { Dropdown } from 'primereact/dropdown';

interface UserProfileInfo {
    name: string;
    sex: string;
    interestedIn: string;
}

const DetailsForm: React.FC<{ user: User; readonly: boolean }> = ({
    user,
    readonly,
}: {
    user: User;
    readonly: boolean;
}) => {
    const toast = React.useRef(null);
    console.log(user);

    const show = () => {
        //@ts-ignore
        toast.current.show({ severity: 'success', summary: 'User updated.' });
    };

    const defaultValues: UserProfileInfo = {
        name: user.firstName,
        sex: user.sex,
        interestedIn: user.showingGender,
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    const onSubmit = (data: UserProfileInfo) => {
        console.log(data);
        show();
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

    const genderOptions = Object.values(Gender).map((g) => ({
        name: g.toLowerCase(),
        value: g,
    }));

    return (
        <div className="card flex justify-content-center mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2 w-4">
                <Toast ref={toast} />
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required.' }}
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
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="sex"
                    control={control}
                    rules={{ required: 'Sex is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className="p-float-label">
                                <Dropdown
                                    id={field.name}
                                    value={field.value}
                                    placeholder="Sex"
                                    options={genderOptions}
                                    optionLabel="value"
                                    focusInputRef={field.ref}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    disabled={readonly}
                                />
                                <label htmlFor={field.name}>Sex</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="interestedIn"
                    control={control}
                    rules={{ required: 'Your preferences is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className="p-float-label">
                                <Dropdown
                                    id={field.name}
                                    value={field.value}
                                    placeholder="Interested in"
                                    options={genderOptions}
                                    optionLabel="value"
                                    focusInputRef={field.ref}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    disabled={readonly}
                                />
                                <label htmlFor={field.name}>Interested in</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {!readonly && <Button label="Save" type="submit" icon="pi pi-save" />}
            </form>
        </div>
    );
};

export default DetailsForm;
