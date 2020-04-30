import React from "react";
import Axios from "axios";
import { Table, Button } from "reactstrap";
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
      price: 0,
      category: "Phone",
      image: "",
      desc: "",
    },
    editForm: {
      id: 0,
      productName: "",
      price: 0,
      category: "Phone",
      image: "",
      desc: "",
    },
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
            price: 0,
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
          <td> {price} </td>
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
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Description</th>
              <th colSpan="2" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{this.renderProductList()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <TextField
                  value={this.state.editForm.productName}
                  placeholder="product name"
                  onChange={(e) => {
                    this.inputHandler(e, "productName", "editForm");
                  }}
                />
              </td>
              <td>
                <TextField
                  value={this.state.editForm.price}
                  placeholder="price"
                  onChange={(e) => {
                    this.inputHandler(e, "price", "editForm");
                  }}
                />
              </td>
              <td colSpan={2}>
                <select
                  className="form-control"
                  value={this.state.editForm.category}
                  onChange={(e) => {
                    this.inputHandler(e, "category", "editForm");
                  }}
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
                  placeholder="image link"
                  onChange={(e) => {
                    this.inputHandler(e, "image", "editForm");
                  }}
                />
              </td>
              <td colSpan={2}>
                <TextField
                  value={this.state.editForm.desc}
                  placeholder="produk desc"
                  onChange={(e) => {
                    this.inputHandler(e, "desc", "editForm");
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td colSpan={1}>
                <ButtonUI
                  type="contained"
                  func={() => {
                    this.editProductHandler();
                  }}
                >
                  save
                </ButtonUI>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <TextField
                  value={this.state.createForm.productName}
                  placeholder="product name"
                  onChange={(e) => {
                    this.inputHandler(e, "productName", "createForm");
                  }}
                />
              </td>
              <td>
                <TextField
                  value={this.state.createForm.price}
                  placeholder="price"
                  onChange={(e) => {
                    this.inputHandler(e, "price", "createForm");
                  }}
                />
              </td>
              <td colSpan={2}>
                <select
                  className="form-control"
                  value={this.state.createForm.category}
                  onChange={(e) => {
                    this.inputHandler(e, "category", "createForm");
                  }}
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
                  placeholder="image link"
                  onChange={(e) => {
                    this.inputHandler(e, "image", "createForm");
                  }}
                />
              </td>
              <td colSpan={2}>
                <TextField
                  value={this.state.createForm.desc}
                  placeholder="produk desc"
                  onChange={(e) => {
                    this.inputHandler(e, "desc", "createForm");
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={7}></td>
              <td colSpan={1}>
                <ButtonUI
                  type="contained"
                  func={() => {
                    this.createProductHandler();
                  }}
                >
                  Create
                </ButtonUI>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default AdminDashboard;
