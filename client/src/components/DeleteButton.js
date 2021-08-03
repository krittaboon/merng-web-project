import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../util/graphql'



function DeleteButton({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePost] = useMutation(mutation, {
        update(cache) {

            if (!commentId) {
                setConfirmOpen(false);
                // remove post from cache
                const data = cache.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                const newdata = data.getPosts.filter(p => p.id !== postId);
                cache.writeQuery({
                    query: FETCH_POSTS_QUERY, data: {
                        getPosts: newdata
                    }

                })
                if (callback) {
                    callback()
                }
            }

        },

        variables: { postId, commentId }

    })
    return (
        <>
            <Popup
                content="Delete Post"
                inverted
                trigger={
                    <Button as="div" onClick={() => setConfirmOpen(true)} floated="right" >
                        <Icon name="trash" style={{ margin: 0 }}></Icon>
                    </Button>
                }
            />
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
        </>

    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!){
   deletePost(postId:$postId)
}
`

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postId:ID!,$commentId:ID!){
    deleteComment(postId: $postId,commentId:$commentId){
        id
        comments{
            id
            username
            createdAt
            body
        }
        commentCount
    }
}
`


export default DeleteButton