import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let accessToken = process.env.ZOHO_ACCESS_TOKEN;
const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
const clientId = process.env.ZOHO_CLIENT_ID;
const clientSecret = process.env.ZOHO_CLIENT_SECRET;
const organizationId = process.env.ZOHO_ORGANIZATION_ID;

async function refreshAccessToken() {
  try {
    console.log('Intentando refrescar token...');
    const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      },
    });
    accessToken = response.data.access_token;
    console.log('Token actualizado correctamente');
  } catch (error) {
    console.error('Error refrescando token:', error.response?.data || error.message);
    throw error;
  }
}

app.get('/items', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.zohoapis.com/inventory/v1/items?organization_id=${organizationId}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error en /items:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      try {
        await refreshAccessToken();
        const retryResponse = await axios.get(
          `https://www.zohoapis.com/inventory/v1/items?organization_id=${organizationId}`,
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
          }
        );
        return res.json(retryResponse.data);
      } catch (err) {
        console.error('Error tras refrescar token en /items:', err.response?.data || err.message);
        return res.status(err.response?.status || 500).json({ error: 'Error tras refrescar token' });
      }
    }
    res.status(error.response?.status || 500).json({ error: 'Error llamando Zoho' });
  }
});

app.get('/items/:itemId/image', async (req, res) => {
  const { itemId } = req.params;
  try {
    const response = await axios.get(
      `https://www.zohoapis.com/inventory/v1/items/${itemId}/image?organization_id=${organizationId}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
        responseType: 'stream',
      }
    );
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res).on('error', (err) => {
      console.error('Error enviando imagen:', err);
      if (!res.headersSent) res.status(500).end();
    });
  } catch (error) {
    console.error('Error en /items/:itemId/image:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      try {
        await refreshAccessToken();
        const retryResponse = await axios.get(
          `https://www.zohoapis.com/inventory/v1/items/${itemId}/image?organization_id=${organizationId}`,
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
            responseType: 'stream',
          }
        );
        res.setHeader('Content-Type', retryResponse.headers['content-type']);
        return retryResponse.data.pipe(res).on('error', (err) => {
          console.error('Error enviando imagen tras refrescar token:', err);
          if (!res.headersSent) res.status(500).end();
        });
      } catch (err) {
        console.error('Error tras refrescar token en imagen:', err.response?.data || err.message);
        return res.status(err.response?.status || 500).json({ error: 'Error tras refrescar token (imagen)' });
      }
    }
    res.status(error.response?.status || 500).json({ error: 'Error llamando Zoho (imagen)' });
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en http://localhost:${PORT}`);
});