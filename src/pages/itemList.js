import React, { Component } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import '../../src/scss/components/pages/itemList.scss';
import SuggestionListPopup from '../components/SuggestionListPopup';
import DataGridForItemList from '../components/itemList';
import SideMenu from '../components/sideMenu';
import api from '../config/api';

class itemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuggestionPopupOpen: false,
      itemListData: [],
    };
    this.dataGridRef = React.createRef();
  }

  generateObjectIdLikeId() {
    const characters = '0123456789abcdef';
    let objectId = '';

    for (let i = 0; i < 24; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      objectId += characters.charAt(randomIndex);
    }

    return objectId;
  }

  handleAddItemsToItemList = (selectedItems) => {
    selectedItems.forEach((selectedItem) => {
      // Generate a unique ID for the selected item if it doesn't have one
      const itemWithUniqueIds = {
        ...selectedItem, // Generate a unique ID
        id: this.generateObjectIdLikeId,
        process: localStorage.getItem('processId')
      };

      this.setState((prevState) => ({
        itemListData: [...prevState.itemListData, itemWithUniqueIds],
      }));

      console.log(itemWithUniqueIds)

      // Send a request to add the selected item to the database using axios or your preferred method
      api.post('/user/list/item/add', itemWithUniqueIds)
        .then((response) => {
          console.log("Item added to the database:", response.data);
        })
        .catch((error) => {
          console.error("Error adding item to the database:", error);
        });
    });
  };


  handleOpenSuggestionPopup = () => {
    this.setState({ isSuggestionPopupOpen: true });
  };

  handleCloseSuggestionPopup = () => {
    this.setState({ isSuggestionPopupOpen: false });
  };

  render() {
    return (
      <div className="item-list-page">
        <SideMenu />
        <div className="page-content">
          <div className='page-title'>
            <i> <FaClipboardList /> </i>
            <h1> Lista de Itens</h1>
          </div>
          <span> Por aqui você poderá criar sua lista personalizada de itens necessários para sua mudança. </span>
          <div className="data-grid-container">
            <DataGridForItemList
              ref={this.dataGridRef}
              data={this.state.itemListData}
              onClose={this.handleCloseSuggestionPopup} // Pass the onClose prop
            />
          </div>
          <div
            className="suggestion-list-text"
            onClick={this.handleOpenSuggestionPopup}
          >
            Lista de Sugestões
          </div>
          <SuggestionListPopup
            isOpen={this.state.isSuggestionPopupOpen}
            onClose={this.handleCloseSuggestionPopup}
            onAddItems={this.handleAddItemsToItemList} // Pass the callback function
          />
        </div>
      </div>
    );
  }
}

export default itemList;