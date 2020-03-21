import React, { Component } from "react";
import MaterialTable from "@material-ui/core/MaterailTable";
import axios from "../utility/axios/axiosInstance";
import _get from "lodash/get";

class ProductList extends Component {
  render() {
   const  tableColumns = [
      { title: "Name", field: "name" },
      { title: "Price", field: "price" },
      { title: "Description", field: "description" }
    ];
    return (
      <div>
      {
        <MaterialTable
          title="Products List"
          columns={tableColumns}
          data={query =>
            new Promise((resolve, reject) => {
              axios({
                method: "GET",
                url: "/admine/products",
                headers: {
                  userid: "5e6ef5096a1248001708b5e5"
                }
              }).then(response => {
                let productData = [];
                productData = _get(response , "data", []);
              });
              resolve({
                data: productData
              });
            })
          }
        />
      }
      </div>
    );
  }
}
export default ProductList;
