export interface reason {
	id: string;
	key: string;
	value: string;
	selected: boolean;
}

export interface api_type {
	id: string;
	value: string;
	type: string;
	reasons: reason[];
}

export interface ds {
	id: string;
	label: string;
	hint: string;
	api_type?: api_type[] | any;
	btn_title?: any | undefined;
	purpose?: any | undefined;
}

export interface options {
	id: string;
	value: string;
	label: string;
	selected: boolean;
}

export interface options_type {
	id: string;
	label: string;
	options: options[];
}

export interface intension_type {
	id: string;
	value: string;
	label: string;
	selected: boolean;
}

export interface collected_type {
	value?: string | undefined;
	name?: string | undefined;
	option?: options | undefined;
	purpose?: intension_type[] | undefined;
	intension?: intension_type[] | undefined;
}

export interface PrivacyTrackingViewProps {
	setPrivacyTrackingEnabled: (values: boolean) => void;
	privacyTrackingEnabled: boolean;
	title: string;
}

export interface TrackingDomainViewProps {
	domain: string;
	index: number;
	handleChange: (i: number, e: any) => void;
	removeTrackingDomains: (i: number) => void;
}

export interface SubHintProps {
	hintText: string;
	shouldShowSubHint: boolean;
}

export interface MainHintProps {
	shouldShowMainHint: boolean;
	toggle: (values: any) => void;
}

export interface MainHintButtonProps {
	toggle: (values: any) => void;
}

export interface ReasonViewProps {
	type: api_type;
	updateApiTypes: (api_id: string, reason_id: string) => void;
}

export interface HintButtonProps {
	toggleSubHintView: (id: string, hint: string) => void;
	id: string;
	hint: string;
}

export interface CollectedDataTypeViewProps {
	updateCollectedDataTypeIntension: (
		ct: collected_type,
		id: string,
		is_purpose: boolean
	) => void;
	ct: collected_type;
}
