"use client";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

function Navbar() {
  const { isLoading, user, signOutUser } = useAppContext();

  return (
    <nav className="bg-gray-50 text-gray-950 flex items-center justify-between px-10 py-5">
      <h1 className="sm:text-3xl text-2xl font-bold">
        <Link href="/">FireApp</Link>
      </h1>
      <ul className="sm:text-xl flex gap-5 text-lg text-gray-800">
        {!user ? (
          <>
            <li>
              <Link
                href="/sign-up"
                className="hover:text-red-600 transition-colors ease-in"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                href="/sign-in"
                className="hover:text-red-600 transition-colors ease-in"
              >
                Sign In
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                type="button"
                className="hover:text-red-600 transition-colors ease-in"
                onClick={() => signOutUser()}
              >
                Sign Out
              </button>
            </li>
            <li>
              <Link
                href="/add-task"
                className="hover:text-red-600 transition-colors ease-in"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-red-600 transition-colors ease-in"
              >
                Tasks
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
