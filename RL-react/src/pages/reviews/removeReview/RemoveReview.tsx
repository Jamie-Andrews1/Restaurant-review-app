import { Form, useParams, Link } from "react-router";
import styles from "./remove.module.css";

export function RemoveReview() {
  const { id, reviewId } = useParams();

  return (
    <div className={styles.removeReview}>
      <h1>Remove Review</h1>

      <h2>Are you sure you want to Delete this Review?</h2>

      <Form method="post" navigate={false}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="reviewId" value={reviewId} />
        <button className={styles.delBtn} type="submit">
          Confirmed
        </button>
      </Form>
      <Link to={`/`}>Back to Main</Link>
    </div>
  );
}
