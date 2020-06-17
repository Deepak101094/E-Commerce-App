import axios from "axios";
import { BASE_URL } from "../constants";

console.log(localStorage.getItem("userId"));

export default axios.create({
   baseURL: BASE_URL,
   headers: {
      userid: localStorage.getItem("userId"),
   },
});
