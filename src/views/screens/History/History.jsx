import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../../../constants/API";
import { Button } from "reactstrap";
import ButtonUI from "../../components/Button/Button";

class History extends React.Component {
  state = {
    transactionList: [],
  };

  componentDidMount() {
    Axios.get(`${API_URL}/transaction`, {
      params: {
        userId: this.props.user.id,
      },
    })
      .then((res) => {
        this.setState({
          transactionList: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderTransactionList = () => {
    return this.state.transactionList.map((val) => {
      const { id, purchaseDate, confirmationDate, status } = val;
      return (
        <tr className="text-center">
          <td>{id}</td>
          <td>{purchaseDate}</td>
          <td>{confirmationDate != "" ? confirmationDate : "-"}</td>
          <td>{status}</td>
          <td>
            <Link to={`/history/detail/${id}`}>
              <ButtonUI type="textual">details</ButtonUI>
            </Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container text-center  pt-4">
        <h1>History</h1>
        <table className="table table-hover">
          <thead>
            <th>Transaction Id</th>
            <th>Purchase date</th>
            <th>Confirmation date</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>{this.renderTransactionList()}</tbody>
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

export default connect(mapStateToProps)(History);
