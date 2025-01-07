import { use } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/store-context";

import HomePageProduct from "../components/HomePageProduct";

import classes from "./Home.module.css";

export default function HomePage() {
  const ctx = use(Context);

  return (
    <>
      <p className={classes.productsTitle}>Products</p>
      {ctx.items && (
        <div className={classes.productsGrid}>
          {ctx.items.map(function (item) {
            return (
              <div className={classes.product} key={item["id"]}>
                <Link to={`/product/${item["id"]}`}>
                  <HomePageProduct product={item} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
