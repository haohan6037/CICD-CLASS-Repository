import React, {useEffect, useState} from 'react';

function ListPosts(props) {
    const[posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts').
        then(response =>response.json()).
        then(data=>setPosts((data)));
        }
    );
    return (
        <div>
            <h1>Posts</h1>
            <table border="1">
            {posts.map(post=><tr key={post.id}><td>{post.title}</td><td>{post.body}</td></tr>)}
                </table>
        </div>
    );
}

export default ListPosts;