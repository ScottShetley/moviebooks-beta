import React from 'react';

function HomePage() {
  return (
    <div className="container">
      <h1 className="text-primary">Welcome to MovieBooks</h1>
      <p>Discover the literary universe hidden in your favorite films.</p>
      <div className="card" style={{ marginTop: 'var(--space-lg)' }}>
        <h2>Did You Know?</h2>
        <p>In "Harry Potter and the Philosopher's Stone," the books in Dumbledore's office are actually phone books covered in leather.</p>
      </div>
    </div>
  );
}

export default HomePage;