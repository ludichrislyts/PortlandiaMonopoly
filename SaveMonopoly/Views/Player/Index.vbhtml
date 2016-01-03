@Code
    ViewData("Title") = "Index"
End Code

<h2>Login</h2>
<div class="container">
    <h3>Enter your login info:</h3>
    <div class="form-group">
        <form class="form-control" action="/login">
            <label for="player-name">Name:</label>
            <input type="text" value="player" id="player-name" />
            <label for="player-password">Password:</label>
            <input type="text" value="password" id="player-password" />
            <button type="submit" class="btn btn-lg btn-primary">Find Your Games!</button>
        </form>
    </div>
</div>