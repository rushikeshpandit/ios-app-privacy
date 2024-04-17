"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@nextui-org/react";
import { collected_type, intension_type } from "./Interfaces";

interface CollectedDataTypeViewProps {
	updateCollectedDataTypeIntension: (
		ct: collected_type,
		id: string,
		is_purpose: boolean
	) => void;
	ct: collected_type;
}
const CollectedDataTypeView: React.FC<CollectedDataTypeViewProps> = (
	props: CollectedDataTypeViewProps
) => {
	return (
		<Disclosure key={props.ct.name}>
			{({ open }) => (
				<div className="m-4">
					<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-1 px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
						<span>{props.ct.name + " : " + props.ct.option!.label}</span>
						<ChevronUpIcon
							className={`${
								open ? "" : "rotate-180 transform"
							} h-5 w-5 text-white`}
						/>
					</Disclosure.Button>

					<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
						{props.ct.intension!.map((i: intension_type) => {
							return (
								<button
									onClick={() => {
										props.updateCollectedDataTypeIntension(
											props.ct,
											i.id,
											false
										);
									}}
									type="button"
									className="mt-5 gap-4 w-full flex flex-row justify-start"
									key={i.id}
								>
									<Checkbox
										size="md"
										color="default"
										className="w-6 h-6 border-2"
										isSelected={i.selected}
										onValueChange={() => {
											props.updateCollectedDataTypeIntension(
												props.ct,
												i.id,
												false
											);
										}}
									/>
									<div className="">
										<p className="h-auto w-auto | text-white text-start font-light">
											<strong className="underlineunderline-offset-4">
												{i.label}
											</strong>
										</p>
									</div>
								</button>
							);
						})}
						<hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
						{props.ct.purpose!.map((p: intension_type) => {
							return (
								<button
									onClick={() => {
										props.updateCollectedDataTypeIntension(
											props.ct,
											p.id,
											true
										);
									}}
									type="button"
									className="mt-5 gap-4 w-full flex flex-row justify-start"
									key={p.id}
								>
									<Checkbox
										size="md"
										color="default"
										className="w-6 h-6 border-2"
										isSelected={p.selected}
										onValueChange={() => {
											props.updateCollectedDataTypeIntension(
												props.ct,
												p.id,
												true
											);
										}}
									/>
									<div className="">
										<p className="h-auto w-auto | text-white text-start font-light">
											<strong className="underlineunderline-offset-4">
												{p.label}
											</strong>
										</p>
									</div>
								</button>
							);
						})}
					</Disclosure.Panel>
				</div>
			)}
		</Disclosure>
	);
};

export default CollectedDataTypeView;
