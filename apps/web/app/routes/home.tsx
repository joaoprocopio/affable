import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRevalidator } from "react-router"
import { authMutations } from "~/state/auth/query"

export default function HomeRoute() {
  const revalidator = useRevalidator()
  const queryClient = useQueryClient()
  const signout = useMutation(authMutations.signout(queryClient, revalidator.revalidate))

  return (
    <div>
      <h1 className="text-3xl font-bold underline">home</h1>
      <button onClick={() => signout.mutate()}>sign out</button>
    </div>
  )
}
