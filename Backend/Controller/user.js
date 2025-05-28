// Import the user model so we can interact with the MongoDB collection
import usermodel from "../model/user.js";

/*
* Function to create a new user
* It receives user data from the request body, checks if the user already exists by email
* If not, it saves the new user to the database
*/
export const create = async (req, res) => {
    try {
        // Create a new instance of the usermodel with data from the request
        const userData = new usermodel(req.body);

        // Destructure the email field from the user data
        const { email } = userData;

        // Check if a user with the same email already exists in the database
        const userExit = await usermodel.findOne({ email });

        // If user exists, send a response with status 400 (Bad Request)
        if (userExit) {
            return res.status(400).json({ message: "user already exists" });
        }

        // Save the new user to the database
        const savedUser = await userData.save();

        // Send a success response with status 200
        res.status(200).json({ message: "User Created Successfully" });

    } catch (error) {
        // Catch any errors and send a 500 (Internal Server Error) response
        res.status(500).json({ error: "internal server error" });
    }
};

/*
* Function to fetch all users from the database
*/
export const fetch = async (req, res) => {
    try {
        // Find all users from the usermodel collection
        const users = await usermodel.find();

        // If no users are found, send a 400 response
        if (users.length === 0) {
            return res.status(400).json({ message: "user not found" });
        }

        // Send the list of users as JSON
        res.status(200).json(users);
    } catch (error) {
        // Handle any error that occurs
        res.status(500).json({ error: "internal server error" });
    }
};

/*
* Function to update an existing user by their ID
*/
export const update = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const id = req.params.id;

        // Check if the user with the given ID exists
        const userExists = await usermodel.findOne({ _id: id });

        // If user is not found, return a 400 error
        if (!userExists) {
            return res.status(400).json({ message: "user not found" });
        }

        // Update the user data with the new data from request body
        const updateuser = await usermodel.findByIdAndUpdate(id, req.body, { new: true });

        // Send the updated user as response
        res.status(201).json(updateuser);

    } catch (error) {
        // Send internal server error response
        res.status(500).json({ error: "internal server error" });
    }
};

/*
* Function to delete a user by their ID
*/
export const deleteUser = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const id = req.params.id;

        // Check if the user exists in the database
        const userExist = await usermodel.findOne({ _id: id });

        // If user is not found, return a 404 error
        if (!userExist) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the user from the database
        await usermodel.findByIdAndDelete(id);

        // Send success message
        res.status(201).json({ msg: "user deleted successfully" });

    } catch (error) {
        // Handle internal server error
        res.status(500).json({ error: "Internal server error" });
    }
};

/*
* Function to fetch a single user by their ID
* This is useful when you want to see details of a specific user
*/
export const getOne = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const id = req.params.id;

        // Find the user by ID
        const user = await usermodel.findById(id);

        // If no user found, return a 404 response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user data
        res.status(200).json(user);
    } catch (error) {
        // Return internal server error response
        res.status(500).json({ error: "Internal server error" });
    }
};