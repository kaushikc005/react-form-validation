import { useEffect, useState } from "react";
import "../dist/outputTailwind.css";
import FormData from "./components/FormData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { onSnapshot } from "firebase/firestore";
import { userDataRef, db } from "./utils/firebase";
import "react-phone-number-input/style.css";
import Home from "./components/Home";
import EditUser from "./components/EditUser";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(userDataRef, function (snapshot) {
      const userArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(userArray);
    });

    return unsubscribe;
  }, []);

  const [phoneValid, setPhoneValid] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route
          path="/add"
          element={
            <FormData

              phoneValid={phoneValid}
              setPhoneValid={setPhoneValid}
            />
          }
        />
        <Route
          path="/editUser/:id"
          element={
            <EditUser
              users={users}
              setUsers={setUsers}
              phoneValid={phoneValid}
              setPhoneValid={setPhoneValid}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
