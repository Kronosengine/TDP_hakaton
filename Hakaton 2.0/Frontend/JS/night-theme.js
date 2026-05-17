const checkbox = document.getElementById("checkbox");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    checkbox.checked = true;
}

checkbox.addEventListener("change", () => {

    if (checkbox.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }

});