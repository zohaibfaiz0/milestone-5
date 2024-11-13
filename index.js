// Function to toggle the visibility of the Other Information section
function toggleOtherSection() {
    var otherSection = document.getElementById('toggleSection');
    if (otherSection) {
        otherSection.style.display = otherSection.style.display === 'none' ? 'block' : 'none';
    }
}

// Function to generate the resume content and display it on the page
function generateResume(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form values
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;  // Added age input field
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value || '';
    var summary = document.getElementById('summary').value || ''; // Added other information

    // Create the resume content as HTML to display on the page
    var resumeContent = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        ${skills ? `<h3>Skills</h3><p>${skills}</p>` : ''}
        ${summary ? `<h3>Other Information</h3><p>${summary}</p>` : ''}
    `;

    // Display resume content on the page
    var resumeContainer = document.getElementById('resumeOutput');
    if (resumeContainer) {
        resumeContainer.innerHTML = resumeContent;
    }

    // Show the download button
    var downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
        downloadButton.style.display = 'block'; // Show the download button
        downloadButton.addEventListener('click', function() {
            downloadResumeAsPDF(name, age, email, phone, education, experience, skills, summary);
        });
    }
}

// Function to generate the resume and download it as a PDF
function downloadResumeAsPDF(name, age, email, phone, education, experience, skills, summary) {
    // Create a PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFont("helvetica", "normal");

    doc.text("Resume", 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Age: ${age}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Phone: ${phone}`, 20, 60);

    doc.text("Education:", 20, 70);
    doc.text(education, 20, 80);

    doc.text("Experience:", 20, 100);
    doc.text(experience, 20, 110);

    if (skills) {
        doc.text("Skills:", 20, 130);
        doc.text(skills, 20, 140);
    }

    if (summary) {
        doc.text("Other Information:", 20, 160);
        doc.text(summary, 20, 170);
    }

    // Generate a unique filename based on the name
    var filename = `${name.replace(/\s+/g, '_')}_cv.pdf`;

    // Save the PDF
    doc.save(filename);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggleButton');
    var form = document.getElementById('resumeForm');
    
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleOtherSection); // Toggle the "Other Information" section
    }
    
    if (form) {
        form.addEventListener('submit', generateResume); // Handle the form submission to generate the resume
    }
});

// Function to make the resume editable
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var currentElement = element;
            var currentText = currentElement.textContent || "";
            // Replace with input field
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input = document.createElement('input');
                input.type = "text";
                input.value = currentText;
                input.classList.add("editing-input");
                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = "inline";
                    input.remove();
                });
                currentElement.style.display = "none";
                currentElement.parentNode.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
