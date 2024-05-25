import React from "react";
import { PostForm, Container } from "../components";

function AddPost() {
	return (
		<div className="py-8 min-h-screen">
			<Container>
				<PostForm />
			</Container>
		</div>
	);
}

export default AddPost;
