import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            process: localStorage.getItem("process"),
            convenient: "",
            title: "",
            category: "",
            priority: "",
            value: "",
            bought: ""
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
                    {/* <h1 style={{alignItems:"center"}}>Lista de Itens</h1> */}
                </div>
                    <iframe className="dashboard" style={{background: "#F1F5F4;", border: "none;", 
                                    borderRadius: "2px;", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);"}}
                            src="https://charts.mongodb.com/charts-liveasy-mzuoq/embed/dashboards?id=65497ed6-bd36-41cb-8bad-a98bf6888120&theme=light&autoRefresh=true&maxDataAge=1800&showTitleAndDesc=true"></iframe>
            </div>


        )
    }
}

export default Home