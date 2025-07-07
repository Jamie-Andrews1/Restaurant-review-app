import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { createReview } from "../../../api/queries/Reviews/createReviews";

export async function reviewAction({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  try {
    const id = data.get("id");
    const title = String(data.get("title"));
    const comment = String(data.get("comment"));
    const rating = String(data.get("rating"));

    const ratingValue = parseFloat(rating);

    if (
      typeof id === "string" &&
      typeof title === "string" &&
      typeof comment === "string"
    ) {
      const status = await createReview(id, {
        title: title,
        comment: comment,
        rating: ratingValue,
      });
      if (status === 201) return redirect("/");
    }
  } catch (error) {
    console.error(error);
  }
}
