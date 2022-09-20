import { useState } from "react";
import "./Customers.css";

import { db } from "../firebase";
// import { getDocs, collection, doc } from "@firebase/firestore";

import { collection, getDocs } from "firebase/firestore";

function Customers() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "Transfers");

  const gettingData = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useState(() => {
    gettingData();
  }, []);

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className="table">
        <h5>Sender</h5>
        <h5>Reciver</h5>
        <h5>Amount</h5>
        <h5>Date</h5>
      </div>
      <div className="table">
        <div>
          {users.map((user) => {
            return (
              <div>
                <strong>{user.from}</strong>
              </div>
            );
          })}
        </div>
        <div>
          {users.map((user) => {
            return (
              <div>
                <strong>{user.to}</strong>
              </div>
            );
          })}
        </div>
        <div>
          {users.map((user) => {
            return (
              <div>
                <strong>{user.amount}</strong>
              </div>
            );
          })}
        </div>
        <div>
          {users.map((user) => {
            return (
              <div>
                <strong>{user.date}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Customers;
