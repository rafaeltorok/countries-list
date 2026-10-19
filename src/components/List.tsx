interface ListProps {
	countryName: string;
	listSize: number;
	handleButtonClick: () => void;
	flag: string;
}

export default function List({ countryName, listSize, handleButtonClick, flag }: ListProps) {
	if (listSize > 1) {
		return (
			<li>{flag} {countryName} <button onClick={handleButtonClick}>show</button></li>
		);
	}
}
