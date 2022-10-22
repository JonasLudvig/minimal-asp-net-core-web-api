// Login. Searches database per user ID input. Extends menu with new functions if user is found
function login() {
    const userId = document.getElementById("user-login").value;
    fetch("/users")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === userId) {
                    document.getElementById("nav-browse").className = "visible";
                    document.getElementById("nav-user-items").className = "visible";
                    document.getElementById("nav-user-profile").className = "visible";
                    document.getElementById("login-status-label").innerText = "";
                    document.getElementById("login-status").innerText = data[i].id;
                    document.getElementById("main-panel").innerHTML =
                        `<h3>Successfully logged in!</h3>
<p2 class="margin-top">Hello, <b>${data[i].attributeFirst}</b>. User features in menu above has now been made available.</p2>`;
                }
            }
        });
}

// Lists all details in database of logged in user, to be updated or deleted along with account
function userInfo() {
    const userId = document.getElementById("login-status").innerText;
    document.getElementById("user-info-list").innerHTML = "";
    fetch("/users")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === userId) {
                    const entry = document.createElement("li");

                    const entryId = document.createElement("p2");
                    const entryPassword = document.createElement("p2");
                    const entryAttributeFirst = document.createElement("p2");
                    const entryAttributeSecond = document.createElement("p2");
                    const entryAttributeThird = document.createElement("p2");

                    entryId.innerText = "User ID";
                    entryPassword.innerText = "User password";
                    entryAttributeFirst.innerText = "First attribute";
                    entryAttributeSecond.innerText = "Second attribute";
                    entryAttributeThird.innerText = "Third attribute";

                    const entryInputId = document.createElement("input");
                    entryInputId.setAttribute("type", "text");
                    entryInputId.setAttribute("id", `id-${data[i].id}`);
                    entryInputId.value = `${data[i].id}`;
                    const entryInputPassword = document.createElement("input");
                    entryInputPassword.setAttribute("type", "text");
                    entryInputPassword.setAttribute("id", `password-${data[i].id}`);
                    entryInputPassword.value = `${data[i].password}`;
                    const entryInputAttributeFirst = document.createElement("input");
                    entryInputAttributeFirst.setAttribute("type", "text");
                    entryInputAttributeFirst.setAttribute("id", `attribute-first-${data[i].id}`);
                    entryInputAttributeFirst.value = `${data[i].attributeFirst}`;
                    const entryInputAttributeSecond = document.createElement("input");
                    entryInputAttributeSecond.setAttribute("type", "text");
                    entryInputAttributeSecond.setAttribute("id", `attribute-second-${data[i].id}`);
                    entryInputAttributeSecond.value = `${data[i].attributeSecond}`;
                    const entryInputAttributeThird = document.createElement("input");
                    entryInputAttributeThird.setAttribute("type", "text");
                    entryInputAttributeThird.setAttribute("id", `attribute-third-${data[i].id}`);
                    entryInputAttributeThird.value = `${data[i].attributeThird}`;
                    const entryUpdateButton = document.createElement("button");
                    entryUpdateButton.className = "button yellow margin-slight-top";
                    entryUpdateButton.setAttribute("id", `update-button-${data[i].id}`);
                    entryUpdateButton.innerText = "Update values";
                    const entryDeleteButton = document.createElement("button");
                    entryDeleteButton.className = "button red margin-slight-top block";
                    entryDeleteButton.setAttribute("id", `delete-button-${data[i].id}`);
                    entryDeleteButton.innerText = "Delete account";

                    entry.appendChild(entryId);
                    entry.appendChild(entryInputId);
                    entry.appendChild(entryPassword);
                    entry.appendChild(entryInputPassword);
                    entry.appendChild(entryAttributeFirst);
                    entry.appendChild(entryInputAttributeFirst);
                    entry.appendChild(entryAttributeSecond);
                    entry.appendChild(entryInputAttributeSecond);
                    entry.appendChild(entryAttributeThird);
                    entry.appendChild(entryInputAttributeThird);
                    entry.appendChild(entryUpdateButton);
                    entry.appendChild(entryDeleteButton);

                    document.getElementById("user-info-list").appendChild(entry);


                // Update button
                    document.getElementById(`update-button-${data[i].id}`).onclick = function () {
                        const userUpdateInputData = {
                            id: document.getElementById(`id-${data[i].id}`).value,
                            password: document.getElementById(`password-${data[i].id}`).value,
                            attributeFirst: document.getElementById(`attribute-first-${data[i].id}`).value,
                            attributeSecond: document.getElementById(`attribute-second-${data[i].id}`).value,
                            attributeThird: document.getElementById(`attribute-third-${data[i].id}`).value
                        };
                        fetch(`/update-user`,
                            {
                                method: "PUT",
                                headers: {
                                    'Content-Type': "application/json"
                                },
                                body: JSON.stringify(userUpdateInputData)
                            });
                        alert("User updated.");
                    }

                    // Delete button
                    document.getElementById(`delete-button-${data[i].id}`).onclick = function () {
                        fetch(`/delete-user/${data[i].id}`,
                            {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': "application/json"
                                }
                            });
                        alert(`User deleted.`);
                    }
                }
            }
        });
};

// Lists bound items for logged in user
function outputUserItems() {
    const userId = document.getElementById("login-status").innerText;
    fetch(`/user-items/${userId}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const entry = document.createElement("li");

                const entryAttributeFirst = document.createElement("p2");
                const entryAttributeSecond = document.createElement("p2");
                const entryAttributeThird = document.createElement("p2");
                const entryAttributeForth = document.createElement("p2");

                entryAttributeFirst.innerText = `First attribute: ${data[i].attributeFirst}`;
                entryAttributeSecond.innerText = `Second attribute: ${data[i].attributeSecond}`;
                entryAttributeThird.innerText = `Third attribute: ${data[i].attributeThird}`;
                entryAttributeForth.innerText = `Forth attribute: ${data[i].attributeForth}`;

                entry.appendChild(entryAttributeFirst);
                entry.appendChild(entryAttributeSecond);
                entry.appendChild(entryAttributeThird);
                entry.appendChild(entryAttributeForth);

                const entryUnbindButton = document.createElement("button");
                entryUnbindButton.className = "button red margin-top";
                entryUnbindButton.setAttribute("id", `unbind-button-${data[i].id}`);
                entryUnbindButton.innerText = "Unbind item";

                entry.appendChild(entryUnbindButton);

                document.getElementById("item-list").appendChild(entry);

                // User item unbinding
                document.getElementById(`unbind-button-${data[i].id}`).onclick = function() {
                    fetch(`/unbind-user-item/${data[i].id}`,
                        {
                            method: "PUT",
                            headers: {
                                'Content-Type': "application/json"
                            },
                            body: JSON.stringify(userId)
                        });
                    alert(`Item with ID ${data[i].id} unbound.`);
                }
            }
        });
};

// Lists all items in database for logged in user, to be acquired and bound to user
function outputItemsUser() {
    document.getElementById("user-item-list").innerHTML = "";
    fetch("/items")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const entry = document.createElement("li");

                const entryAttributeFirst = document.createElement("p2");
                const entryAttributeSecond = document.createElement("p2");
                const entryAttributeThird = document.createElement("p2");
                const entryAttributeForth = document.createElement("p2");

                entryAttributeFirst.innerText = `First attribute: ${data[i].attributeFirst}`;
                entryAttributeSecond.innerText = `Second attribute: ${data[i].attributeSecond}`;
                entryAttributeThird.innerText = `Third attribute: ${data[i].attributeThird}`;
                entryAttributeForth.innerText = `Forth attribute: ${data[i].attributeForth}`;

                const bindToUserButton = document.createElement("button");
                bindToUserButton.className = "button green margin-top";
                bindToUserButton.setAttribute("type", "button");
                bindToUserButton.setAttribute("id", `bind-on-user-button-${data[i].id}`);
                bindToUserButton.innerText = "Bind item";

                entry.appendChild(entryAttributeFirst);
                entry.appendChild(entryAttributeSecond);
                entry.appendChild(entryAttributeThird);
                entry.appendChild(entryAttributeForth);
                entry.appendChild(bindToUserButton);
                
                document.getElementById("user-item-list").appendChild(entry);

                // Binds item on user
                document.getElementById(`bind-on-user-button-${data[i].id}`).onclick = function () {
                    const userId = document.getElementById("login-status").innerText;
                    const itemId = data[i].id;

                    fetch(`/bind-user-item/${itemId}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(userId)
                    })
                        // Support for future increments (user feedback and such)
                        .then(response => response.json())
                        .then(() => { });
                }
            }
        });
};

// Creates and stores new item in database
function postRequest() {
    const form = document.getElementById("item-form").elements;
    const item = {
        attributeFirst: form.namedItem("itemFirstAttribute").value,
        attributeSecond: form.namedItem("itemSecondAttribute").value,
        attributeThird: form.namedItem("itemThirdAttribute").value,
        attributeForth: form.namedItem("itemForthAttribute").value
    }
    fetch("/post-item",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(item)
        });
};

// Returns user details per ID
function userPerId() {
    const userId = document.getElementById("user-per-id").value;
    fetch(`/user/${userId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("user-header").innerHTML = "<h4>Returning user per ID</h4>";
            document.getElementById("user-per-id-list").innerHTML = `
<li>
<p2>User ID: ${data.id}</p2>
<p2>Password: ${data.password}</p2>
<p2>First attribute: ${data.attributeFirst}</p2>
<p2>Second attribute: ${data.attributeSecond}</p2>
<p2>Third attribute: ${data.attributeThird}</p2></li>`;
        });
}

// Returns item details per ID input
function returnItemById() {
    const requestedId = document.getElementById("get-item-per-id").value;
    fetch(`/item/${requestedId}`,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("user-header").innerHTML = "<h4>Returning item per ID</h4>";

            document.getElementById("item-per-id-list").innerHTML = `
<li>
<p2>Item ID: ${data.id}</p2>
<p2>First attribute: ${data.attributeFirst}</p2>
<p2>Second attribute: ${data.attributeSecond}</p2>
<p2>Third attribute: ${data.attributeThird}</p2>
<p2>Forth attribute: ${data.attributeForth}</p2></li>`;
        });
}