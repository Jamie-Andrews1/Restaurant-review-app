import { GetReviews, type Reviews } from "../../api/queries/Reviews/getReviews";
import { type LoaderFunctionArgs } from "react-router";

export async function ReviewsLoader({
  params,
}: LoaderFunctionArgs): Promise<Reviews> {
  const { id } = params;

  if (!id) {
    throw new Response("Invalid restaurant ID", { status: 400 });
  }
  const data = await GetReviews(id);

  if (!data) throw new Response("Request Invalid", { status: 404 });

  return data;
}
