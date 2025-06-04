import { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';
import { Navigate } from 'react-router-dom';

export default function ReportsPage() {
  const { user, token } = useContext(StoreContext);
  console.log('User:', JSON.stringify(user), token);

  return (
    <div>
      <h1>Reports Page</h1> 
      <p>
        Welcome, {user?.firstName}! Your token is: {token}
      </p>
    </div>
  );
}
