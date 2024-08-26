"use client";

import Image from "next/image";
import Client from "@/app/components/client";
import { useState, useEffect, useRef } from "react";
// import {useLocation} from 'Reac'
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Codemirror from "codemirror";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-kuroir";

import "ace-builds/src-noconflict/ext-language_tools";
import { createRoot } from "react-dom/client";
import { initSocket } from "../../../../server/socket";
import ACTIONS from "@/ACTIONS";
export default function Editor() {
  // const location = usePathname();
  const socketRef = useRef(null);
  const location = useSearchParams();
  const editorRef = useRef(null);
  const roomid2 = location.get("roomid");
  // const search = location.get("query");
  const parts = roomid2.split(" ");
  const roomid = parts[0];
  const search = parts[1];

  // const { roomid } = useParams();
  // const { roomid, query } = useRouter();
  const [clientsx, setClientsx] = useState([{}, {}, {}]);
  useEffect(() => {
    const container = document.getElementById("real");
    editorRef.current = document.getElementById("real");
    console.log(roomid);
    const root = createRoot(container);
    function onChange(newValue) {
      // console.log("change", newValue);
      const code = newValue;
      // socketRef.current.emit(ACTIONS.CODE, { roomid, code });
    }
    root.render(
      <AceEditor
        mode="javascript"
        theme="terminal"
        onChange={onChange}
        // name="real"
        fontSize="25px"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      />
    );
    // editorRef.current.onChange((instance, changes) => {
    //   console.log("changes", changes);
    // });
    console.log("in useeffect of initsocket");
    const init = async () => {
      try {
        console.log("called init socket");
        console.log(`${search}`);
        socketRef.current = await initSocket();

        socketRef.current.emit(ACTIONS.JOIN, {
          roomid,
          username: `${search}`,
        });
        console.log(`${search}`);
        console.log(roomid);

        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, userName, socketId }) => {
            console.log("in joined section");
            if (userName != search) {
              console.log(`${userName} has joined`);
              console.log(`${socketId}`);
            }
            setClientsx(clients);
          }
        );

        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          setClientsx((prev) => {
            return prev.filter((client) => client.socketId != socketId);
          });
        });
        socketRef.current.on(ACTIONS.CODE_CHANGE, (code) => {
          if (code != null) {
            // container.innerHTML(code);
            console.log(code);
          }
        });
      } catch (error) {
        console.log("Failed to initialize socket", error);
      }
      console.log(clientsx);
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  return (
    <div className="mainwrap grid grid-cols-6 h-screen ">
      <div className="aside p-2 col-span-1 flex flex-col">
        <div className="aside_inner ">
          <div className="logo  w-auto pb-4">
            <img className="h-20 w-44" src="./image copy.png"></img>
          </div>
          <h3 className="text-white">Connected</h3>
          {/* <div className="clientslist flex flex-row items-center flex-wrap gap-4">
            {clients.forEach((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div> */}
          <div className="clientslist flex flex-row items-center flex-wrap gap-4">
            {clientsx.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-2 flex flex-row gap-4 mb-4">
          <button className="bg-white text-black rounded-md w-24">
            Copy Room Id
          </button>

          <button className="bg-red-700 text-black rounded-md w-24">
            Leave Room
          </button>
        </div>
      </div>
      <div id="real" className=" editorWrap col-span-5 w-full h-full"></div>
    </div>
  );
}

// future plans
// download option for code
//diff lang option
//diff theme option
//text size increase
//horizontal scrollable partition
