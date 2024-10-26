import {createContext, useState} from "react";

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
    const [reFetchPosts, setReFetchPosts] = useState(false);

    return (
        <PostsContext.Provider value={{ reFetchPosts, setReFetchPosts }}>
            { children }
        </PostsContext.Provider>
    )
}

export { PostsContext, PostsProvider };
