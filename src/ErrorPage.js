import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Button } from 'semantic-ui-react';

export const ErrorPage = (props) => {
    const style = {
        paddingTop: '10%'
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <Grid centered columns={2}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Header style={style} as='h1' color='red'>There is no such page. Press return to go back.</Header>
                        <Link to="/">
                            <Button secondary>Return</Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}