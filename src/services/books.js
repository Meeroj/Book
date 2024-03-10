import { md5Generator } from "../utils/md5Generator";
import { request } from "./axios";


const searchBooks = async (title, key, secret) => {
  const url = `/books/${title.trim()}`;

  return await request({
    url: url,
    method: "GET",
    headers: {
      Key: key ,
      Sign: md5Generator("GET", url, "", secret),
    },
  });
};

const addBook = async (isbn, key, secret) => {
  const url = "/books";

  return await request({
    url: url,
    method: "POST",
    headers: {
      Key: key,
      Sign: md5Generator("POST", url, `{"isbn":"${isbn}"}`, secret),
    },
    data: { isbn: isbn },
  });
};

const getBooks = async (key, secret) => {
  const url = "/books";

  return await request({
    url: url,
    method: "GET",
    headers: {
      Key: key,
      Sign: md5Generator("GET", url, "", secret),
    },
  });
};

const changeStatus = async (id, status, key, secret) => {
  const url = `/books/${id}`;


  return await request({
    url: url,
    method: "PATCH",
    headers: {
      Key: key,
      Sign: md5Generator("PATCH", url, `{"status":${status}}`, secret),
    },
    data: { status: status },
  });
};

const deleteBook = async (id, key, secret) => {
  const url = `/books/${id}`;


  return await request({
    url: url,
    method: "DELETE",
    headers: {
      Key: key,
      Sign: md5Generator("DELETE", url, "", secret),
    },
  });
};

export { searchBooks, addBook, getBooks, changeStatus, deleteBook };
