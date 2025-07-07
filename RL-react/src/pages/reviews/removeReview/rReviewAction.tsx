import { redirect } from "react-router";
import { Remove } from "../../../api/queries/Reviews/removeReview";

import type { ActionFunctionArgs } from "react-router";

export async function rReviewAction({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  try {
    const id = data.get("id");
    const reviewId = data.get("reviewId");

    if (typeof id !== "string" || typeof reviewId !== "string") {
      throw new Response("Invalid restaurant ID", { status: 400 });
    }

    const status = await Remove(id, reviewId);
    console.log(status);
    if (status === 204) return redirect("/");
  } catch (error) {
    console.error(error);
  }
}
