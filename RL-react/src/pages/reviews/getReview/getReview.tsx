import { useLoaderData, useNavigate, Link, useLocation } from "react-router";
import styles from "./review.module.css";

export default function getReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = useLoaderData();
  return (
    <div className={styles.review}>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <h2>{data.title}</h2>
      <h3>{data.comment}</h3>
      <slot>{data.rating} Star rating</slot>
      <Link to={`${location.pathname}/remove`}>Delete</Link>
    </div>
  );
}
