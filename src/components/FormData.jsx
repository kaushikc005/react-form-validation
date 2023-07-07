import React, { useEffect, useState } from "react";
import { fetchCountrydata } from "../utils/fetchCountries";

import startsWith from "lodash.startswith";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { addDoc } from "firebase/firestore";
import { userDataRef } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
const FormData = ({phoneValid,
  setPhoneValid}) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "91",
    address1: "",
    address2: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);


  let countryOptions = [];
  let stateOptions = [];

  let phoneNumberLength = 0;
  let phoneNumberTyped = "";
  const navigate = useNavigate();

  const [country, setCountry] = useState(user.country);
  useEffect(() => {
    const getCountry = async () => {
      const countryArray = await fetchCountrydata();
      setCountries(countryArray);
    };
    getCountry();
  }, []);
  countryOptions = countries?.map((item) => ({
    label: item.name,
    value: item.iso2,
  }));

  useEffect(() => {
    const StateArray = countries.filter((item) => item?.iso2 === country);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const abc=addDoc(userDataRef, user);
    console.log(abc);
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
      className="flex flex-col w-screen items-center mt-8 p-4"
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
      <label htmlFor="phone" className="text-left flex items-center">
        Phone No.
        <PhoneInput
          id="phone-input"
          country="in"
          value={user.phone}
          onChange={(value) => setUser({ ...user, phone: value })}
          isValid={(inputNumber, country, countries) => {

            const countryCode=countries.filter(item => startsWith(inputNumber, item.dialCode))
            if (startsWith(inputNumber, country.dialCode)) {
             let x= country.format.replace("+","").trim();
             let a=  x.replace(/\s/g, "").trim();
              phoneNumberLength = a.replaceAll('-',"").replace(/\s/g, "").length;
              console.log(country.format.length);
              console.log(phoneNumberLength);
              console.log(inputNumber.length)
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
      <label htmlFor="address1">
        Address 1
        <input
          type="text"
          name="address1"
          id="address1"
          placeholder="XYZ Street"
          className="outline-none border-2 m-2 rounded-md text-center"
          required
        />
      </label>
      <label htmlFor="address2" className="text-left">
        Address 2
        <input
          type="text"
          name="address2"
          id="address2"
          placeholder="ABC City"
          className="outline-none border-2 m-2 rounded-md text-center"
        />
      </label>
      <label htmlFor="country" className="flex items-center gap-8 m-2">
        Country
        <Select
          className="dropdown"
          defaultValue={user.country}
          selected
          options={countryOptions}
          onChange={handleCountryChange}
        />
      </label>

      <label htmlFor="state" className="flex items-center gap-8 m-2">
        State
        <Select
          options={stateOptions}
          className="dropdown"
          onChange={handleStateChange}
        />
      </label>

      <label htmlFor="zipcode">
        Zipcode
        <input
          type="text"
          name="zipcode"
          id="zipcode"
          value={user.zipcode}
          placeholder="123456"
          pattern="[0-9]{6}"
          required
          onChange={(e) => setUser({ ...user, zipcode: e.target.value })}
          className="outline-none border-2 m-2 rounded-md text-center"
        />
      </label>
      <div className="flex gap-4">
        {phoneValid && (
          <input
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 cursor-pointer"
            onSubmit={handleSubmit}
          />
        )}
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

export default FormData;
