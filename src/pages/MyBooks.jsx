import React, { useEffect, useState } from "react";
import { changeStatus, deleteBook, getBooks } from "../services/books";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const MyBooks = () => {
  const { key, secret } = useSelector((state) => state.auth.user);
  const [books, setBooks] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const res = await getBooks(key, secret);
        setBooks(res.data.data);
        console.log(books)
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoader(false);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = async (e, id) => {
    const newValue = Number(e.target.value);
    try {
      await changeStatus(id, newValue, key, secret);
    } catch (error) {
      console.error("Error changing status:", error);
    }
    window.location.reload();
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id, key, secret);
    } catch (error) {
      console.error("Error changing status:", error);
    }
    window.location.reload();
  };

  return (
    <div className="flex items-center flex-col">
      <div className="flex flex-col mt-5 gap-3">
        <label htmlFor="search">Sizning Kitob Javoningiz</label>
      </div>
      {isLoader ? (
        <Loader/>
      ) : (
        <div className="grid grid-cols-4 gap-5 mt-5">
          {books?.length === 0 ? (
        <h2 className="text-4xl font-bold mt-[30vh]">Sizda hali kitob yo'q :(</h2>
      ): (
            books?.map(({ book, status }) => (
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={(e) => handleOptionChange(e, book.id)}
                        id="select-2"
                        className="py-2 px-4 pe-16 block w-full outline-none rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500  disabled:pointer-events-none border border-teal-500"
                      >
                        <option value="0">Yangi </option>
                        <option value="1">O'qilayotgan</option>
                        <option value="2">Tugatilgan</option>
                      </select>
                      <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8">
                        <svg
                          className="flex-shrink-0 size-4 text-teal-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-2 rounded-md bg-blue-600 uppercase font-medium text-white"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    <img
                      src="./images/delete.svg"
                      alt="delete book"
                      className="w-[30px]"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
