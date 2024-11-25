import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import { AddItemForm } from "common/components"
import { useAppSelector } from "common/hooks"
import { Path } from "common/router"
import { useAddTodolistsMutation } from "features/todolists/api/todolistsApi"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "../features/auth/model/authSlice"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"

export const Main = () => {
  const [addTodolist] = useAddTodolistsMutation()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodolistCallBack = (title: string) => {
    addTodolist(title)
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolistCallBack} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
