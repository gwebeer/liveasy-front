import React, { useEffect, useState } from 'react';
import { BsFillBarChartLineFill } from "react-icons/bs";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import dataProvider from './dataProvider';

const BarChartComponent = () => {
  const [barChartData, setBarChartData] = useState([]);

const fetchBarChartData = async () => {
  try {
    const response = await dataProvider.getProperties('property', {});
    console.log('Raw Data:', response.data);

    const propertyData = response.data;

    // Mapeia os dados para contagem de quartos, banheiros e vagas de estacionamento
    const barChartData = propertyData.map((property) => {
      const mapRooms = {
        'one-room': 1,
        'two-rooms': 2,
        'more-rooms': 3,
      };

      const mapBathrooms = {
        'one-bathroom': 1,
        'two-bathrooms': 2,
        'more-bathrooms': 3,
      };

      const mapParkingSpaces = {
        'no-vehicle': 0,
        'one-vehicle': 1,
        'more-vehicles': 2,
      };

      return {
        name: property.name || '',
        rooms: mapRooms[property.rooms] || 0,
        bathrooms: mapBathrooms[property.bathrooms] || 0,
        parkingSpaces: mapParkingSpaces[property.parkingSpaces] || 0,
      };
    });

    // Atualiza o estado com os dados do gráfico
    setBarChartData(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
  }
};

  useEffect(() => {
    fetchBarChartData();
  }, []);

  // Cores diferentes para cada categoria
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <i style={{ fontSize: '2em', color: '#219EBC' }}>
          <BsFillBarChartLineFill />
        </i>
        <h1 style={{ color: '#219EBC' }}>Gráfico de Barras</h1>
        <span>Por aqui você poderá ter acesso ao gráfico de barra com a contagem de quartos, banheiros e vagas de estacionamento.</span>
      </div>

      {/* Gráfico de Barra com Tamanho Aumentado */}
      <div style={{ margin: '20px' }}>
        <BarChart width={window.innerWidth - 550} height={window.innerHeight - 200}  data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Adicione mais componentes de Bar para cada série de dados */}
          <Bar dataKey="rooms" fill={colors[0]} name="Quartos" />
          <Bar dataKey="bathrooms" fill={colors[1]} name="Banheiros" />
          <Bar dataKey="parkingSpaces" fill={colors[2]} name="Vagas de Estacionamento" />
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartComponent;
