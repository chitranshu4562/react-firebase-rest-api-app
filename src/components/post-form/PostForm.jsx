import {useState} from "react";

export default function PostForm({ children, onSubmit, title = '', description = '', imageUrl = '' }) {
    const [postForm, setPostForm] = useState({
        title: title,
        description: description,
        imageUrl: imageUrl
    })

    const handleInputChange = (event) => {
        setPostForm(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(postForm);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={postForm.title}
                        placeholder="Enter title"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        value={postForm.description}
                        placeholder="Enter description"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        id="imageUrl"
                        type="text"
                        name="imageUrl"
                        value={postForm.imageUrl}
                        placeholder="Enter image url"
                        className="form-control"
                        onChange={handleInputChange}
                    />
                </div>

                {children}
            </form>
        </>
    )
}
