import React, { useEffect, useState } from "react";
import { fetchCountrydata } from "../utils/fetchCountries";
import { useForm, Controller } from "react-hook-form";

import startsWith from "lodash.startswith";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { db, userDataRef } from "../utils/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = ({ users ,phoneValid,
  setPhoneValid}) => {
  const { id } = useParams();
  const currentUser = users?.filter((item) => item.id === id);
  const [user, setUser] = useState({
    firstname: currentUser[0]?.firstname || "",
    lastname: currentUser[0]?.lastname || "",
    email: currentUser[0]?.email || "",
    phone: currentUser[0]?.phone || "",
    address1: currentUser[0]?.address1 || "",
    address2: currentUser[0]?.address2 || "",
    state: currentUser[0]?.state || "",
    country: currentUser[0]?.country || "",
    zipcode: currentUser[0]?.zipcode || "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  let countryOptions = [];
  let stateOptions = [];
  let phoneNumberLength = 0;
  let phoneNumberTyped = "";

  useEffect(() => {
    const getCountry = async () => {
      const countryArray = await fetchCountrydata();
      setCountries(countryArray);
    };
    getCountry();
  }, []);

  countryOptions = countries?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  useEffect(() => {
    const StateArray = countries?.filter((item) => item?.name === country);
    setStates(StateArray[0]?.states);
  }, [country]);

  stateOptions = states?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
    setUser({ ...user, country: selectedOption.value });
  };

  const handleStateChange = (selectedOption) => {
    setUser({ ...user, state: selectedOption.value });
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    const docRef = doc(db, "userData", id);
    setDoc(docRef, user, { merge: true });
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      state: "",
      country: "",
      zipcode: "",
    });
    navigate("/");
  };

  const handleReset = () => {
    setUser({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      state: "",
      country: "",
      zipcode: "",
    });
  };

  return (

      <form
        className="flex flex-col  justify-center  w-screen items-center mt-8 p-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold m-4">Enter Your Details</h1>
        <label htmlFor="firstname" className="text-left flex items-center">
          First Name
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={user.firstname}
            placeholder="First Name"
            className="outline-none border-2 m-2 rounded-md text-center"
            required
            minLength="5"
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
        </label>
        <label htmlFor="lastname" className="text-left flex items-center">
          Last Name
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={user.lastname}
            placeholder="last Name"
            className="outline-none border-2 m-2 rounded-md text-center"
            required
            minLength="5"
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
        </label>
        <label htmlFor="email" className="text-left flex items-center gap-8">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="example@gmail.com"
            className="outline-none border-2 m-2 rounded-md text-center"
          />
        </label>
        <label
          htmlFor="phone"
          className=" flex items-center justify-center gap-8"
        >
          PhoneNo.
          <PhoneInput
            id="phone-input"
            country="in"
            value={user.phone}
            onChange={(value) => setUser({ ...user, phone: value })}
            isValid={(inputNumber, country, countries) => {
              if (startsWith(user.phone, country.dialCode)) {
                phoneNumberTyped = country.format.replace("+", "");
                phoneNumberTyped = phoneNumberTyped.replace(" ", "");
                phoneNumberLength = phoneNumberTyped.replace("-", "").length;
              }
              setPhoneValid(
                startsWith(inputNumber, country.dialCode) &&
                  user.phone.length === phoneNumberLength
              );
              return countries.some((country) => {
                return (
                  startsWith(inputNumber, country.dialCode) &&
                  user.phone.length === phoneNumberLength
                );
              });
            }}
            inputProps={{
              name: "phone-input",
              required: true,
            }}
            defaultErrorMessage="Invalid Phone number"
            countryCodeEditable={false}
          />
        </label>
        <label
          htmlFor="address1"
          className=" flex items-center justify-center gap-8"
        >
          Address 1
          <input
            type="text"
            name="address1"
            id="address1"
            value={user.address1}
            onChange={(e) => setUser({ ...user, address1: e.target.value })}
            placeholder="XYZ Street"
            className="outline-none border-2 m-2 rounded-md text-center"
            required
          />
        </label>
        <label
          htmlFor="address2"
          className="text-left flex items-center justify-center gap-8"
        >
          Address 2
          <input
            type="text"
            name="address2"
            id="address2"
            value={user.address2}
            onChange={(e) => setUser({ ...user, address2: e.target.value })}
            placeholder="ABC City"
            className="outline-none border-2 m-2 rounded-md text-center"
          />
        </label>
        <label
          htmlFor="country"
          className="text-left flex items-center justify-center gap-8 m-2"
        >
          Country
          <Select
            className="dropdown"
            options={countryOptions}
            defaultValue={{ label: user.country, value: user.country }}
            onChange={handleCountryChange}
          />
        </label>

        <label
          htmlFor="state"
          className="text-left flex items-center justify-center gap-8 m-2"
        >
          State
          <Select
            options={stateOptions}
            onChange={handleStateChange}
            defaultValue={{ label: user.state, value: user.state }}
            className="dropdown"
          />
        </label>

        <label
          htmlFor="zipcode"
          className="text-left flex items-center justify-center gap-8"
        >
          Zipcode
          <input
            required
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="123456"
            pattern="[0-9]{6}"
            value={user.zipcode}
            onChange={(e) => setUser({ ...user, zipcode: e.target.value })}
            className="outline-none border-2 m-2 rounded-md text-center"
          />
        </label>
        <div className="flex gap-4">
          <input
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 cursor-pointer"
            onSubmit={handleSubmit}
          />
          <button
            type="reset"
            className="bg-red-500 text-white p-2 rounded-lg mt-4 cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
          type="reset"
          className="bg-violet-500 text-white p-2 rounded-lg mt-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        </div>
      </form>

  );
};

export default EditUser;
