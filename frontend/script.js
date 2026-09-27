const API_URL = "http://127.0.0.1:5000/api/opportunities";

function formatDate(date) {
const d = new Date(date);


return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
});


}

function formatDateForInput(date) {
const d = new Date(date);


const year = d.getFullYear();
const month = String(d.getMonth() + 1).padStart(2, "0");
const day = String(d.getDate()).padStart(2, "0");

return `${year}-${month}-${day}`;


}

async function loadOpportunities() {
try {
const response = await fetch(API_URL);
const data = await response.json();


    const container = document.getElementById("opportunities");
    container.innerHTML = "";

    if (!response.ok) {
        showMessage(data.error);
        return;
    }

    if (data.length === 0) {
        container.innerHTML = "<p>No research opportunities available.</p>";
        return;
    }

    data.forEach(opportunity => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${opportunity.research_title}</h3>
            <p><b>Area:</b> ${opportunity.research_area}</p>
            <p><b>Faculty:</b> ${opportunity.faculty_name}</p>
            <p><b>Department:</b> ${opportunity.department}</p>
            <p><b>Skills:</b> ${opportunity.required_skills}</p>
            <p><b>Positions:</b> ${opportunity.available_positions}</p>
            <p><b>Deadline:</b> ${formatDate(opportunity.application_deadline)}</p>
            <p><b>Status:</b>
                <span class="${opportunity.status.toLowerCase()}">
                    ${opportunity.status}
                </span>
            </p>
            <p>${opportunity.research_description}</p>

            <button onclick="editOpportunity(${opportunity.id})">Update</button>
            <button onclick="closeOpportunity(${opportunity.id})">Close</button>
            <button onclick="deleteOpportunity(${opportunity.id})">Delete</button>
            <button onclick="viewOpportunity(${opportunity.id})">View Details</button>
        `;

        container.appendChild(card);
    });
} catch (error) {
    showMessage("Could not connect to the backend server.");
}


}

function getFormData() {
return {
research_title: document.getElementById("research-title").value,
research_description: document.getElementById("research-description").value,
research_area: document.getElementById("research-area").value,
faculty_name: document.getElementById("faculty-name").value,
department: document.getElementById("department").value,
required_skills: document.getElementById("required-skills").value,
available_positions: document.getElementById("available-positions").value,
application_deadline: document.getElementById("application-deadline").value,
status: document.getElementById("status").value
};
}

async function saveOpportunity() {
const id = document.getElementById("opportunity-id").value;
const data = getFormData();


try {
    const response = await fetch(
        id ? `${API_URL}/${id}` : API_URL,
        {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    showMessage(result.message || result.error);

    if (response.ok) {
        clearForm();
        loadOpportunities();
    }
} catch (error) {
    showMessage("Could not connect to the backend server.");
}


}

async function viewOpportunity(id) {
const response = await fetch(`${API_URL}/${id}`);
const data = await response.json();


if (!response.ok) {
    showMessage(data.error);
    return;
}

alert(
    "Title: " + data.research_title +
    "\n\nDescription: " + data.research_description +
    "\n\nArea: " + data.research_area +
    "\n\nFaculty: " + data.faculty_name +
    "\n\nDepartment: " + data.department +
    "\n\nSkills: " + data.required_skills +
    "\n\nPositions: " + data.available_positions +
    "\n\nDeadline: " + formatDate(data.application_deadline) +
    "\n\nStatus: " + data.status
);


}

async function editOpportunity(id) {
const response = await fetch(`${API_URL}/${id}`);
const data = await response.json();


if (!response.ok) {
    showMessage(data.error);
    return;
}

document.getElementById("opportunity-id").value = data.id;
document.getElementById("research-title").value = data.research_title;
document.getElementById("research-description").value = data.research_description;
document.getElementById("research-area").value = data.research_area;
document.getElementById("faculty-name").value = data.faculty_name;
document.getElementById("department").value = data.department;
document.getElementById("required-skills").value = data.required_skills;
document.getElementById("available-positions").value = data.available_positions;
document.getElementById("application-deadline").value =
    formatDateForInput(data.application_deadline);
document.getElementById("status").value = data.status;

document.getElementById("form-title").innerText =
    "Update Research Opportunity";

window.scrollTo(0, 0);


}

async function closeOpportunity(id) {
const response = await fetch(`${API_URL}/${id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
status: "Closed"
})
});


const data = await response.json();

showMessage(data.message || data.error);

if (response.ok) {
    loadOpportunities();
}


}

async function deleteOpportunity(id) {
if (!confirm("Are you sure you want to delete this opportunity?")) {
return;
}


const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
});

const data = await response.json();

showMessage(data.message || data.error);

if (response.ok) {
    loadOpportunities();
}


}

function clearForm() {
document.getElementById("opportunity-id").value = "";
document.getElementById("research-title").value = "";
document.getElementById("research-description").value = "";
document.getElementById("research-area").value = "";
document.getElementById("faculty-name").value = "";
document.getElementById("department").value = "";
document.getElementById("required-skills").value = "";
document.getElementById("available-positions").value = "";
document.getElementById("application-deadline").value = "";
document.getElementById("status").value = "Open";


document.getElementById("form-title").innerText =
    "Create Research Opportunity";


}

function showMessage(message) {
document.getElementById("message").innerText = message;
}

loadOpportunities();
