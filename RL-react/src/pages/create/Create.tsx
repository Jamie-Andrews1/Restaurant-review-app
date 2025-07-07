import { Link, useFetcher } from "react-router";
import styles from "./create.module.css";

export function Create({}) {
  const fetcher = useFetcher();
  let errors = fetcher.data?.errors;

  return (
    <div className={styles.create}>
      <Link to="/">Home</Link>
      <h2>Create Form</h2>
      <fetcher.Form
        method="post"
        encType="multipart/form-data"
        className={styles.form}
      >
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          accept=".jpeg, .png,. gif, .webp"
          required
        />
        <span>
          {errors?.image ? (
            <em style={{ color: "red" }}>{errors.image}</em>
          ) : null}
        </span>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" minLength={2} required />
        <span>
          {errors?.name ? (
            <em style={{ color: "red" }}>{errors.name}</em>
          ) : null}
        </span>
        <label htmlFor="location">Location</label>
        <input type="text" name="location" minLength={3} required />
        <span>
          {errors?.location ? (
            <em style={{ color: "red" }}>{errors.location}</em>
          ) : null}
        </span>
        <button type="submit">Post restaurant</button>
      </fetcher.Form>
    </div>
  );
}
