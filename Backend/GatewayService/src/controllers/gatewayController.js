// gateway-service/src/controllers/gatewayController.js
import axios from 'axios';
import 'dotenv/config';

const forwardAuthRequests = async (req, res, next) => {
  try {
    const authServiceUrl = process.env.AUTH_SERVICE_URL;
    const path = req.originalUrl.replace('/auth', '');
    const url = `${authServiceUrl}${path}`;

    console.log(`Forwarding request to ${url}`, ` body: ${req.body}`);

    // Forward the exact method and body
    const response = await axios.request({
      method: req.method,
      url,
      data: req.body,
    });
    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(
      'Error while forwarding request to auth service. Error: ',
      error,
      error?.data
    );

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};

const forwardProductsRequests = async (req, res, next) => {
  try {
    const productsServiceUrl = process.env.PRODUCTS_SERVICE_URL;
    const path = req.originalUrl.replace('/products', '');
    const url = `${productsServiceUrl}${path}`;

    console.log(`Forwarding request to ${url}`, ` body: ${req.body}`);

    // Forward the exact method and body
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
    });
    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Error from the microservice or network
    console.log(
      'Error while forwarding request to products service. Error: ',
      error,
      error?.data
    );

    if (error.response) {
      // The microservice responded with an error status
      return res.status(error.response.status).json(error.response.data);
    }
    return next(error);
  }
};
export async function ping(req, res, next) {
  try {
    return res.status(200).json({ message: 'pong' });
  } catch (error) {
    return next(error);
  }
}
// Forward requests to the leads service

const forwardLeadsRequests = async (req, res, next) => {
  try {
    const leadsServiceUrl = process.env.LEADS_SERVICE_URL;
    const path = req.originalUrl.replace(/^\/leads/, '');
    const url = `${leadsServiceUrl}${path}`;

    console.log(`Forwarding request to ${url}`, ' body: ', req.body);

    // Forward the exact method and body
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
    });

    console.log('response: ', response.data);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(
      'Error while forwarding request to leads service. Error: ',
      error,
      error?.data
    );

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return next(error);
  }
};

export { forwardLeadsRequests, forwardAuthRequests, forwardProductsRequests };
