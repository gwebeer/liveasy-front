import React, { Component } from 'react';
import api from '../config/api';

class SuggestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

        this.lista = this.lista.bind(this);
    }

    async lista() {
        let items = [
            {
                "type": "item",
                "title": "Geladeira",
                "category": "Eletrodoméstico",
                "convenient": "Cozinha"
            },
            {
                "type": "item",
                "title": "Fogão",
                "category": "Eletrodoméstico",
                "convenient": "Cozinha"
            },
            {
                "type": "item",
                "title": "AirFryer",
                "category": "Eletrodoméstico",
                "convenient": "Cozinha"
            },
            {
                "type": "item",
                "title": "Sanduicheira",
                "category": "Eletrodoméstico",
                "convenient": "Cozinha"
            },
            {
                "type": "item",
                "title": "Micro-ondas",
                "category": "Eletrodoméstico",
                "convenient": "Cozinha"
            },
            {
                "type": "item",
                "title": "Máquina de Lavar Roupa",
                "category": "Eletrodoméstico",
                "convenient": "Lavanderia"
            },
            {
                "type": "item",
                "title": "Balde",
                "category": "Ferramenta",
                "convenient": "Lavanderia"
            },
            {
                "type": "item",
                "title": "Vassoura",
                "category": "Ferramenta",
                "convenient": "Lavanderia"
            },
            {
                "type": "item",
                "title": "Rodo",
                "category": "Ferramenta",
                "convenient": "Lavanderia"
            },
            {
                "type": "item",
                "title": "Cama",
                "category": "Móvel",
                "convenient": "Quarto"
            },
            {
                "type": "item",
                "title": "Guarda-Roupas",
                "category": "Móvel",
                "convenient": "Quarto"
            },
            {
                "type": "item",
                "title": "Travesseiros",
                "category": "Roupa de Cama",
                "convenient": "Quarto"
            },
            {
                "type": "item",
                "title": "Cobertores",
                "category": "Roupa de Cama",
                "convenient": "Quarto"
            },
            {
                "type": "item",
                "title": "Lençol e Fronha",
                "category": "Roupa de Cama",
                "convenient": "Quarto"
            },
            {
                "type": "item",
                "title": "Cortina",
                "category": "Outros",
                "convenient": "Quarto"
            },
            {
                "type": "item",
                "title": "Sofá",
                "category": "Móvel",
                "convenient": "Sala de Estar"
            },
            {
                "type": "item",
                "title": "Rack",
                "category": "Móvel",
                "convenient": "Sala de Estar"
            },
            {
                "type": "item",
                "title": "Televisão",
                "category": "Móvel",
                "convenient": "Sala de Estar"
            }
        ]

        // let post = await api.post('/suggestion/item/create', items[3])
        // console.log(post)

        items.forEach(async (item) => {
            let post = await api.post('/suggestion/item/create', item)
            console.log(post)
        })
        console.log('ok')
    }

    render() {
        return (
            <div>
                <button onClick={this.lista}> Teste </button>
            </div>
        )
    }
}
export default SuggestionList