import type { Leaderboard } from "../../api/queries/Leaderboard/leaderboard";
import { useNavigate, useLoaderData } from "react-router";
import styles from "./leaderboard.module.css";

export function Leaderboard() {
  const navigate = useNavigate();
  const data = useLoaderData();
  return (
    <div className={styles.leaderboard}>
      <h1>LeaderBoard</h1>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        Back
      </button>
      <ol className={styles.restu}>
        {data.length > 0 &&
          data.map((r: Leaderboard) => (
            <li key={r.id}>
              <p>{`${r?.restaurantName}`}</p>
              <span>{` Avg Rating: ${r.averageRating}`}</span>
              <span>{` Review Count: ${r.reviewCount}`}</span>
            </li>
          ))}
      </ol>
    </div>
  );
}
