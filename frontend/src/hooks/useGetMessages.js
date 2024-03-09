import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios'

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { authUser } = useAuthContext();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const token = authUser?.token
				const a = axios.post(`https://chat-app-0cfl.onrender.com/api/messages/${selectedConversation._id}`, {
					body: {token:token}
				}).then((res) =>{
					setMessages(res.data);
				})
				// const res = await fetch(`http://localhost:5000/api/messages/${selectedConversation._id}`, {

				// });
				// const data = await res.json();
				// if (data.error) throw new Error(data.error);
				// setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
