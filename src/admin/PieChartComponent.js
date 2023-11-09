import React, { useEffect, useState } from 'react';
import { BsFillPieChartFill } from "react-icons/bs";
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import dataProvider from './dataProvider';

const PieChartComponent = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [pieOtherChartData, setPieOtherChartData] = useState([]);

  const fetchPieChartData = async () => {
    try {
      const response = await dataProvider.getItemList('item', {});
      console.log('Raw Data:', response.data);

      const data = response.data.reduce((accumulator, item) => {
        const category = item.category;
        console.log('Category:', category);
        accumulator[category] = (accumulator[category] || 0) + 1;
        return accumulator;
      }, {});

      const formattedData = Object.keys(data).map((category) => ({
        name: category,
        value: data[category]
      }));
      
      console.log(formattedData);
      setPieChartData(formattedData);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  const fetchOtherPieChartData = async () => {
    try {
      const response = await dataProvider.getNewItemList('item', {});
      console.log('Raw Other Data:', response.data);

      const data = response.data.reduce((accumulator, item) => {
        const category = item.category;
        console.log('Other Category:', category);
        accumulator[category] = (accumulator[category] || 0) + 1;
        return accumulator;
      }, {});

      const formattedData = Object.keys(data).map((category) => ({
        name: category,
        value: data[category]
      }));
      
      console.log(formattedData);
      setPieOtherChartData(formattedData);
    } catch (error) {
      console.error('Error fetching other pie chart data:', error);
    }
  };

  useEffect(() => {
    fetchPieChartData();
  }, []);
  useEffect(() => {
    fetchOtherPieChartData();
  }, []);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF5733', '#00C49F'];

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <i style={{ fontSize: '2em', color: '#219EBC' }}>
          <BsFillPieChartFill />
        </i>
        <h1 style={{ color: '#219EBC' }}>Gráfico de Pizza</h1>
        <span>Gráfico de pizza que indicará quanto cada categoria tem na sugestão de itens X quanto cada categoria tem na lista de itens adicionados pelo próprio usuário.</span>
      </div>

      {pieChartData.length > 0 && ( // Verifique se há dados antes de renderizar o gráfico
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ margin: '20px' }}>
            <PieChart width={window.innerWidth / 2 - 500} height={window.innerHeight - 300}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                fill="#8884d8"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          
          <div style={{ margin: '20px' }}>
            <PieChart width={window.innerWidth / 2 - 500} height={window.innerHeight - 300}>
              <Pie
                data={pieOtherChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                fill="#8884d8"
              >
                {pieOtherChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;
