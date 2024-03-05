import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    
    "content": string,
    "title": string,
    "id": string,
    "author": {
        "name": string
    }
}


export const useBlog = ({id}: {id:string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>({ 
        content: "",
        title: "",
        id: "",
        author: {
            name: ""
        }
    })

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                const responseData = response.data;
                const updatedBlog: Blog = {
                    id: responseData.id,
                    title: responseData.title,
                    content: responseData.content,
                    author: {
                        name: responseData.author?.name || "Unknown Author"
                    }
                };
                setBlog(updatedBlog);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blog:", error);
                setLoading(false);
            });
    }, [id]);
    return { loading, blog}}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then( response => {
                setBlogs(response.data.posts)
                setLoading(false)
            })
    }, [])



return { loading, blogs}}