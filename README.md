# PassOP - Your Own Password Manager

PassOP is a full-stack password manager application that allows users to securely store, manage, and organize their passwords with a clean, modern interface. Built with React and Express.js, it provides a seamless experience for password management with MongoDB as the database backend.

## 🌟 Features

- **Secure Password Storage**: Store passwords for different websites and services
- **User-Friendly Interface**: Clean, modern UI built with React and TailwindCSS
- **Password Management**: Add, edit, delete, and view stored passwords
- **Copy to Clipboard**: Easy one-click copying of usernames, passwords, and URLs
- **Password Visibility Toggle**: Show/hide password functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Toast Notifications**: Real-time feedback for user actions
- **MongoDB Integration**: Robust database storage with MongoDB

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Vite** - Fast build tool and development server
- **TailwindCSS 4.1.10** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **UUID** - Unique identifier generation
- **LordIcon** - Animated icons

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB 6.17.0** - NoSQL database
- **Mongoose 8.16.0** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
PassOP/
├── PassOP - Mongo/
│   ├── src/
│   │   ├── component/
│   │   │   ├── Manager.jsx      # Main password management component
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   └── Footer.jsx       # Footer component
│   │   ├── assets/              # Static assets
│   │   ├── App.jsx              # Main App component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── Backend/
│   │   ├── server.js            # Express server
│   │   └── package.json         # Backend dependencies
│   ├── public/                  # Public assets
│   ├── index.html               # HTML template
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   └── eslint.config.js         # ESLint configuration
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd "PassOP - Mongo/Backend"
```

2. Install backend dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system:
```bash
# For Ubuntu/Debian
sudo systemctl start mongod

# For macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# For Windows
net start MongoDB
```

4. Start the backend server:
```bash
node server.js
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Open a new terminal and navigate to the main project directory:
```bash
cd "PassOP - Mongo"
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 💻 Usage

1. **Adding a Password**: 
   - Fill in the website URL, username, and password fields
   - Click "Save Password" to store the credentials

2. **Viewing Passwords**: 
   - All saved passwords are displayed in a table format
   - Passwords are masked for security

3. **Copying Credentials**: 
   - Click the copy icon next to any field to copy it to your clipboard
   - Receive instant toast notifications for successful copies

4. **Editing Passwords**: 
   - Click the edit icon to modify existing password entries
   - The form will be populated with current values for editing

5. **Deleting Passwords**: 
   - Click the delete icon to remove password entries
   - Confirm deletion in the popup dialog

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

- **GET /** - Retrieve all stored passwords
- **POST /** - Add a new password entry
- **DELETE /** - Delete a password entry by ID

## 🗄️ Database Schema

The application uses MongoDB with the following password document structure:

```javascript
{
  _id: ObjectId,
  id: String (UUID),
  site: String,
  username: String,
  password: String
}
```

## 🎨 Styling

PassOP uses TailwindCSS for styling with a green color scheme:
- Primary green: `#22c55e` (green-500)
- Background: Light green gradient with dot pattern
- Cards and components use various shades of green for consistency

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Security Notes

- Passwords are stored in plain text in MongoDB (consider encryption for production use)
- The application runs on localhost for development
- Implement HTTPS and proper authentication for production deployment

## 🚀 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `node server.js` - Start the server
- Use `nodemon` for development with auto-restart

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🛡️ Security Considerations for Production

Before deploying to production, consider:
- Implementing password encryption
- Adding user authentication
- Using HTTPS
- Implementing rate limiting
- Adding input validation and sanitization
- Using environment variables for sensitive data

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React, Express.js, and MongoDB**

