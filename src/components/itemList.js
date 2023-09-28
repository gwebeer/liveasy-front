import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BiCheck, BiCommentDetail, BiEditAlt, BiXCircle } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { getItemList } from '../SupportFunctions';
import api from '../config/api';

const DataGridForItemList = forwardRef((props, ref) => {
    const [data, setData] = useState([]); // Move data state here
    const [selectedRow, setSelectedRow] = useState(null);
    const [convenient, SetConvenient] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [value, setPrice] = useState('');
    const [bought, SetBought] = useState('');
    const [valuePaid, SetPaid] = useState('');
    const [boughtDate, SetBoughtDate] = useState('');
    const [isDetailPageOpen, setIsDetailPageOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBoughtPrice, setTotalBoughtPrice] = useState(0);
    const [selectedItemIds, setSelectedItemIds] = useState([]); // Define selectedItemIds
    const [suggestions, setSuggestions] = useState([]);
    const [editingRow, setEditingRow] = useState(null);


    const addUniqueIdsToRows = (data) => {  
      return data.map((row, index) => ({
        ...row,
        id: index + 1, // You can use a more meaningful unique identifier if available
      }));
    };
    
    const getItemListData = async () => {
      let itemList = await getItemList(localStorage.getItem('processId'));
      console.log(itemList);
      if (itemList && itemList.length > 0 && itemList[0].process) {
        console.log(itemList[0].process);
        const item = itemList[0].process;
        try {
          const response = await api.get('/user/list/item/' + item);
          const formattedData = addUniqueIdsToRows(response.data);
          setData(formattedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("itemList or its first element is undefined.");
      }
    }
        
    useEffect(() => {
      getItemListData();
    }, []);
  
    useEffect(() => {
      // Calculate the total price when data changes
      const totalPrice = data.reduce((acc, item) => acc + parseFloat(item.value), 0);
      setTotalPrice(totalPrice);
  
      // Calculate the total price of bought items
      calculateTotalBoughtPrice();
    }, [data]);
  
    useEffect(() => {
      if (props.isOpen) {
        axios.get('http://localhost:5000/data/').then((response) => {
          setSuggestions(response.data);
        });
      }
    }, [props.isOpen]);
  
    useImperativeHandle(ref, () => ({
      handleAddSelectedItems,
    }));
  
    const handleAddSelectedItems = () => {
      // Filter the selected items from the suggestions
      const selectedSuggestions = suggestions.filter((s) =>
        selectedItemIds.includes(s.id)
      );
  
      // Update the data state with the selected items
      setData((prevData) => [...prevData, ...selectedSuggestions]);
  
      // Clear the selected item IDs
      setSelectedItemIds([]);
  
      // Close the popup
      props.onClose();
    };
  
    useImperativeHandle(ref, () => ({
      handleAddSelectedItems,
    }));
  
    
    const calculateTotalBoughtPrice = () => {
      const boughtItems = data.filter((item) => item.bought);
      const totalBoughtPrice = boughtItems.reduce((acc, item) => acc + parseFloat(item.value), 0);
      setTotalBoughtPrice(totalBoughtPrice);
    }
  
    const handleDetailClick = (id) => {
      const selectedItem = data.find((row) => row.id === id);
      setSelectedItem(selectedItem);
      setIsDetailPageOpen(true);
    };
  
    const handleCloseDetailPage = () => {
      setIsDetailPageOpen(false);
    };
  
    const handleDeleteRow = (id) => {
      const itemToDelete = data.find((item) => item.id === id);
      if (itemToDelete) {
        api
          .delete('/user/list/item/' + itemToDelete._id) // Use _id for deletion
          .then(() => {
            const updatedData = data.filter((row) => row.id !== id);
            setData(updatedData);
          })
          .catch((error) => {
            console.error("Error deleting row:", error);
          });
      }
    };
  
    const handleEditRow = (id) => {
      setEditingRow(id);
    };
     
    const handleSaveEditRow = (updatedRow) => {
      if (updatedRow.id === editingRow) {
        console.log(updatedRow);
    
        // Collect all the changes in an object
        const changes = {
          id: updatedRow._id,
          title: updatedRow.title,
          convenient: updatedRow.convenient,
          category: updatedRow.category,
          priority: updatedRow.priority,
          value: updatedRow.value,
          bought: updatedRow.bought,
          boughtDate: updatedRow.boughtDate,
        };
    
        // Find the index of the row in the data array
        const rowIndex = data.findIndex((row) => row.id === updatedRow.id);
    
        if (rowIndex !== -1) {
          // Update the row directly in the data state
          data[rowIndex] = { ...data[rowIndex], ...changes };
    
          // Set the data state with the updated data
          setData([...data]);
          setEditingRow(null); // Exit edit mode
          // Make an API request to save changes if needed
          api
            .put('/user/list/item', changes)
            .then(() => {
              console.log("Item updated successfully:", updatedRow);
            })
            .catch((error) => {
              console.error("Error updating item:", error);
            });
        }
      }
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
    
      const newItems = [
        {
          process: localStorage.getItem('processId'),
          title,
          convenient,
          category,
          priority,
          value,
          bought: false,
          valuePaid: value,
          boughtDate,
        },
        // Add more items to the array if needed
      ];
    
      console.log("Adding items:", newItems);
      api
        .post('/user/list/item/add', newItems) // Send an array of items
        .then(() => {
          console.log("Items added successfully:", newItems);
    
          // Update your data state and clear form fields
          const newItemsWithIds = newItems.map((item, index) => ({
            ...item,
            id: data.length + index + 1,
          }));
    
          setData([...data, ...newItemsWithIds]);
    
          setTitle('');
          SetConvenient('');
          setCategory('');
          setPriority('');
          setPrice('');
          SetPaid('');
          SetBoughtDate('');
    
          calculateTotalBoughtPrice();
        })
        .catch((error) => {
          console.log("Error adding items:", error);
        });
    };
    
    
    const handleToggleBought = (id, isBought) => {
      // Determine the new values for "bought" and "boughtDate"
      console.log(id);
      const newBoughtValue = !isBought;
      const newBoughtDate = newBoughtValue ? new Date().toISOString().slice(0, 10) : null;

      // Send an API request to update the specific fields for the item with the given ID
      api
        .put('/user/list/item', {
          id,
          bought: newBoughtValue,
          boughtDate: newBoughtDate,
        })
        .then(() => {
          // Update the local data state with the new values
          const updatedData = data.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                bought: newBoughtValue,
                boughtDate: newBoughtDate,
              };
            }
            return item;
          });
    
          setData(updatedData);
    
          console.log("Item updated successfully:", updatedData);
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    };
    
                  
    const columns = [
      { field: "id", headerName: "ID", width: 90, headerClassName: 'data-grid-cell'},
      {
        field: "title",
        headerName: "Item",
        width: 150,
        editable: true,
        renderCell: (params) =>
          editingRow === params.row.id ? (
            <input
              type="text"
              value={params.row.title}
              onChange={(e) =>
                handleSaveEditRow({ ...params.row, title: e.target.value })
              }
              onBlur={() => handleSaveEditRow(params.row)}
            />
          ) : (
            params.value
          ),
        headerClassName: 'data-grid-cell',
      },
      {
        field: "convenient",
        headerName: "Comodo",
        width: 150,
        editable: true,
        renderCell: (params) =>
          editingRow === params.row.id ? (
            <input
              type="text"
              value={params.row.convenient}
              onChange={(e) =>
                handleSaveEditRow({ ...params.row, convenient: e.target.value })
              }
              onBlur={() => handleSaveEditRow(params.row)}
            />
          ) : (
            params.value
          ),
        headerClassName: 'data-grid-cell',
      },
      {
        field: "category",
        headerName: "Categoria",
        width: 150,
        editable: true,
        renderCell: (params) =>
          editingRow === params.row.id ? (
            <input
              type="text"
              value={params.row.category}
              onChange={(e) =>
                handleSaveEditRow({ ...params.row, category: e.target.value })
              }
              onBlur={() => handleSaveEditRow(params.row)}
            />
          ) : (
            params.value
          ),
        headerClassName: 'data-grid-cell',
      },
      {
        field: "priority",
        headerName: "Prioridade",
        width: 150,
        editable: true,
        renderCell: (params) =>
          editingRow === params.row.id ? (
            <input
              type="text"
              value={params.row.priority}
              onChange={(e) =>
                handleSaveEditRow({ ...params.row, priority: e.target.value })
              }
              onBlur={() => handleSaveEditRow(params.row)}
            />
          ) : (
            params.value
          ),
        headerClassName: 'data-grid-cell',
      },
      {
        field: "value",
        headerName: "Valor R$",
        width: 150,
        editable: true,
        renderCell: (params) =>
          editingRow === params.row.id ? (
            <input
              type="text"
              value={params.row.value}
              onChange={(e) =>
                handleSaveEditRow({ ...params.row, value: e.target.value })
              }
              onBlur={() => handleSaveEditRow(params.row)}
            />
          ) : (
            params.value
          ),
        headerClassName: 'data-grid-cell',
      },
      {
        field: "bought",
        headerName: "Comprado",
        width: 100,
        renderCell: (params) => (
          <span
            onClick={() =>
              handleToggleBought(params.row._id, params.row.bought)
            }
            style={{ cursor: "pointer" }}
          >
            {params.row.bought ? <BiCheck /> : <BiXCircle />}
          </span>
        ),
        headerClassName: 'data-grid-cell',
      },      
      {
        field: "boughtDate",
        headerName: "Data de Compra",
        width: 150,
        editable: true,
        renderCell: (params) =>
          editingRow === params.row.id ? (
            <input
              type="text"
              value={params.row.boughtDate}
              onChange={(e) =>
                handleSaveEditRow({ ...params.row, boughtDate: e.target.value })
              }
              onBlur={() => handleSaveEditRow(params.row)}
            />
          ) : (
            params.value
          ),
        headerClassName: 'data-grid-cell',
      },
      {
        field: "action",
        headerName: "",
        width: 150,
        renderCell: (params) => (
          <>
            <BsFillTrashFill
              onClick={() => handleDeleteRow(params.row.id)}
              style={{ cursor: "pointer" }}
            />
            <BiEditAlt
              onClick={() => handleEditRow(params.row.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
            <BiCommentDetail
              onClick={() => handleDetailClick(params.row.id)}
              style={{ cursor: "pointer", marginLeft: '10px' }}
            />
          </>
        ),
        headerClassName: 'data-grid-cell',
      },
    ];
  
    return (
      <div>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Insira o Item' onChange={e=>setTitle(e.target.value)} className="input-field"/>
            <input type="text" placeholder='Insira o Comôdo' onChange={e=>SetConvenient (e.target.value)} className="input-field"/>
            <input type="text" placeholder='Insira a Categoria' onChange={e=>setCategory(e.target.value)} className="input-field" />
            <input type="text" placeholder='Insira a Prioridade' onChange={e=>setPriority(e.target.value)} className="input-field"/>
            <input type="int" placeholder='Insira o Valor' onChange={e=>setPrice(e.target.value)} className="input-field"/>
            <button className="button">Adicionar</button>
          </form>
        </div>
        <div className="datagrid-container">
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={addUniqueIdsToRows(data)}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              rowKeyField="id"
            />
          </div>
        </div>
  
        <div>Preço Total: {totalPrice.toFixed(2)}</div>
        <div>Preço Total dos Itens Comprados: {totalBoughtPrice.toFixed(2)}</div>
  
        {isDetailPageOpen && selectedItem && (
          <div className="detail-page">
            <h2>Detalhes</h2>
            <p><strong>Item:</strong> {selectedItem.title}</p>
            <p><strong>Comôdo:</strong> {selectedItem.convenient}</p>
            <p><strong>Categoria:</strong> {selectedItem.category}</p>
            <p><strong>Prioridade:</strong> {selectedItem.priority}</p>
            <p><strong>Valor:</strong> {selectedItem.value}</p>
            <p><strong>Cadastrado em:</strong> {selectedItem.createdAt}</p>
            <p><strong>Atualizado em:</strong> {selectedItem.createdAt}</p>
            {/* You can also add an image here */}
            <button className="close" onClick={handleCloseDetailPage}>X</button>
          </div>
        )}
      </div>
    );
  });
  

export default DataGridForItemList;