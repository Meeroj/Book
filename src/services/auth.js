import { request } from "./axios";
import { md5Generator } from "../utils/md5Generator";

const register = async (data) => {
  return await request({ url: "signup", method: "POST", data });
};

const login = async (key, sign) => {
  console.log('key',key,'sign', sign)
  return await request({
    url: "myself",
    method: "GET",
    headers: {
      Key: key,
      Sign: md5Generator("GET", "/myself", "", sign),
    },
  });
};

export { register, login };
