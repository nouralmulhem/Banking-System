import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Form.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase";

import { collection, getDocs, getDoc, doc } from "firebase/firestore";

function Form(props) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
  const [account_num, setAccount] = useState(0);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "Customers");

  const gettingData = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useState(() => {
    gettingData();
  }, []);

  const submitting = (e) => {
    e.preventDefault();

    const getUser = async () => {
      const data = await getDoc(doc(usersCollectionRef, name2));
      console.log(data.data().name);
      setShow(true);
      setName(data.data().name);
      setAccount(data.data().account_num);
      setEmail(data.data().email);
      setBalance(data.data().balance);
      props["handleClick"](data.data().username);
    };

    getUser();
  };

  return (
    <>
      <div className="container-form">
        <div className="Form">
          <br></br>
          <form className="myForm" onSubmit={submitting}>
            <select
              name="drop-down"
              onChange={(e) => {
                setName2(e.target.value);
              }}
            >
              <option selected disabled>
                {props["title"]} Name
              </option>
              {users.map((user) => {
                return (
                  <option value={user.username} key={user.username}>
                    {user.name}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="Search" />
          </form>
          <br></br>
          <br></br>
          {show && (
            <>
              <div className="recycle-bin">
                <FontAwesomeIcon icon={faUser} className="icone-trash-child" />
              </div>
              <br></br>
              <p>
                Account Number: <strong>{account_num}</strong>
              </p>
              <p>
                Customer Name:<strong> {name}</strong>
              </p>
              <p>
                E-mail: <strong>{email}</strong>
              </p>
              <p>
                Balance: <strong>{balance}</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
