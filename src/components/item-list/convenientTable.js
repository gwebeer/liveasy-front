import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';
import ItemRow from './itemRow';



class ConvenientTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
    }

    async componentDidMount() {
        let items = this.props.items

        let rows = []
        Object.keys(items).forEach((key) => {
            // console.log(items[key]['title'])
            rows.push(
                <ItemRow
                    title={items[key]['title']}
                    category={items[key]['category']}
                    priority={items[key]['priority']}
                    value={items[key]['value']}
                    boughtDate={items[key]['boughtDate']}
                />
            )

        })
        this.setState({ rows: rows })
    }

    render() {
        return (

            <div className='convenient-table'>
                <div className='convenient-title'> {this.props.convenient} </div>
                <table className='item-table'>
                    <thead>
                        <tr className='table-header'>
                            <th className="item-column"> Item </th>
                            <th className="category-column"> Categoria </th>
                            <th className="priority-column"> Prioridade </th>
                            <th className="value-column"> Valor </th>
                            <th className="bought-column"> Comprado </th>
                            <th className="bought-date-column"> Data de Compra </th>
                            <th className="edit-column"> Editar </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ConvenientTable