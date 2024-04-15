const loginBtn = document.querySelector("#loginBtn");
const loginBtnHandler = async (event) => {
    event.preventDefault();
    document.location.replace("/login")
}

const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email && password) {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if(response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
    const fname = document.querySelector("#first-name").value.trim();
    const lname = document.querySelector("#last-name").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (fname && lname && email && password) {
        const response = await fetch("/api/", {
            method: "POST",
            body: JSON.stringify({ fname, lname, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

loginBtn.addEventListener("click", loginBtnHandler);
document.querySelector("#login").addEventListener("submit", loginFormHandler);
document.querySelector("#signup").addEventListener("submit", signupFormHandler);