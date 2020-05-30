import axios from "axios";
import { BASE_URL } from "../constants";

export default axios.create({
  baseURL: BASE_URL,
    headers: {
       userid: "5ed2071b8c68e6001744fe0d"
     }
});
