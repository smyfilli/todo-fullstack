const db = require('../db')

class TasksController{
    async createTask(req, res) {
        try {
          const { header, description, expiration_date, priority, responsible_id } = req.body;
      
          // Insert the new task into the database
          const newTask = await db.query(
            'INSERT INTO Task (header, description, expiration_date, priority, responsible_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [header, description, expiration_date, priority, responsible_id]
          );
      
          res.json(newTask.rows[0]);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to create a new task' });
        }
      };

    async todayTasks(req, res){
            try {
                const { userId } = req.params;
                const today = new Date();
                //today.setHours(0, 0, 0, 0);
            
                const tasks = await db.query(
                'SELECT * FROM Task WHERE responsible_id = $1 AND expiration_date = $2',
                [userId, today]
                );
            
                res.json(tasks.rows);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };

    async getUsers(req, res){
        const users = await db.query('SELECT * from "User"')
        res.json(users.rows)
    }

    async getOneUser(req, res){

    }
}

module.exports = new TasksController()