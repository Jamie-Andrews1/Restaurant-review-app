import type { Review } from "../../../pages/reviews/Reviews";
const Api: string = import.meta.env.VITE_API;

type CreatedReview = Omit<
  Review,
  "id" | "sentimentLabel" | "sentimentScore" | "restaurantId"
>;

export async function createReview(id: string, review: CreatedReview) {
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    };

    const res = await fetch(`${Api}/restaurants/${id}/reviews`, params);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    return res.status;
  } catch (error) {
    throw error;
  }
}
