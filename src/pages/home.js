import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = 'http://localhost:3000/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu/>

                <div className='content-page'>
                    teste
                </div>
            </div>


        )
    }
}

export default Home