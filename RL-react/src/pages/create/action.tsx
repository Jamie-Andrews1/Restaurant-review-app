import { redirect, data } from "react-router";
import { createRestaurant } from "../../api/queries/Restaurants/createRestaurant";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const name = String(formData.get("name"));
    const location = String(formData.get("location"));
    const image = formData.get("image") as File;

    const errors = { name: "", location: "", image: "" };

    if (name.length < 3) {
      errors.name = "Name must be greater than 2 characters long!";
    }

    if (location.length < 3) {
      errors.location = "Location must be at least 3 characters long!";
    }

    if (image instanceof File) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(image.type)) {
        errors.image = "Image must be a JPEG, PNG, GIF, or WebP file";
      }
      const maxSize = 5 * 1024 * 1024;
      if (image.size > maxSize) {
        errors.image = "Image size must be less than 5MB";
      }
    }

    if (Object.values(errors).some((val) => val !== "")) {
      return data({ errors }, { status: 400 });
    } else {
      const status = await createRestaurant({
        formData,
      });
      if (status === 201) {
        return redirect("/");
      } else {
        return status;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
