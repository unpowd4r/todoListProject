import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2"
import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi"
import { Todolist } from "./Todolist/Todolist"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
