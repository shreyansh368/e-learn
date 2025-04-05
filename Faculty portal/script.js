// Tab switching logic
const tabLinks = document.querySelectorAll("nav ul li a");
const tabContents = document.querySelectorAll(".tab-content");

tabLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    // Hide all tabs
    tabContents.forEach(content => content.classList.remove("active"));

    // Get the target tab
    const tabId = this.textContent.toLowerCase() + "Tab";
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
      targetTab.classList.add("active");
    }
  });
});

// Course form logic
document.getElementById("courseForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const lecture = document.getElementById("lecture").files[0];
  const video = document.getElementById("video").value;

  const courseList = document.getElementById("courseList");
  const listItem = document.createElement("li");

  let pdfName = lecture ? lecture.name : "No PDF uploaded";
  let videoLink = video ? `<a href="${video}" target="_blank">Watch Video</a>` : "No video provided";

  listItem.innerHTML = `
    <strong>${title}</strong><br>
    Lecture Notes: ${pdfName}<br>
    Video Lesson: ${videoLink}
  `;

  courseList.appendChild(listItem);

  this.reset();
});

// Show default tab
document.getElementById("dashboardTab").classList.add("active");
document.getElementById("assignmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("assignmentTitle").value;
  const file = document.getElementById("assignmentFile").files[0];
  const deadline = document.getElementById("deadline").value; 

  const assignmentList = document.getElementById("assignmentList");
  const listItem = document.createElement("li");

  let fileName = file ? file.name : "No file uploaded";
   
  listItem.innerHTML = `
    <strong>${title}</strong><br>
    File: ${fileName}<br>
    Deadline: ${deadline} 
  `;

  assignmentList.appendChild(listItem);

  this.reset();
});
// Search student by name or ID
document.getElementById("searchStudent").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const students = document.querySelectorAll("#studentList li");

  students.forEach(student => {
    const text = student.textContent.toLowerCase();
    student.style.display = text.includes(query) ? "block" : "none";
  });
});

// Handle grading and feedback save (mock only)
document.querySelectorAll(".saveBtn").forEach(button => {
  button.addEventListener("click", function () {
    const parent = this.parentElement;
    const name = parent.querySelector("strong").innerText;
    const marks = parent.querySelector(".gradeInput").value;
    const feedback = parent.querySelector(".feedbackInput").value;

    alert(`Saved for ${name}:\nMarks: ${marks}\nFeedback: ${feedback}`);
  });
});
document.getElementById("notificationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("notificationType").value;
  const message = document.getElementById("notificationMessage").value;

  const list = document.getElementById("notificationList");
  const item = document.createElement("li");
  item.innerHTML = `<strong>${type} Notification:</strong><br>${message}`;
  list.prepend(item); // Latest on top

  this.reset();
});
