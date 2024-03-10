import React, { useEffect, useState } from "react";
import { addBook, searchBooks } from "../services/books";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useDebounce } from "../hooks/useDebounce";
import { Alert } from "@mui/material";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const { key, secret } = useSelector((state) => state.auth.user);
  const [isLoader, setIsLoader] = useState(false);
  const debounce = useDebounce(searchTerm, 500)

  useEffect(() => {
    setIsLoader(true);  
    searchBooks(debounce, key, secret)
      .then(
      (res) => {
        setBooks(res.data.data);
        console.log(res)
        console.log(books);
      },
      ).finally(() => {setIsLoader(false)})
      
      if (debounce.length <= 0) {
        setBooks([]);
      }
  },[debounce]);

  const [alert, setAlert]= useState(false)
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

  };

  const handleAddBook =(isbn)=>{
    addBook(isbn, key, secret).then((res)=>{console.log(res)})
    
  }

  return (
    <>
    <div className="flex items-center flex-col">
      {alert&&<Alert severity="success" className="fixed top-3">This is a success Alert.</Alert>}
      <div className="flex flex-col mt-5 gap-3">
        <label htmlFor="search">Kitoblarni qidiring</label>
        <input
          type="search"
          id="search"
          className="outline-none border border-gray-400 rounded-md p-2 w-[350px]"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          />
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {isLoader ?<Loader/>:books?.map((book) => (
          <div
          key={book.id}
          className="border w-[300px] flex flex-col justify-between  rounded-md p-4 shadow-md"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full mb-3 h-[300px]"
              />
            <p className="font-bold">{book.title}</p>
            <p>{book.author}</p>
            <div className="flex justify-between">
              <p>{book.isbn}</p>
              <p>{book.published} year</p>
            </div>
            <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={()=>{handleAddBook(book.isbn)
             setAlert(true)
             setTimeout(() => {setAlert(false)},1000)}}>
              +
            </button>
          </div>
        ))}
      </div>
      <p className="mt-[300px]">Kitoblarni izlang</p>
    </div>
        </>
  );
};

export default Home;
