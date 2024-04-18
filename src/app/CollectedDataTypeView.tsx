"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@nextui-org/react";
import { CollectedDataTypeViewProps, intension_type } from "./Interfaces";

const CollectedDataTypeView: React.FC<CollectedDataTypeViewProps> = (
	props: CollectedDataTypeViewProps
) => {
	return (
		<Disclosure key={props.ct.name}>
			{({ open }) => (
				<div className="m-4 w-5/6 flex flex-col">
					<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-1 px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
						<span>{props.ct.name + " : " + props.ct.option!.label}</span>
						<ChevronUpIcon
							className={`${
								open ? "" : "rotate-180 transform"
							} h-5 w-5 text-white`}
						/>
					</Disclosure.Button>

					<Disclosure.Panel className="w-5/6 flex flex-col px-4 pb-2 pt-4 text-sm text-gray-500">
						<div className="grid grid-cols-1  gap-2 w-full justify-between">
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
										className="mx-2 mt-5 gap-2 w-auto flex flex-row justify-start"
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
										<p className="h-auto w-auto | text-white text-start font-light">
											<strong className="underlineunderline-offset-4">
												{i.label}
											</strong>
										</p>
									</button>
								);
							})}
						</div>
						<hr className="my-12 h-0.5 border-t-0 bg-white dark:bg-white/10" />
						{props.ct.purpose!.map((p: intension_type) => {
							return (
								<div key={p.id} className="grid grid-cols-1">
									<button
										onClick={() => {
											props.updateCollectedDataTypeIntension(
												props.ct,
												p.id,
												true
											);
										}}
										type="button"
										className=" mt-5 gap-2 w-auto flex flex-row justify-start"
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
										<p className="h-auto w-auto | text-white text-start font-light">
											<strong className="underlineunderline-offset-4">
												{p.label}
											</strong>
										</p>
									</button>
								</div>
							);
						})}
					</Disclosure.Panel>
				</div>
			)}
		</Disclosure>
	);
};

export default CollectedDataTypeView;
