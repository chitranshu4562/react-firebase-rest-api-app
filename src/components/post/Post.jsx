import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {BackdropLoaderContext} from "../../context/BackdropLoaderContext.jsx";
import {deletePost} from "../../api.js";
import {PostsContext} from "../../context/PostsContext.jsx";
import {AuthDataContext} from "../../context/AuthDataContext.jsx";

export default function Post({ post }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthDataContext);
    const backdropLoaderContext = useContext(BackdropLoaderContext);
    const { reFetchPosts, setReFetchPosts } = useContext(PostsContext);

    const editPost = () => {
        navigate(`edit-post/${post.id}`)
    }

    const deletePostData = () => {
        if (confirm('Are you really want to delete this post ?')) {
            backdropLoaderContext.setShow(true);
            deletePost(post.id).then(response => {
                backdropLoaderContext.setShow(false);
                setReFetchPosts(!reFetchPosts);
            }).catch(error => {
                backdropLoaderContext.setShow(false);
                console.error(error);
            })
        }
    }

    console.log('qwerty')

    return (
        <>
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top"
                     src={post.imageUrl}
                     alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                </div>
                <div className="d-flex justify-content-center gap-4 my-2">
                    <Button
                        variant="contained"
                        onClick={editPost}
                        disabled={user.userId !== post.uid}
                    >Edit</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deletePostData}
                        disabled={user.userId !== post.uid}
                    >Delete</Button>
                </div>
            </div>
        </>
    )
}
