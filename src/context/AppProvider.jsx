"use client";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AppContext } from "./AppContext";
import { auth, db } from "@/firebase/app";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const showToast = (message, style) => {
    toast(message, {
      type: style,
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) showToast(`Welcome ${user.email}!`, "success");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showToast("Email already in use", "error");
      } else if (errorCode === "auth/invalid-email") {
        showToast("Invalid email", "error");
      } else if (error.code === "auth/weak-password") {
        showToast("Password is too weak", "error");
      } else if (error.code) {
        showToast("Something went wrong", "error");
      }
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) showToast(`Welcome ${user.email}!`, "success");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        showToast("Wrong password", "error");
      } else if (errorCode === "auth/user-not-found") {
        showToast("User not found", "error");
      } else {
        showToast(errorMessage, "error");
      }
    }
  };

  const loginUserWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) showToast(`Welcome ${user.displayName}!`, "success");
    } catch (error) {
      showToast("An error happened!", "error");
    }
  };

  const loginUserWithGithub = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, githubProvider);
      const user = userCredentials.user;
      showToast(`Welcome ${user.displayName}!`, "success");
    } catch (error) {
      showToast("An error happened!", "error");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      showToast("Sign out successful!", "success");
    } catch (error) {
      showToast("An error happened!", "error");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push("/");
        onSnapshot(collection(db, "tasks"), (snapshot) => {
          const tasks = [];
          snapshot.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id });
          });
          setTasks(tasks);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        router.push("sign-in");
      }
    });
  }, []);

  const createTask = async (task) => {
    try {
      await addDoc(collection(db, "tasks"), task);
      showToast("Task added successfully", "success");
      router.push("/");
    } catch (error) {
      console.log(error.message);
      showToast("An error happened!", "error");
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      showToast("Task deleted successfully!", "success");
    } catch (error) {
      console.log(error);
      showToast("An error happened!", "error");
    }
  };

  const getTask = async (id) => {
    const taskFound = tasks.find((task) => task.id === id);
    if (taskFound) return taskFound;
  };

  const updateTask = async (id, task) => {
    try {
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, task);
      showToast("Task updated successfully!", "success");
      router.push("/");
    } catch (error) {
      console.log(error);
      showToast("An error happened!", "error");
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        user,
        tasks,
        registerUser,
        loginUser,
        loginUserWithGoogle,
        loginUserWithGithub,
        signOutUser,
        createTask,
        getTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
