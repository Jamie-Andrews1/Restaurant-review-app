export interface Restaurant {
  id: string;
  imagePath: string;
  name: string;
  location: string;
}
const Api: string = import.meta.env.VITE_API;

export type Restaurants = Awaited<ReturnType<typeof GetAll>>;

export async function GetAll() {
  try {
    const res = await fetch(`${Api}/restaurants`);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}
