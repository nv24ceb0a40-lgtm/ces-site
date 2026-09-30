import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomeBody from './pages/home/HomeBody';
import Events from './pages/events/Events';
import Gallery from './pages/gallery/Gallery';
import Team from './pages/team/Team';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
      </Routes> 
      <Footer />
    </>
  );
}