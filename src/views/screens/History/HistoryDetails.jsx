import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";

class HistoryDetails extends React.Component {
  state = {
    productList: [],
    itemList: [],
    delivery: "",
    status: "",
  };

  componentDidMount = () => {
    Axios.get(`${API_URL}/transaction`, {
      params: {
        id: this.props.match.params.transactionId,
      },
    })
      .then((res) => {
        this.setState({
          status: res.data[0].status,
          delivery: res.data[0].delivery,
          itemList: res.data[0].itemList,
        });
        this.state.itemList.map((val) => {
          this.getProductDetails(val.productId);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showSum = () => {
    let sum = 0;
    for (let i = 0; i < this.state.itemList.length; i++) {
      sum += this.state.itemList[i].price * this.state.itemList[i].quantity;
    }
    return sum;
  };

  totalPayment = () => {
    let sum = this.showSum();
    let deliveryPrice = 0;
    switch (this.state.delivery) {
      case "Instant":
        deliveryPrice = 100000;
        break;
      case "Same day":
        deliveryPrice = 50000;
        break;
      case "Express":
        deliveryPrice = 20000;
        break;
      case "Economy":
        deliveryPrice = 0;
        break;
    }
    return sum + deliveryPrice;
  };

  payHandler = (id) => {
    Axios.patch(`${API_URL}/transaction/${id}`, {
      totalPayment: this.totalPayment(),
      status: "Waiting for confirmation",
    })
      .then((res) => {
        swal(
          "Thank you for your purchase!",
          "waiting for admin to confirm your payment",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getProductDetails = (id) => {
    Axios.get(`${API_URL}/products`, {
      params: {
        id: id,
      },
    })
      .then((res) => {
        let productList = [...this.state.productList];
        productList.push(res.data[0]);
        this.setState({
          productList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTransactionDetails = () => {
    return this.state.itemList.map((val) => {
      const { productId, productName, price, quantity } = val;
      let image = "";
      let desc = "";
      this.state.productList.map((val) => {
        if (val.id === productId) {
          image = val.image;
          desc = val.desc;
        }
      });
      return (
        <tr>
          <td>
            <img style={{ height: "120px", width: "auto" }} src={image} />
          </td>
          <td>{productName}</td>
          <td>{desc}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </td>
          <td>{quantity}</td>
        </tr>
      );
    });
  };

  renderDeliveryDetails = () => {
    let temp = [];
    switch (this.state.delivery) {
      case "Instant":
        temp = { name: "Instant", duration: "3-6 jam", price: 100000 };
        break;
      case "Same day":
        temp = { name: "Same day", duration: "1 hari", price: 50000 };
        break;
      case "Express":
        temp = { name: "Express", duration: "2-3 hari", price: 20000 };
        break;
      case "Economy":
        temp = { name: "Economy", duration: "3-5 hari", price: 0 };
        break;
    }
    const { name, duration, price } = temp;
    return (
      <tr>
        <td colSpan="2"></td>
        <td>{name}</td>
        <td>{duration}</td>
        <td>
          {" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(price)}
        </td>
      </tr>
    );
  };

  render() {
    return (
      <div className="container text-center pt-4">
        <h1>Transaction {this.props.match.params.transactionId}</h1>
        <table className="table table-hover">
          <thead>
            <th>image</th>
            <th>Product Name</th>
            <th>desc</th>
            <th>Price</th>
            <th>Quantity</th>
          </thead>
          <tbody>
            {this.renderTransactionDetails()}
            <td colSpan="3"></td>
            <td>Sub-total</td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(this.showSum())}
            </td>
          </tbody>
          <thead>
            <th colSpan="2"></th>
            <th>Delivery</th>
            <th>Duration</th>
            <th>Price</th>
          </thead>
          <tbody>{this.renderDeliveryDetails()}</tbody>
          <tfoot>
            <tr>
              <th colSpan="3"></th>
              <th>Total Payment</th>
              <th>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(this.totalPayment())}
              </th>
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>
                {this.state.status == "unpaid" || this.state.status == "" ? (
                  <ButtonUI
                    func={() => {
                      this.setState({
                        status: "paid",
                      });
                      this.payHandler(this.props.match.params.transactionId);
                    }}
                  >
                    pay
                  </ButtonUI>
                ) : (
                  <h5>Paid</h5>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default HistoryDetails;
