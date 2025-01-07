import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import classes from "./Product.module.css";

import { loadImage, arraysMatch } from "../functions";

export default function ProductPage() {
  const params = useParams();

  const [productDetails, setProductDetails] = useState();
  const [enteredQuantity, setEnteredQuantity] = useState("0");

  let attributes = {};

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

    fetch(
      `https://fedtest.bylith.com/api/catalog/get?id=${params.productId}`,
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        setProductDetails({
          data: result["data"],
          originAttr: result["data"].attributes,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleQuantityChange(e) {
    setEnteredQuantity(e.target.value);
  }

  function selectHandler(e) {
    const attributeId = e.target.getAttribute("id");
    const attributeValue = e.target.value;

    attributes[attributeId] = attributeValue;
  }

  function addToCartHandler(e) {
    let selectedAttributesLabels = [];
    for (const [key, value] of Object.entries(attributes)) {
      selectedAttributesLabels.push({ attribute_id: key, label_id: value });
    }

    for (const variant of productDetails.data.variants) {
      if (arraysMatch(selectedAttributesLabels, variant.labels)) {
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

        fetch(
          `https://fedtest.bylith.com/api/cart/add?variant_id=${variant.id}&quantity=${enteredQuantity}`,
          requestOptions
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            console.log(result);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

  return (
    <>
      {productDetails && (
        <div className={classes.productContainer}>
          <div className={classes.productImagesContainer}>
            <div className={classes.slider}>
              {productDetails.data.images.map(function (image) {
                return (
                  <img
                    className={classes.productImage}
                    src={loadImage(image.url)}
                    alt={image.url}
                    key={image.url}
                  />
                );
              })}
            </div>
          </div>
          <div className={classes.productContentContainer}>
            <p>{productDetails.data.title}</p>

            <div>
              {productDetails.data.min_price !=
                productDetails.data.max_price && (
                <p>min_price: {productDetails.data.min_price}</p>
              )}

              <p>price: {productDetails.data.max_price}</p>
            </div>

            <p>{productDetails.data.description}</p>

            {productDetails.data.attributes.map(function (item) {
              return (
                <div className={classes.dropDown} key={item["id"]}>
                  <p>{item.title}</p>

                  <select onChange={selectHandler} id={item.id}>
                    <option>Choose {item.title}</option>
                    {item.labels.map(function (option) {
                      return (
                        <option key={option.id} value={option.id}>
                          {option.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            })}

            <div>
              <input
                type="number"
                id="quantity"
                name="quantity"
                onChange={handleQuantityChange}
              />
              <button onClick={addToCartHandler}>Add To Cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
