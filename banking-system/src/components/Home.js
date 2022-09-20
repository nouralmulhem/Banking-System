import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Form from "./Form";
import "./Home.css";
import { db } from "../firebase";

import {
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  const usersCollectionRef = collection(db, "Customers");
  const usersCollectionRef2 = collection(db, "Transfers");

  const editUser = (user1, user2) => {
    const updateUser = async (id, balance) => {
      const userDoc = doc(usersCollectionRef, id);
      const newFields = { balance: balance };
      await updateDoc(userDoc, newFields);
    };

    updateUser(user1.data().username, user1.data().balance - amount);
    updateUser(
      user2.data().username,
      Number(user2.data().balance) + Number(amount)
    );
  };

  const makeTrans = (user1, user2) => {
    const d = new Date();
    var s = "";
    s += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var arr = [];
    const len = async () => {
      const data = await getDocs(usersCollectionRef2);
      arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDoc(doc(db, "Transfers", String(arr.length)), {
        from: user1.data().name,
        to: user2.data().name,
        amount: Number(amount),
        date: s,
      });
    };
    len();
  };
  const submit = (e) => {
    Swal.fire({
      title: "Are you sure about this Transfer?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const getUser = async () => {
          const user1 = await getDoc(doc(usersCollectionRef, from));
          const user2 = await getDoc(doc(usersCollectionRef, to));
          if (user1.data().balance < amount) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Can't transfer this amount",
            });
          } else if (user1.data().name === user2.data().name) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Can't transfer to yourself!!",
            });
          } else {
            editUser(user1, user2);
            makeTrans(user1, user2);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(function () {
              document.location.href = "/";
            }, 1500);
          }
        };

        getUser();
      }
    });
  };

  const handleClick = (num) => {
    setFrom(num);
  };
  const handleClick2 = (num) => {
    setTo(num);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="container-form">
          <Form handleClick={handleClick} title="Sender" />
          <div className="special-input">
            <input
              type="number"
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <br></br>
            <button onClick={submit}>Transfer</button>
          </div>
          <Form handleClick={handleClick2} title="Reciver" />
        </div>
      </div>
    </>
  );
}

export default Home;
