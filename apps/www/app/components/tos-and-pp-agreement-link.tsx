import { Link } from "react-router"

// TODO: create the actual pages TOS and PP
export function TosAndPPAgreementLink() {
  return (
    <>
      By clicking continuing, you agree to our <Link to="#">Terms of Service</Link> and{" "}
      <Link to="#">Privacy Policy</Link>.
    </>
  )
}
