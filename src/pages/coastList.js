import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';

class CoastList extends Component {
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
            <div className='coast-list-page'>
                <SideMenu />

                <div className='page-content'>
                    teste                    
                </div>
            </div>


        )
    }
}

export default CoastList