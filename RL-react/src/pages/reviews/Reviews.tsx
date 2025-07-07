import styles from "./reviews.module.css";
import { useLoaderData, Link, useLocation } from "react-router";
import { ReviewCard } from "../../Components/ReviewCard";
import { Button } from "../../Components/Button";

export interface Review {
  id: number;
  restaurantId: number;
  title: string;
  rating: number;
  comment: string;
  sentimentLabel: string;
  sentimentScore: number;
}

export function Reviews() {
  const data = useLoaderData();
  const location = useLocation();
  const create = location.pathname.replace("reviews", "create");
  return (
    <>
      <Button term={"Back"} />
      <div className={styles.reviews}>
        {data.length > 0 ? (
          data.map((review: Review) => (
            <ReviewCard review={review} key={review.id} />
          ))
        ) : (
          <div>
            <h1>No Reviews</h1>
            <Link to={`${create}`} viewTransition>
              Create The First
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
