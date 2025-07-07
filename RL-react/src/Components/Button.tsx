import { useNavigate } from "react-router";

export function Button({ term }: { term: string }) {
  const navigate = useNavigate();

  return (
    <button
      style={{ width: "fit-content", marginTop: "2rem", marginInline: "10ch" }}
      onClick={() => navigate(-1)}
    >
      {term}
    </button>
  );
}
