import "keen-slider/keen-slider.min.css";
import { KeenSliderPlugin } from "keen-slider/react";

export const AdaptiveHeight: KeenSliderPlugin = (slider) => {
	function updateHeight() {
		slider.container.style.height =
			slider.slides[slider.track.details.rel].offsetHeight + "px";
	}
	slider.on("created", updateHeight);
	slider.on("slideChanged", updateHeight);
};
