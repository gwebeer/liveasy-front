import CategoryIcon from '@mui/icons-material/Category';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiBuildingHouse, BiSolidUserMinus, BiSolidUserPlus } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import dataProvider from './dataProvider';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalItem, settotalItem] = useState([]);
  const [idealProperty, setIdealProperty] = useState([]);
  const [propertyTypeCount, setPropertyTypeCount] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [percentageRecentUsers, setPercentageRecentUsers] = useState(0);
  const [itemCategoryCount, setItemCategoryCount] = useState([]);
  const [percentageItemCategory, setPercentageItemCategory] = useState([]);

  const fetchUserData = async () => {
    try {
      // Obter a contagem total de usuários
      const totalResponse = await dataProvider.getUserList('count', {});
      const totalData = totalResponse.data.map((count) => ({
        value: parseInt(count.count, 10),
      }));
      setTotalUsers(totalData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }; 
  
  const fetchRecentUserData = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      console.log(thirtyDaysAgo);
  
      const allUsersResponse = await dataProvider.getUserList('filter', {});
      const totalUsersCount = allUsersResponse.data.length;
      console.log(allUsersResponse);
  
      // Filtrar manualmente os usuários com base na data de criação
      const recentUsersData = allUsersResponse.data.filter(user => {
        const userCreatedAt = new Date(user.createdAt);
        return userCreatedAt >= thirtyDaysAgo;
      });
  
      const recentUsersCount = recentUsersData.length;
      const percentage = (recentUsersCount / totalUsersCount) * 100;
      
      setRecentUsers([{ value: recentUsersCount }]);
      setPercentageRecentUsers(percentage);
    } catch (error) {
      console.error('Error fetching recent user data:', error);
    }
  };
  
  const fetchItemData = async () => {
    try {
      const totalResponseItem = await dataProvider.getItemList('item', {});
      const totalItemData = totalResponseItem.data.map((item) => ({
        value: parseInt(item.count, 10),
        category: item.category || 'Sem Categoria',
      }));
  
      settotalItem(totalItemData);
  
      // Contar a ocorrência de cada categoria
      const categoryCount = {};
      totalItemData.forEach((item) => {
        const { category } = item;
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
  
      // Converter o objeto em um array para ser usado no cálculo da porcentagem
      const categoryCountArray = Object.keys(categoryCount).map((category) => ({
        category,
        count: categoryCount[category],
      }));
  
      setItemCategoryCount(categoryCountArray);
  
      // Calcular a porcentagem para cada categoria
      const totalItemCount = totalItemData.length; 
      const percentageItemCategoryArray = categoryCountArray.map((item) => ({
        category: item.category,
        count: item.count,
        percentage: (item.count / totalItemCount) * 100,
      }));

      setPercentageItemCategory(percentageItemCategoryArray);
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  }; 

  const fetchPropertiesData = async () => {
    try {
      const propertiesResponse = await dataProvider.getProperties('property', {});
      const propertiesData = propertiesResponse.data.map((property) => ({
        id: property.id,
        propertyType: property.type || 'Sem Tipo',
        rooms: property.rooms || 0,
        bathrooms: property.bathrooms || 0,
        parkingSpaces: property.parkingSpaces || 0,
      }));
  
      // Contar a ocorrência de cada tipo de propriedade
      const propertyTypeCount = {};
      propertiesData.forEach((property) => {
        const { propertyType } = property;
        propertyTypeCount[propertyType] = (propertyTypeCount[propertyType] || 0) + 1;
      });
  
      // Converter o objeto em um array para ser usado no gráfico de barras
      const propertyTypeCountArray = Object.keys(propertyTypeCount).map((propertyType) => ({
        propertyType,
        qtde: propertyTypeCount[propertyType],
      }));
  
      setPropertyTypeCount(propertyTypeCountArray);
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  }; 
  
  useEffect(() => {
    fetchPropertiesData();
  }, []);

  useEffect(() => {
    // Calcular o total de propriedades
    const totalProperties = propertyTypeCount.reduce((total, property) => total + property.qtde, 0);
    setIdealProperty(totalProperties);
  }, [propertyTypeCount]);
   
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchRecentUserData();
  }, []);  

  useEffect(() => {
    fetchItemData();
  }, []);

  const cardStyle = {
    backgroundColor: '#219EBC',
    color: 'white',
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <i style={{ fontSize: '2em', color: '#219EBC'}}>
          <MdDashboard />
        </i>
        <h1 style={{ color: '#219EBC' }}>Dashboard</h1>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card style={cardStyle}>
            <CardHeader
              title={
                <>
                  Total de Usuários:{' '}
                  {totalUsers.length > 0 && totalUsers.length}
                </>
              }
            />
             <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Últimos 30 dias - {percentageRecentUsers.toFixed(2)}%
             {percentageRecentUsers > 0 ? (
             <BiSolidUserPlus style={{ fontSize: 60, marginLeft: 5, color: 'white' }} />
             ) : (
            <BiSolidUserMinus style={{ fontSize: 60, marginLeft: 5, color: 'white' }} />
            )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={cardStyle}>
            <CardHeader
              title={
                <>
                  Total de Itens: {' '}
                  {totalItem.length > 0 && totalItem.length}
                </>
              }
            />
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {percentageItemCategory.length > 0 && (
                <div>
                  Categoria mais alta: {percentageItemCategory[0].category} - {percentageItemCategory[0].percentage.toFixed(2)}%
                </div>
              )}
              <CategoryIcon style={{ fontSize: 60, marginLeft: 'auto', color: 'white' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={cardStyle}>
            <CardHeader title="Propriedades" style={{ textAlign: 'center' }} />
            <CardContent style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {propertyTypeCount.map((property) => (
                <div key={property.propertyType}>
                  {property.propertyType}: ({((property.qtde / idealProperty) * 100).toFixed(2)}%)
                </div>
              ))}
              <BiBuildingHouse style={{ fontSize: 60, marginLeft: 'auto', color: 'white' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Gráfico de Linha com Altura Aumentada */}
      <div style={{ margin: '20px auto', width: '100%' }}>
        <Typography variant="h5">Propriedades Ideais</Typography>
        <BarChart width={1210} height={500} data={propertyTypeCount}>
          <XAxis dataKey="propertyType" />
          <YAxis />
          <CartesianGrid stroke="#eee" />
          <Tooltip />
          <Legend />
          <Bar dataKey="qtde" fill={cardStyle.backgroundColor} />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;





