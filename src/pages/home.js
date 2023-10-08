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
            window.location = '/auth';
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