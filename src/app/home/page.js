"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import ;
import { v4 as uuidv4 } from "uuid";
// import logo
import Buttond from "./buttond.jsx";
// import {useNavigate} from react-router-dom;
import { useRouter } from "next/navigation.js";

import toast from "react-hot-toast";
import react from "react";

export default function Home() {
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  const router = useRouter();
  // return <div>Hello</div>;
  const [roomid, setroomid] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    const id = uuidv4();
    setroomid(id);
    console.log(id);
    // toast.success("Room created sucessfully");
  };
  // createNewRoom();
  const joinRoom = (e) => {
    if (!roomid || !username) {
      return;
    } else {
      // console.log(roomid);
      router.push(`/editor/editor?roomid=${roomid}+${username}`);
    }
  };
  return (
    <main>
      <div className="Homepagewrapper h-screen flex items-center justify-center text-white ">
        <div className="formwrapper bg-slate-900 rounded-xl p-20 max-w-2xl ">
          <img src="./image copy.png" alt="logo" className="h-24 w-80" />
          <center>
            <h1 className="mainlabel mb-4">Paste Invitation Room Id</h1>
          </center>
          <div className="inputGroup flex flex-col ">
            <input
              type="text"
              className="inputBox rounded-lg mt-2 outline-none border-none text-center text-black"
              placeHolder="Room Id"
              onChange={(e) => setroomid(e.target.value)}
              value={roomid}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox rounded-lg mt-4 outline-none border-none text-center text-black"
              placeHolder="UserName"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
            />
          </div>
          <center>
            <button
              onClick={joinRoom}
              className="joinBtn btn bg-green-500 rounded-md flex justify-center align-center mt-8 w-40 hover:bg-green-800"
            >
              Join
            </button>
          </center>
          <div className="create info pb-0">
            If you dont have an invite then create
            <Link
              onClick={createNewRoom}
              href=""
              className="Create new Btn text-green-500  hover:text-green-800"
            >
              New room
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
