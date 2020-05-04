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

  payBill = () => {
    const { id, userId, status, date, itemList } = this.state.transList;
    Axios.put(`${API_URL}/transaction/${this.props.match.params.transId}`, {
      id,
      userId,
      status: "paid",
      date,
      itemList,
    })
      .then((res) => {
        swal("Yeay!", "Thank you for your purchase", "success");
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
      this.state.transList.userId === this.props.user.id ||
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
                    <ButtonUI func={this.payBill} className="mr-2">
                      {" "}
                      Pay
                    </ButtonUI>
                    <ButtonUI className="ml-2"> cancel</ButtonUI>
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
