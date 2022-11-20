import Form from "./Form";
import React from "react";
import { InputValidator } from "../utils/InputValidator";
import { FormValidator } from "../utils/FormValidator";
import authentication from "../utils/Authentication";
import union_error from '../images/union_error.png';
import { useHistory } from "react-router-dom";

function Login(props) {
    const [btnText, setBtnText] = React.useState('Войти');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [inputClass, setInputClass] = React.useState('form__input form__input_type_auth');
    const [btnClass, setBtnClass] = React.useState('button form__submit form__submit_inactive');
    const [errorElementEmailClass, setErrorElementEmailClass] = React.useState('form__input-error');
    const [errorElementPasswordClass, setErrorElementPasswordClass] = React.useState('form__input-error');
    const [errMessageEmail, setErrMessageEmail] = React.useState('');
    const [errMessagePassword, setErrMessagePassword] = React.useState('');
    const [emailStatus, setEmailStatus] = React.useState(false);
    const [passwordStatus, setPasswordStatus] = React.useState(false);
    const [btnStatus, setBtnStatus] = React.useState(true);
    const inputEmailValidation = new InputValidator(setInputClass, setErrorElementEmailClass, setErrMessageEmail, setEmailStatus, 'form__input_type_auth');
    const inputPasswordValidation = new InputValidator(setInputClass, setErrorElementPasswordClass, setErrMessagePassword, setPasswordStatus, 'form__input_type_auth');
    const formValidator = new FormValidator([emailStatus, passwordStatus], setBtnStatus, setBtnClass, 'form__submit_type_auth');
    const history = useHistory();

    React.useEffect(() => {
        setBtnText('Войти');
        formValidator.disabledButtonState();
        inputEmailValidation.hideInputError();
        inputPasswordValidation.hideInputError();
    }, []);

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
        setBtnText('Вход...');
        authentication.postLogin(email, password)
            .then((data) => {
                props.setLoggedIn(true);
                props.setUserEmail(email);
                setEmail('');
                setPassword('');
                history.push("/");
                return data;
            })
            .catch(() => {
                props.openInfoPopup(true);
                props.setInfoPopup({ img: union_error, text: 'Что-то пошло не так! Попробуйте ещё раз.' });
                props.setLoggedIn(false);
                formValidator.disabledButtonState();
                setBtnText('Войти');
                return;
            });
    }


    return (
        <Form titleClass="form__title form__title_type_auth" title="Вход" onSubmit={handleSubmit} name="register" btn={btnText} btnClass={btnClass} btnStatus={btnStatus} children={
            <>
                <input value={email} onChange={handleChangeEmail} className={inputClass} id="email-input" type="email" minLength="2" maxLength="40" name="email"
                    placeholder="Email" required />
                <span className={errorElementEmailClass}>{errMessageEmail}</span>
                <input value={password} onChange={handleChangePassword} className={inputClass} id="password-input" type="password" minLength="8" maxLength="200" name="password"
                    placeholder="Пароль" required />
                <span className={errorElementPasswordClass}>{errMessagePassword}</span>
            </>}
        />
    );
}

export default Login;