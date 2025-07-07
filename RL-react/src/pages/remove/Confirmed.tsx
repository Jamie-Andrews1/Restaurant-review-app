import { Form, useParams, useLoaderData, Link } from "react-router";
import styles from "./confirmed.module.css";

export function Confirmed() {
  const params = useParams();
  const data = useLoaderData();

  return (
    <div className={styles.confirm}>
      <h1>Remove</h1>
      <h2> Are you sure you want to Delete this?</h2>
      <h2>Restaurant</h2>
      <h2>{data?.name}</h2>
      <br></br>
      <Form method="post" navigate={false}>
        <input type="hidden" name="id" value={params.id} />
        <button className={styles.delBtn} type="submit">
          Confirmed
        </button>
      </Form>
      <br></br>
      <Link to={`/`}>Back to Main</Link>
    </div>
  );
}
