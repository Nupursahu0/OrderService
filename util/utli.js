const axios = require('axios');

const pushToThirdPartyAPI = async (order) => {
  console.log('order',order)
  const response = await axios.post('https://third-party-api.com/salesOrder', order, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    },
  });
  return response
};

module.exports = { pushToThirdPartyAPI };
