let students = [
	{id:1,name:"Prayas Jena",email:"prayas@testmail.com"},
	{id:1,name:"Ram Sen",email:"ram@testmail.com"}
];
let faculty = [
	{id:1,name:"Dr. Robert",email:"robert@testmail.com"},
	{id:1,name:"Dr. Jame",email:"jame@testmail.com"}
];
function renderTable(data, tableId){
	let tableBody = document.querySelector(`#${tableId} tbody`);
	tableBody.innerHTML='';
	data.forEach(user => {
		let row = document.createElement('tr');
		row.innerHTML=`
		<td>${user.id}</td>
		<td>${user.name}</td>
		<td>${user.email}</td>
		<td class="action-btns"><button onclick="editUser(${user.id},'${tableId}')">Edit</button> 
		<button class="delete" onclick="deleteUser(${user.id},'${tableId}')" style="margin-left:10px;">Delete</button>
		</td>
		`;
		tableBody.appendChild(row);
	}
	);
}
	
function addUser(userType){
	let userName = prompt("Enter the name of the new ${userType};");
	let userEmail = prompt("Enter the email of the new ${userType};");
	let newUser = {
		id: (userType === 'student' ? students : faculty).length+1,
		name:userName,
		email:userEmail
	};
	if(userType === 'student'){
		students.push(newUser);
		renderTable(students,'studentsTable');		
	}else{
		faculty.push(newUser);
		renderTable(faculty,'facultyTable');	
		
	}
	
}
function editUser(userId, tableId) {
    let data = tableId === 'studentsTable' ? students : faculty;
    let user = data.find(user => user.id === userId);
    if (user) {
        let newName = prompt('Edit name:', user.name);
        let newEmail = prompt('Edit email:', user.email);
        user.name = newName;
        user.email = newEmail;
        renderTable(tableId === 'studentsTable' ? students : faculty, tableId);
    }
}

// Delete User Function
function deleteUser(userId, tableId) {
    let data = tableId === 'studentsTable' ? students : faculty;
    let index = data.findIndex(user => user.id === userId);
    if (index !== -1) {
        data.splice(index, 1);
        renderTable(data, tableId);
    }
}

// Open the "Add Faculty" form modal
function openAddFacultyForm() {
    document.getElementById("addFacultyModal").style.display = "block";
}

// Close the "Add Faculty" form modal
function closeAddFacultyForm() {
    document.getElementById("addFacultyModal").style.display = "none";
}

if (document.getElementById('facultyTable')) {
    // Function to add new faculty from the form modal
    document.getElementById('addFacultyForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission (page reload)

        let name = document.getElementById('facultyName').value;
        let email = document.getElementById('facultyEmail').value;

        // Add new faculty
        let newFaculty = {
            id: faculty.length + 1,
            name: name,
            email: email
        };

        faculty.push(newFaculty);

        // Render the updated faculty table
        renderTable(faculty, 'facultyTable');

        // Close the modal
        closeAddFacultyForm();
    });
}

// Open the "Add Student" form modal
function openAddStudentForm() {
    document.getElementById("addStudentModal").style.display = "block";
}

// Close the "Add Student" form modal
function closeAddStudentForm() {
    document.getElementById("addStudentModal").style.display = "none";
}

// Function to add new student from the form modal
if (document.getElementById('studentsTable')) {
    document.getElementById('addStudentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission (page reload)

        let name = document.getElementById('studentName').value;
        let email = document.getElementById('studentEmail').value;

        // Add new student
        let newStudent = {
            id: students.length + 1,
            name: name,
            email: email
        };

        students.push(newStudent);

        // Render the updated student table
        renderTable(students, 'studentsTable');

        // Close the modal
        closeAddStudentForm();
    });
}

// Initialize render on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check the current page and render the corresponding table
    if (document.getElementById('studentsTable')) {
        renderTable(students, 'studentsTable');
    }
	if (document.getElementById('facultyTable')) {
        renderTable(students, 'facultyTable');
    }
	
});

// Sample courses data
if (document.getElementById('courseTable')) {
    let courses = [
        { id: 1, name: 'Introduction to Programming', instructor: 'Dr. Smith' },
        { id: 2, name: 'Web Development', instructor: 'Prof. Johnson' }
    ];

    // Function to render the course table
    function renderCourseTable() {
        const tableBody = document.querySelector('#courseTable tbody');
        tableBody.innerHTML = ''; // Clear any existing rows

        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.instructor}</td>
                <td class="action-btns">
                    <button onclick="editCourse(${course.id})">Edit</button>
                    <button class="delete" onclick="deleteCourse(${course.id})" style="margin-left: 10px;">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
function openCourseForm(courseId = null) {
    const modal = document.getElementById('courseModal');
    const courseNameInput = document.getElementById('courseName');
    const instructorInput = document.getElementById('instructor');
    const submitBtn = document.getElementById('submitBtn');
    const modalTitle = document.getElementById('modalTitle');

    if (courseId) {
        // Edit existing course
        const course = courses.find(course => course.id === courseId);
        courseNameInput.value = course.name;
        instructorInput.value = course.instructor;
        submitBtn.textContent = 'Update Course';
        modalTitle.textContent = 'Edit Course';
        submitBtn.onclick = function(event) {
            event.preventDefault();
            updateCourse(courseId);
        };
    } else {
        // Add new course
        courseNameInput.value = '';
        instructorInput.value = '';
        submitBtn.textContent = 'Add Course';
        modalTitle.textContent = 'Add New Course';
        submitBtn.onclick = function(event) {
            event.preventDefault();
            addCourse();
        };
    }

    modal.style.display = 'block';
}
function closeCourseForm() {
    document.getElementById('courseModal').style.display = 'none';
}

// Add new course
function addCourse() {
    const courseName = document.getElementById('courseName').value;
    const instructor = document.getElementById('instructor').value;

    const newCourse = {
        id: courses.length + 1, // Simple ID assignment
        name: courseName,
        instructor: instructor
    };

    courses.push(newCourse);
    renderCourseTable();
    closeCourseForm();
}

function editCourse(courseId) {
    const course = courses.find(course => course.id === courseId);

    if (course) {
        // Populate the modal with the course's current data
        document.getElementById('courseName').value = course.name;
        document.getElementById('instructor').value = course.instructor;

        // Change the modal's title and button text
        document.getElementById('modalTitle').textContent = 'Edit Course';
        document.getElementById('submitBtn').textContent = 'Update Course';

        // Show the modal
        document.getElementById('courseModal').style.display = 'block';

        // Change the submit button's onclick handler to update the course
        document.getElementById('submitBtn').onclick = function(event) {
            event.preventDefault();
            updateCourse(courseId);
        };
    }
}
// Update course
function updateCourse(courseId) {
    const courseName = document.getElementById('courseName').value;
    const instructor = document.getElementById('instructor').value;

    const course = courses.find(course => course.id === courseId);
    if (course) {
        course.name = courseName;
        course.instructor = instructor;
        renderCourseTable();
        closeCourseForm();
    }
}

// Delete course
function deleteCourse(courseId) {
    const index = courses.findIndex(course => course.id === courseId);
    if (index !== -1) {
        courses.splice(index, 1);
        renderCourseTable();
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCourseTable);
	

}