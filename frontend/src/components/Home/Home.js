import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/api/posts');
            setPosts(res.data);
        };
        fetchPosts();
    }, []);

    const handleLike = async (postId) => {
        await axios.put(`/api/posts/like/${postId}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: [...post.likes, 'liked'] } : post));
    };

    const handleComment = async (e, postId) => {
        if (e.key === 'Enter') {
            const text = e.target.value;
            await axios.post(`/api/posts/comment/${postId}`, { text }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            e.target.value = '';
        }
    };

    return (
        <div>
            <h1>Home</h1>
            {posts.map(post => (
                <Post key={post._id} post={post} handleLike={handleLike} handleComment={(e) => handleComment(e, post._id)} />
            ))}
        </div>
    );
};

export default Home;
