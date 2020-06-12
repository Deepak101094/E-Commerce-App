import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
//? action
import { deleteProduct } from "../store/actions/delete-product";
import { saveProductToEdit } from "../store/actions/update-product";
//? utility
import axios from "../utility/axios/withHeader";
//? lodash
import _get from "lodash/get";
//? import from  material
import MaterialTable from "material-table";
import Loader from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

const ProductList = (props) => {
   const history = useHistory();
   const tableRef = React.createRef();

   const editProductHandler = (product) => {
      const { saveProductToEdit } = props;
      saveProductToEdit(product);
      history.push(`/update-product/${product._id}`);
   };

   const tableColumns = [
      { title: "Name", field: "name" },
      { title: "Price", field: "price" },
      { title: "Description", field: "description" },
   ];

   return (
      <div className="container">
         <Grid container>
            <Grid item xs={12}>
               {
                  <MaterialTable
                     title="Products List"
                     options={{
                        search: false,
                        pageSize: 10,
                        pageSizeOptions: [5, 10, 15, 20, 25, 30],
                     }}
                     tableRef={tableRef}
                     columns={tableColumns}
                     actions={[
                        {
                           icon: "edit",
                           tooltip: "edit product",
                           onClick: (event, rowData) => {
                              editProductHandler(rowData);
                           },
                        },
                        {
                           icon: "delete",
                           tooltip: "delete product",
                           onClick: (event, rowData) => {
                              const { deleteProduct } = props;
                              deleteProduct(rowData?._id ?? "", ({ isloading, success, error }) => {
                                 if (success) {
                                    tableRef.current && tableRef.current.onQueryChange();
                                 }
                              });
                           },
                        },
                        {
                           icon: "refresh",
                           tooltip: "Refresh Products",
                           isFreeAction: true,
                           onClick: () => tableRef.current && tableRef.current.onQueryChange(),
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
                                 totalCount: (productData || []).length,
                              });
                           });
                        })
                     }
                  />
               }
            </Grid>
         </Grid>
      </div>
   );
};

export default connect(null, { deleteProduct, saveProductToEdit })(ProductList);
