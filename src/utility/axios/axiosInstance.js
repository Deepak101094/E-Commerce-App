import axios from "axios";
import { BASE_URL } from "../constants";

export default axios.create({
  baseURL: BASE_URL,
    headers: {
       userid: "5e82c348615f7e001717d0e6"
     }
});
