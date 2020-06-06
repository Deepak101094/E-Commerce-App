import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
//? action
import { deleteProduct } from "../store/actions/delete-product";
import { fetchSingleProduct } from "../store/actions/fetch-single-product";
//? utility
import axios from "../utility/axios/withHeader";
//? lodash
import _get from "lodash/get";
//? import from  material
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";


const ProductList = (props) => {
   const history = useHistory();
  const deleteProductHandler = (productId) => {
      const { deleteProduct } = props;
      deleteProduct(productId);
   };

   const editProductHandler = (productId) => {
    const { fetchSingleProduct }= props;
    fetchSingleProduct(productId);
    history.push(`/update-product${productId}`)
   }

  const tableColumns = [
      { title: "Name", field: "name" },
      { title: "Price", field: "price" },
      { title: "Description", field: "description" },
   ];
   
      return (
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
                  columns={tableColumns}
                  actions={[
                     {
                        icon: "edit",
                        tooltip: "edit product",
                        onClick: (event, rowData) => {
                           // Do save operation
                           //  console.log(rowData)
                           editProductHandler(rowData._id)
                        },
                     },
                     {
                        icon: "delete",
                        tooltip: "delet product",
                        onClick: (event, rowData) => {
                           // Do save operation
                           //  console.log(rowData)
                           deleteProductHandler(rowData._id);
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
            </Grid>
         </Grid>
      );
   }

export default connect(null, { deleteProduct, fetchSingleProduct })(ProductList);
