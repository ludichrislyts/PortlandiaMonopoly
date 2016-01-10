Imports System.Web.Mvc

Namespace Controllers
    Public Class GameController
        Inherits Controller

        Dim db As New DatabaseContainer

        ' GET: Game
        Function Index() As ActionResult
            Return View()
        End Function

        ' GET: Game/Details/5
        Function Details(ByVal id As Integer) As ActionResult
            Return View()
        End Function

        ' GET: Game/Create
        Function Create() As ActionResult
            Return View()
        End Function

        ' POST: Game/Create
        <HttpPost()>
        Function Create(ByVal collection As Game) As ActionResult
            Try
                ' TODO: Add insert logic here
                db.Games.Add(collection)
                db.SaveChanges()
                Return RedirectToAction("Index")
            Catch
                Return View()
            End Try
        End Function

        ' GET: Game/Edit/5
        Function Edit(ByVal id As Integer) As ActionResult
            Return View()
        End Function

        ' POST: Game/Edit/5
        <HttpPost()>
        Function Edit(ByVal id As Integer, ByVal collection As FormCollection) As ActionResult
            Try
                ' TODO: Add update logic here

                Return RedirectToAction("Index")
            Catch
                Return View()
            End Try
        End Function

        ' GET: Game/Delete/5
        Function Delete(ByVal id As Integer) As ActionResult
            Return View()
        End Function

        ' POST: Game/Delete/5
        <HttpPost()>
        Function Delete(ByVal id As Integer, ByVal collection As FormCollection) As ActionResult
            Try
                ' TODO: Add delete logic here

                Return RedirectToAction("Index")
            Catch
                Return View()
            End Try
        End Function
    End Class
End Namespace