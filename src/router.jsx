import {createBrowserRouter, Navigate} from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import SignupPage from "./pages/authentication/SignupPage.jsx";
import {preventAuthPageAfterAuthentication} from "./pages/authentication/auth.js";
import {preventHomeWithoutAuthentication} from "./pages/home/home.js";
import PostsPage from "./pages/home/posts/PostsPage.jsx";
import AddPost from "./pages/home/posts/add-post/AddPost.jsx";
import {PostsProvider} from "./context/PostsContext.jsx";
import EditPost from "./pages/home/posts/edit-post/EditPost.jsx";

const router = createBrowserRouter([
    {
        path: '/', element: <HomePage/>, loader: preventHomeWithoutAuthentication, children: [
            {path: '', element: <Navigate to="posts"/>},
            {
                path: 'posts', element: (
                    <PostsProvider>
                        <PostsPage/>
                    </PostsProvider>
                ), children: [
                    {path: 'add-post', element: <AddPost/>},
                    {path: 'edit-post/:postId', element: <EditPost/>}
                ]
            }
        ]
    },
    {path: 'login', element: <LoginPage/>, loader: preventAuthPageAfterAuthentication},
    {path: 'sign-up', element: <SignupPage/>, loader: preventAuthPageAfterAuthentication}
]);

export default router;
