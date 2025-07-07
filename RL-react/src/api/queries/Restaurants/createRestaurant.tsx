export interface Restaurant {
  formData: FormData;
}
const Api: string = import.meta.env.VITE_API;

export async function createRestaurant(restaurant: Restaurant) {
  try {
    const params = {
      method: "POST",
      body: restaurant.formData,
    };

    const res = await fetch(`${Api}/restaurants`, params);

    if (!res.ok) {
      throw Error(`Response status: ${res.status}`);
    }

    return res.status;
  } catch (error) {
    throw error;
  }
}
