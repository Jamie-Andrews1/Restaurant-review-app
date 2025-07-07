import { Get, type Review } from "../../../api/queries/Reviews/getReview";
import { type LoaderFunctionArgs } from "react-router";

export async function reviewLoader({
  params,
}: LoaderFunctionArgs): Promise<Review> {
  const { id, reviewId } = params;

  if (!id || !reviewId) {
    throw new Response("Invalid restaurant ID", { status: 400 });
  }
  const data = await Get(id, reviewId);

  if (!data) throw new Response("Request Invalid", { status: 404 });

  return data;
}
