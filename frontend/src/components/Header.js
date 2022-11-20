import headerLogo from '../images/logo.svg';
import React from 'react';
import { NavLink, Route } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип Mesto Russia." className="header__logo" />
            <Route path='/sign-up'>
                <NavLink to="/sign-in" className="header__link header__link_active link">Вход</NavLink>
            </Route>
            <Route path='/sign-in'>
                <NavLink to="/sign-up" className="header__link header__link_active link">Регистрация</NavLink>
            </Route>
            <Route exact path='/'>
                <div>
                    <NavLink to="/" activeClassName="header__link_active" className="header__link"> {props.email}</NavLink>
                    <NavLink onClick={props.handleSignOut} to="/sign-up" className="header__link link">Выйти</NavLink>
                </div>
            </Route>
        </header>
    );

}

export default Header;