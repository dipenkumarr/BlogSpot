import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Flag } from "appwrite";

export class Service {
	client = new Client();
	databses;
	bucket;

	// constructor - it runs first creating client with appwrite
	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		this.databses = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ title, slug, content2, featuredImage, status, userId }) {
		try {
			return await this.databses.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content2,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: createPost :: error ", error);
		}
	}

	async updatePost(slug, { title, content2, featuredImage, status, userId }) {
		try {
			return await this.databses.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content2,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: updatePost :: error ", error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databses.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);

			return true;
		} catch (error) {
			console.log("Appwrite service :: deletePost :: error ", error);

			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databses.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite service :: getPost :: error ", error);
			return false;
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databses.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log("Appwrite service :: getPosts :: error ", error);
			return false;
		}
	}

	// file upload services

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error ", error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error ", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
	}
}

const service = new Service();

export default service;
