import React, { Component } from "react";
import { connect } from "react-redux";
//? action
import { deleteProduct } from "../store/actions/delete-product";
//? utility
import axios from "../utility/axios/withHeader";
//? lodash
import _get from "lodash/get";
//? import from  material
import MaterialTable from "material-table";

class ProductList extends Component {
   deleteProductHandler = (productId) => {
      const { deleteProduct } = this.props;
      deleteProduct(productId);
   };

   tableColumns = [
      { title: "Name", field: "name" },
      { title: "Price", field: "price" },
      { title: "Description", field: "description" },
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
                     pageSizeOptions: [5, 10, 15, 20, 25, 30],
                  }}
                  columns={this.tableColumns}
                  actions={[
                     {
                        icon: "edit",
                        tooltip: "edit product",
                        onClick: (event, rowData) => {
                           // Do save operation
                           //  console.log(rowData)
                        },
                     },
                     {
                        icon: "delete",
                        tooltip: "delet product",
                        onClick: (event, rowData) => {
                           // Do save operation
                           //  console.log(rowData)
                           this.deleteProductHandler(rowData._id);
                        },
                     },
                  ]}
                  data={(query) =>
                     new Promise((resolve, reject) => {
                        let productData = [];
                        axios({
                           method: "GET",
                           url: "/admin/products",
                           headers: {
                              userid: localStorage.getItem("userId"),
                           },
                        }).then((response) => {
                           productData = [..._get(response, "data", [])];
                           resolve({
                              data: productData,
                              page: _get(query, "page", 1),
                              totalCount: productData.length,
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
export default connect(null, { deleteProduct })(ProductList);
