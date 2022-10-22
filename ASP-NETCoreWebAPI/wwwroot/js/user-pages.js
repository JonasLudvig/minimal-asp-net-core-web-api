// Landing page shared between non-logged in user and administrator
function landingPage() {
    document.getElementById("main-panel").innerHTML = `
<div id="login-page">
    <h3>Login or register to browse and shop for items</h3>

    <h1 class="margin-top">Login</h1>
    <form id="login-form">
        <p2 class="margin-slight-top">E-mail</p2>
        <input type="text" id="user-login" />
    </form>

    <button class="button green" onclick="login()">Login</button>

    <h1 class="margin-top">Register</h1>

    <form id="user-form" action="/postUser" method="POST">
        <p2 class="margin-slight-top">First attribute</p2>
        <input type="text" name="id" />
        <p2>Password</p2>
        <input type="text" name="password" />
        <p2>E-mail (user ID)</p2>
        <input type="email" name="attributeFirst" />
        <p2>Second attribute</p2>
        <input type="text" name="attributeSecond" />
        <p2>Third attribute</p2>
        <input type="text" name="attributeThird" />
    </form>

    <button class="button blue" id="post-user">Register</button>
</div>
`;
}

// Logged in user: Browse items
function browseItems() {
    document.getElementById("main-panel").innerHTML = `
<h3>Bind items to user</h3>
<p2 class="margin-top">Binding items creates <b>mutual relationships</b> within a <b><i>junction table</i></b> kept on the database.</p2>
<button class="button blue margin-top" onclick="outputItemsUser()">Browse items</button>
<ul id="user-item-list"></ul>`;
}

// Logged in user: Review and manage items
function boundItems() {
    document.getElementById("main-panel").innerHTML = `
<h3>Review and manage user items</h3>
<p2 class="margin-top">Items bound to users are not copies of objects and will remain consistent throughout the platform.</p2>
<button class="button blue margin-top" onclick="outputUserItems();">Return my items</button>
<ul id="item-list"></ol>`;
}

// Logged in user: Review and update/delete profile
function userProfile() {
    document.getElementById("main-panel").innerHTML = `
<h3>User profile</h1>
<button class="button blue margin-top" onclick="userInfo();">Review and update</button>
<ul id="user-info-list"></ol>`;
}