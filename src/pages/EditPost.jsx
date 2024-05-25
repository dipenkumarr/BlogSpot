import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
	const [post, setPost] = useState([]);
	const { slug } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (slug) {
			service.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
					setLoading(false);
				}
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return !loading ? (
		<div className="w-full pt-20 m-auto min-h-screen">
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : (
		"Loading Data"
	);
}

export default EditPost;
