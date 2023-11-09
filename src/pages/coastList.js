import React, { Component } from 'react';
import { GiTwoCoins } from 'react-icons/gi';
import SuggestionCostPopup from '../components/SuggestionCostPopup';
import DataGridForCoastList from '../components/coastList';
import SideMenu from '../components/sideMenu';
import api from '../config/api';

class CoastList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuggestionPopupOpen: false,
            CostListData: [],
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
      
        handleAddItemsToCostList = (selectedItems) => {
            selectedItems.forEach((selectedItem) => {
              // Generate a unique ID for the selected item if it doesn't have one
              const itemWithUniqueIds = {
                ...selectedItem, // Generate a unique ID
                id: this.generateObjectIdLikeId,
                process: localStorage.getItem('processId')
              };
          
              this.setState((prevState) => ({
                CostListData: [...prevState.CostListData, itemWithUniqueIds],
              }));
    
              console.log(itemWithUniqueIds)
          
              // Send a request to add the selected item to the database using axios or your preferred method
              api.post('/user/list/cost/item/add', itemWithUniqueIds)
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
          <div className="coast-list-page">
              <SideMenu />
            <div className="page-content">
              <div className='page-title'>
                <i> <GiTwoCoins /> </i>
                <h1> Lista de Custos</h1>
              </div>
              <span> Por aqui você poderá criar sua lista personalizada de custos necessários para a manutenção de seu lar. </span> 
            <div className="data-grid-container">
                <DataGridForCoastList
                  ref={this.dataGridRef}
                  data={this.state.CostListData}
                  onClose={this.handleCloseSuggestionPopup} // Pass the onClose prop
                />
              </div>
              <div
                className="suggestion-list-text"
                onClick={this.handleOpenSuggestionPopup}
              >
                Lista de Sugestões
              </div>
              <SuggestionCostPopup
              isOpen={this.state.isSuggestionPopupOpen}
              onClose={this.handleCloseSuggestionPopup}
              onAddItems={this.handleAddItemsToCostList} // Pass the callback function
              />
            </div>
          </div>
        );
      }
}

export default CoastList