import React from 'react';
import Home from "./pages/Home";
import ToDoCreate from "./pages/ToDoCreate";
import SignIn from "./pages/SignIn";

export const viewMap = {
    home: <Home />,
    todo_create: <ToDoCreate />,
    sign_in: <SignIn />,
    notFound: <p>Not Found</p>,
};