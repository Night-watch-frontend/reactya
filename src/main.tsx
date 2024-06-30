import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/home/component.tsx";
import { store } from "./Atomic/store/store.ts";
import { Provider } from "react-redux";
import { Movie } from "./Pages/movie/component.tsx";
import { Modal } from "./Molecules/modal/component.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "login",
        element: <Modal />,
      },
    ],
  },
  {
    path: "/movie/:id",
    element: <Movie />,
    children: [
      {
        path: "login",
        element: <Modal />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
