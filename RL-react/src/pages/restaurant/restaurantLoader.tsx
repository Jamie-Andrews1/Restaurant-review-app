import {
  Get,
  type Restaurant,
} from "../../api/queries/Restaurants/getRestaurant";
import { type LoaderFunctionArgs } from "react-router";

export async function restaurantLoader({
  params,
}: LoaderFunctionArgs): Promise<Restaurant> {
  const { id } = params;

  if (!id) {
    throw new Response("Invalid restaurant ID", { status: 400 });
  }
  const data = await Get(id);

  if (!data) throw new Response("Request Invalid", { status: 404 });

  return data;
}
