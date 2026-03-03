# 📝 MERN Todo App

A full-stack Todo Application built using the MERN Stack (MongoDB, Express, React, Node.js).
This app allows users to create,Read, update, delete, and manage their daily tasks efficiently.

🚀 Features

✅ Add new tasks

🗑 Delete tasks

📌 Mark tasks as completed

🔄 Real-time UI updates

🌐 RESTful API integration

🛠 Tech Stack
🔹 Frontend
-React.js
 -Axios
 -Tailwind CSS

🔹 Backend
-Node.js
-Express.js
-MongoDB

📂 Project Structure
mern-todo-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── App.js
│
└── README.md 

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/vanshul2004/mern-todo-app.git
cd mern-todo-app
2️⃣ Install Backend Dependencies
cd backend
npm install

Create a .env file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string


Start backend:
npm start

3️⃣ Install Frontend Dependencies
cd frontend
npm install
npm start

Frontend will run on:

http://localhost:3000

Backend will run on:

http://localhost:4001
📡 API Endpoints
Method	Route	Description
GET	/api/todos	Get all todos
POST	/api/todos	Create new todo
PUT	/api/todos/	Update todo
DELETE	/api/todos/	Delete todo


🎯 Future Improvements

🔐 User authentication (JWT)

📱 Responsive design improvements

📊 Task filtering (Completed / Pending)


👨‍💻 Author
Vanshul
MERN Stack Developer




   
