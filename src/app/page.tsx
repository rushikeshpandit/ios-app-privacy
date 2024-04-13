"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import datasource from "./datasource.json";
import MainHint from "./MainHint";
import SubHint from "./SubHint";

interface reason {
	id: string;
	key: string;
	value: string;
	selected: boolean;
}

interface api_type {
	id: string;
	value: string;
	type: string;
	reasons: reason[];
}
interface ds {
	id: string;
	label: string;
	hint: string;
	api_type?: api_type[] | any;
	btn_title?: any | undefined;
	purpose?: any | undefined;
}

interface option {
	id: string;
	key: string;
	label: string;
	selected: boolean;
}

interface api_type_one {
	id: string;
	value: string;
	type: string;
	options: option[];
}

interface ds_one {
	id: string;
	label: string;
	hint: string;
	api_type?: api_type_one[] | any;
	btn_title?: any | undefined;
	purpose?: option[] | undefined;
	intension?: option[] | undefined;
}

export default function Home() {
	const [shouldShowMainHint, setshouldShowMainHint] = useState(false);
	const [shouldShowSubHint, setshouldShowSubHint] = useState(false);
	const [subHintID, setSubHintID] = useState("");
	const [privacyTrackingEnabled, setPrivacyTrackingEnabled] = useState(false);
	const [trackingDomains, setTrackingDomains] = useState([{ domain: "" }]);
	const [apiTypes, setApiTypes] = useState<api_type[]>([]);

	useEffect(() => {
		const val = datasource[2].api_type as api_type[];
		setApiTypes(val);
	}, []);

	let handleChange = (i: number, e: any) => {
		let newTrackingDomains = [...trackingDomains];
		newTrackingDomains[i].domain = e.target.value;
		setTrackingDomains(newTrackingDomains);
	};

	let addTrackingDomains = () => {
		setTrackingDomains([...trackingDomains, { domain: "" }]);
	};

	let removeTrackingDomains = (i: number) => {
		let newTrackingDomains = [...trackingDomains];
		newTrackingDomains.splice(i, 1);
		setTrackingDomains(newTrackingDomains);
	};

	function toggle() {
		setshouldShowMainHint((shouldShowMainHint) => !shouldShowMainHint);
	}

	function enableMainHint() {
		return <MainHint shouldShowMainHint={shouldShowMainHint} toggle={toggle} />;
	}

	function enableSubHint(id: string, hintText: string) {
		return shouldShowSubHint && id == subHintID ? (
			<SubHint hintText={hintText} shouldShowSubHint={shouldShowSubHint} />
		) : null;
	}

	function toggleSubHintView(id: string, hintext: string) {
		setSubHintID(id);
		setshouldShowSubHint(!shouldShowSubHint);
	}

	function updateApiTypes(api_id: string, reason_id: string) {
		var api_to_update = apiTypes.find((o) => o.id === api_id);
		var index_to_replace = apiTypes.findIndex((o) => o.id === api_id);
		var reason_to_update = api_to_update?.reasons.find(
			(o) => o.id === reason_id
		);
		reason_to_update!.selected = !reason_to_update!.selected;
		var updated_reasons = api_to_update?.reasons.map((o) =>
			o.id === reason_to_update?.id ? reason_to_update : o
		);
		api_to_update!.reasons = updated_reasons!;
		let a_t = [...apiTypes];
		a_t[index_to_replace] = api_to_update!;
		setApiTypes(a_t);
	}

	function showMainHintButton() {
		return (
			<div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
				<button
					type="button"
					onClick={toggle}
					className="fixed left-0 top-0 flex w-full justify-center border-b border-cyan-500 p-8 rounded-full backdrop-blur-2xl lg:static lg:w-auto g:rounded-xl lg:border lg:bg-black-200 1g:p-4 "
				>
					What&apos;s all this about
				</button>
			</div>
		);
	}

	function renderHintButton(id: string, hint: string) {
		return (
			<button
				title="?"
				type="button"
				onClick={() => toggleSubHintView(id, hint)}
				className="fixed left-0 top-0 flex justify-center pb-6 pt-8 backdrop-blur-2xl lg:static Ig:w-auto Lgrounded-xl lg:p-4 "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-6 h-6"
				>
					<path
						fillRule="evenodd"
						d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		);
	}

	function renderFormDetails(data: ds) {
		switch (data.id) {
			case "1":
				return (
					<button
						onClick={() => setPrivacyTrackingEnabled(!privacyTrackingEnabled)}
						type="button"
						className="mt-5 flex flex-row gap-4 w-3/4"
					>
						<Checkbox
							size="md"
							color="default"
							className=" w-6 h-6 border-2"
							isSelected={privacyTrackingEnabled}
							onValueChange={setPrivacyTrackingEnabled}
						/>
						<p className="h-auto w-auto text-white">{data.btn_title}</p>
					</button>
				);
			case "2":
				return (
					<>
						{trackingDomains.map((domain, index) => (
							<div className="flex flex-row gap-4 w-full mb-5" key={index}>
								{index ? (
									<>
										<input
											className="w-2/3 text-black"
											type="text"
											name="name"
											placeholder="Tracking domain"
											value={domain.domain || ""}
											onChange={(e) => handleChange(index, e)}
										/>
										<button
											title="?"
											type="button"
											className="button remove"
											onClick={() => removeTrackingDomains(index)}
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
								) : null}
							</div>
						))}
						<button
							type="button"
							onClick={addTrackingDomains}
							className="fixed left-0 top-0 mt-5 flex w-full justify-center border border-white backdrop-blur-2xl lg:static lg:w-auto lg:rounded-full lg:border lgabg-black-200 lg:p-3 "
						>
							<p className="h-auto w-auto text-white">{data.btn_title}</p>
						</button>
					</>
				);
			case "3":
				return (
					<div className="">
						{apiTypes.map((type: api_type) => {
							return (
								<Disclosure key={type.id}>
									{({ open }) => (
										<div className="m-4">
											<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-1 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
												<span>{type.type}</span>
												<ChevronUpIcon
													className={`${
														open ? "rotate-180 transform" : ""
													} h-5 w-5 text-purple-500`}
												/>
											</Disclosure.Button>

											<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
												{type.reasons.map((r: reason) => {
													return (
														<button
															onClick={() => updateApiTypes(type.id, r.id)}
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
																	updateApiTypes(type.id, r.id)
																}
															/>
															<div className="">
																<p className="h-auto w-auto | text-white text-start font-light">
																	<strong className="underlineunderline-offset-4">
																		{r.key}
																	</strong>{" "}
																	: {r.value}
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
						})}
					</div>
				);
			default:
				return (
					<button
						type="button"
						onClick={toggle}
						className="fixed left-0 top-0 mt-5 flex w-full justify-center border border-white backdrop-blur-2xl lg:static lg:w-auto lg:rounded-full lg:border lgabg-black-200 lg:p-3 "
					>
						<p className="h-auto w-auto text-white">{data.btn_title}</p>
					</button>
				);
		}
	}

	function renderForm() {
		return (
			<>
				<div className=" grid grid-cols-2 gap-20 p-10 border-b border-blue-50 transition-all ease-in-out duration-700 opacity-100 h-auto mt-10 max-w-7xl w-full bg-gradient-to-r from-cyan-500 to-blue-500">
					{datasource.map((data) => {
						return (
							<div key={data.id}>
								<div className="justify-between items-center flex">
									<strong>{data.label}</strong>
									{renderHintButton(data.id, data.hint)}
								</div>
								{enableSubHint(data.id, data.hint)}
								{renderFormDetails(data)}
							</div>
						);
					})}
				</div>
			</>
		);
	}

	return (
		<main className="flex h-full flex-col items-center justify-between p-24">
			{!shouldShowMainHint && showMainHintButton()}
			{shouldShowMainHint && enableMainHint()}
			{renderForm()}
		</main>
	);
}
