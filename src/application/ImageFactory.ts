import IImage from "@domain/image/Image";
import * as DefaultImageURL from "@assets/hands_animation.gif";

const defaultImage: IImage = {
	name: "robot-bar",
	url: DefaultImageURL.default,
	custom: false
};

export default function ImageFactory() {
	function getDefaultImage(): IImage {
		return defaultImage;
	}

	return {
		getDefaultImage
	};
}