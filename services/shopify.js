const axios = require("axios");
require('dotenv').config()

const baseUrl = "https://hello24-d5.myshopify.com/admin/api/2022-04/graphql.json/";
const apiKey = process.env.shopifyApiKey;
const getOrders = () => {
  const startCursor = null;
  const perPage = 5;
  const startDate = "2022-11-12T00:00:00";
  const endDate = "2022-12-29T23:59:59";
  let orders = [];
  const query = `
  query {
    orders(first: ${perPage}, query: "created_at:>=${startDate} created_at:<=${endDate} sort_by:created_at", after: ${startCursor}) {
       edges {
          node {
            id
            createdAt
            customer {
              firstName
              lastName
            }
            totalPrice
          }
        }
    }
  }
  `;

  axios
    .post(
      baseUrl,
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": apiKey,
        },
      }
    )
    .then((response) => {
      const {
        data: { data },
      } = response;
      console.log(response.data);
      orders = orders.concat(data.orders.edges);
      console.log(orders);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getProducts = (req, res) => {
  let products = [];
  const query = `{
        products(first:250,sortKey:TITLE) {
          edges {
            node {
              id
              title
              description
            }
          }
        }
      }`;
  axios
    .post(
      baseUrl,
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": apiKey,
        },
      }
    )
    .then((response) => {
      const {
        data: { data },
      } = response;
      console.log(response.data);
      products = products.concat(data.products.edges);
      console.log(products);
    })
    .catch((error) => {
      console.log(error);
    });
};
getOrders();
getProducts();
