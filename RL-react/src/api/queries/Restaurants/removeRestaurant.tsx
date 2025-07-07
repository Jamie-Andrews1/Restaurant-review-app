const Api: string = import.meta.env.VITE_API;

export async function Remove(id: string) {
  try {
    const res = await fetch(`${Api}/restaurants/${id}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      return res.status;
    }
  } catch (error) {
    throw error;
  }
}
