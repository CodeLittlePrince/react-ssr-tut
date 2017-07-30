import React from 'react';
import logo from '../img/logo.svg';
import './style/App.scss';

export default class App extends React.Component {
    render() {
        return (
            <div class="App">
                <img class="logo" src={logo} alt="logo"/>
                <h3>I am a App Component!</h3>
            </div>
        )
    }
}