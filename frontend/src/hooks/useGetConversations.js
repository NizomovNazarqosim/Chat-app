import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios'

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				console.log('ttkktktktkt', authUser)
				const token = authUser?.token
				const a = axios.post('https://chat-app-0cfl.onrender.com/api/users', {
					body: {token:token}
				}).then((res) =>{
					setConversations(res?.data)
				})
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
