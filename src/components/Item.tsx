import { Link } from "react-router";

interface ItemProps {
  countryName: string;
  flag: string;
  url: string;
}

export default function Item({ countryName, flag, url }: ItemProps) {
  return (
    <Link to={`${url}`}>
      {flag} {countryName}
    </Link>
  );
}
