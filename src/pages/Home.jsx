import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // New state for loading indication

	useEffect(() => {
		service.getPosts().then((posts) => {
			if (posts) {
				setPosts(posts.documents);
			}
			setIsLoading(false); // Set loading to false after fetching data
		});
	}, []);

	if (isLoading) {
		return (
			<Container>
				<div className="flex items-center justify-center min-h-screen">
					<div className="p-2 w-full text-center">
						<h1 className="text-2xl font-bold">Loading...</h1>
					</div>
				</div>
			</Container>
		);
	} else if (posts.length === 0) {
		return (
			<Container>
				<div className="flex items-center justify-center min-h-screen">
					<div className="p-2 w-full text-center">
						<h1 className="text-2xl font-bold">
							Nothing to read 😔
						</h1>
					</div>
				</div>
			</Container>
		);
	}
	return (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap min-h-screen">
					{posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
							<PostCard {...post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
