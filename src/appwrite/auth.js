import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	// constructor - it runs first creating client with appwrite
	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);

			if (userAccount) {
				this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			throw error;
		}

		return null;
	}

	async logout() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
}

// this is an object so that we can get all methods using . operation
const authService = new AuthService();

export default authService;
