@Code
    ViewData("Title") = "Index"
End Code
<h2>Login</h2>
<div class="container">
    <h3>Enter your login info:</h3>
    <div class="form-group">
        <form class="form-control" action="player/login">
            <label for="player">Name:</label>
            <input type="text" id="player-name" name="player" />
            <label for="player">Password:</label>
            <input type="text" id="player-password" name="password" />
            <button type="submit" class="btn btn-lg btn-primary">Find Your Games!</button>
        </form>
        <button></button>
    </div>
</div>