"use client";
import { useState } from "react";
// import ;
import { v4 as uuidv4 } from "uuid";
// import logo

const createNewRoom = (e) => {
  // e.preventDefault();

  const id = uuidv4();
  // setroomid(id);
  console.log(id);
};

function buttond() {
  return (
    <button
      onClick={createNewRoom}
      className="joinBtn btn bg-green-500 rounded-md flex justify-center align-center mt-8 w-40 hover:bg-green-800"
    >
      Join
    </button>
    // setroomid(id);
  );
}

export default buttond;
// export default roomid;
