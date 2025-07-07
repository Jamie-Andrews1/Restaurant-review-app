import { Form, Link } from "react-router";
import styles from "./update.module.css";
import { useLoaderData } from "react-router";

export function Update({}) {
  const data = useLoaderData();

  return (
    <div className={styles.update}>
      <Link to="/">Home</Link>
      <h2>Update Form</h2>
      <Form
        method="post"
        encType="multipart/form-data"
        navigate={false}
        className={styles.form}
      >
        <input type="hidden" name="id" value={data.id} />
        <label htmlFor="image">Image</label>
        <input type="file" name="image" />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={data.name} />
        <label htmlFor="location">Location</label>
        <input type="text" name="location" defaultValue={data.location} />
        <button type="submit">Update restaurant</button>
      </Form>
    </div>
  );
}
