// const loginBtn = document.querySelector("#loginBtn");

// const loginBtnHandler = async (e) => {
//     e.preventDefault();
//     document.location.replace("/login");
// }

const loginFormHandler = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email && password) {
        const response = await fetch("/api/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace("/");
        } 
        else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (e) => {
    e.preventDefault();
    const fname = document.querySelector("#fname").value.trim();
    const lname = document.querySelector("#lname").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (fname && lname && email && password) {
        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ fname, lname, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

// loginBtn.addEventListener("click", loginBtnHandler);
document.querySelector("#login").addEventListener("submit", loginFormHandler);
document.querySelector("#signup").addEventListener("submit", signupFormHandler);