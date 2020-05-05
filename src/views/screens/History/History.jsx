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
    unfinished: [],
    finished: [],
    category: "",
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

  setCategory = (type) => {
    this.setState({
      category: type,
    });
  };

  renderTransactionList = () => {
    return this.state.transactionList.map((val) => {
      const { id, purchaseDate, confirmationDate, status } = val;
      if (this.state.category != "") {
        if (this.state.category === status) {
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
        }
      } else {
        if (status != "unpaid") {
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
        }
      }
    });
  };

  render() {
    return (
      <div className="container text-center  pt-4">
        <h1>History</h1>
        <div className="d-flex justify-content-center flex-row align-items-center mt-3">
          <Link to="/history" style={{ color: "inherit" }}>
            <h6
              onClick={() => {
                this.setCategory("unpaid");
              }}
              className="mx-4 font-weight-bold"
            >
              Unpaid
            </h6>
          </Link>
          <Link to="/history" style={{ color: "inherit" }}>
            <h6
              onClick={() => {
                this.setCategory("");
              }}
              className="mx-4 font-weight-bold"
            >
              paid
            </h6>
          </Link>
        </div>
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
