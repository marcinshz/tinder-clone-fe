import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Gender, User } from '../../model';
import { classNames } from 'primereact/utils';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider } from 'primereact/slider';

interface PersonalDataDTO {
    name: string;
    aboutMe: string | undefined;
    sex: string;
    city: string;
    showingGender: string;
    showOnlyMyCity: boolean;
    ageRange: Array<number>;
}

interface DetailsFormProps {
    user: User;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ user }) => {
    const toast = React.useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'User updated.' });
    };

    const defaultValues: PersonalDataDTO = {
        name: user.firstName,
        aboutMe: user.aboutMe,
        sex: user.sex,
        city: user.city,
        showingGender: user.showingGender,
        showOnlyMyCity: user.showOnlyMyCity,
        ageRange: [user.ageRangeMin, user.ageRangeMax]
    };

    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm({ defaultValues });

    const onSubmit = (data: PersonalDataDTO) => {
        console.log(data);
        show();
    };

    const getFormErrorMessage = (name: string) => {
        return errors[name] ? (
            <small className='p-error'>{errors[name].message}</small>
        ) : (
            <small className='p-error'>&nbsp;</small>
        );
    };

    return (
        <div className='card flex justify-content-center mt-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-column gap-2 w-4'>
                <Toast ref={toast} />
                <Controller
                    name='name'
                    control={control}
                    rules={{ required: 'Name is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className='p-float-label'>
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
                <Controller
                    name='aboutMe'
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className='p-float-label'>
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                <label htmlFor={field.name}>About me</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name='sex'
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className='p-float-label'>
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                <label htmlFor={field.name}>Sex</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name='showingGender'
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className='p-float-label'>
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                <label htmlFor={field.name}>Showing gender</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name='city'
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            ></label>
                            <span className='p-float-label'>
                                <InputText
                                    id={field.name}
                                    value={field.value}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-12': true })}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                <label htmlFor={field.name}>City</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name='showOnlyMyCity'
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            >Show only my city</label>
                            <span className='p-float-label'>
                                 <InputSwitch inputId={field.name} checked={field.value} inputRef={field.ref}
                                              className={classNames({ 'p-invalid': fieldState.error })}
                                              onChange={(e) => field.onChange(e.value)} />
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name='ageRange'
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <label
                                htmlFor={field.name}
                                className={classNames({ 'p-error': errors.name })}
                            >Age range: {field.value[0]} - {field.value[1]}</label>
                            <span className='p-float-label mt-3'>
                                  <Slider value={field.value} onChange={(e) => field.onChange(e.value)} className="w-14rem" range />
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Button label='Submit' type='submit' icon='pi pi-check' />
            </form>
        </div>
    );
};

export default DetailsForm;
