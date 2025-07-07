import { useRouteError } from "react-router";
import { Button } from "../Components/Button";
interface error {
  status?: string;
  message: string;
  stack: string;
}

export function ErrorBoundary() {
  const error = useRouteError() as error;

  return (
    <div
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error.status ? <h1>{error.status}</h1> : <h1>404 Not Found </h1>}
      <h2>{error.message}</h2>
      <Button term={"Go Back"} />
    </div>
  );
}
