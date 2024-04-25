import { useEffect } from "react"
import { persistor } from "../../store"
import { router } from "expo-router"

export default Reset = () => {
  useEffect(() => {
    persistor.flush().then(() => {
      return persistor.purge()
    })
  }, [])
}