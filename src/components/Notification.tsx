interface NotificationProps {
	listSize: number;
	searchTerm: string;
}

export default function Notification({ listSize, searchTerm }: NotificationProps) {
	return (
		<div id="warning-message">
			{searchTerm && listSize > 0 && (
				<h2>Too many matches, please be more specific</h2>
			)}
			{searchTerm && listSize === 0 && (
				<h2>No countries were found</h2>
			)}
		</div>
	);
}
