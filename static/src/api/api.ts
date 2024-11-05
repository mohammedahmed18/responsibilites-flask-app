import axios from "axios"


// create an axios instance
export const api = axios.create({
  baseURL : "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})
