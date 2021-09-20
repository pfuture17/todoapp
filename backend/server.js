const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const PORT = process.env.PORT || 3000;

const taskRouter = require('./routes/taskRouter');

app.use(express.json());
app.use(cors());

app.use('/tasks', taskRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    });
});
