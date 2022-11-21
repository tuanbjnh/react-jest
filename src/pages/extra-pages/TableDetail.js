import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainCard from '../../components/MainCard';

function TableDetail() {
    const param = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${param.id}`
        })
            .then((res) => {
                setIsLoading(false);
                setPost(res.data);
            })
            .catch((error) => {
                setIsLoading(false);
                setError('Some thing wrong');
            });
    }, [param.id]);

    return (
        <MainCard data-testid="title-element" title="Table Detail">
            <div>
                <div>ID: {post?.id}</div>
                <div>Title: {post?.title}</div>
                <div>Body: {post?.body}</div>
            </div>
        </MainCard>
    );
}

export default TableDetail;
