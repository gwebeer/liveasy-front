import React, { Component } from 'react';
import SideMenu from '../components/sideMenu';
import { FaClipboardList } from 'react-icons/fa';
import { FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import { RegisterFieldValidation, SuccessAlert, addClass, getItemList, getProcessInfo, getUserInfo, movingInformation, passwordValidation, removeClass } from '../SupportFunctions';
import api from '../config/api';
import { AiFillPlusCircle } from 'react-icons/ai';
import NewItem from '../components/newItem';
import { BiTrash } from 'react-icons/bi'
import ConvenientTable from '../components/item-list/convenientTable';
import SuggestionItems from '../components/item-list/suggestionItem';
import { TbShoppingBagSearch } from 'react-icons/tb';


class NewItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convenientTables: []
        }
    }

    async componentDidMount() {
        let items = await getItemList(localStorage.getItem('processId'))
        console.log(items)

        let convenients = []
        Object.values(items).forEach((value) => {
            if (convenients.indexOf(value.convenient) == -1) {
                convenients.push(value.convenient)
            }
        })

        let tables = []
        convenients.forEach((convenient) => {
            let convenientItems = []
            Object.values(items).forEach((item) => {
                if (item['convenient'] == convenient) {
                    convenientItems.push(item)
                }
            })

            tables.push(<ConvenientTable convenient={convenient} items={convenientItems} />)
        })
        this.setState({ convenientTables: tables })
    }

    render() {
        if (!localStorage.getItem('token')) {
            window.location = '/auth';
        }

        return (
            <div className='home-page'>
                <SideMenu />
                <NewItem />
                <SuggestionItems />

                <div className='item-list-page'>
                    <div className='page-title'>
                        <i> <FaClipboardList /> </i>
                        <h1> Lista de Itens </h1>
                    </div>
                    <span> Por aqui você poderá criar sua lista personalizada de itens necessários para sua mudança. </span>

                    <section className='add-buttons'>
                        <button className='new-item-btn' type="button" data-bs-toggle="offcanvas" data-bs-target="#new-item-offcanvas" aria-controls="new-item">
                            <i> <AiFillPlusCircle /> </i>
                            Adicionar Item
                        </button>

                        <button className='suggestion-item-btn' type="button" data-bs-toggle="offcanvas" data-bs-target="#suggestion-item-offcanvas" aria-controls="suggestion-item">
                            <i> <TbShoppingBagSearch /> </i>
                            Sugestões de Itens
                        </button>
                    </section>

                    <section className='item-list-table'>

                        {this.state.convenientTables}

                    </section>

                </div >

            </div >


        )
    }
}

export default NewItemList