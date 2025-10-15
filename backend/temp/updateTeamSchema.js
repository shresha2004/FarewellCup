const mongoose = require('mongoose');
const Team = require('../models/teamSchema'); // Adjust path if needed

async function resetTotalAmount() {
    try {
            await mongoose.connect('mongodb+srv://shreshaacharya:GYlrUH5p4Q6vUTKN@cluster0.upkij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    
            console.log('Connected to MongoDB');
   const result = await Team.updateMany({}, { $set: { totalAmount: 10000 } });
    console.log(`Updated ${result.modifiedCount} teams.`);

}
catch(error){
    console.log(error);
}
finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}
resetTotalAmount().catch(console.error);
