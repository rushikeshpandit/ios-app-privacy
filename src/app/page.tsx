"use client";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import datasource from "./datasource.json";
import MainHint from "./MainHint";
import SubHint from "./SubHint";
var plist = require("plist");
import { Analytics } from "@vercel/analytics/react";
import Contact from "./contact/page";
import MainHintButton from "./MainHintButton";
import HintButton from "./HintButton";
import {
	reason,
	api_type,
	ds,
	options,
	options_type,
	intension_type,
	collected_type,
} from "./Interfaces";
import CollectedDataTypeView from "./CollectedDataTypeView";
import PrivacyTrackingView from "./PrivacyTrackingView";
import TrackingDomainView from "./TrackingDomainView";
import ReasonsView from "./ReasonsView";

export default function Home() {
	const [shouldShowMainHint, setshouldShowMainHint] = useState(false);
	const [shouldShowSubHint, setshouldShowSubHint] = useState(false);
	const [subHintID, setSubHintID] = useState("");
	const [privacyTrackingEnabled, setPrivacyTrackingEnabled] = useState(false);
	const [trackingDomains, setTrackingDomains] = useState([{ domain: "" }]);
	const [reasons_final_value, setReasons_final_value] = useState<api_type[]>(
		[]
	);
	const [collected_data_types, setCollected_data_type] = useState<
		collected_type[]
	>([]);

	useEffect(() => {
		const val = datasource[2].api_type as api_type[];
		setReasons_final_value(val);

		const collect = datasource[3].api_type as options_type[];
		const collected_data_types_final = collect.map((api: options_type) => {
			return api.options?.map((option) => {
				return {
					name: api.label,
					option: option,
					intension: datasource[3].intension,
					purpose: datasource[3].purpose,
				};
			});
		});

		setCollected_data_type(
			collected_data_types_final.flat(Infinity) as collected_type[]
		);
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

	let downloadFile = () => {
		const final_reasons_final_value = reasons_final_value
			.map((reason) => {
				var reason_array: string[] = [];
				reason.reasons.map((r) => {
					if (r.selected) {
						reason_array.push(r.key);
					}
				});
				if (reason_array.length > 0) {
					var final = {
						NSPrivacyAccessedAPIType: reason.value,
						NSPrivacyAccessedAPITypeReasons: reason_array,
					};
					return final;
				} else {
					return null;
				}
			})
			.filter(function (el) {
				return el !== null;
			});
		const final_collected_data_type = collected_data_types
			.map((cdt) => {
				if (cdt.option!.selected) {
					var final = { NSPrivacyCollectedDataType: cdt.option?.value };
					cdt.intension!.map((intension) => {
						var key = intension.value;
						final = { ...final, [key]: intension.selected };
						return intension;
					});
					var purpose_array: string[] = [];
					cdt.purpose?.map((purpose) => {
						if (purpose.selected) {
							purpose_array.push(purpose.value);
						}
						return purpose;
					});

					if (purpose_array.length > 0) {
						var key: string = "NSPrivacyCollectedDataTypePurposes";
						final = { ...final, [key]: purpose_array };
						return final;
					} else {
						return null;
					}
				} else {
					return null;
				}
			})
			.filter(function (el) {
				return el !== null;
			});
		let final_domain = trackingDomains
			.map((domain) => {
				return domain.domain !== "" ? domain.domain : "";
			})
			.filter(function (el) {
				return el !== "";
			});
		let final_json = {
			NSPrivacyTracking: privacyTrackingEnabled,
			NSPrivacyTrackingDomains: final_domain,
			NSPrivacyCo11ectedDataTypes: final_collected_data_type,
			NSPrivacyAccessedAPITypes: final_reasons_final_value,
		};
		var final_xml = plist.build(final_json);
		var filename = "PrivacyInfo.xcprivacy";
		var pom = document.createElement("a");
		var bb = new Blob([final_xml], { type: "application/xml" });

		pom.setAttribute("href", window.URL.createObjectURL(bb));
		pom.setAttribute("download", filename);

		pom.dataset.downloadurl = ["application/xml", pom.download, pom.href].join(
			":"
		);
		pom.draggable = true;
		pom.classList.add("dragout");

		pom.click();
	};

	let updateCollectedDataTypeIntension = (
		ct: collected_type,
		id: string,
		is_purpose: boolean
	) => {
		if (is_purpose) {
			const updated_cdt = collected_data_types.map((cdt) => {
				if (cdt.option?.id.toLowerCase() === ct.option?.id.toLowerCase()) {
					const updated_purpose = cdt.purpose?.map((purpose) => {
						if (purpose.id.toLowerCase() === id.toLowerCase()) {
							return { ...purpose, selected: !purpose.selected };
						}
						return purpose;
					});
					return {
						...cdt,
						purpose: updated_purpose,
						option: { ...cdt.option, selected: true },
					};
				}
				return cdt;
			});

			setCollected_data_type(updated_cdt as collected_type[]);
		} else {
			const updated_cdt = collected_data_types.map((cdt) => {
				if (cdt.option?.id.toLowerCase() === ct.option?.id.toLowerCase()) {
					const updated_intension = cdt.intension?.map((intension) => {
						if (intension.id.toLowerCase() === id.toLowerCase()) {
							return { ...intension, selected: !intension.selected };
						}
						return intension;
					});
					return {
						...cdt,
						intension: updated_intension,
						option: { ...cdt.option, selected: true },
					};
				}
				return cdt;
			});

			setCollected_data_type(updated_cdt as collected_type[]);
		}
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
		var api_to_update = reasons_final_value.find((o) => o.id === api_id);
		var index_to_replace = reasons_final_value.findIndex(
			(o) => o.id === api_id
		);
		var reason_to_update = api_to_update?.reasons.find(
			(o) => o.id === reason_id
		);
		reason_to_update!.selected = !reason_to_update!.selected;
		var updated_reasons = api_to_update?.reasons.map((o) =>
			o.id === reason_to_update?.id ? reason_to_update : o
		);
		api_to_update!.reasons = updated_reasons!;
		let a_t = [...reasons_final_value];
		a_t[index_to_replace] = api_to_update!;
		setReasons_final_value(a_t);
	}

	function showMainHintButton() {
		return <MainHintButton toggle={toggle} />;
	}

	function renderHintButton(id: string, hint: string) {
		return (
			<HintButton toggleSubHintView={toggleSubHintView} id={id} hint={hint} />
		);
	}

	function renderCollectedDataType(ct: collected_type) {
		return (
			<CollectedDataTypeView
				ct={ct}
				updateCollectedDataTypeIntension={updateCollectedDataTypeIntension}
			/>
		);
	}

	function renderFormDetails(data: ds) {
		switch (data.id) {
			case "1":
				return (
					<PrivacyTrackingView
						setPrivacyTrackingEnabled={setPrivacyTrackingEnabled}
						privacyTrackingEnabled={privacyTrackingEnabled}
						title={data.btn_title}
					/>
				);
			case "2":
				return (
					<>
						{trackingDomains.map((domain, index) => (
							<div className="flex flex-row gap-4 w-full mb-5" key={index}>
								{index ? (
									<TrackingDomainView
										key={index}
										domain={domain.domain}
										index={index}
										handleChange={handleChange}
										removeTrackingDomains={removeTrackingDomains}
									/>
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
						{reasons_final_value.map((type: api_type) => {
							return (
								<ReasonsView
									key={type.id}
									type={type}
									updateApiTypes={updateApiTypes}
								/>
							);
						})}
					</div>
				);
			case "4":
				return (
					<div className=" w-auto h-auto flex flex-col gap-4">
						{collected_data_types.map((cdt: collected_type) => {
							return <>{renderCollectedDataType(cdt)}</>;
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
				<div className=" z-10 max-w-5xl w-full items-end justify-end font-mono text-sm lg:flex">
					<button
						type="button"
						onClick={downloadFile}
						className="fixed  flex w-full justify-center border-b border-cyan-500 p-8 rounded-full backdrop-blur-2xl lg:static lg:w-auto g:rounded-xl lg:border lg:bg-black-200 1g:p-4 "
					>
						<strong> Download PrivacyInfo.xcprivacy</strong>
					</button>
				</div>
				<div className=" grid grid-cols-2 gap-10 p-10 border-b border-blue-50 transition-all ease-in-out duration-700 opacity-100 h-auto mt-10 max-w-7xl w-full bg-gradient-to-r from-cyan-500 to-blue-500">
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
			<script
				data-name="BMC-Widget"
				data-cfasync="false"
				src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
				data-id="rushikeshpandit"
				data-description="Support me on Buy me a coffee!"
				data-message="Fueling creativity, one sip at a time! ☕️ Your support means the world to me. Thanks a latte for considering buying me a coffee! Together, let's brew up some amazing projects and keep the inspiration flowing. Cheers to you!"
				data-color="#5F7FFF"
				data-position="Right"
				data-x_margin="18"
				data-y_margin="18"
				defer
			></script>
			<Contact />
			<Analytics />
		</main>
	);
}
