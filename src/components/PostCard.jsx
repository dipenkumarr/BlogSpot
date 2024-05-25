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
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full justify-center mb-4">
					{featuredImage && (
						<>
							{/* {!isImageLoaded && <div>Loading...</div>} */}
							<img
								src={service.getFilePreview(featuredImage)}
								alt={title}
								className="rounded-xl"
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
