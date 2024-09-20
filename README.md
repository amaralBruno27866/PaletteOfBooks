## How to Run the Project

### Prerequisites:
- **Node.js** (minimum version 14.x)
- **PostgreSQL** installed and configured (with a database created for the project)
- **Git** installed for cloning the repository

### Installation Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amaralBruno27866/PaletteOfBooks.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd PaletteOfBooks
   ```

3. **Install project dependencies**:
   ```bash
   npm install
   ```

4. **Set up the PostgreSQL database**:
   - Create a PostgreSQL database using your preferred method.
   - Update the `.env` file with your PostgreSQL credentials (database name, username, password, and host).

5. **Run the database migrations**:
   This will create the necessary tables for the project.
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Start the backend server**:
   ```bash
   npm run dev
   ```

7. **Access the application**:
   Open your browser and go to:
   ```
   http://localhost:3000/
   ```

Now you can begin using **PaletteOfBooks** by adding, filtering, and exporting book data.

---
