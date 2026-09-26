import React from 'react';
import {Card, CardBody} from 'reactstrap';

const UserCard = ({user}) => {
    return (
        <Card className="text-center mt-3 mb-4">
            <img src={user.avatar_url} className='img-thumbnail' alt={user.login} />
            <CardBody>
                <div className="text-primary">{user.name}</div>
                <div className="text-primary">{user.location}</div>
                <div className="text-primary">{user.bio}</div>
                <div className="text-info">Available:{user.hirable?'Yes':'No'}</div>
                <div className="text-primary">Followers:{user.followers}</div>
                <h4>{user.login}</h4>
            </CardBody>
        </Card>
    );
};

export default UserCard;
