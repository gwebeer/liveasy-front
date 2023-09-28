import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BiCheck, BiEditAlt, BiXCircle } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { getCoastItemList } from '../SupportFunctions';
import api from '../config/api';

const DataGridForCoastList = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [bought, SetBought] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBoughtPrice, setTotalBoughtPrice] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const addUniqueIdsToRows = (data) => {  
    return data.map((row, index) => ({
      ...row,
      id: index + 1, // You can use a more meaningful unique identifier if available
    }));
  };
  
  const getCostListData = async () => {
    let costItemList = await getCoastItemList(localStorage.getItem('processId'));
    console.log(costItemList);
    if (costItemList && costItemList.length > 0 && costItemList[0].process) {
      console.log(costItemList[0].process);
      const cost = costItemList[0].process;
      try {
        const response = await api.get('/user/list/cost/item/' + cost);
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
    getCostListData();
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
      axios.get('http://localhost:5001/data/').then((response) => {
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

  const handleDeleteRow = (id) => {
    const costToDelete = data.find((item) => item.id === id);
    console.log(costToDelete)
    if (costToDelete) {
      api
      .delete('/user/list/cost/item/' + costToDelete._id) // Use _id for deletion
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
    setSelectedRow(id);
  };

  const handleSaveEditRow = (updatedRow) => {
    //api.put('/user/list/cost/item', updatedRow)
    console.log(updatedRow)
    updatedRow.id = updatedRow._id;
    api
    .put('/user/list/cost/item', updatedRow)
    .then(() => {
      const updatedData = data.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
      );
      setData(updatedData);
      setSelectedRow(null);
    })
    .catch((error) => {
      console.error("Error updating row:", error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newItem = [
      {
        process: localStorage.getItem('processId'),
        title,
        value,
        category,
        bought: false
      }
    ]
  
    console.log("Adding items:", newItem);
      api
        .post('/user/list/cost/item/add', newItem) // Send an array of items
        .then(() => {
          console.log("Items added successfully:", newItem);
    
          // Update your data state and clear form fields
          const newItemsWithIds = newItem.map((item, index) => ({
            ...item,
            id: data.length + index + 1,
          }));
    
          setData([...data, ...newItemsWithIds]);
    
          setTitle('');
          setValue('');
    
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

    // Send an API request to update the specific fields for the item with the given ID
    api
      .put('/user/list/cost/item', {
        id,
        bought: newBoughtValue,
      })
      .then(() => {
        // Update the local data state with the new values
        const updatedData = data.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              bought: newBoughtValue,
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
    { field: "id", headerName: "ID", width: 90, headerClassName: 'data-grid-cell',},
    {
      field: "title",
      headerName: "Item",
      width: 150,
      editable: true,
      renderCell: (params) =>
        selectedRow === params.row.id ? (
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
      field: "value",
      headerName: "Valor (R$)",
      width: 150,
      editable: true,
      renderCell: (params) =>
        selectedRow === params.row.id ? (
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
      field: "category",
      headerName: "Categoria",
      width: 150,
      editable: true,
      renderCell: (params) =>
        selectedRow === params.row.id ? (
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
      field: "bought",
      headerName: "Pago",
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
      field: "action",
      headerName: "Ações",
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
          <input type="text" placeholder='Insira o Valor' onChange={e=>setValue(e.target.value)} className="input-field"/>
          <input type="int" placeholder='Insira a Categoria' onChange={e=>setCategory(e.target.value)} className="input-field"/>
          <button className="button">Adicionar</button>
        </form>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          rowKeyField="id"
        />
      </div>

      <div>Custo Total: {totalPrice.toFixed(2)}</div>
      <div>Custo Total Comprado: {totalBoughtPrice.toFixed(2)}</div>
    </div>
  );
});

export default DataGridForCoastList;