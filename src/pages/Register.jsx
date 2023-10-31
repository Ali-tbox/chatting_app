import React, { useState } from "react";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import imglogo from "../assests/img.png";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const image = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("after crete");

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log("upload error", error);
          setError(true);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              console.log("File available at", downloadURL);
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              console.log("hello");
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: res.user.displayName,
                email: res.user.email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/login");
            }
          );
        }
      );
    } catch (error) {
      console.error("error", error);
      setError(error.message); // Set the error message
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatting App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" type="text" />
          <input placeholder="email" type="email" />
          <input placeholder="Enter password" type="password" />
          <input
            style={{ display: "none" }}
            placeholder="choose image to upload"
            id="file"
            type="file"
          />
          <label htmlFor="file">
            <img width="20px" height="20px" src={imglogo} alt="" />
            <span>add an avatar</span>
          </label>
          <button type="submit">Submit</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          Do you have already an account? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
