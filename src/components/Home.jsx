import React from "react";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Home = ({ users }) => {
  console.log(users)
  return (
    <section className="flex flex-col w-full xs:p-8 md:p-0">
      <h1 className="text-5xl text-center xs:m-4 md:m-2">WELCOME</h1>
      <p className="text-5xl text-center xs:m-4 md:m-2">List of Users</p>
      {users.length>0 ? (
        <article className="grid xs:grid-cols-1 md:grid-cols-4 self-center ">
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
