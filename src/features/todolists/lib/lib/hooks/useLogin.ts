import { selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "app/appSlice"
import { ResultCode } from "common/enums"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { useLoginMutation } from "features/auth/api/authAPI"
import { LoginArgs } from "features/auth/api/authAPI.types"
import { SubmitHandler, useForm } from "react-hook-form"

export const useLogin = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem("sn-token", res.data.data.token)
        }
      })
      .finally(() => {
        reset()
      })
  }

  return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register }
}
