"use client";
import { MainHintButtonProps } from "./Interfaces";

const MainHintButton: React.FC<MainHintButtonProps> = (
	props: MainHintButtonProps
) => {
	return (
		<div className="z-10 max-w-5xl w-full items-center justify-end font-mono text-sm lg:flex">
			<button
				type="button"
				onClick={props.toggle}
				className="fixed left-0 top-0 flex w-full justify-center border-b border-cyan-500 p-8 rounded-full backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-black-200 lg:p-4 "
			>
				What&apos;s all this about
			</button>
		</div>
	);
};

export default MainHintButton;
