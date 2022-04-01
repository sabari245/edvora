import { useEffect, useState } from "react";

const Navbar = ({ user, setUser }) => {
  useEffect(() => {
    fetch("https://assessment.api.vweb.app/user")
      .then((data) => {
        data.json().then((data) => {
          console.log(data);
          setUser(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-between items-center h-16 px-8 bg-navbar">
      <div className="sfpro text-3xl text-white">Edvora</div>
      <div className="flex justify-end items-center">
        {user ? (
          <>
            <div className="sfpro text-lg text-white mr-3">{user.name}</div>
            <div className="h-10 w-10 rounded-full bg-white overflow-hidden">
              <img src={user.url} alt="avatar" />
            </div>
          </>
        ) : (
          <>
            <div className="h-6 rounded-sm bg-white w-40 animate-fade mr-3"></div>
            <div className="h-10 w-10 rounded-full bg-white animate-fade"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
