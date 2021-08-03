import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/auth'

import { FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);



    if (error) return `Error! ${error.message}`;
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row className="page-title">
                {user && (
                    <Grid.Column>
                        <PostForm></PostForm>
                    </Grid.Column>
                )}
            </Grid.Row>
            <Grid.Row>
                {loading ? (<h1>Loading post..</h1>) : (
                    <Transition.Group>
                        {data.getPosts &&
                            data.getPosts.map((post) => (<Grid.Column key={post.id} style={{ marginBottom: 20 }}><PostCard post={post} /></Grid.Column>))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>

    )
}



export default Home;