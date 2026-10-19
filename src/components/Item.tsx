import { Link } from "react-router";

interface ItemProps {
  countryName: string;
	flag: string;
  url: string;
}

export default function Item({ countryName, flag, url }: ItemProps) {
  return (
    <li>
      <Link
        to={`${url}`}
      >
        {flag} {countryName}
      </Link>
    </li>
  );
}
