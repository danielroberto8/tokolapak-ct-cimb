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
    Axios.get(`${API_URL}/transaction`, {
      params: {
        userId: this.props.user.id,
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
      return (
        <tr>
          <td>{val.id}</td>
          <td>{val.date}</td>
          <td>{val.status}</td>
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
