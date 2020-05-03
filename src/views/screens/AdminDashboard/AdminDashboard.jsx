import React from "react";
import Axios from "axios";
import "./AdminDashboard.css";
import { Collapse, Button } from "reactstrap";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import swal from "sweetalert";

class AdminDashboard extends React.Component {
  state = {
    productList: [],
    createForm: {
      id: 0,
      productName: "",
      price: "",
      category: "Phone",
      image: "",
      desc: "",
    },
    editForm: {
      id: 0,
      productName: "",
      price: "",
      category: "Phone",
      image: "",
      desc: "",
    },
    activeProducts: [],
    onEdit: false,
  };

  componentDidMount = () => {
    this.getProductList();
  };

  getProductList = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({
          productList: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    if (field === "price") {
      parseInt(value);
    }
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  createProductHandler = () => {
    Axios.post(`${API_URL}/products`, this.state.createForm)
      .then(() => {
        this.setState({
          createForm: {
            productName: "",
            price: "",
            category: "Phone",
            image: "",
            desc: "",
          },
        });
        swal("Yeay!", "Produk berhasil ditambahkan", "success");
        this.getProductList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: this.state.productList[idx],
    });
  };

  editProductHandler = () => {
    Axios.put(
      `${API_URL}/products/${this.state.editForm.id}`,
      this.state.editForm
    )
      .then((res) => {
        this.setState({
          editForm: {
            id: 0,
            productName: "",
            price: 0,
            category: "Phone",
            image: "",
            desc: "",
          },
        });
        swal("yeay!", "Data berhasil diubah", "success");
        this.getProductList();
      })
      .catch((err) => {
        console.log(err);
        swal("Oops...", "Something went wrong", "error");
      });
  };

  renderProductList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, productName, price, category, image, desc } = val;
      return (
        <tr>
          <td> {id} </td>
          <td> {productName} </td>
          <td>
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}{" "}
          </td>
          <td> {category} </td>
          <td>
            {" "}
            <img
              src={image}
              alt=""
              style={{ height: "100px", objectFit: "contain" }}
            />{" "}
          </td>
          <td> {desc} </td>
          <td>
            <ButtonUI
              type="contained"
              func={() => {
                this.setState({
                  onEdit: true,
                });
                this.editBtnHandler(idx);
              }}
            >
              Edit
            </ButtonUI>
          </td>
          <td>
            <ButtonUI type="outlined">Hapus</ButtonUI>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Products</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>category</th>
                <th>image</th>
                <th>description</th>
                <th className="text-center" colSpan="2">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>{this.renderProductList()}</tbody>
            {!this.state.onEdit ? (
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    <TextField
                      value={this.state.createForm.productName}
                      onChange={(e) =>
                        this.inputHandler(e, "productName", "createForm")
                      }
                      placeholder="Name"
                    />
                  </td>
                  <td>
                    <TextField
                      value={this.state.createForm.price}
                      onChange={(e) =>
                        this.inputHandler(e, "price", "createForm")
                      }
                      placeholder="Price"
                    />
                  </td>
                  <td colSpan={2}>
                    <select
                      value={this.state.createForm.category}
                      onChange={(e) =>
                        this.inputHandler(e, "category", "createForm")
                      }
                      className="form-control"
                    >
                      <option value="Phone">Phone</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Tab">Tab</option>
                      <option value="Desktop">Desktop</option>
                    </select>
                  </td>
                  <td>
                    <TextField
                      value={this.state.createForm.image}
                      onChange={(e) =>
                        this.inputHandler(e, "image", "createForm")
                      }
                      placeholder="Image"
                    />
                  </td>
                  <td colSpan={2}>
                    <TextField
                      value={this.state.createForm.desc}
                      onChange={(e) =>
                        this.inputHandler(e, "desc", "createForm")
                      }
                      placeholder="Description"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}></td>
                  <td colSpan={1}>
                    <ButtonUI func={this.createProductHandler} type="contained">
                      Create
                    </ButtonUI>
                  </td>
                </tr>
              </tfoot>
            ) : (
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    <TextField
                      value={this.state.editForm.productName}
                      onChange={(e) =>
                        this.inputHandler(e, "productName", "editForm")
                      }
                      placeholder="Name"
                    />
                  </td>
                  <td>
                    <TextField
                      value={this.state.editForm.price}
                      onChange={(e) =>
                        this.inputHandler(e, "price", "editForm")
                      }
                      placeholder="Price"
                    />
                  </td>
                  <td colSpan={2}>
                    <select
                      value={this.state.editForm.category}
                      onChange={(e) =>
                        this.inputHandler(e, "category", "editForm")
                      }
                      className="form-control"
                    >
                      <option value="Phone">Phone</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Tab">Tab</option>
                      <option value="Desktop">Desktop</option>
                    </select>
                  </td>
                  <td>
                    <TextField
                      value={this.state.editForm.image}
                      onChange={(e) =>
                        this.inputHandler(e, "image", "editForm")
                      }
                      placeholder="Image"
                    />
                  </td>
                  <td colSpan={2}>
                    <TextField
                      value={this.state.editForm.desc}
                      onChange={(e) => this.inputHandler(e, "desc", "editForm")}
                      placeholder="Description"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={7}></td>
                  <td colSpan={1}>
                    <ButtonUI
                      func={() => {
                        this.setState({
                          onEdit: false,
                        });
                        this.editProductHandler();
                      }}
                      type="contained"
                    >
                      Save
                    </ButtonUI>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
