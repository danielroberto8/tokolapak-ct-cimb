import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";

class Payment extends React.Component {
  state = {
    paymentList: [],
  };

  componentDidMount = () => {
    this.loadPaymentList();
  };

  loadPaymentList = () => {
    Axios.get(`${API_URL}/transaction?_expand=user`, {
      params: {
        status: "Waiting for confirmation",
      },
    })
      .then((res) => {
        this.setState({
          paymentList: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  renderPaymentList = () => {
    return this.state.paymentList.map((val) => {
      const { id, purchaseDate, status, user } = val;
      return (
        <tr>
          <td>{id}</td>
          <td>{user.username}</td>
          <td>{purchaseDate}</td>
          <td>{status}</td>
          <td>
            <Link to={`/payment/details/${val.id}`}>
              <ButtonUI type="textual">Details</ButtonUI>
            </Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Payment List</h2>
        <table className="dashboard-table mt-5">
          <thead>
            <th>Transaction Id</th>
            <th>Username</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>{this.renderPaymentList()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Payment);
