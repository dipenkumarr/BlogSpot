import React, { useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
	const [isImageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full h-64 bg-gray-100 rounded-2xl duration-150 p-4 border-4 border-black/60 hover:bg-gray-200 flex flex-col justify-between">
				{" "}
				{/* Adjusted height and added flex properties */}
				<div className="w-full h-50 justify-center mb-4 overflow-hidden">
					{" "}
					{/* Fixed height for image container */}
					{featuredImage && (
						<>
							<img
								src={service.getFilePreview(featuredImage)}
								alt={title}
								className="rounded-xl w-full h-full object-cover" // Added object-cover
								onLoad={handleImageLoad}
								style={{
									display: isImageLoaded ? "block" : "none",
								}}
							/>
						</>
					)}
				</div>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	);
}

export default PostCard;
