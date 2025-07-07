import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { Update } from "../../api/queries/Restaurants/updateRestaurant";

export async function updateAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const id = formData.get("id");
    const image = formData.get("image") as File;

    if (typeof id === "string" && image !== null) {
      const status = await Update(id, { formData });

      if (status === 204) return redirect("/");
    }
    throw new Response("Invalid restaurant ID", { status: 400 });
  } catch (error) {
    console.error(error);
  }
}
