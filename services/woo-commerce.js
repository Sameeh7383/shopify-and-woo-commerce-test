const WooCommerceAPI = require("woocommerce-api");
const WooCommerce = new WooCommerceAPI({
  url: "https://ninjashop.in",
  consumerKey: "ck_bcc829bb7da7954f7487748a9963e966cef16c71",
  consumerSecret: "cs_0e50ba69c14687741ff1252295d26eb70368e94d",
  wpAPI: true,
  version: "wc/v3",
});

let getOrders = () => {
  const startDate = "2022-12-12T00:00:00";
  const endDate = "2022-12-29T23:59:59";
  const perPage = 5;
  let orders = [];
  let page = 1;
  WooCommerce.get(
    `orders?after=${startDate}&before=${endDate}&order=asc&orderby=date&per_page=${perPage}&page=${page}`,
    function (err, data, res) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
      const dataJSON = JSON.parse(res);
      orders = orders.concat(dataJSON);
    }
  );
};
let getProducts = () => {
  let orderBy = "title";
  WooCommerce.get(
    `products?order=asc&orderby=${orderBy}`,
    function (err, data, res) {
      if (err) {
        console.log(err);
        return;
      }
      const products = JSON.parse(res);
      console.log(products);
    }
  );
};

getOrders();
getProducts();
