import { Link, Form } from "react-router";
import styles from "../../create/create.module.css";
import { useParams } from "react-router";

export function CreateReview() {
  const { id } = useParams();

  return (
    <div className={styles.create}>
      <Link to="/">Home</Link>
      <h2>Create Review</h2>
      <Form method="post" navigate={false} className={styles.form}>
        <input type="hidden" name="id" value={id} />
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="comment">Comment</label>
        <input type="text" id="comment" name="comment" required />
        <label htmlFor="rating">Rating (1 - 5)</label>
        <input type="number" id="rating" name="rating" max="5" required />
        <button type="submit">Create Review</button>
      </Form>
    </div>
  );
}
