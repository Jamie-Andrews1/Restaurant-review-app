const Api: string = import.meta.env.VITE_API;
import { type Restaurant } from "./getRestaurant";

export async function Update(id: string, restaurant: Restaurant) {
  try {
    const params = {
      method: "PUT",
      body: restaurant.formData,
    };

    const res = await fetch(`${Api}/restaurants/${id}`, params);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    return res.status;
  } catch (error) {
    throw error;
  }
}
