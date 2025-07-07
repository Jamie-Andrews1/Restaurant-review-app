import styles from "./compStyles.module.css";
import { type Review } from "../pages/reviews/Reviews";
import { Stars } from "./svgs/Stars";
import { Link, useLocation } from "react-router";

interface Props {
  review: Review;
}

export function ReviewCard({ review }: Props) {
  const { title, rating, comment, sentimentLabel, sentimentScore } = review;

  const location = useLocation();
  const label = sentimentLabel;

  const starChoice = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starChoice.push(
        <Stars star={`${styles.star} ${styles.filled}`} key={i} />
      );
    } else {
      starChoice.push(
        <Stars star={`${styles.star} ${styles.empty}`} key={i} />
      );
    }
  }

  return (
    <div className={styles.card}>
      <Link to={`${location.pathname}/${review.id}`}>Review</Link>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.rating}>
        <span className={styles.ratingLabel}>Rating:</span>
        <div className={styles.stars}>{starChoice}</div>
      </div>
      <p className={styles.comment}>
        <span className={styles.commentLabel}>Comment:</span> {comment}
      </p>
      <div className={styles.sentimentContainer}>
        <div className={styles.sentiment}>
          <span className={styles.sentimentLabel}>Sentiment:</span>
          <span className={`${styles.sentimentBadge} ${styles[label]}`}>
            {sentimentLabel}
          </span>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>Score: </span>
          <span className={styles.scoreValue}>{sentimentScore}</span>
        </div>
      </div>
    </div>
  );
}
