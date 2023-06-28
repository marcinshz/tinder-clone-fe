import { useEffect, useState } from 'react'
import './LoginPage.scss'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { login } from '../../DataService'
import { User } from '../../model'
import { useNavigate } from 'react-router-dom'

function LoginPage(props: { setUser: Function, user: User | undefined }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate();

    const handleChange = (text: string, input: boolean) => {
        setInvalid(false)
        if (input) setEmail(text)
        else setPassword(text)
    }

    const handleSubmit = async () => {
        if (email && password) {
            const user = await login(email, password)
            console.log('user', user)
            if (user) {
                props.setUser(user);
                navigate('/swipes')
            }
            else setInvalid(true);
        }
        else setInvalid(true);
    }

    useEffect(() => {
        if(props.user)  navigate('/swipes')
    },[props])

    return (
        <div className="login-page">
            <div className="login-page__form-container">
                <h3 className='login-page__form-container__header'>Sign in</h3>

                <div className="login-page__form-container__input-container">
                    <label htmlFor='username'>e-mail</label>
                    <InputText id="username" onChange={(e) => handleChange(e.target.value, true)} className={`${invalid ? 'p-invalid' : ''}`} />
                </div>

                <div className="login-page__form-container__input-container">
                    <label htmlFor='password'>Password</label>
                    <Password id='password' onChange={(e) => handleChange(e.target.value, false)} className={`${invalid ? 'p-invalid' : ''}`} />
                </div>

                <Button label="Submit" onClick={handleSubmit} />
                <Button label="Create an account" link onClick={() => navigate('/register')} />
            </div>
        </div>
    )
}

export default LoginPage