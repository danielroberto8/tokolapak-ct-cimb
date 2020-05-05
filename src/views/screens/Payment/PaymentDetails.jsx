import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";
import { connect } from "react-redux";

class PaymentDetails extends React.Component {
  state = {
    transList: [],
    itemList: [],
  };

  componentDidMount = () => {
    Axios.get(`${API_URL}/transaction/${this.props.match.params.transId}`)
      .then((res) => {
        this.setState({
          transList: res.data,
          itemList: [...res.data.itemList],
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

  getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    return (today = dd + "/" + mm + "/" + yyyy);
  };

  confirmBill = () => {
    Axios.patch(`${API_URL}/transaction/${this.props.match.params.transId}`, {
      confirmationDate: this.getDate(),
      status: "Confirmed",
    })
      .then((res) => {
        swal("Confirmed!", "purchase have been confirmed", "success");
        return <Redirect to="/payment" />;
      })
      .catch((err) => {
        swal("Oops...", "Something went wrong", "error");
        console.log(err);
      });
  };

  renderTransactionDetails = () => {
    return this.state.itemList.map((val) => {
      return (
        <tr>
          <td>{val.productName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price)}
          </td>
          <td>{val.quantity}</td>
          <td>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price * val.quantity)}
          </td>
        </tr>
      );
    });
  };

  render() {
    if (
      this.props.user.role === "admin" ||
      this.state.transList.userId === ""
    ) {
      return (
        <div className="container text-center">
          <h2>Payment Details</h2>
          <h3>Transaction id : {this.state.transList.id}</h3>
          <table className="dashboard-table">
            <thead>
              <th>Item(s)</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </thead>
            <tbody>{this.renderTransactionDetails()}</tbody>
            <tfoot>
              <tr>
                <td colSpan="2"></td>
                <th>Total</th>
                <th>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(this.showSum())}
                </th>
              </tr>
              {this.state.transList.status != "paid" ? (
                <tr>
                  <td colSpan="3"></td>
                  <td colSpan="2" className="d-flex justify-content-center">
                    <ButtonUI func={this.confirmBill} className="mr-2">
                      {" "}
                      Confirm
                    </ButtonUI>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colspan="4">
                    <h3 className="text-center">Lunas!</h3>
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
      );
    } else {
      return <Redirect to="*" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(PaymentDetails);
