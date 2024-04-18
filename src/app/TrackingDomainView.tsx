"use client";
import { TrackingDomainViewProps } from "./Interfaces";

const TrackingDomainView: React.FC<TrackingDomainViewProps> = (
	props: TrackingDomainViewProps
) => {
	return (
		<>
			<input
				className="w-2/3 h-10 p-4 text-black rounded-full"
				type="text"
				name="name"
				placeholder="Tracking domain"
				value={props.domain || ""}
				onChange={(e) => props.handleChange(props.index, e)}
			/>
			<button
				title="?"
				type="button"
				className="button remove"
				onClick={() => props.removeTrackingDomains(props.index)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6"
				>
					<path
						fillRule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</>
	);
};

export default TrackingDomainView;
