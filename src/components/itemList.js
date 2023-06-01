import { React, Component } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';

class ItemList extends Component {

    render() {
        return (
            <div class="row item-row">
                <div class="col-3 list-col">
                    {this.props.item}
                </div>
                <div class="col-2 list-col">
                {this.props.category}
                </div>
                <div class="col-2 list-col">
                {this.props.priority}
                </div>
                <div class="col-2 list-col">
                    R$ {this.props.value}
                </div>
                {/* <div class="col-1 list-col">
                    <input type='checkbox' />
                </div> */}
                <div class="col-1 list-col">
                    <i> <BsFillTrashFill /> </i>
                    <i> <BiEditAlt /> </i>
                </div>
            </div>
        );
    }
}

export default ItemList