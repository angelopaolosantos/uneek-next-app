import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from "react"

const page = () => {
    const { isAuthenticated, isLoading, getAccessTokenSilently, user, getAccessTokenWithPopup } = useAuth0()
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-angelops.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();

            setUserMetadata(user_metadata);
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();

        
      }, []);
    
    if (!isAuthenticated) {
        return (
            <div>You must first sign in to access this page.</div>
        )
    }

    if (isLoading) {
        return (
            <div>Loading Information...</div>
        )
    }

    return (
        <div>Retailer Page
            <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.sub}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}

        </div>
    )
}

export default page