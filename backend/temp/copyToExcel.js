const { MongoClient } = require("mongodb");
const ExcelJS = require("exceljs");

async function exportToExcel() {
    const uri = "mongodb+srv://shreshaacharya:GYlrUH5p4Q6vUTKN@cluster0.upkij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        console.log("Connecting to MongoDB Atlas...");
        await client.connect();
        console.log("Connected successfully!");

        const db = client.db("test");  // Make sure this database exists
        const collection = db.collection("players");  // Make sure this collection exists

        console.log("Fetching data from MongoDB...");
        const data = await collection.find().toArray();

        // Log the fetched data
        console.log("Retrieved Data:", data);

        // Handle case where the collection is empty
        if (!data.length) {
            console.error("No data found in the 'players' collection!");
            return;
        }

        console.log("Creating Excel file...");
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Players Data");

        // Set column headers dynamically
        worksheet.columns = Object.keys(data[0]).map(key => ({
            header: key.toUpperCase(), // Capitalized headers
            key
        }));

        // Add rows to Excel sheet
        data.forEach(row => worksheet.addRow(row));

        // Save the Excel file
        const filePath = "mongodb_data.xlsx";
        await workbook.xlsx.writeFile(filePath);
        console.log(`Data exported successfully to ${filePath}`);
    } catch (error) {
        console.error("Error during export:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

exportToExcel();
