import { useEffect, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Context } from "./store/store-context";

import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import RootLayout from "./pages/Root";
import CartPage from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:productId", element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
    ],
  },
]);

function App() {
  const [items, setItems] = useState([]);

  useEffect(function () {
    const myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "siteMatKey=MgdpXbGHkfIDrKrrD-j2H9ly79bE3aTj%2CoPcGHh%2COw0_"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://fedtest.bylith.com/api/catalog/getAll", requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        setItems(result["data"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Context value={{ items: items }}>
      <RouterProvider router={router} />
    </Context>
  );
}

export default App;
