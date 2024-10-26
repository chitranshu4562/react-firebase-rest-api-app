import PostForm from "../../../../components/post-form/PostForm.jsx";
import MuiModal from "../../../../components/mui-modal/MuiModal.jsx";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthDataContext} from "../../../../context/AuthDataContext.jsx";
import {BackdropLoaderContext} from "../../../../context/BackdropLoaderContext.jsx";
import {addNewPost} from "../../../../api.js";
import {successNotification} from "../../../../utils.js";
import {PostsContext} from "../../../../context/PostsContext.jsx";


export default function AddPost() {
    const { user } = useContext(AuthDataContext);
    const { reFetchPosts, setReFetchPosts } = useContext(PostsContext);
    const backdropLoaderContext = useContext(BackdropLoaderContext);
    const navigate = useNavigate();

    const navigateToPostsPage = () => {
        navigate('/posts');
    }

    const handleAddPost = (values) => {
        backdropLoaderContext.setShow(true);
        const postData = {
            ...values,
            uid: user.userId
        }
        addNewPost(postData).then(response => {
            backdropLoaderContext.setShow(false);
            successNotification('Post is created successfully');
            setReFetchPosts(!reFetchPosts);
            navigateToPostsPage();
        }).catch(error => {
            backdropLoaderContext.setShow(false);
            console.log(error);
        });
    }

    return (
        <>
            <MuiModal>
                <h4 className="text-center">Add Post</h4>
                <PostForm onSubmit={handleAddPost}>
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
                        >Add Post</Button>
                    </div>
                </PostForm>
            </MuiModal>
        </>
    )
}
