import { DELETE_PRODUCT } from "./actionType";
import api from "../../../API/productApi";

// export const deletePost = id => {
//     return async (dispatch, getState) => {
//       const state = getState();
//       let posts = state.posts.data;
//       let index = _findIndex(posts, ["id", id]);
//       posts.splice(index, 1);
//       dispatch({
//         type: DELETE_POST,
//         posts
//       });
//     };
//   };

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    const state = getState();
    let products = state.products.data;
    let index = _findIndex(products, ["id, id"]);
    products.splice(index, i);

    await api.delete(`/delete-product${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      products
    });
  };
};
