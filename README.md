# PaletteOfBooks

## About the Project

**PaletteOfBooks** is a book inventory management system. The project aims to allow users to add, filter, and export book data in an intuitive and responsive environment. The name reflects the idea that, just like a color palette offers various options, **PaletteOfBooks** provides a diverse collection of books in an easily navigable inventory.

## Features

- **Add Books:** Enables users to add new books to the inventory, with validation for fields such as ISBN, title, and author.
- **Filter Books:** A search and filtering system based on criteria like title, author, genre, and publication date.
- **Export Data:** Allows exporting inventory data in CSV or JSON format.
- **User-Friendly Interface:** A simple and user-friendly interface, designed to be responsive and functional across multiple devices.

## Technologies Used

### Backend:
- **Node.js** with **Express**
- **PostgreSQL** for relational data storage
- **Sequelize** (or JPA) as the ORM to simplify database interaction

### Frontend:
- **HTML5**, **CSS3**, and **JavaScript**
- **React.js** for a dynamic and modern interface

### Others:
- **PostgreSQL** as the relational database
- **Data Export:** Implementing CSV and JSON export functionality

## Database Structure

The system uses a main table called `Inventory` to store book information, with the following columns:

- `Entry ID` (primary key)
- `Title`
- `Author`
- `Genre`
- `Publication Date`
- `ISBN`

## How to Run the Project
Start by running the command:
npm install
This command will install all the dependencies and libraries that were used in the project.
Then run the command:
npm run dev
node server.js
These two commands will run both the system and connect to the database.

From there, simply access the address below in your browser
http://localhost:3000/

### Prerequisites:
- Node.js or Java (depending on the backend choice)
- PostgreSQL installed and configured

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/amaralBruno27866/PaletteOfBooks.git
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database and run the SQL script to create the necessary tables.

4. Start the server:
   ```bash
   npm start
   ```

### Frontend:
Access the interface at `localhost:3000` (or another configured port) and start adding, filtering, and exporting books!

## Documentation

Detailed documentation, including design decisions and challenges faced, will be included as the project progresses.

## Contribution

This project is part of a recruitment challenge. However, suggestions and improvements are welcome! Feel free to open a pull request or raise an issue.

---
