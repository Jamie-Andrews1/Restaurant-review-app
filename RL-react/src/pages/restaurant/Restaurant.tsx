import styles from "./restaurant.module.css";
import { useLocation, useLoaderData, Link } from "react-router";
const Api: string = import.meta.env.VITE_API;

export function Restaurant() {
  const data = useLoaderData();
  const location = useLocation();
  return (
    <>
      <div className={styles.restaurant}>
        <Link to="/" viewTransition>
          Home
        </Link>
        <img src={`${Api}/${data.imagePath}`} />
        <h2>{data.name}</h2>
        <p>{data.location}</p>
        <div className={styles.navs}>
          <Link to={`/update/${data?.id}`} viewTransition>
            Update
          </Link>
          <Link to={`${location.pathname}/reviews`} viewTransition>
            Reviews
          </Link>
          <Link to={`${location.pathname}/create`} viewTransition>
            Create Review
          </Link>
          <Link to={`/remove/${data?.id}`} viewTransition>
            Delete
          </Link>
        </div>
      </div>
    </>
  );
}
