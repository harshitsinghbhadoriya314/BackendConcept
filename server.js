require("dotenv").config();
const connectToDB = require("./src/config/db.js");
const app = require("./src/app");

const startserver = async () => {
    const port = process.env.PORT || 3000;
    try {
        await connectToDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (err) {
        console.log("Error starting server", err);
    }
}
startserver();