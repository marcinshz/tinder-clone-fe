import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterPage.scss'
import { FileUpload } from 'primereact/fileupload';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';

import { MultiSelect } from 'primereact/multiselect';

import { InputTextarea } from 'primereact/inputtextarea';

import { InputNumber } from 'primereact/inputnumber';

import { Slider } from 'primereact/slider';

import { Checkbox } from 'primereact/checkbox';
import { User } from '../../model'


const hobbyOptions = [
    { name: 'piwo', value: 'piwo' },
    { name: 'komputerki', value: 'komputerki' }
]


export default function RegisterPage(props: { setUser: Function, user: User | undefined }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [photo, setPhoto] = useState("https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-unnamed-user-avatar-icon-profile-png-image_4816337.png")
    const [firstName, setFirstName] = useState("")
    const [birthDate, setBirthDate] = useState<Date | string | Date[]>()
    const [sex, setSex] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [hobbies, setHobbies] = useState<string[]>()
    const [height, setHeight] = useState<any>(0)
    const [education, setEducation] = useState("")
    const [job, setJob] = useState("")
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [showingGender, setShowingGender] = useState("")
    const [city, setCity] = useState("")
    const [ageRange, setAgeRange] = useState<any>([18, 100])
    const [showOnlyMyCity, setShowOnlyMyCity] = useState(false)
    const [step, setStep] = useState(0)
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNext = async () => {
        switch (step) {
            case 0:
                if (email && password) {
                    setShowError(false)
                    setStep(1);
                }
                else {
                    setShowError(true)
                }
            case 1:
                if (photo && firstName && sex && birthDate && height) {
                    setShowError(false)
                    setStep(2);
                }
                else {
                    setShowError(true)
                }
            case 2:
                if (aboutMe && hobbies && city && job && education && instagram && facebook) {
                    setShowError(false)
                    setStep(3);
                }
                else {
                    setShowError(true)
                }
            case 3:
                if (showingGender && ageRange) {
                    setShowError(false)
                    props.setUser({
                        email, password, photo, firstName, sex, birthDate, height, aboutMe, hobbies, city, job, education, instagram, facebook, showingGender, ageRange, showOnlyMyCity
                    })
                    navigate('/profile')
                }
                else {
                    setShowError(true)
                }
        }

    }

    useEffect(() => {
        if(props.user)  navigate('/swipes')
    },[props])

    const onUpload = () => { }

    return (
        <div className="register-page">
            <div className="register-page__form-container">
                {step === 0 &&
                    <>
                        <h3 className='register-page__form-container__header'>Create an account</h3>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='username'>e-mail</label>
                            <InputText id="username" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="register-page__form-container__input-container">
                            <label htmlFor='password'>Password</label>
                            <Password id='password' onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <Button label="Already have an account?" link onClick={() => { navigate('/login') }} />
                    </>}
                {step == 1 &&
                    <>
                        <h3 className='register-page__form-container__header'>About you</h3>
                        <div className="register-page__form-container__image-container">
                            <img src={photo} />
                        </div>
                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='firstname'>First name</label>
                            <InputText id="firstname" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container register-page__form-container__sex-input_container">
                            <RadioButton id="male" onChange={(e) => { setSex("male") }} checked={sex === "male"} />
                            <label htmlFor='male'>Male</label>
                            <RadioButton id="female" onChange={(e) => { setSex("female") }} checked={sex === "female"} />
                            <label htmlFor='female'>Female</label>
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='birth-date'>Birth date</label>
                            <Calendar id="birth-date" value={birthDate} onChange={(e) => { if (e.value) setBirthDate(e.value) }} selectionMode='single' />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='birth-date'>Your height (cm)</label>
                            <InputNumber value={height} onValueChange={(e) => { setHeight(e.value) }} min={100} max={250} />
                        </div>

                    </>
                }
                {step == 2 &&
                    <>
                        <h3 className='register-page__form-container__header'>About you</h3>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='bio'>Describe yourself</label>
                            <InputTextarea autoResize value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} rows={5} cols={30} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='hobbies'>Your hobbies</label>
                            <MultiSelect value={hobbies} onChange={(e) => setHobbies(e.value)} options={hobbyOptions} optionLabel="name"
                                placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" id='hobbies' />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='city'>Where do you live?</label>
                            <InputText id="city" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='job'>Where do you work?</label>
                            <InputText id="job" onChange={(e) => setJob(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='education'>Where did you study?</label>
                            <InputText id="education" onChange={(e) => setEducation(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='instagram'>Instagram username</label>
                            <InputText id="instagram" onChange={(e) => setInstagram(e.target.value)} />
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='facebook'>Facebook url</label>
                            <InputText id="facebook" onChange={(e) => setFacebook(e.target.value)} />
                        </div>
                    </>
                }
                {step == 3 &&
                    <>
                        <h3 className='register-page__form-container__header'>Who are you looking for?</h3>
                        <div className="register-page__form-container__input-container register-page__form-container__sex-input_container">
                            <RadioButton id="male" onChange={(e) => { setShowingGender("male") }} checked={showingGender === "male"} />
                            <label htmlFor='male'>Male</label>
                            <RadioButton id="female" onChange={(e) => { setShowingGender("female") }} checked={showingGender === "female"} />
                            <label htmlFor='female'>Female</label>
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='age-range'>Age range</label>
                            <div className="register-page__form-container__input-container__slider-container">
                                <div className="register-page__form-container__input-container__slider-container__value">{ageRange[0]}</div>
                                <Slider value={ageRange} onChange={(e) => setAgeRange(e.value)} range className="w-14rem" id="age-range" min={18} />
                                <div className="register-page__form-container__input-container__slider-container__value">{ageRange[1]}</div>
                            </div>
                        </div>
                        <div className="register-page__form-container__input-container">
                            <label htmlFor='my-city-only'>Only your city?</label>
                            <Checkbox id="my-city-only" onChange={(e) => { if (e.checked !== undefined) setShowOnlyMyCity(e.checked) }} checked={showOnlyMyCity} />
                        </div>
                    </>
                }
                <div className="register-page__form-container__buttons">
                    {step !== 0 && <Button label="Back" onClick={() => setStep(step - 1)} />}
                    <Button label={step !== 3 ? "Next" : "Submit"} onClick={handleNext} />
                </div>
                {/* {showError && <div className="register-page__form-container__error">Insert all data</div>} */}

            </div>
        </div>
    )
}
