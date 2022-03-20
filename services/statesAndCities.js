import axios from 'axios'

const baseUrl = axios.create({
 baseURL: `https://arcane-meadow-02410.herokuapp.com`,
});


const getData = async (url) => {
 try {
  const response = await baseUrl.get(url);
  return response.data;
 } catch (e) {
  return null;
 }
};

export {getData}