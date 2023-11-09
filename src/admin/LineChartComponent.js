import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { BiLineChart } from "react-icons/bi";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const LineChartComponent = () => {
  const [userData, setUserData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    week: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      const apiUrl = "https://liveasy-services.onrender.com";
      const response = await fetch(`${apiUrl}/user/all`);
      const data = await response.json();

      setUserData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  // Função para extrair dados específicos com base no filtro selecionado
  const extractData = () => {
    const userCountByDay = {};
    
    userData.forEach((user) => {
      const dayKey = format(new Date(user.createdAt), 'dd/MM/yyyy');
    
      userCountByDay[dayKey] = (userCountByDay[dayKey] || 0) + 1;
    });
    
    return Object.keys(userCountByDay).map((dayKey) => ({
      name: dayKey,
      qtde: userCountByDay[dayKey],
    }));
  }; 
    
  // Função para gerar os componentes de linha
  const renderLines = () => {
    const lines = [];
    lines.push(<Line key="qtde" type="monotone" dataKey="qtde" stroke="#1f77b4" />);
  
    return lines;
  };
  
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px'}}>
        <i style={{ fontSize: '2em', color: '#219EBC'}}>
          <BiLineChart />
        </i>
        <h1 style={{ color: '#219EBC' }}>Gráfico de Linha</h1>
        <span>Por aqui você poderá ter acesso ao gráfico de linha que indica quantos novos usuários foram cadastrados por dia.</span>
      </div>

      <div style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
        <LineChart  width={window.innerWidth - 500} height={window.innerHeight - 200} data={userData.length > 0 ? extractData('week') : []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {renderLines()}
        </LineChart>
      </div>
    </div>
  );
};

export default LineChartComponent;
