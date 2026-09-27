# University Research Opportunity Portal

A web-based Research Opportunity Portal developed for the FAST University CN assignment.

The system allows faculty members to create, view, update, close, and delete research opportunities through a REST API and a simple frontend interface.

## GitHub Repository

https://github.com/codewithhamza05/research-opportunity-portal

## Technologies

* **Backend:** Python, Flask
* **Database:** MySQL
* **Frontend:** HTML, CSS, JavaScript
* **API Testing:** Postman

## Project Structure

```text
Research-Opportunity-Portal/
│
├── backend/
│   └── app.py
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
├── README.md
└── SUBMISSION_CHECKLIST.md
```

## Features

* Create a research opportunity
* Retrieve all research opportunities
* Retrieve one research opportunity
* Update a research opportunity
* Change an opportunity from Open to Closed
* Delete a research opportunity
* Basic input validation
* 404 Not Found handling
* MySQL database storage
* Postman API testing
* Simple frontend interface

## Research Opportunity Fields

Each research opportunity contains:

* Unique ID
* Research title
* Research description
* Research area
* Faculty member name
* Department
* Required skills
* Number of available positions
* Application deadline
* Status: Open or Closed

## API Endpoints

| Method | Endpoint                  | Purpose                       |
| ------ | ------------------------- | ----------------------------- |
| POST   | `/api/opportunities`      | Create a research opportunity |
| GET    | `/api/opportunities`      | Retrieve all opportunities    |
| GET    | `/api/opportunities/<id>` | Retrieve one opportunity      |
| PUT    | `/api/opportunities/<id>` | Update an opportunity         |
| DELETE | `/api/opportunities/<id>` | Delete an opportunity         |

## HTTP Status Codes

The API uses the following status codes:

* `200 OK` — Successful request
* `201 Created` — Research opportunity created successfully
* `400 Bad Request` — Invalid or missing data
* `404 Not Found` — Research opportunity does not exist
* `500 Internal Server Error` — Server or database error

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/codewithhamza05/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Create the MySQL Database

Open MySQL Workbench or the MySQL command line.

Run the database schema:

```sql
SOURCE database/schema.sql;
```

To insert the sample research opportunities:

```sql
SOURCE database/sample_data.sql;
```

### 3. Create a Python Virtual Environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies

Install the required Python packages:

```bash
pip install -r backend/requirements.txt
```

### 5. Configure Database Credentials

Create a `.env` file inside the `backend` folder.

Example:

```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=research_portal
```

Do **not** upload `.env` to GitHub.

Database passwords and other private credentials must not be committed to the repository.

### 6. Run the Backend

From the project root:

```bash
python backend/app.py
```

The Flask API will run at:

```text
http://127.0.0.1:5000
```

### 7. Run the Frontend

Open:

```text
frontend/index.html
```

in a web browser.

The frontend communicates with the Flask REST API and retrieves data from the MySQL database.

## Postman Testing

The exported Postman collection is located in:

```text
postman/Research_Opportunity_Portal.postman_collection.json
```

The collection contains requests for the required API testing:

1. Create at least three research opportunities
2. Retrieve all research opportunities
3. Retrieve one research opportunity
4. Update an existing opportunity
5. Change an opportunity from Open to Closed
6. Delete an opportunity
7. Request the deleted opportunity to demonstrate `404 Not Found`
8. Send invalid or missing data to demonstrate `400 Bad Request`

## Git Commit History

Meaningful commits were made during development instead of uploading the entire project in a single commit.

The repository includes commits for:

* Backend REST API
* Database schema and sample data
* Frontend interface
* Postman API collection
* Project documentation
* GitHub repository link

## Security

The following private information must not be committed to GitHub:

* MySQL passwords
* API keys
* `.env` files
* Personal access tokens
* Other private credentials

The `.gitignore` file is included to prevent sensitive and unnecessary files from being committed.

## Assignment Submission

The final submission should contain:

* Backend source code
* Frontend source code
* Database schema/setup files
* Exported Postman collection
* `README.md`
* GitHub repository link
* One-minute demonstration video or video link

## GitHub Repository Link

https://github.com/codewithhamza05/research-opportunity-portal
