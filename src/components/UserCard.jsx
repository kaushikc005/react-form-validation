import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";

const UserCard = ({ user }) => {
  const handleDelete = async (id) => {
    const docRef = doc(db, "userData", id);
    await deleteDoc(docRef);
  };
  return (
    <section
      className="grid  gap-2 justify-center items-center w-fit 
    border text-xs font-semibold bg-slate-500 p-8 flex flex-col rounded-lg text-white"
    >
      <p>Firstname : {user.firstname}</p>
      <p>Lastname: {user.lastname}</p>
      <p>Email: {user.email}</p>
      <p>Phone no.: {user.phone}</p>
      <p>Address1: {user.address1}</p>
      {user.address2 && <p>Address2: {user.address2}</p>}
      <p>Country: {user.country}</p>
      <p>State: {user.state}</p>
      <p>Zipcode: {user.zipcode}</p>

      <nav className="flex gap-8 justify-center">
        <Link
          to={`/EditUser/${user.id}`}
          className="bg-indigo-700 p-2 rounded-md"
        >
          Edit
        </Link>
        <Link
          to="/"
          className="bg-red-500 p-2 rounded-md"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </Link>
      </nav>
    </section>
  );
};

export default UserCard;
