const Api: string = import.meta.env.VITE_API;

export type Reviews = Awaited<ReturnType<typeof GetReviews>>;

export async function GetReviews(id: string) {
  try {
    const res = await fetch(`${Api}/restaurants/${id}/reviews`);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}
