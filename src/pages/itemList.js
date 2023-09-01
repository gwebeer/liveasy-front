import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';

class ItemList extends Component {
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
            <div className='item-list-page'>
                <SideMenu />

                <div className='page-content'>
                    teste                    
                </div>
            </div>


        )
    }
}

export default ItemList