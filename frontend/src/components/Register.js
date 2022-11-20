import Form from "./Form";
import React from "react";
import { InputValidator } from "../utils/InputValidator";
import { FormValidator } from "../utils/FormValidator";
import { Link, useHistory } from "react-router-dom";
import authentication from "../utils/Authentication";
import union_ok from '../images/union_ok.png';
import union_error from '../images/union_error.png';

function Register(props) {
    const [btnText, setBtnText] = React.useState('Зарегистрироваться');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [inputClass, setInputClass] = React.useState('form__input form__input_type_auth');
    const [errorElementEmailClass, setErrorElementEmailClass] = React.useState('form__input-error');
    const [errorElementPasswordClass, setErrorElementPasswordClass] = React.useState('form__input-error');
    const [errMessageEmail, setErrMessageEmail] = React.useState('');
    const [errMessagePassword, setErrMessagePassword] = React.useState('');
    const [emailStatus, setEmailStatus] = React.useState(false);
    const [passwordStatus, setPasswordStatus] = React.useState(false);
    const [btnStatus, setBtnStatus] = React.useState(true);
    const [btnClass, setBtnClass] = React.useState('button form__submit form__submit_inactive');
    const inputEmailValidation = new InputValidator(setInputClass, setErrorElementEmailClass, setErrMessageEmail, setEmailStatus, 'form__input_type_auth');
    const inputPasswordValidation = new InputValidator(setInputClass, setErrorElementPasswordClass, setErrMessagePassword, setPasswordStatus, 'form__input_type_auth');
    const formValidator = new FormValidator([emailStatus, passwordStatus], setBtnStatus, setBtnClass, 'form__submit_type_auth');
    const history = useHistory();

    React.useEffect(() => {
        formValidator.isValid();
    }, [email, password]);

    function handleChangeEmail(e) {
        inputEmailValidation.isValid(e);
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        inputPasswordValidation.isValid(e);
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Регистрация...');
        authentication.postRegister(email, password)
            .then((res) => {
                props.openInfoPopup(true);
                props.setInfoPopup({ img: union_ok, text: 'Вы успешно зарегистрировались!' });
                history.push('/sign-in');
                return res
            }, () => {
                props.openInfoPopup(true);
                props.setInfoPopup({ img: union_error, text: 'Что-то пошло не так! Попробуйте ещё раз.' });
                formValidator.disabledButtonState();
                setBtnText('Зарегистрироваться');
            })
    }

    return (
        <>
            <Form titleClass="form__title form__title_type_auth" title="Регистрация" onSubmit={handleSubmit} name="register" btn={btnText} btnClass={btnClass} btnStatus={btnStatus} children={
                <>
                    <input required value={email} onChange={handleChangeEmail} className={inputClass} id="email-input" type="email" minLength="2" maxLength="40" name="email"
                        placeholder="Email" />
                    <span className={errorElementEmailClass}>{errMessageEmail}</span>
                    <input value={password} onChange={handleChangePassword} className={inputClass} id="password-input" type="password" minLength="8" maxLength="200" name="password"
                        placeholder="Пароль" required />
                    <span className={errorElementPasswordClass}>{errMessagePassword}</span>
                </>}
            />
            <span className='authentification__text'>Уже зарегистрированы? <Link to="/sign-in" className="authentification__text link">Войти</Link></span>
        </>
    );
}

export default Register;