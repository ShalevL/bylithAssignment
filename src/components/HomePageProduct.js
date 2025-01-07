import classes from "./HomePageProduct.module.css";

import { loadImage } from "../functions";

export default function HomePageProduct(props) {
  const diffPrices = props.product.min_price != props.product.max_price;

  return (
    <div className={classes.productCard}>
      <div className={classes.imageContainer}>
        <img
          className={classes.productImage}
          src={loadImage(props.product.images[0].url)}
        />
      </div>
      <p className={classes.productTitle}>{props.product.title}</p>

      <div>
        {diffPrices && <p>${props.product.min_price}</p>}

        <p className={diffPrices && classes.maxPriceTranc}>
          ${props.product.max_price}
        </p>
      </div>

      <p className={classes.productDescription}>{props.product.description}</p>
    </div>
  );
}
