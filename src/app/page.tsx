"use client";
import datasource from "./datasource.json";
import { useState } from "react";
import MainHint from "./MainHint";
import SubHint from "./SubHint";
import { Checkbox } from "@nextui-org/react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";

interface reason {
	id: string;
	key: string;
	value: string;
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

export default function Home() {
	const [shouldShowMainHint, setshouldShowMainHint] = useState(false);
	const [shouldShowSubHint, setshouldShowSubHint] = useState(false);
	const [subHintID, setSubHintID] = useState("");
	const [privacyTrackingEnabled, setPrivacyTrackingEnabled] = useState(false);
	const [trackingDomains, setTrackingDomains] = useState([{ domain: "" }]);
	const [apiTypes, setApiTypes] = useState<api_type[]>([]);
	const [reasons, setReasons] = useState<reason[]>([]);

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
						<Dropdown>
							<DropdownTrigger>
								<Button variant="solid"> - Please select API Type</Button>
							</DropdownTrigger>
							<DropdownMenu
								className="border border-white"
								onAction={(key) => {
									const item = data.api_type?.find(
										(o: reason) => o.value === key
									);
									setApiTypes([...apiTypes, item]);
								}}
								items={data.api_type}
							>
								{(type: api_type) => {
									return (
										<DropdownItem
											className="border border-white p-2"
											key={type.value}
										>
											{type.type}
										</DropdownItem>
									);
								}}
							</DropdownMenu>
						</Dropdown>
						{apiTypes.length > 0 &&
							apiTypes.map((type) => {
								// type.id == data.
								return (
									<div key={type.id} className="bg-green-700 w-2/3 h-64">
										{type.reasons.map((r) => {
											return (
												<p className="bg-orange-500" key={r.id}>
													{r.value + ": " + r.value}
												</p>
											);
										})}
									</div>
								);
							})}
						<div className="bg-orange-500 w-auto h-auto">
							{data.api_type.reasons &&
								data.api_type.reasons.map((api: reason) => {
									<p>{api.value}</p>;
								})}
						</div>
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
