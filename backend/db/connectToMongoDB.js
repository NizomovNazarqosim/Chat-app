import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://nazarqosim:nazarqosim@cluster0.vbbryiw.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0');
		
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
