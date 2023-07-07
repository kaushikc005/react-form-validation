import React from "react";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Home = ({ users }) => {
  console.log(users)
  return (
    <section className="flex flex-col w-full xs:p-8 md:p-4">
      <h1 className="text-5xl text-center xs:m-4 md:m-2">WELCOME</h1>
      <p className="text-5xl text-center xs:m-4 md:m-2">List of Users</p>
      {users.length>0 ? (
        <article className="w-full  xs:flex xs:flex-col items-center md:grid
        md:grid-cols-4 xs:gap-4 md:gap-0 ">
          {users.map((item, index) => (
            <UserCard user={item} key={index} />
          ))}
        </article>
      ) : (
        <p className="text-center text-xl">Loading...</p>
      )}

      <Link to="/add">
        <button className="bg-blue-500 p-2 text-white rounded-md m-4 cursor-pointer">
          Add a new User
        </button>
      </Link>
    </section>
  );
};

export default Home;
