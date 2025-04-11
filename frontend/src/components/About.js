import React from 'react'

const About = () => {
  return (
    <div className='container my-5'>
      <h2>About MyNoteBook</h2>
      <p className="lead">Your secure digital notebook in the cloud</p>
      
      <div className="mt-4">
        <h4>Features</h4>
        <ul>
          <li>Secure note storage with end-to-end encryption</li>
          <li>Organize notes with tags</li>
          <li>Create, edit, and delete notes easily</li>
          <li>Access your notes from anywhere</li>
          <li>User-friendly interface</li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Security</h4>
        <p>
          MyNoteBook takes your privacy seriously. All notes are encrypted and can only be accessed 
          by you through your secure account. We use industry-standard security practices to protect 
          your data.
        </p>
      </div>

      <div className="mt-4">
        <h4>Technology Stack</h4>
        <ul>
          <li>Frontend: React.js with Bootstrap for responsive design</li>
          <li>Backend: Node.js with Express</li>
          <li>Database: MongoDB for reliable data storage</li>
          <li>Authentication: JWT (JSON Web Tokens) for secure access</li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Get Started</h4>
        <p>
          Create an account to start organizing your notes securely. Already have an account? 
          Login to access your notes from any device.
        </p>
      </div>
    </div>
  )
}

export default About
