import axios from "axios";
import { BASE_URL } from "../constants";

export default axios.create({
  baseURL: BASE_URL,
  // header: {
  //   userId: "5e6c1c97b8f50b0727592457"
  // }
});
