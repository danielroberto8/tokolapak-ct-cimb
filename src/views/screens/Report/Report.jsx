import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";

class Report extends React.Component {
  state = {
    transactionList: [],
  };

  componentDidMount = () => {
    Axios.get(`${API_URL}/transaction?_expand=user`, {
      params: {
        status: "Confirmed",
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
  };

  getTotalSpent = (userId) => {
    let total = 0;
    this.state.transactionList.map((val) => {
      if (val.userId === userId) {
        total += val.totalPayment;
      }
    });
    return total;
  };

  getQuantity = (userId) => {
    let quantity = 0;
    this.state.transactionList.map((val) => {
      if (val.userId === userId) {
        val.itemList.map((val) => {
          quantity += val.quantity;
        });
      }
    });
    return quantity;
  };

  countTrans = (userId) => {
    let count = 0;
    this.state.transactionList.map((val) => {
      if (val.userId === userId) {
        count++;
      }
    });
    return count;
  };

  checkUserExist = (arr, userId) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === userId) {
        return true;
      }
    }
    return false;
  };

  renderUserList = () => {
    let arrList = [];
    return this.state.transactionList.map((val) => {
      const { userId, user } = val;
      if (!this.checkUserExist(arrList, userId)) {
        arrList.push(userId);
        return (
          <tr>
            <td>{userId}</td>
            <td>{user.username}</td>
            <td>{this.countTrans(userId)}</td>
            <td>{this.getQuantity(userId)}</td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(this.getTotalSpent(userId))}
            </td>
          </tr>
        );
      }
    });
  };

  render() {
    return (
      <div className="container text-center  pt-4">
        <h1>Succesfull Transaction</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>user id</th>
              <th>username</th>
              <th>Total transaction</th>
              <th>Total item(s) bought</th>
              <th>Total money spent</th>
            </tr>
          </thead>
          <tbody>{this.renderUserList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Report;
