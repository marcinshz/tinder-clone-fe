import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.scss';
import { FileUpload } from 'primereact/fileupload';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { padTo2Digits, formatDate } from '../../utils';
import { MultiSelect } from 'primereact/multiselect';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { Checkbox } from 'primereact/checkbox';
import { User } from '../../model';
import { login, register, uploadImage } from '../../DataService';

const hobbyOptions = [
    { name: 'piwo', value: 'piwo' },
    { name: 'komputerki', value: 'komputerki' },
];

export default function RegisterPage(props: { setUser: Function; user: User | undefined }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(
        'https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-unnamed-user-avatar-icon-profile-png-image_4816337.png'
    );
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState<Date>();
    const [sex, setSex] = useState(-1);
    const [aboutMe, setAboutMe] = useState('');
    //const [hobbies, setHobbies] = useState<string[]>()
    const [height, setHeight] = useState<any>(-1);
    const [education, setEducation] = useState('');
    const [job, setJob] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [showingGender, setShowingGender] = useState(-1);
    const [city, setCity] = useState('');
    const [ageRange, setAgeRange] = useState<any>([18, 100]);
    const [showingOnlyMyCity, setShowingOnlyMyCity] = useState(false);
    const [step, setStep] = useState(0);
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNext = async () => {
        switch (step) {
            case 0:
                if (mail && password) {
                    setShowError(false);
                    setStep(1);
                } else {
                    setShowError(true);
                }
                break;
            case 1:
                if (photo && firstName && sex && birthDate && height) {
                    setShowError(false);
                    setStep(2);
                } else {
                    setShowError(true);
                }
                break;
            case 2:
                if (aboutMe /* && hobbies */ && city && job && education && instagramLink && facebookLink) {
                    setShowError(false);
                    setStep(3);
                } else {
                    setShowError(true);
                }
                break;
            case 3:
                if (showingGender !== -1 && ageRange && birthDate) {
                    console.log(showingGender);
                    setShowError(false);

                    const userData = {
                        mail,
                        password,
                        firstName,
                        birthDate: formatDate(birthDate),
                        sex,
                        city,
                        aboutMe,
                        height,
                        education,
                        job,
                        photo,
                        facebookLink,
                        instagramLink,
                        showingGender,
                        ageRangeMin: ageRange[0],
                        ageRangeMax: ageRange[1],
                        showingOnlyMyCity,
                    };

                    const user = await register(userData).then(async (data: boolean) => {
                        if (data) {
                            return await login(mail, password);
                        }
                        return null;
                    });
                    if (user) {
                        props.setUser(user);
                        navigate('/swipes');
                    } else setShowError(true);
                } else {
                    setShowError(true);
                }
                break;
        }
    };

    useEffect(() => {
        if (props.user) navigate('/swipes');
    }, [props]);

    const customBase64Uploader = async (event: any) => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = async function () {
            const base64data = reader.result;
            if (base64data) {
                const url = await uploadImage(base64data);
                console.log('url img', url);
                if (url) setPhoto(url);
            }
        };
    };

    return (
        <div className="register-page">
            <div className="register-page__form-container">
                {step === 0 && (
                    <>
                        <h3 className="register-page__form-container__header">Create an account</h3>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="username">e-mail</label>
                            <InputText id="username" onChange={(e) => setMail(e.target.value)} />
                        </div>

                        <div className="register-page__form-container__input-container">
                            <label htmlFor="password">Password</label>
                            <Password id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <Button
                            label="Already have an account?"
                            link
                            onClick={() => {
                                navigate('/login');
                            }}
                        />
                    </>
                )}
                {step == 1 && (
                    <>
                        <h3 className="register-page__form-container__header">About you</h3>
                        <div className="register-page__form-container__image-container">
                            <img src={photo} />
                        </div>
                        <FileUpload
                            mode="basic"
                            name="demo[]"
                            url="https://primefaces.org/primereact/showcase/upload.php"
                            accept="image/*"
                            customUpload
                            uploadHandler={customBase64Uploader}
                        />
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="firstname">First name</label>
                            <InputText id="firstname" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container register-page__form-container__sex-input_container">
                            <RadioButton
                                id="male"
                                onChange={(e) => {
                                    setSex(1);
                                }}
                                checked={sex === 1}
                            />
                            <label htmlFor="male">Male</label>
                            <RadioButton
                                id="female"
                                onChange={(e) => {
                                    setSex(0);
                                }}
                                checked={sex === 0}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="birth-date">Birth date</label>
                            <Calendar
                                id="birth-date"
                                value={birthDate}
                                onChange={(e) => {
                                    if (e.value instanceof Date) setBirthDate(e.value);
                                }}
                                selectionMode="single"
                            />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="birth-date">Your height (cm)</label>
                            <InputNumber
                                value={height}
                                onValueChange={(e) => {
                                    setHeight(e.value);
                                }}
                                min={100}
                                max={250}
                            />
                        </div>
                    </>
                )}
                {step == 2 && (
                    <>
                        <h3 className="register-page__form-container__header">About you</h3>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="bio">Describe yourself</label>
                            <InputTextarea
                                autoResize
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                rows={5}
                                cols={30}
                            />
                        </div>
                        {/*                         <div className="register-page__form-container__input-container">
                            <label htmlFor='hobbies'>Your hobbies</label>
                            <MultiSelect value={hobbies} onChange={(e) => setHobbies(e.value)} options={hobbyOptions} optionLabel="name"
                                placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" id='hobbies' />
                        </div> */}
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="city">Where do you live?</label>
                            <InputText id="city" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="job">Where do you work?</label>
                            <InputText id="job" onChange={(e) => setJob(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="education">Where did you study?</label>
                            <InputText id="education" onChange={(e) => setEducation(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="instagram">Instagram username</label>
                            <InputText id="instagram" onChange={(e) => setInstagramLink(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="facebook">Facebook url</label>
                            <InputText id="facebook" onChange={(e) => setFacebookLink(e.target.value)} />
                        </div>
                    </>
                )}
                {step == 3 && (
                    <>
                        <h3 className="register-page__form-container__header">Who are you looking for?</h3>
                        <div className="register-page__form-container__input-container register-page__form-container__sex-input_container">
                            <RadioButton
                                id="male"
                                onChange={(e) => {
                                    setShowingGender(1);
                                }}
                                checked={showingGender === 1}
                            />
                            <label htmlFor="male">Male</label>
                            <RadioButton
                                id="female"
                                onChange={(e) => {
                                    setShowingGender(0);
                                }}
                                checked={showingGender === 0}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="age-range">Age range</label>
                            <div className="register-page__form-container__input-container__slider-container">
                                <div className="register-page__form-container__input-container__slider-container__value">
                                    {ageRange[0]}
                                </div>
                                <Slider
                                    value={ageRange}
                                    onChange={(e) => setAgeRange(e.value)}
                                    range
                                    className="w-14rem"
                                    id="age-range"
                                    min={18}
                                />
                                <div className="register-page__form-container__input-container__slider-container__value">
                                    {ageRange[1]}
                                </div>
                            </div>
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor="my-city-only">Only your city?</label>
                            <Checkbox
                                id="my-city-only"
                                onChange={(e) => {
                                    if (e.checked !== undefined) setShowingOnlyMyCity(e.checked);
                                }}
                                checked={showingOnlyMyCity}
                            />
                        </div>
                    </>
                )}
                <div className="register-page__form-container__buttons">
                    {step !== 0 && <Button label="Back" onClick={() => setStep(step - 1)} />}
                    <Button label={step !== 3 ? 'Next' : 'Submit'} onClick={handleNext} />
                </div>
                {showError && <div className="register-page__form-container__error">Insert all data</div>}
            </div>
        </div>
    );
}
