import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RealtimeEditor } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	const navigate = useNavigate();
	const userData = useSelector((state) => state.user.userData);

	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? service.uploadFile(data.image[0])
				: null;

			if (file) {
				service.deleteFile(post.featuredImage);
			}

			const dbPost = service.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			});

			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			const file = data.image[0]
				? await service.uploadFile(data.image[0])
				: null;

			if (file) {
				const fileID = file.$id;

				data.featuredImage = fileID;

				const dbPost = await service.createPost({
					...data,
					userId: userData.$id,
				});

				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	};

	return <div>PostForm</div>;
}

export default PostForm;
