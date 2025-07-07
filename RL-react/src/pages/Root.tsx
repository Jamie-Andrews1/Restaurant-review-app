import { Link } from "react-router";
import { type Restaurant } from "../api/queries/Restaurants/getRestaurants";
import styles from "./page.module.css";
const Api: string = import.meta.env.VITE_API;

import { useLoaderData } from "react-router";
import { Layout } from "../Components/Layout";

export function Root() {
  const data = useLoaderData();

  return (
    <>
      <Layout>
        <div className={styles.homeWrapper}>
          <div className={styles.homeLinks}>
            <Link to="/create" viewTransition>
              Post Restaurant
            </Link>
            <Link to="/leaderboard" viewTransition>
              Leaderboard
            </Link>
          </div>
          <div className={styles.home}>
            {data &&
              data.map((restaurant: Restaurant, i: number) => (
                <div className={styles.restu} key={i}>
                  <img
                    src={`${Api}/${restaurant?.imagePath}`}
                    alt="restaurant"
                  />
                  <h3>{restaurant?.name}</h3>
                  <p>{restaurant?.location}</p>
                  <Link to={`/restaurant/${restaurant?.id}`} viewTransition>
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
