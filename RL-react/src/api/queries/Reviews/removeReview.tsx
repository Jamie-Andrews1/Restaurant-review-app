const Api: string = import.meta.env.VITE_API;

export async function Remove(id: string, reviewId: string) {
  try {
    const res = await fetch(`${Api}/restaurants/${id}/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      return res.status;
    }
  } catch (error) {
    throw error;
  }
}
