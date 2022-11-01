import DefaultLayout from "@components/DefaultLayout";
import Image from "next/image";
import { Fragment } from "react";
import { useState } from "react";
import { sculptureList as pictureList } from "./data";

function PictureGallery() {
	const [pictureIdx, setPictureIdx] = useState(0);
	const [showMoreChk, setShowMoreChk] = useState(false);
	console.log("component render");

	const handleNextClick = () => {
		setPictureIdx(pictureIdx + 1);
	};

	const handleBackClick = () => {
		setPictureIdx(pictureIdx - 1);
	};

	const handleShowMoreClick = () => {
		setShowMoreChk(!showMoreChk);
	};

	let currentPicture = pictureList[pictureIdx];

	return (
		<Fragment>
			<div style={{ display: "flex" }}>
				<button disabled={pictureIdx === 0 ? true : false} onClick={handleBackClick}>
					Back
				</button>
				<button
					disabled={pictureIdx === pictureList.length - 1 ? true : false}
					onClick={handleNextClick}>
					Next
				</button>
			</div>
			<h2>
				<span>{currentPicture.name}</span>
				<span>by</span>
				<span>{currentPicture.artist}</span>
			</h2>
			<h3>
				({pictureIdx + 1} of {pictureList.length})
			</h3>
			<button onClick={handleShowMoreClick}>{showMoreChk ? "Hide" : "Show"} details</button>
			{showMoreChk && <p>{currentPicture.description}</p>}
			<Image src={currentPicture.url} alt={currentPicture.alt} width={200} height={200} />
		</Fragment>
	);
}

export default function App() {
	return (
		<DefaultLayout titile="Picture Gallery Tutorial">
			<PictureGallery></PictureGallery>
		</DefaultLayout>
	);
}
