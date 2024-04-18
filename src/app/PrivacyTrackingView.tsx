"use client";
import { Checkbox } from "@nextui-org/react";
import { PrivacyTrackingViewProps } from "./Interfaces";

const PrivacyTrackingView: React.FC<PrivacyTrackingViewProps> = (
	props: PrivacyTrackingViewProps
) => {
	return (
		<button
			onClick={() =>
				props.setPrivacyTrackingEnabled(!props.privacyTrackingEnabled)
			}
			type="button"
			className="mt-5 flex flex-row gap-4 w-3/4"
		>
			<Checkbox
				size="md"
				color="default"
				className=" w-6 h-6 border-2"
				isSelected={props.privacyTrackingEnabled}
				onValueChange={props.setPrivacyTrackingEnabled}
			/>
			<p className="h-auto w-auto text-white">{props.title}</p>
		</button>
	);
};

export default PrivacyTrackingView;
