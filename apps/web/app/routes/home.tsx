import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authMutations } from "~/state/auth/query"

export default function HomeRoute() {
  const queryClient = useQueryClient()
  const signout = useMutation(authMutations.signout(queryClient))

  return (
    <div>
      <h1 className="text-3xl font-bold underline">home</h1>
      <button onClick={() => signout.mutate()}>sign out</button>
    </div>
  )
}
