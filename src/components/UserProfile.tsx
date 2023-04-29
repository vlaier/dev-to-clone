import { DocumentData } from 'firebase/firestore';
import React from 'react';

const UserProfile = ({ user }: { user: DocumentData }) => {
  return (
    <div className="box-center">
      <img src={user?.photoURL} className="card-img-center" />
      <p>
        <i>@{user?.username}</i>
      </p>
      <h1>{user?.displayName}</h1>
    </div>
  );
};

export default UserProfile;
