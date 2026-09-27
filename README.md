# University Research Opportunity Portal

A web-based Research Opportunity Portal developed for the FAST University CN assignment.

The system allows faculty members to create, view, update, close, and delete research opportunities through a REST API and a simple frontend.

## Technologies

- **Backend:** Python, Flask
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **API Testing:** Postman

## Project Structure

```text
Research-Opportunity-Portal/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
├── database/
│   ├── schema.sql
│   └── sample_data.sql
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── postman/
│   └── Research_Opportunity_Portal.postman_collection.json
│
├── .gitignore
├── LICENSE
└── README.md
```

## Features

- Create a research opportunity
- Retrieve all research opportunities
- Retrieve one research opportunity
- Update a research opportunity
- Change an opportunity from Open to Closed
- Delete a research opportunity
- Basic input validation
- 404 handling
- MySQL database storage
- Postman API testing

## Research Opportunity Fields

Each opportunity contains:

- Unique ID
- Research title
- Research description
- Research area
- Faculty member name
- Department
- Required skills
- Number of available positions
- Application deadline
- Status: Open or Closed

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/opportunities` | Create opportunity |
| GET | `/api/opportunities` | Get all opportunities |
| GET | `/api/opportunities/<id>` | Get one opportunity |
| PUT | `/api/opportunities/<id>` | Update opportunity |
| DELETE | `/api/opportunities/<id>` | Delete opportunity |

## HTTP Status Codes

- `200 OK`
- `201 Created`
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/Research-Opportunity-Portal.git
cd Research-Opportunity-Portal
```

### 2. Create the MySQL database

Open MySQL Workbench or MySQL command line and run:

```sql
SOURCE database/schema.sql;
```

To insert the three sample research opportunities:

```sql
SOURCE database/sample_data.sql;
```

### 3. Create a Python virtual environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 5. Configure database credentials

Copy:

```text
backend/.env.example
```

to:

```text
backend/.env
```

Then put your MySQL username and password in `.env`.

Example:

```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=research_portal
```

Do **not** upload `.env` to GitHub.

### 6. Run the backend

From the project root:

```bash
python backend/app.py
```

The API will run at:

```text
http://127.0.0.1:5000
```

### 7. Run the frontend

Open:

```text
frontend/index.html
```

in your browser.

The frontend communicates with the Flask REST API.

## Postman Testing

The `postman` folder contains an exported Postman collection.

It includes requests for:

1. Creating an opportunity
2. Retrieving all opportunities
3. Retrieving one opportunity
4. Updating an opportunity
5. Closing an opportunity
6. Deleting an opportunity
7. Testing `404 Not Found`
8. Testing invalid/missing data

## GitHub

Before submitting, replace:

```text
https://github.com/YOUR-USERNAME/Research-Opportunity-Portal
```

with your actual GitHub repository URL.

Make meaningful commits while developing the project.

Example:

```text
Initial project structure
Add MySQL database schema
Add CRUD REST API
Add frontend interface
Add Postman collection
Update README
```

## Security

Do not commit:

- MySQL passwords
- API keys
- `.env`
- Personal access tokens
- Other private credentials

## Assignment Submission

The final submission should contain:

- Backend source code
- Frontend source code
- Database schema/setup
- Postman collection
- README.md
- GitHub repository link
- One-minute demonstration video
