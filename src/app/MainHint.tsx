"use client";

import { Transition } from "@headlessui/react";
import parse from "html-react-parser";
import hint from "./hint.json";
import { MainHintProps } from "./Interfaces";

const MainHint: React.FC<MainHintProps> = (props: MainHintProps) => {
	function showHint(isFirst: Boolean): any {
		return parse(isFirst ? hint.page_one : hint.page_two);
	}
	return (
		<Transition
			show={props.shouldShowMainHint}
			enter="transition ease-in-out duration-300 transform"
			enterFrom="-translate-y-full"
			enterTo="translate-y-0"
			leave="transition ease-in-out duration-300 transform"
			leaveFrom="translate-y-0"
			leaveTo="-translate-y-full"
		>
			<div className="border-b border-blue-500 gap-10 transition-all ease-in-out duration-700 opacity-100 h-auto p-10 max-w-7xl w-full grid grid-cols-2 bg-gradient-to-r from-cyan-500 to-blue-500">
				{showHint(true)}
				{showHint(false)}
			</div>
			<div className="p-10 w-full items-center justify-center font-mono text-sm lg:flex">
				<button
					type="button"
					onClick={props.toggle}
					className="mt-10 fixed left-0 top-0 flex w-full justify-center border rounded-full border-cyan-500 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto g:rounded-xl Ig:border lg:bg-black-200 lg:p-4 "
				>
					Hide this info
				</button>
			</div>
		</Transition>
	);
};

export default MainHint;
