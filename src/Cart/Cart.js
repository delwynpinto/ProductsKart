import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  overlay: {
    position: "fixed",
    top: "5%",
    right: 0,
    width: 350,
    height: "90%",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    overflowY: "auto",
    zIndex: 999,
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(100%)",
  },
  show: {
    transform: "translateX(0%)",
  },
  cartItem: {
    padding: "16px",
    borderBottom: "1px solid #ccc",
  },
  productListContainer: {
    height: "70%",
    overflow: "auto",
  },
  product: {
    backgroundColor: "white",
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-start",
    padding: 16,
    margin: 16,
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productName: {
    fontWeight: 600,
    textAlign: "left",
    marginLeft: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 500,
    color: "red",
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
  },
  button: {
    height: 17,
    margin: 4,
    display: "flex",
    alignItems: "center",
    backgroundColor: "crimson",
    color: "white",
    border: "none",
    borderRadius: 4,
  },
  subtext: {
    fontSize: 12,
    color: "gray",
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    margin: 16,
  },
  headingLabel: {
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "1px solid gray",
    cursor: "pointer",
  },
  totalAmoutContainer: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px dashed",
  },
  totalAmount: {
    display: "flex",
    justifyContent: "space-between",
    margin: 16,
    fontWeight: 600,
  },
  printButton: {
    height: 30,
    margin: 16,
    backgroundColor: "crimson",
    color: "white",
    border: "none",
    borderRadius: 8,
  },
  pricingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const pdfRef = useRef();
  const { products, hideCart, increaseCount, decreaseCount, renderCart } =
    props;

  const overlayClass = clsx(classes.overlay, {
    [classes.show]: products && products.length > 0,
  });

  let totalAmount = 0.0;
  products.forEach((product) => {
    const { price: priceString, count } = product;
    const unitPrice = parseFloat(priceString.split("$")[1]);
    const price = unitPrice * count;
    totalAmount = totalAmount + price;
  });

  const productsList = products.map((product) => (
    <div key={product.id} className={classes.product}>
      <img src={product.image} alt="product.name" />
      <div className={classes.productDetails}>
        <div className={classes.productName}>{product.name}</div>

        <div className={classes.pricingContainer}>
          <div className={classes.productPrice}>{product.price}</div>
          <div className={classes.buttonsContainer}>
            <button
              className={classes.button}
              onClick={(e) => decreaseCount(product)}
            >
              -
            </button>
            {product.count}
            <button
              className={classes.button}
              onClick={(e) => increaseCount(product)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  const onPrintBill = () => {
    const pdf = new jsPDF();
    pdf.text("Bill", 10, 10);

    const tableData = [];

    products.forEach((product) => {
      const { price: priceString } = product;
      const price = parseFloat(priceString.split("$")[1]);
      tableData.push([
        { content: `Product Name: ${product.name}`, rowSpan: 1 },
        { content: `Product Quantity: ${product.count}`, rowSpan: 1 },
        {
          content: `Product Price: ${price * product.count}`,
          rowSpan: 1,
        },
      ]);
      tableData.push([""]); // Empty row for spacing
    });

    pdf.autoTable({
      body: tableData,
    });

    // Draw a dashed top border manually
    const startX = 10;
    const startY = pdf.autoTable.previous.finalY + 10;
    const endX = pdf.internal.pageSize.width - 10;
    const endY = startY + 20;

    // Dashed line parameters
    const dashLength = 5;
    const gapLength = 3;

    for (let i = startX; i < endX; i += dashLength + gapLength) {
      pdf.line(i, startY, i + dashLength, startY);
    }

    // Add "Total Amount" label
    pdf.text("Total Amount", 10, endY + 5);

    // Add the total amount value
    pdf.text(`$${totalAmount.toFixed(2)}`, 70, endY + 5);

    // Save the PDF to the ref
    pdfRef.current = pdf;

    // Open the PDF in a new tab
    pdf.output("dataurlnewwindow");
  };

  return (
    <div className={overlayClass}>
      <div className={classes.heading}>
        <div className={classes.headingLabel}>
          <label className={classes.label}>My Order</label>
          <label className={classes.subtext}>Take Out</label>
        </div>
        <button onClick={hideCart} className={classes.closeButton}>
          <CloseIcon />
        </button>
      </div>

      <div className={classes.productListContainer}>{productsList}</div>

      <div className={classes.totalAmoutContainer}>
        <div className={classes.totalAmount}>
          {" "}
          <span>Total</span> <span>$ {totalAmount}</span>
        </div>

        <button className={classes.printButton} onClick={onPrintBill}>
          Print Bills
        </button>
      </div>
    </div>
  );
};

export default Cart;
