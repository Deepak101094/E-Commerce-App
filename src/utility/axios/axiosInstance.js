import axios from "axios";
import {store} from "../../index";
import { BASE_URL } from "../constants";

// const getUserId=() => {
//   const {login}= (store|| {}).getState();
//   return login?.loginData?.data?.userid??""
// }
export default axios.create({
  baseURL: BASE_URL,
    headers: {
       userid: "5ed77bdbb6ba1d001792ea87"
     }
});

//store.subscribe(getUserId)