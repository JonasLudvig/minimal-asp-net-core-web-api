// Creates and stores new user in database
document.getElementById("post-user").addEventListener("click", () => {
    const form = document.getElementById("user-form").elements;
    const user = {
        id: form.namedItem("id").value,
        password: form.namedItem("password").value,
        attributeFirst: form.namedItem("attributeFirst").value,
        attributeSecond: form.namedItem("attributeSecond").value,
        attributeThird: form.namedItem("attributeThird").value
    };

    fetch("/post-user",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        });
});

// Returns simplistic list of all users
document.getElementById("get-users").addEventListener("click",
    () => {
        returnUsers();
    });

// Returns all users in database, to be deleted but not updated
function returnUsers() {
    document.getElementById("user-list").innerHTML = "";
    fetch("/users")
        .then(response => response.json())
        .then(data => {
            document.getElementById("users-header").innerHTML = `<h4>Returning ${data.length} user(s)</h4>`;
            for (let i = 0; i < data.length; i++) {
                const entry = document.createElement("li");
                const entryId = document.createElement("p2");
                const entryPassword = document.createElement("p2");
                const entryAttributeFirst = document.createElement("p2");
                const entryAttributeSecond = document.createElement("p2");
                const entryAttributeThird = document.createElement("p2");

                entryId.innerText = `User ID: ${data[i].id}`;
                entryPassword.innerText = `Password: ${data[i].password}`;
                entryAttributeFirst.innerText = `First attribute: ${data[i].attributeFirst}`;
                entryAttributeSecond.innerText = `Second attribute: ${data[i].attributeSecond}`;
                entryAttributeThird.innerText = `Third attribute: ${data[i].attributeThird}`;

                entry.appendChild(entryId);
                entry.appendChild(entryPassword);
                entry.appendChild(entryAttributeFirst);
                entry.appendChild(entryAttributeSecond);
                entry.appendChild(entryAttributeThird);

                const entryDeleteButton = document.createElement("button");
                entryDeleteButton.className = "button red margin-top";
                entryDeleteButton.setAttribute("id", `delete-button-${data[i].id}`);
                entryDeleteButton.innerText = "Delete user";

                entry.appendChild(entryDeleteButton);

                document.getElementById("user-list").appendChild(entry);

                document.getElementById(`delete-button-${data[i].id}`).onclick = function () {
                    fetch(`/delete-user/${data[i].id}`,
                        {
                            method: "DELETE",
                            headers: {
                                'Content-Type': "application/json"
                            }
                        });
                    alert(`User with ID ${data[i].id} deleted.`);
                }
            }
        });
};