import { redirect } from "react-router";
import { Remove } from "../../api/queries/Restaurants/removeRestaurant";
import type { ActionFunctionArgs } from "react-router";

export async function confirmedAction({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  try {
    const id = data.get("id");

    if (typeof id !== "string") {
      throw new Response("Invalid restaurant ID", { status: 400 });
    }

    const status = await Remove(id);

    if (status === 204) return redirect("/");
  } catch (error) {
    console.error(error);
  }
}
