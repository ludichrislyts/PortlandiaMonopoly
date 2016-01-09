@ModelType SaveMonopoly.Player
@Code
    ViewData("Title") = "Details"
End Code

<h2>Details</h2>

<div>
    <h4>Player</h4>
    <hr />
    <dl class="dl-horizontal">
        <dt>
            @Html.DisplayNameFor(Function(model) model.name)
        </dt>

        <dd>
            @Html.DisplayFor(Function(model) model.name)
        </dd>

        <dt>
            @Html.DisplayNameFor(Function(model) model.password)
        </dt>

        <dd>
            @Html.DisplayFor(Function(model) model.password)
        </dd>

    </dl>
</div>

@For Each Item In Model.Games
    @<Button>Game: @Item.Game.Id</Button>
    @<br />
Next



<p>
    @Html.ActionLink("Edit", "Edit", New With {.id = Model.Id}) |
    @Html.ActionLink("Back to List", "Index")
</p>
