import Image from "next/image";
import Avatar from "react-avatar";

export default function Client({ username }) {
  return (
    <div className="client flex flex-col font-bold">
      <Avatar name={username} size={50} round="15px"></Avatar>
      <span className="username">{username}</span>
    </div>
  );
}
