// project import
import MainCard from '../../components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SamplePage.css';

function Table() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchText, setSearchText] = useState('');
    const [sortStatus, setSortStatus] = useState('NONE');

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts'
        })
            .then((res) => {
                setIsLoading(false);
                setPosts(res.data);
            })
            .catch((error) => {
                setIsLoading(false);
                setError('Some thing wrong');
            });
    }, []);

    const handleChangeSearchText = (evt) => {
        setSearchText(evt.target.value);
    };

    const postFilered = posts.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()));

    const handleChangeSort = () => {
        if (sortStatus === 'NONE') {
            setSortStatus('ASC');
            return;
        }

        if (sortStatus === 'ASC') {
            setSortStatus('DESC');
            return;
        }

        if (sortStatus === 'DESC') {
            setSortStatus('NONE');
        }
    };

    const getPostSorted = () => {
        if (sortStatus === 'NONE') {
            return postFilered;
        }
        if (sortStatus === 'ASC') {
            return postFilered.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            });
        }

        if (sortStatus === 'DESC') {
            return postFilered.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                return 0;
            });
        }
    };

    let postSorted = getPostSorted();

    const handleRemovePost = (postId) => {
        setPosts(posts.filter((x) => x.id !== postId));
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <MainCard title="Table">
            <div>
                <input
                    type="text"
                    placeholder="Search by title"
                    className="search-by-title"
                    value={searchText}
                    onChange={handleChangeSearchText}
                ></input>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={handleChangeSort}>Title -- Sort ({sortStatus}) </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postSorted.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <Link to={`${post.id}`}>View detail</Link>
                                    <button className="table-button-delete" onClick={() => handleRemovePost(post.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainCard>
    );
}

export default Table;
