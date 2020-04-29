import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import swal from "sweetalert";

class Cart extends React.Component {
  state = {
    cartId: [],
    productList: [],
  };

  loadData = () => {
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id,
      },
    })
      .then((res) => {
        res.data.map((val) => this.fillCart(val));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.loadData();
  };

  fillCart = (val) => {
    this.setState({
      cartId: [...this.state.cartId, val.id],
    });
    Axios.get(`${API_URL}/products`, {
      params: {
        id: val.productId,
      },
    })
      .then((res) => {
        this.setState({
          productList: [...this.state.productList, res.data[0]],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCart = (cartId) => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Axios.delete(`${API_URL}/cart/${cartId}`)
          .then(() => {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
            this.setState({
              productList: [],
            });
            this.loadData();
          })
          .catch((err) => {
            console.log(err);
            swal("Something went wrong...", {
              icon: "error",
            });
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    this.setState({
      productList: [],
    });
    this.loadData();
  };

  renderCart = () => {
    return this.state.productList.map((val, index) => {
      return (
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center">
            <img
              className="img-fluid"
              style={{ height: "250px" }}
              src={val.image}
              alt=""
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-center">
            <h1>{val.productName}</h1>
            <h2>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(val.price)}
            </h2>
            <ButtonUI
              className="mt-3"
              type="contained"
              func={() => {
                this.deleteCart(this.state.cartId[index]);
              }}
            >
              Delete
            </ButtonUI>
          </div>
        </div>
      );
    });
  };

  render() {
    if (this.props.user.isLogged) {
      return (
        <div className="container">
          <h3 className="text-center">This is your cart</h3>
          {this.state.productList.length > 0 ? (
            <>{this.renderCart()}</>
          ) : (
            <div className="text-center">
              <h3>Oops...</h3>
              <h2>Your cart is empty </h2>
            </div>
          )}
        </div>
      );
    } else {
      return <Redirect to="/auth/login" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);
