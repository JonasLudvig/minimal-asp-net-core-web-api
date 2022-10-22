// Returns all items in database, to be updated or deleted
function outputItems() {
    document.getElementById("item-list").innerHTML = "";
    fetch("/items")
        .then(response => response.json())
        .then(data => {
            document.getElementById("items-header").innerHTML = `<h4>Returning ${data.length} item(s)</h4>`;
            for (let i = 0; i < data.length; i++) {
                const entry = document.createElement("li");
                const entryId = document.createElement("p2");
                const entryAttributeFirst = document.createElement("p2");
                const entryAttributeSecond = document.createElement("p2");
                const entryAttributeThird = document.createElement("p2");
                const entryAttributeForth = document.createElement("p2");

                entryId.innerText = `Item ID: ${data[i].id}`;
                entryAttributeFirst.innerText = "First attribute";
                entryAttributeSecond.innerText = "Second attribute";
                entryAttributeThird.innerText = "Third attribute";
                entryAttributeForth.innerText = "Forth attribute";

                const entryInputAttributeFirst = document.createElement("input");
                entryInputAttributeFirst.setAttribute("type", "text");
                entryInputAttributeFirst.setAttribute("id", `first-attribute-${data[i].id}`);
                entryInputAttributeFirst.value = data[i].attributeFirst;

                const entryInputAttributeSecond = document.createElement("input");
                entryInputAttributeSecond.setAttribute("type", "text");
                entryInputAttributeSecond.setAttribute("id", `second-attribute-${data[i].id}`);
                entryInputAttributeSecond.value = data[i].attributeSecond;

                const entryInputAttributeThird = document.createElement("input");
                entryInputAttributeThird.setAttribute("type", "text");
                entryInputAttributeThird.setAttribute("id", `third-attribute-${data[i].id}`);
                entryInputAttributeThird.value = data[i].attributeThird;

                const entryInputAttributeForth = document.createElement("input");
                entryInputAttributeForth.setAttribute("type", "text");
                entryInputAttributeForth.setAttribute("id", `forth-attribute-${data[i].id}`);
                entryInputAttributeForth.value = data[i].attributeForth;

                entryAttributeFirst.appendChild(entryInputAttributeFirst);
                entryAttributeSecond.appendChild(entryInputAttributeSecond);
                entryAttributeThird.appendChild(entryInputAttributeThird);
                entryAttributeForth.appendChild(entryInputAttributeForth);

                entry.appendChild(entryId);
                entry.appendChild(entryAttributeFirst);
                entry.appendChild(entryAttributeSecond);
                entry.appendChild(entryAttributeThird);
                entry.appendChild(entryAttributeForth);

                const entryUpdateButton = document.createElement("button");
                entryUpdateButton.className = "button yellow";
                entryUpdateButton.setAttribute("type", "button");
                entryUpdateButton.setAttribute("id", `update-button-${data[i].id}`);
                entryUpdateButton.innerText = "Update values";

                const entryDeleteButton = document.createElement("button");
                entryDeleteButton.className = "button red";
                entryUpdateButton.setAttribute("type", "button");
                entryDeleteButton.setAttribute("id", `delete-button-${data[i].id}`);
                entryDeleteButton.innerText = "Delete item";

                entry.appendChild(entryUpdateButton);
                entry.appendChild(entryDeleteButton);

                document.getElementById("item-list").appendChild(entry);

                document.getElementById(`update-button-${data[i].id}`).onclick = function () {
                    const itemUpdateInputData = {
                        id: data[i].id,
                        attributeFirst: document.getElementById(`first-attribute-${data[i].id}`).value,
                        attributeSecond: document.getElementById(`second-attribute-${data[i].id}`).value,
                        attributeThird: document.getElementById(`third-attribute-${data[i].id}`).value,
                        attributeForth: document.getElementById(`forth-attribute-${data[i].id}`).value
                    }

                    fetch("/update-item",
                        {
                            method: "PUT",
                            headers: {
                                'Content-Type': "application/json"
                            },
                            body: JSON.stringify(itemUpdateInputData)
                        });
                }

                document.getElementById(`delete-button-${data[i].id}`).onclick = function () {
                    fetch(`/delete-item/${data[i].id}`,
                        {
                            method: "DELETE",
                            headers: {
                                'Content-Type': "application/json"
                            }
                        });
                    alert(`Item with ID ${data[i].id} deleted.`);
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

// Returns item details per ID
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
            document.getElementById("item-per-id").innerHTML = `<h4>Details for item returned per ID</h4><p2>Item ID: ${data.id}</p2><p2>First attribute: ${data.attributeFirst}</p2><p2>Second attribute: ${data.attributeSecond}</p2><p2>Third attribute: ${data.attributeThird}</p2><p2>Forth attribute: ${data.attributeForth}`;
        });
}