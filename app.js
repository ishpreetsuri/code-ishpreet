/* Faculty Management System — application logic
 * Author: Ishpreet Singh
 *
 * A lightweight CRUD app (Create, Read, Update, Delete) that stores
 * faculty records in the browser using localStorage, so data persists
 * between page refreshes without needing a backend server.
 */

// ---- Storage helpers -------------------------------------------------------
const STORAGE_KEY = "faculty.records";

/** Load all faculty records from localStorage. */
function loadFaculty() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/** Save the full list of faculty records back to localStorage. */
function saveFaculty(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ---- App state -------------------------------------------------------------
let faculty = loadFaculty();
let searchTerm = "";

// ---- DOM references --------------------------------------------------------
const form = document.getElementById("facultyForm");
const editId = document.getElementById("editId");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const tableBody = document.getElementById("facultyBody");
const emptyState = document.getElementById("emptyState");
const countLabel = document.getElementById("count");
const searchInput = document.getElementById("searchInput");

// ---- Rendering -------------------------------------------------------------
function render() {
  const filtered = faculty.filter((f) => {
    const haystack = `${f.name} ${f.department} ${f.designation} ${f.email}`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  });

  tableBody.innerHTML = "";

  filtered.forEach((f) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(f.name)}</td>
      <td>${escapeHtml(f.department)}</td>
      <td>${escapeHtml(f.designation) || "—"}</td>
      <td>${escapeHtml(f.email)}</td>
      <td>${escapeHtml(f.phone) || "—"}</td>
      <td>
        <div class="row-actions">
          <button class="icon-btn edit" data-edit="${f.id}">Edit</button>
          <button class="icon-btn delete" data-delete="${f.id}">Delete</button>
        </div>
      </td>`;
    tableBody.appendChild(tr);
  });

  // Empty-state + count
  emptyState.classList.toggle("hidden", filtered.length !== 0);
  const total = faculty.length;
  countLabel.textContent = `${total} ${total === 1 ? "faculty" : "faculty"}`;
}

/** Prevent HTML injection when displaying user input. */
function escapeHtml(str) {
  return (str || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

// ---- Form handling ---------------------------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const record = {
    id: editId.value || Date.now().toString(),
    name: document.getElementById("name").value.trim(),
    department: document.getElementById("department").value.trim(),
    designation: document.getElementById("designation").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
  };

  if (editId.value) {
    // Update existing record
    faculty = faculty.map((f) => (f.id === editId.value ? record : f));
  } else {
    // Add new record
    faculty.push(record);
  }

  saveFaculty(faculty);
  render();
  resetForm();
});

/** Switch the form back to "add" mode and clear inputs. */
function resetForm() {
  form.reset();
  editId.value = "";
  formTitle.textContent = "Add Faculty Member";
  submitBtn.textContent = "Add Faculty";
  cancelBtn.classList.add("hidden");
}

cancelBtn.addEventListener("click", resetForm);

// ---- Edit / Delete (event delegation) --------------------------------------
tableBody.addEventListener("click", (e) => {
  const editTarget = e.target.getAttribute("data-edit");
  const deleteTarget = e.target.getAttribute("data-delete");

  if (editTarget) {
    const f = faculty.find((x) => x.id === editTarget);
    if (!f) return;
    document.getElementById("name").value = f.name;
    document.getElementById("department").value = f.department;
    document.getElementById("designation").value = f.designation;
    document.getElementById("email").value = f.email;
    document.getElementById("phone").value = f.phone;
    editId.value = f.id;
    formTitle.textContent = "Edit Faculty Member";
    submitBtn.textContent = "Save Changes";
    cancelBtn.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (deleteTarget) {
    if (confirm("Delete this faculty member?")) {
      faculty = faculty.filter((x) => x.id !== deleteTarget);
      saveFaculty(faculty);
      render();
    }
  }
});

// ---- Search ----------------------------------------------------------------
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  render();
});

// ---- Seed sample data on first ever visit ----------------------------------
if (faculty.length === 0 && !localStorage.getItem("faculty.seeded")) {
  faculty = [
    { id: "1", name: "Dr. Harpreet Kaur", department: "Computer Science", designation: "Professor", email: "harpreet.kaur@gndu.edu", phone: "9876500001" },
    { id: "2", name: "Prof. Amandeep Singh", department: "Information Technology", designation: "Assistant Professor", email: "amandeep.singh@gndu.edu", phone: "9876500002" },
  ];
  saveFaculty(faculty);
  localStorage.setItem("faculty.seeded", "yes");
}

// ---- Initial paint ---------------------------------------------------------
render();
