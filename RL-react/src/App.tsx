import { ThemeProvider } from "next-themes";
import { GetAll } from "./api/queries/Restaurants";
import "./App.css";
import { Update } from "./pages/update/Update";
import { ReviewsLoader } from "./pages/reviews/reviewsLoader";
import { action } from "./pages/create/action";
import { Create } from "./pages/create/Create";
import { Restaurant } from "./pages/restaurant/Restaurant";
import { Confirmed } from "./pages/remove/Confirmed";
import { Root } from "./pages/Root";
import { confirmedAction } from "./pages/remove/confirmedAction";
import { createBrowserRouter, RouterProvider } from "react-router";
import { restaurantLoader } from "./pages/restaurant/restaurantLoader";
import { Reviews } from "./pages/reviews/Reviews";
import { updateAction } from "./pages/update/updateAction";
import { reviewAction } from "./pages/reviews/createReview/reviewAction";
import { CreateReview } from "./pages/reviews/createReview/CreateReview";
import { RemoveReview } from "./pages/reviews/removeReview/RemoveReview";
import { rReviewAction } from "./pages/reviews/removeReview/rReviewAction";
import { reviewLoader } from "./pages/reviews/getReview/reviewLoader";
import getReview from "./pages/reviews/getReview/getReview";
import { GetLeaderboard } from "./api/queries/Leaderboard/leaderboard";
import { Leaderboard } from "./pages/leaderboard/Leaderboard";
import { ErrorBoundary } from "./pages/Error";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      Component: Root,
      loader: GetAll,
      ErrorBoundary: ErrorBoundary,
    },
    {
      path: "/create",
      action: action,
      Component: Create,
    },
    {
      path: "/leaderboard",
      Component: Leaderboard,
      loader: GetLeaderboard,
    },
    {
      path: "/restaurant/:id",
      children: [
        { index: true, Component: Restaurant, loader: restaurantLoader },
        { path: "reviews", Component: Reviews, loader: ReviewsLoader },
        {
          path: "create",
          action: reviewAction,
          Component: CreateReview,
        },
        {
          path: "reviews/:reviewId",
          children: [
            {
              index: true,
              Component: getReview,
              loader: reviewLoader,
            },
            {
              path: "remove",
              Component: RemoveReview,
              action: rReviewAction,
            },
          ],
        },
      ],
    },
    {
      path: "/remove/:id",
      action: confirmedAction,
      Component: Confirmed,
      loader: restaurantLoader,
    },
    {
      path: "/update/:id",
      action: updateAction,
      Component: Update,
      loader: restaurantLoader,
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
