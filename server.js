const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc', {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY
      },
      params: {
        coords: req.query.coords,
        output: 'json'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3001, () => {
  console.log('Express 서버가 3001번 포트에서 실행 중입니다.');
});
