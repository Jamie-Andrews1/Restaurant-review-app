const Api: string = import.meta.env.VITE_API;

export type Restaurant = Awaited<ReturnType<typeof Get>>;

export async function Get(id: string) {
  try {
    const res = await fetch(`${Api}/restaurants/${id}`);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
