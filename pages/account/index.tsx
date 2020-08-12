import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  console.log(user)
  console.log(getAccessTokenSilently())

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => logout()}>Log Out</button>
      </div>
    )
  );
};

export default Profile;