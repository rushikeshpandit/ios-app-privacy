"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@nextui-org/react";
import { ReasonViewProps, reason } from "./Interfaces";

const ReasonsView: React.FC<ReasonViewProps> = (props: ReasonViewProps) => {
	return (
		<Disclosure key={props.type.id}>
			{({ open }) => (
				<div className="m-4 w-4/6 flex flex-col self-center">
					<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-1 px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
						<span>{props.type.type}</span>
						<ChevronUpIcon
							className={`${
								open ? "" : "rotate-180 transform"
							} h-5 w-5 text-white`}
						/>
					</Disclosure.Button>

					<Disclosure.Panel className="flex w-min-96 self-start flex-col px-4 pb-2 pt-4 text-sm text-gray-500">
						{props.type.reasons.map((r: reason) => {
							return (
								<button
									onClick={() => props.updateApiTypes(props.type.id, r.id)}
									type="button"
									className="mt-5 gap-4 w-full flex flex-row justify-start"
									key={r.id}
								>
									<Checkbox
										size="md"
										color="default"
										className="w-6 h-6 border-2"
										isSelected={r.selected}
										onValueChange={() =>
											props.updateApiTypes(props.type.id, r.id)
										}
									/>
									<p className="h-auto w-auto | text-white text-start font-light">
										<strong className="underlineunderline-offset-4">
											{r.key}
										</strong>{" "}
										: {r.value}
									</p>
								</button>
							);
						})}
					</Disclosure.Panel>
				</div>
			)}
		</Disclosure>
	);
};

export default ReasonsView;
