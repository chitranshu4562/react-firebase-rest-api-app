import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {editPost, getPost} from "../../../../api.js";
import {BackdropLoaderContext} from "../../../../context/BackdropLoaderContext.jsx";
import PostForm from "../../../../components/post-form/PostForm.jsx";
import Button from "@mui/material/Button";
import MuiModal from "../../../../components/mui-modal/MuiModal.jsx";
import {PostsContext} from "../../../../context/PostsContext.jsx";
import {successNotification} from "../../../../utils.js";

export default function EditPost() {
    const backdropLoaderContext = useContext(BackdropLoaderContext);
    const { reFetchPosts, setReFetchPosts } = useContext(PostsContext);
    const navigate = useNavigate();
    const { postId } = useParams();
    const [postData, setPostData] = useState(null);

    const fetchPost = () => {
        backdropLoaderContext.setShow(true);
        getPost(postId).then(response => {
            backdropLoaderContext.setShow(false);
            setPostData(response.data);
        }).catch(error => {
            backdropLoaderContext.setShow(false);
            console.log(error);
        })
    }

    const navigateToPostsPage = () => {
        navigate('/posts');
    }

    const handleEditPost = (postData) => {
        backdropLoaderContext.setShow(true);
        editPost(postId, postData).then(response => {
            backdropLoaderContext.setShow(false);
            setReFetchPosts(!reFetchPosts);
            successNotification('Post is edited successfully.')
            navigateToPostsPage();
        }).catch(error => {
            console.error(error);
            backdropLoaderContext.setShow(false);
        })
    }

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <>
            {postData && (
                <MuiModal>
                    <div>
                        <h4 className="text-center">Edit Post</h4>
                        <PostForm
                            title={postData.title}
                            description={postData.description}
                            imageUrl={postData.imageUrl}
                            onSubmit={handleEditPost}
                        >
                            <div className="d-flex justify-content-center gap-3">
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={navigateToPostsPage}
                                >Cancel</Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >Edit Post</Button>
                            </div>
                        </PostForm>
                    </div>
                </MuiModal>
            )}
        </>
    )
}
