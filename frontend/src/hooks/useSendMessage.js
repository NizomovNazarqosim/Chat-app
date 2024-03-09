import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from'axios'

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { authUser } = useAuthContext();


	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const token = authUser?.token
			const a = axios.post(`https://chat-app-0cfl.onrender.com/api/messages/send/${selectedConversation._id}`, {
					body: {token:token, message:message}
				}).then((res) =>{
					console.log(res)
					setMessages([...messages, res.data])
				})
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
