import axios from 'axios';
import qs from 'qs';

const { VUE_APP_CLIENT_ID: clientId } = process.env;
const apiUrl = 'https://api.imgur.com';

export default {
  login() {
    const queryString = {
      client_id: clientId,
      response_type: 'token',
    };
    window.location = `${apiUrl}/oauth2/authorize?${qs.stringify(queryString)}`;
  },
  fetchImages(token) {
    return axios.get(`${apiUrl}/3/account/me/images`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  upload(images, token) {
    const promises = Array.from(images).map((image) => {
      const formData = new FormData();
      formData.append('image', image);

      return axios.post(`${apiUrl}/3/image`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    });
    return Promise.all(promises);
  },
};
