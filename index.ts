// Function to toggle the visibility of the Skills section
function toggleSkillsSection(): void {
    const skillsSection = document.getElementById('toggleSection');
    if (skillsSection) {
        skillsSection.style.display = skillsSection.style.display === 'none' ? 'block' : 'none';
    }
}

// Function to generate the resume and display it
function generateResume(event: Event): void {
    event.preventDefault(); // Prevent the default form submission
    
    // Retrieve form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement)?.value || '';
    const usernameElement = document.getElementById('username') as HTMLInputElement;

    // Generate resume output
    const resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong><span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong><span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
        <h3>Education</h3>
        <p><span id="edit-education" class="editable">${education}</span></p>
        <h3>Experience</h3>
        <p><span id="edit-experience" class="editable">${experience}</span></p>
        ${skills ? `<h3>Skills</h3><p><span id="edit-skills" class="editable">${skills}</span></p>` : ''}
    `;

    // Handle the username and generate a unique file name
    const username = usernameElement.value;
    const uniquePath = `${username.replace(/\s+/g,'_')}_cv.html`;

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:text/html;charset=utf-8,` + encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = "Download your resume";

    // Display resume output and append the download link
    const resumeContainer = document.getElementById('resumeOutput');
    if (resumeContainer) {
        resumeContainer.innerHTML = resumeOutput;
        resumeContainer.appendChild(downloadLink);
        makeEditable();
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const form = document.getElementById('resumeForm');
    
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSkillsSection);
    }
    
    if (form) {
        form.addEventListener('submit', generateResume);
    }
});

// Function to make the resume editable
function makeEditable(): void {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentText = currentElement.textContent || "";

            // Replace with input field
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = "text";
                input.value = currentText;
                input.classList.add("editing-input");

                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = "inline";
                    input.remove();
                });

                currentElement.style.display = "none";
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
