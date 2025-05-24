// On page load, render stored entries
window.onload = function () {
    showEntries();
};

// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const terms = document.getElementById("terms").checked;

        // Validate required fields
        if (!name || !email || !password || !dob || !terms) {
            alert("Please fill all fields and accept the terms.");
            return;
        }

        // Validate age
        if (!isAgeValid(dob)) {
            alert("Age must be between 18 and 55.");
            return;
        }

        // Store entry
        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTerms: terms
        };

        let entries = JSON.parse(localStorage.getItem("user-entries")) || [];
        entries.push(entry);
        localStorage.setItem("user-entries", JSON.stringify(entries));

        // Reset form
        form.reset();

        // Show entries
        showEntries();
    });
});

// Validate age from DOB
function isAgeValid(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18 && age - 1 <= 55;
    }

    return age >= 18 && age <= 55;
}

// Show entries in the table
function showEntries() {
    const entries = JSON.parse(localStorage.getItem("user-entries")) || [];
    const tableBody = entries.map(entry => {
        return `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.acceptedTerms}</td>
            </tr>
        `;
    }).join("");

    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th><th>Email</th><th>Password</th><th>DOB</th><th>Accepted Terms?</th>
                </tr>
            </thead>
            <tbody>
                ${tableBody}
            </tbody>
        </table>
    `;

    document.querySelector(".entries").innerHTML = `
        <h2>Entries</h2>
        ${tableHTML}
    `;
}
