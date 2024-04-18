function Arrow(props: {
	disabled: boolean;
	left?: boolean;
	onClick: (e: any) => void;
}) {
	const disabled = props.disabled ? " fill-black" : " fill-white";
	return (
		<svg
			onClick={props.onClick}
			className={` w-8 h-8 absolute top-2/4 translate-y-1/2 cursor-pointer fill-white ${
				props.left ? " left-5" : " left-auto right-5"
			} ${disabled}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{props.left && (
				<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
			)}
			{!props.left && (
				<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
			)}
		</svg>
	);
}

export default Arrow;
