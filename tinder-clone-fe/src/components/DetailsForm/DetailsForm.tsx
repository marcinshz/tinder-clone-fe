import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Gender } from '../../model';
import { classNames } from 'primereact/utils';

interface UserProfileInfo {
    name: string;
    age: number;
    sex: Gender;
    preferedDistance: number;
    interestedIn: Gender;
}

const DetailsForm: React.FC = () => {
    const [userName, setUserName] = React.useState<string>('redvineenjoyer1337');

    const toast = React.useRef(null);

    const show = () => {
        //@ts-ignore
        toast.current.show({ severity: 'success', summary: 'User updated.' });
    };

    const defaultValues: UserProfileInfo = {
        name: '',
        age: 0,
        sex: Gender.Other,
        preferedDistance: 0,
        interestedIn: Gender.FEMALE,
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
                                />
                                <label htmlFor={field.name}>Name - Surname</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Button label="Submit" type="submit" icon="pi pi-check" />
            </form>
        </div>
    );
};

export default DetailsForm;
