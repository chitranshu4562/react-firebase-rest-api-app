import classes from "./Posts.module.css";
import Button from "@mui/material/Button";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import {getPosts} from "../../../api.js";
import {BackdropLoaderContext} from "../../../context/BackdropLoaderContext.jsx";
import Post from "../../../components/post/Post.jsx";
import {PostsContext} from "../../../context/PostsContext.jsx";

export default function PostsPage() {
    const { reFetchPosts, setReFetchPosts } = useContext(PostsContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const backdropLoaderContext = useContext(BackdropLoaderContext);

    const handleAddPost = () => {
        navigate('add-post');
    }

    const fetchAllPosts = () => {
        backdropLoaderContext.setShow(true);
        getPosts().then(response => {
            backdropLoaderContext.setShow(false);
            console.log(response);
            const temp = [];
            for (const key in response.data) {
                const obj = {
                    id: key,
                    ...response.data[key]
                }
                temp.push(obj);
            }
            setPosts(temp);
        }).catch(error => {
            backdropLoaderContext.setShow(false);
            console.log(error);
        });
    }

    useEffect(() => {
        fetchAllPosts();
    }, [reFetchPosts]);

    return (
        <>
            <Link to="add-post">
                <div className="d-flex justify-content-end mb-2">
                    <Button
                        variant="contained"
                        onClick={handleAddPost}
                    >+ Add Post</Button>
                </div>
            </Link>
            <Outlet/>
            <div className="d-flex gap-5 flex-wrap">
                {posts.length > 0 && posts.map(post => (
                    <Post post={post} key={post.id}/>
                ))}
            </div>
        </>
    )
}
