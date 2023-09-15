import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectAllUsers } from './UserSlice';
function PostUser({userId}) {
    const users = useSelector(selectAllUsers);
    const author = users[userId-1];
    return (
        <>
             {
                author ? author.name : 'unknown author'
            }
        </>
    );
}

export default PostUser;