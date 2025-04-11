import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes';

const Home = ({ showAlert }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='container my-3'>
      <Notes showAlert={showAlert} />
    </div>
  );
}

export default Home;
