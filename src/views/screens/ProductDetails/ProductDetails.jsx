import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import ButtonUI from "../../components/Button/Button";
import { API_URL } from "../../../constants/API";
import swal from "sweetalert";

class ProductDetails extends React.Component {
  state = {
    id: 0,
    productName: "",
    price: 0,
    image: "",
    desc: "",
  };

  componentDidMount() {
    Axios.get(`${API_URL}/products`, {
      params: {
        id: this.props.match.params.productId,
      },
    })
      .then((res) => {
        const { id, productName, price, image, desc } = res.data[0];
        this.setState({
          id,
          productName,
          price,
          image,
          desc,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCartHandler = () => {
    Axios.post(`${API_URL}/cart`, {
      userId: this.props.user.id,
      productId: this.state.id,
      quantity: 1,
    })
      .then((res) => {
        console.log(res);
        swal("Thank you!", "Produk ditambahkan ke keranjang", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { productName, price, image, desc } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12 p-3 d-flex justify-content-center">
            <img className="img-fluid" src={image} alt="" />
          </div>
          <div className="col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-center">
            <h2>{productName}</h2>
            <span>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </span>
            <p className="mt-3 text-justify">{desc}</p>
            <div className="d-flex mt-4">
              <ButtonUI func={this.addToCartHandler}>Add to cart</ButtonUI>
              <ButtonUI className="ml-4" type="outlined">
                Add to wishlist
              </ButtonUI>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProductDetails);
