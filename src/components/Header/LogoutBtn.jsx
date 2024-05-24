import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		authService
			.logout()
			.then(() => {
				dispatch(logout());
			})
			.catch(() => {
				console.log("Error Logging Out :: LogoutBtn");
			});
	};

	return (
		<button
			className="inline-block px-6 py-2 duration-150 hover:bg-blue-100 rounded-full"
			onClick={logoutHandler}
		>
			Logout
		</button>
	);
}
export default LogoutBtn;
