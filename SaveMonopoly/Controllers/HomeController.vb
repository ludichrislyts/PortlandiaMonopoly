Public Class HomeController
    Inherits System.Web.Mvc.Controller

    Sub Cheat()
        Dim db As New DatabaseContainer
        Dim Player = db.Players.FirstOrDefault(Function(x) x.name = "aaron")
        If Player Is Nothing Then
            Player = New Player With {.name = "aaron", .password = "1"}
            db.Players.Add(Player)

            Dim Game As New Game With {.json = ""}
            db.Games.Add(Game)
            Dim PG As New Game_Player With {.Player = Player, .Game = Game}
            db.Game_Player.Add(PG)


            Game.Game_Players.Add(PG)
            Player.Games.Add(PG)

            db.SaveChanges()
        End If
    End Sub




    Function Index() As ActionResult
        Cheat()

        Return View()
    End Function

    Function About() As ActionResult
        ViewData("Message") = "Your application description page."

        Return View()
    End Function

    Function Contact() As ActionResult
        ViewData("Message") = "Your contact page."

        Return View()
    End Function
End Class
