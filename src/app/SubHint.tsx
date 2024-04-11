"use client";
import { Transition } from "@headlessui/react";
import parse from "html-react-parser";

interface SubHintProps {
	hintText: string;
	shouldShowSubHint: boolean;
}

const SubHint: React.FC<SubHintProps> = (props: SubHintProps) => {
	function showHint(hintText: string): any {
		return parse(hintText);
	}
	return (
		<Transition
			show={props.shouldShowSubHint}
			enter="transition ease-in-out duration-300 transform"
			enterFrom="-transLate-y-fult"
			enterTo="transLate-y-0"
			leave="transition ease-in-out duration-300 transform"
			leaveFrom="translate-y-0"
			leaveTo="-transLate-y-full"
		>
			<div className="border border-white p-5 transition-all ease-in-out duration-700 opacity-100 h-auto mt-10 max-w-7xl w-auto">
				<p className="h-auto w-auto text-white"> {showHint(props.hintText)}</p>
			</div>
		</Transition>
	);
};

export default SubHint;
