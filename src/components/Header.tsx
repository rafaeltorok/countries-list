import { Link } from "react-router";

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to={"/"}>Countries List</Link>
      </h1>
    </div>
  );
}
