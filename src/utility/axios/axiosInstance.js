import axios from "axios";
import { BASE_URL } from "../constants";

export default axios.create({
  baseURL: BASE_URL,
    headers: {
       userid: "5e6ef5096a1248001708b5e5"
     }
});
