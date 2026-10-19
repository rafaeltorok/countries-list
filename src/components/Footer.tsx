import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="footer">
      Developed by Rafael G. Torok{" "}
      <Link to={"https://github.com/rafaeltorok"} target="_blank">
        (Github page⇗)
      </Link>
      <br />
      Background image provided by{" "}
      <Link
        to={"https://freevectormaps.com/world-maps/WRLD-EPS-02-1001?ref=atr"}
        target="_blank"
      >
        Free Vector Maps⇗
      </Link>
    </div>
  );
}
