import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import Search from "../assets/icon/Search";
import Cross from "../assets/icon/Cross";
import axiosInstance from "../API/AxiosInstance";
import { fetch_User, handleSearchSubmit } from "../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = ({ handleChange, active, toggle }) => {
  const [search, setSearch] = useState("");
  // const [users, setUsers] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [issearch, setissearch] = useState(false);

  const { searchdata } = useSelector((store) => store.searchreducer);
  console.log(searchdata);
  const dispatch = useDispatch();

  const searchInputField = useRef();
  const page = 1;

  const getUsers = useRef();
  getUsers.current = async () => {
    await dispatch(fetch_User(axiosInstance));
    setFetchingUsers(false);
  };

  useEffect(() => {
    fetchingUsers && getUsers.current();
  }, [fetchingUsers]);

  return (
    <div
      style={{ transition: "0.3s ease" }}
      className={`sm:border-r fixed  sm:w-72 h-screen flex-shrink-0 overflow-hidden sm:static z-10 flex flex-col shadow-lg  bg-gradient-to-r from-blue-500 to-blue-400 border-gray-100 ${
        !active ? "w-full" : toggle ? "w-72" : "w-0"
      }`}
    >
      {/* Logo here */}
      <h1 className=" text-3xl flex gap-1 py-3  border-b-2 border-white text-center justify-center font-bold text-white">
        Messenger
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </h1>
      <br />
      {/* Search bar */}
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSearchingUsers(true);
            await dispatch(
              handleSearchSubmit(axiosInstance, searchInputField, search, page)
            );

            searchInputField.current.focus();
            setissearch(true);
            setSearchingUsers(false);
          }}
          className="ring-offset-1 ring-1 ring-white rounded-full  flex flex-1 items-center relative w-11/12  mx-auto my-2 "
        >
          <input
            name="searchinput"
            required
            value={search}
            disabled={searchingUsers ? true : false}
            onChange={(e) => {
              !searchingUsers && setSearch(e.target.value);
            }}
            ref={searchInputField}
            placeholder="enter your keyboard"
            className="rounded-2xl pr-10 hover:bg-opacity-20  transition focus:outline-none duration-200  bg-gray-500 bg-opacity-10 text-sm placeholder-gray-50 pl-4 backdrop-blur-sm text-gray-50 w-full h-10"
          />
          {/* <SearchIcon className="absolute right-4 text-gray-50" /> */}
          <div className=" absolute right-4 text-gray-50">
            {issearch ? (
              <Cross
                handleClick={async () => {
                  setSearchingUsers(true);
                  await getUsers.current();
                  setSearch("");
                  setissearch(false);
                  setSearchingUsers(false);
                }}
              />
            ) : (
              <button type="submit">
                <Search />
              </button>
            )}
          </div>
        </form>
      </div>

      <br />
      {/* User List */}
      <div
        style={{ width: "95%" }}
        className=" flex-1 sbar mx-auto overflow-y-auto "
      >
        {!searchingUsers &&
          !fetchingUsers &&
          Array.isArray(searchdata) &&
          searchdata.map((user, index) => {
            const { username, _id, lastMessage } = user;
            return (
              <div
                onClick={() => handleChange(user)}
                key={index}
                className={`flex my-1 rounded-lg flex-shrink-0 mr-2 hover:mr-0 focus:bg-blue-600 hover:bg-blue-600 cursor-pointer  p-2 gap-2 ${
                  active?._id === _id ? "bg-blue-600" : ""
                }`}
              >
                <div className="relative w-12 h-12">
                  <img
                    className="rounded-full border border-gray-100 shadow-sm"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="user profile"
                  />
                  <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
                </div>
                <div className="flex-1 text-left text-white">
                  <h3 className="font-semibold">{username}</h3>
                  {lastMessage && (
                    <div className="flex gap-1 items-center">
                      <p className="text-sm flex-1 lastMsg overflow-hidden  text-gray-100">
                        {lastMessage && lastMessage.message}
                      </p>
                      <span className="text-xs  self-center">
                        {lastMessage &&
                          moment(lastMessage.time).format("ddd MMM DD YYYY")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        {(searchingUsers || fetchingUsers) && (
          <div className="text-white font-medium">Loading . . .</div>
        )}
        {!searchingUsers && !fetchingUsers && searchdata.length === 0 && (
          <div className="text-white font-medium">User Not found</div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
