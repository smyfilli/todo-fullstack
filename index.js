const express = require('express');
const taskRouter = require('./server/routes/task.routes')
const authRouter = require('./server/routes/auth.router')

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use('/api', taskRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => console.log(`server started on post ${PORT}`));
 