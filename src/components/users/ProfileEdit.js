import React, { useState } from 'react';

function ProfileEdit({ user, onUpdate, onCancel }) {
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // This will be replaced with an actual API call later
      // For now, mock a successful update
      setTimeout(() => {
        const updatedUser = { ...user, name, bio };
        onUpdate(updatedUser);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h2>Edit Profile</h2>
      
      {error && (
        <div style={{ 
          backgroundColor: '#ffdddd', 
          color: '#cc0000',
          padding: 'var(--space-sm)',
          borderRadius: '4px',
          marginBottom: 'var(--space-md)'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <label 
            htmlFor="name"
            style={{ 
              display: 'block', 
              marginBottom: 'var(--space-xs)',
              fontWeight: 'bold'
            }}
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 'var(--space-sm)',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <label 
            htmlFor="bio"
            style={{ 
              display: 'block', 
              marginBottom: 'var(--space-xs)',
              fontWeight: 'bold'
            }}
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: 'var(--space-sm)',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ 
          display: 'flex',
          gap: 'var(--space-md)',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: 'var(--space-sm) var(--space-md)',
              backgroundColor: '#f5f5f5',
              color: 'var(--color-text)',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: 'var(--space-sm) var(--space-md)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;