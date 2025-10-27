const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const employeeRoutes = require("./routes/employees");

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


app.use("/api", authRoutes);       
app.use("/api/tasks", taskRoutes); 
app.use("/api/employees", employeeRoutes); 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
