import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SuggestionCostPopup({ isOpen, onClose, onAddItems }) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCostIds, setSelectedCostIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:5001/data/').then((response) => {
        setSuggestions(response.data);
      });
    }
  }, [isOpen]);

  const handleToggleCostSelected = (costId) => {
    setSelectedCostIds((prevSelected) => {
      if (prevSelected.includes(costId)) {
        return prevSelected.filter((id) => id !== costId);
      } else {
        return [...prevSelected, costId];
      }
    });
  };

  const handleAddSelectedItems = () => {
    // Filter the selected items from the suggestions
    const selectedSuggestions = suggestions.filter((s) =>
      selectedCostIds.includes(s.id)
    );
  
    console.log("Selected Suggestions:", selectedSuggestions); // Check if selected data is correct
  
    // Invoke the callback to add the selected items to the parent component (itemList.js)
    onAddItems(selectedSuggestions);
  
    // Clear the selected item IDs
    setSelectedCostIds([]);
  
    // Close the popup
    onClose();
  };
  ;  
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Item', width: 150, editable: true },
    { field: 'value', headerName: 'Valor', width: 150, editable: true },
    {
      field: 'AddToItemList',
      headerName: 'Deseja Adicionar?',
      width: 180,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedCostIds.includes(params.row.id)}
          onChange={() => handleToggleCostSelected(params.row.id)}
        />
      ),
    },
  ];

  return (
    isOpen && (
        <div className={`suggestion-list-popup ${isOpen ? 'open' : ''}`}>
        <h2>Lista de Sugestões</h2>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={suggestions} columns={columns} pageSize={5} />
        </div>
        <button onClick={handleAddSelectedItems}>Adicionar Selecionados</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    )
  );
}

export default SuggestionCostPopup;