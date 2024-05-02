import axios from 'axios';

axios.defaults.baseURL = "https://todolist-hmn3.onrender.com/";

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('An error occurred:', error);
    return Promise.reject(error);
  }
);

const service = {
  getTasks: async () => {
    const result = await axios.get("/items");
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
    const result = await axios.post(`/items`, {
      Name: name,
      IsComplete: false
    });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    const answer = await axios.get(`/items`);
    const item = answer.data.find(item => item.id === parseInt(id));
    if (!item) {
      console.error(`Item with id ${id} not found.`);
      return null;
    }
    const result = await axios.put(`/items/${id}`, {
      Id: item.id,
      Name: item.name,
      IsComplete: isComplete     
    });
    return result.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask');
    const result = await axios.delete(`/items/${id}`);
    return result;
  }
};

export default service; // Export the 'service' object as the default export
