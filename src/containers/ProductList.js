import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "../utility/axios/axiosInstance";
import _get from "lodash/get";

class ProductList extends Component {
  tableColumns = [
    { title: "Name", field: "name" },
    { title: "Price", field: "price" },
    { title: "Description", field: "description" }
  ];
  render() {
    return (
      <div>
        {
          <MaterialTable
            title="Products List"
            options={{
              search: false,
              pageSize: 10,
              pageSizeOptions: [5, 10, 15, 20, 25, 30]
            }}
            columns={this.tableColumns}
            data={query =>
              new Promise((resolve, reject) => {
                let productData = [];
                axios({
                  method: "GET",
                  url: "/admin/products",
                  headers: {
                    userid: "5e6ef5096a1248001708b5e5"
                  }
                }).then(response => {
                  productData = [..._get(response, "data", [])];
                  resolve({
                    data: productData,
                    page: _get(query, "page", 1),
                    totalCount: productData.length
                  });
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
