import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
// You'll need to create this component at src/components/users/ProfileEdit.js
import ProfileEdit from '../components/users/ProfileEdit';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Temporary user ID - will be replaced with authentication later
  const userId = '6512345678901234567890ab'; // Example ID format
  
  // User state
  const [user, setUser] = useState({
    name: '',
    bio: '',
    avatar: '',
    favorites: {
      books: [],
      movies: [],
      connections: []
    },
    activity: []
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        
        // Temporary: If no real user exists yet, use mock data
        try {
          const userData = await userService.getUserProfile(userId);
          setUser(userData);
        } catch (err) {
          // If user not found, use mock data
          console.log('Using mock user data for development');
          setUser({
            _id: userId,
            name: 'Test User',
            bio: 'Movie and book enthusiast.',
            avatar: '/images/default-avatar.jpg',
            favorites: {
              books: [],
              movies: [],
              connections: []
            },
            activity: []
          });
        }
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [userId]);

  const handleProfileUpdate = async (updatedUserData) => {
    try {
      setIsLoading(true);
      
      // Try to update via API
      try {
        const updatedUser = await userService.updateUserProfile(userId, updatedUserData);
        setUser(updatedUser);
      } catch (err) {
        // If API fails, just update the local state for development
        console.log('Mock update for development');
        setUser({ ...user, ...updatedUserData });
      }
      
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  if (isLoading && !user.name) {
    return (
      <div className="container">
        <h1>User Profile</h1>
        <p>Loading profile data...</p>
      </div>
    );
  }

  // Render error state
  if (error && !user.name) {
    return (
      <div className="container">
        <h1>User Profile</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: 'var(--space-sm) var(--space-md)',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: 'var(--space-md)'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>User Profile</h1>
      <p>Manage your account and view your contributions.</p>
      
      <div style={{ 
        display: 'flex',
        marginTop: 'var(--space-lg)',
        gap: 'var(--space-lg)',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row' // Responsive layout
      }}>
        {/* Profile sidebar */}
        <div style={{ 
          width: window.innerWidth < 768 ? '100%' : '30%',
          backgroundColor: 'var(--color-card)',
          padding: 'var(--space-md)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 'var(--space-md)'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              marginBottom: 'var(--space-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              {/* Display first letter of name as avatar placeholder */}
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ margin: '0 0 var(--space-xs) 0' }}>{user.name}</h2>
            <p style={{ textAlign: 'center', margin: 0 }}>{user.bio}</p>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)'
          }}>
            <button 
              onClick={() => setActiveTab('about')}
              style={{
                padding: 'var(--space-sm)',
                backgroundColor: activeTab === 'about' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'about' ? 'white' : 'var(--color-text)',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              About
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              style={{
                padding: 'var(--space-sm)',
                backgroundColor: activeTab === 'favorites' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'favorites' ? 'white' : 'var(--color-text)',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              Favorites
            </button>
            <button 
              onClick={() => setActiveTab('activity')}
              style={{
                padding: 'var(--space-sm)',
                backgroundColor: activeTab === 'activity' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'activity' ? 'white' : 'var(--color-text)',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              Activity
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              style={{
                padding: 'var(--space-sm)',
                backgroundColor: activeTab === 'settings' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'settings' ? 'white' : 'var(--color-text)',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              Settings
            </button>
          </div>
        </div>
        
        {/* Main content area */}
        <div style={{ 
          width: window.innerWidth < 768 ? '100%' : '70%',
          backgroundColor: 'var(--color-card)',
          padding: 'var(--space-md)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* About tab */}
          {activeTab === 'about' && !isEditing && (
            <div>
              <h2>About</h2>
              <p>Your profile information.</p>
              
              <div style={{ marginTop: 'var(--space-md)' }}>
                <div style={{ marginBottom: 'var(--space-sm)' }}>
                  <h3 style={{ margin: '0 0 var(--space-xs) 0' }}>Name</h3>
                  <p style={{ margin: 0 }}>{user.name}</p>
                </div>
                <div style={{ marginBottom: 'var(--space-sm)' }}>
                  <h3 style={{ margin: '0 0 var(--space-xs) 0' }}>Bio</h3>
                  <p style={{ margin: 0 }}>{user.bio}</p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: 'var(--space-sm) var(--space-md)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: 'var(--space-md)'
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
          
          {/* Edit mode */}
          {activeTab === 'about' && isEditing && (
            <ProfileEdit 
              user={user} 
              onUpdate={handleProfileUpdate} 
              onCancel={() => setIsEditing(false)} 
            />
          )}
          
          {/* Favorites tab */}
          {activeTab === 'favorites' && (
            <div>
              <h2>Favorites</h2>
              <p>Your favorite books, movies, and connections.</p>
              
              <div style={{ marginTop: 'var(--space-md)' }}>
                <h3>Books</h3>
                {user.favorites.books && user.favorites.books.length > 0 ? (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: 'var(--space-md)'
                  }}>
                    {/* Book cards would go here */}
                    <p>Your favorite books will appear here.</p>
                  </div>
                ) : (
                  <p>You haven't favorited any books yet.</p>
                )}
                
                <h3 style={{ marginTop: 'var(--space-lg)' }}>Movies</h3>
                {user.favorites.movies && user.favorites.movies.length > 0 ? (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: 'var(--space-md)'
                  }}>
                    {/* Movie cards would go here */}
                    <p>Your favorite movies will appear here.</p>
                  </div>
                ) : (
                  <p>You haven't favorited any movies yet.</p>
                )}
                
                <h3 style={{ marginTop: 'var(--space-lg)' }}>Connections</h3>
                {user.favorites.connections && user.favorites.connections.length > 0 ? (
                  <div>
                    {/* Connection cards would go here */}
                    <p>Your favorite connections will appear here.</p>
                  </div>
                ) : (
                  <p>You haven't favorited any connections yet.</p>
                )}
              </div>
            </div>
          )}
          
          {/* Activity tab */}
          {activeTab === 'activity' && (
            <div>
              <h2>Activity</h2>
              <p>Your recent activity on MovieBooks.</p>
              
              <div style={{ marginTop: 'var(--space-md)' }}>
                {user.activity && user.activity.length > 0 ? (
                  <div>
                    {/* Activity items would go here */}
                    <p>Your recent activity will appear here.</p>
                  </div>
                ) : (
                  <p>No recent activity to display.</p>
                )}
              </div>
            </div>
          )}
          
          {/* Settings tab */}
          {activeTab === 'settings' && (
            <div>
              <h2>Settings</h2>
              <p>Manage your account settings.</p>
              
              <div style={{ marginTop: 'var(--space-md)' }}>
                <h3>Account</h3>
                <p>Account settings will be available here once authentication is implemented.</p>
                
                <h3 style={{ marginTop: 'var(--space-lg)' }}>Notifications</h3>
                <p>Notification preferences will be available here in a future update.</p>
                
                <h3 style={{ marginTop: 'var(--space-lg)' }}>Privacy</h3>
                <p>Privacy settings will be available here in a future update.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;