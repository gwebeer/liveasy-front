// dataProvider.js
import { fetchUtils } from 'react-admin';
import { InvalidAlert, SuccessAlert } from '../SupportFunctions';

const apiUrl = 'https://liveasy-services.onrender.com';
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getUserList: async (resource, params) => {
    const url = `${apiUrl}/user/all`;
  
    try {
      const response = await httpClient(url);
  
      if (!response.json || !Array.isArray(response.json)) {
        throw new Error('Invalid response format: expected an array.');
      }
  
      const users = response.json.map((user) => ({
        id: user._id || '1',
        name: user.name || '',
        email: user.email || '',
        birthDate: user.birthDate || '',
        phone: user.phone || '',
        country: user.country || '',
        createdAt: user.createdAt || '',
        count: user.count || ''
      }));
  
      return {
        data: users,
        total: users.length,
      };
    } catch (error) {
      console.error('Error in getUserList:', error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  getUserOne: async (resource, params) => {
    const url = `${apiUrl}/user/${params.id}`;
        try {
          const response = await httpClient(url);
          
          // Certifique-se de que a resposta é um objeto
          if (!response.json || typeof response.json !== 'object') {
            throw new Error('Invalid response format: expected an object.');
          }
      
          // Adicione a chave 'id' aos dados do usuário
          const user = response.json;
          user.id = user._id || '1'; // Adapte conforme a estrutura real do seu objeto
      
          return {
            data: user,
          };
        } catch (error) {
          console.error('Error in getOne:', error);
          return {
            data: {},
          };
        }
    },

  createUser: async (resource, params) => {
    const url = `${apiUrl}/user/register`;
      
        // Monta dicionário com informações do usuário
        const userInfo = {
          name: params.data.name,
          email: params.data.email,
          birthDate: params.data.birthDate,
          password: params.data.password,
          type: "customer",
          phone: params.data.phone,
          country: params.data.country,
        };
      
        try {
          const response = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: new Headers({ 'Content-Type': 'application/json' }),
          });
      
          if (!response.ok) {
            InvalidAlert("Erro", "Ocorreu um erro ao cadastrar o usuário");
          }

          SuccessAlert("Sucesso", "Usuário cadastrado com sucesso");

          return {
            data: { id: response.json._id },
          };
        } catch (error) {
          console.error('Error in create:', error);
      
          if (error.response) {
            console.error('API Response:', error.response);
          }
      
          throw new Error('Failed to create user. Please check your input data and try again.');
        }
      }, 

  updateUser: async (resource, params) => {
    const url = `${apiUrl}/user`;
    const response = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return {
      data: response.json,
    };
  },

  deleteManyUser: async (resource, params) => {
    const { ids } = params;
    const deletePromises = ids.map(async (id) => {
      const url = `${apiUrl}/user/${id}`;
      await httpClient(url, {
        method: 'DELETE',
      });
    });
  
    await Promise.all(deletePromises);
  
    // Retorna um objeto vazio, conforme esperado pelo React Admin
    return { data: [] };
  },

  // Métodos específicos para o recurso "item"
  getItemList: async (resource, params) => {
    const url = `${apiUrl}/suggestion/item/all`;
  
    try {
      const response = await httpClient(url);
  
      if (!response.json || !Array.isArray(response.json)) {
        throw new Error('Invalid response format: expected an array.');
      }
  
      const items = response.json.map((item) => ({
        id: item._id || '1',
        type: item.type || '',
        title: item.title || '',
        category: item.category || '',
        convenient: item.convenient || '',
        createdAt: item.createdAt || '',
        count: item.count || ''
      }));
  
      return {
        data: items,
        total: items.length,
      };
    } catch (error) {
      console.error('Error in getItemList:', error);
      return {
        data: [],
        total: 0,
      };
    }
  }, 
  getNewItemList: async (resource, params) => {
    const url = `${apiUrl}/user/list/all/itens`;
  
    try {
      const response = await httpClient(url);
  
      if (!response.json || !Array.isArray(response.json)) {
        throw new Error('Invalid response format: expected an array.');
      }
  
      const items = response.json.map((item) => ({
        id: item._id || '1',
        title: item.title || '',
        category: item.category || '',
        convenient: item.convenient || '',
        createdAt: item.createdAt || '',
      }));
  
      return {
        data: items,
        total: items.length,
      };
    } catch (error) {
      console.error('Error in getItemList:', error);
      return {
        data: [],
        total: 0,
      };
    }
  }, 

  getItemOne: async (resource, params) => {
    const url = `${apiUrl}/suggestion/item/${params.id}`;
        try {
          const response = await httpClient(url);
          
          // Certifique-se de que a resposta é um objeto
          if (!response.json || typeof response.json !== 'object') {
            throw new Error('Invalid response format: expected an object.');
          }
      
          // Adicione a chave 'id' aos dados do usuário
          const user = response.json;
          user.id = user._id || '1'; // Adapte conforme a estrutura real do seu objeto
      
          return {
            data: user,
          };
        } catch (error) {
          console.error('Error in getOne:', error);
          return {
            data: {},
          };
        }
    },
  
  createItem: async (resource, params) => {
    const url = `${apiUrl}/suggestion/item/create`;
    // Monta dicionário com informações do usuário'
    const itemInfo = {
      type: params.data.type,
      title: params.data.title,
      convenient: params.data.convenient,
      count: 1
    };
    try {
      const response = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(itemInfo),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    if (!response.ok) {
      InvalidAlert("Erro", "Ocorreu um erro ao cadastrar o item");
    }

    SuccessAlert("Sucesso", "Item cadastrado com sucesso");

    return {
      data: { id: response.json._id }
    };
  } catch (error) {
    console.error('Error in create:', error);
    if (error.response) {
      console.error('API Response:', error.response);
    }
    throw new Error('Failed to create item. Please check your input data and try again.');
  }
},
  
  updateItem: async (resource, params) => {
    const url = `${apiUrl}/suggestion/item`; // Corrigido para a rota correta

    try {
      const response = await httpClient(url, {
        method: 'PUT',
        body: JSON.stringify(params.data),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update item. Server responded with ${response.status}.`);
      }

      return {
        data: response.json,
      };
    } catch (error) {
      console.error('Error in updateItem:', error);

      if (error.response) {
        console.error('API Response:', error.response);
      }

      throw new Error('Failed to update item. Please check your input data and try again.');
    }
  },

  deleteManyItem: async (resource, params) => {
    const { ids } = params;
    const deletePromises = ids.map(async (id) => {
      const url = `${apiUrl}/suggestion/item/${id}`;
      await httpClient(url, {
        method: 'DELETE',
      });
    });
  
    await Promise.all(deletePromises);
  
    // Retorna um objeto vazio, conforme esperado pelo React Admin
    return { data: [] };
  },
  

  // Métodos específicos para o recurso "custos"
  getCostsList: async (resource, params) => {
    const url = `${apiUrl}/user/list/cost/item/all`;
    try {
      const response = await httpClient(url);
  
      // Certifique-se de que a resposta é um array
      if (!response.json || !Array.isArray(response.json)) {
        throw new Error('Invalid response format: expected an array.');
      }
  
      // Mapeia os dados dos custos
      const costsList = response.json.map((cost) => ({
        id: cost._id || '1',
        process: cost.process || '',
        title: cost.title || '',
        category: cost.category || '',
        value: cost.value || '',
      }));
  
      return {
        data: costsList,
        total: costsList.length,
      };
    } catch (error) {
      console.error('Error in getCostList:', error);
      return {
        data: [],
        total: 0,
      };
    }
  },
   

  getCostOne: async (resource, params) => {
    console.log(params.id);
    const url = `${apiUrl}/user/list/cost/item/${params.id}`;
        try {
          const response = await httpClient(url);
          
          // Certifique-se de que a resposta é um objeto
          if (!response.json || typeof response.json !== 'object') {
            throw new Error('Invalid response format: expected an object.');
          }
      
          // Adicione a chave 'id' aos dados do usuário
          const cost = response.json;
          cost.id = cost._id || params.id; // Adapte conforme a estrutura real do seu objeto
          console.log(cost);
      
          return {
            data: cost,
          };
        } catch (error) {
          console.error('Error in getOne:', error);
          return {
            data: {},
          };
        }
    },

    createCost: async (resource, params) => {
      const url = `${apiUrl}/user/list/cost/item/add`;
      const costInfo = {
        process: params.data.process,
        title: params.data.title,
        category: params.data.category,
        value: params.data.value
      };
    
      try {
        console.log('Sending request to:', url);
        console.log('Request data:', costInfo);
    
        const response = await httpClient(url, {
          method: 'POST',
          body: JSON.stringify(costInfo),
          headers: new Headers({ 'Content-Type': 'application/json' }),
        });
    
        console.log('Server response:', response);
    
        if (!response.ok) {
          console.error(`Failed to create item. Server responded with ${response.status}.`);
          InvalidAlert("Erro", "Ocorreu um erro ao cadastrar o custo");
        }

        SuccessAlert("Sucesso", "Custo atualizado com sucesso");

        return {
          data: { id: response.json._id }
        };
      } catch (error) {
        InvalidAlert("Erro", "Ocorreu um erro ao cadastrar o custo");
        if (error.response) {
          InvalidAlert("Erro", "Ocorreu um erro ao cadastrar o custo");
        }
      }
    },    
  
  updateCost: async (resource, params) => {
    const url = `${apiUrl}/user/list/cost/item/`; // Corrigido para a rota correta
    try {
      const response = await httpClient(url, {
        method: 'PUT',
        body: JSON.stringify(params.data),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      if (!response.ok) {
        InvalidAlert("Erro", "Ocorreu um erro ao atualizar o custo");
      }
      SuccessAlert("Sucesso", "Custo atualizado com sucesso");
      return {
        data: response.json,
      };
    } catch (error) {
      console.error('Error in updateItem:', error);
      if (error.response) {
        console.error('API Response:', error.response);
      }
    }
  },         

  deleteManyCost: async (resource, params) => {
    const { ids } = params;
    const deletePromises = ids.map(async (id) => {
      const url = `${apiUrl}/user/list/cost/item/${id}`;
      await httpClient(url, {
        method: 'DELETE',
      });
    });
    SuccessAlert("Sucesso", "Custo deletado com sucesso");
    await Promise.all(deletePromises);
    return { data: [] };
  },

  getTotalUsersCount: async () => {
    const url = `${apiUrl}/user/count`;
    try {
      const response = await httpClient(url);
      return response.json.count || 0;
    } catch (error) {
      console.error('Error in getTotalUsersCount:', error);
      return 0;
    }
  },

  getProperties: async (resource, params) => {
    const url = `${apiUrl}/property/all`;
  
    try {
      const response = await httpClient(url);
  
      if (!response.json || !Array.isArray(response.json)) {
        throw new Error('Invalid response format: expected an array.');
      }

      console.log('Raw Property Data:', response.json); 
  
      const property = response.json.map((property) => ({
        id: property._id || '1',
        name: property.name || '',
        type: property.type || '',
        rooms: property.rooms || '',
        bathrooms: property.bathrooms || '',
        parkingSpaces: property.parkingSpaces || '', 
      }));
  
      return {
        data: property,
        total: property.length,
      };
    } catch (error) {
      console.error('Error in getUserList:', error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  getIdealProperties: async (resource, params) => {
    const url = `${apiUrl}/property/all`;
  
    try {
      const response = await httpClient(url);
  
      if (!response.json || !Array.isArray(response.json)) {
        throw new Error('Invalid response format: expected an array.');
      }
  
      const idealProperty = response.json.map((ideal) => ({
        id: ideal._id || '1',
        propertyType: ideal.propertyType || '',
        rooms: ideal.rooms || 0,
        bathrooms: ideal.bathrooms || 0,
        parkingSpaces: ideal.parkingSpaces || 0,
        infraestructure: ideal.infraestructure || []
      }));
  
      return {
        data: idealProperty,
        total: idealProperty.length,
      };
    } catch (error) {
      console.error('Error in properties:', error);
      return {
        data: [],
        total: 0,
      };
    }
  },
  
  getNewIdealProperties: async (resource, params) => {
    const url = `${apiUrl}/user/property/6502fd0ea8069442130bb803`;
  
    try {
      const response = await httpClient(url);
  
      if (!response.json || !Array.isArray(response.json)) {
        throw new Error('Invalid response format: expected an array.');
      }
  
      const idealProperty = response.json.map((ideal) => ({
        id: ideal._id || '1',
        name: ideal.name || '',
        rooms: ideal.rooms || 0,
        bathrooms: ideal.bathrooms || 0,
        parkingSpaces: ideal.parkingSpaces || 0,
      }));
  
      return {
        data: idealProperty,
        total: idealProperty.length,
      };
    } catch (error) {
      console.error('Error in properties:', error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  getList: async (resource, params) => {
    if (resource === 'Usuarios') {
      return dataProvider.getUserList(resource, params);
    } else if (resource === 'Itens') {
      return dataProvider.getItemList(resource, params);
    } else if (resource === 'Custos') {
      return dataProvider.getCostsList(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getOne: async (resource, params) => {
    if (resource === 'Usuarios') {
      return dataProvider.getUserOne(resource, params);
    } else if (resource === 'Itens') {
      return dataProvider.getItemOne(resource, params);
    } else if (resource === 'Custos') {
      return dataProvider.getCostOne(resource, params);
    }
  
    throw new Error(`Unknown resource: ${resource}`);
  },

  create: async (resource, params) => {
    if (resource === 'Usuarios') {
      return dataProvider.createUser(resource, params);
    } else if (resource === 'Itens') {
      return dataProvider.createItem(resource, params);
    } else if (resource === 'Custos') {
      return dataProvider.createCost(resource, params);
    }

    throw new Error(`Unknown resource: ${resource}`);
  },

  deleteMany: async (resource, params) => {
    if (resource === 'Usuarios') {
      return dataProvider.deleteManyUser(resource, params);
    } else if (resource === 'Itens') {
      return dataProvider.deleteManyItem(resource, params);
    } else if (resource === 'Custos') {
      return dataProvider.deleteManyCost(resource, params);
    }
  },

  update: async (resource, params) => {
    if (resource === 'Usuarios') {
      return dataProvider.updateUser(resource, params);
    } else if (resource === 'Itens') {
      return dataProvider.updateItem(resource, params);
    } else if (resource === 'Custos') {
      return dataProvider.updateCost(resource, params);
    }
  },
};

export default dataProvider;


