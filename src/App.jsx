import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ScrollToTop from './components/ScrollToTop';
import HomeBody from './pages/home/HomeBody';
import Events from './pages/events/Events';
import Gallery from './pages/gallery/Gallery';
import Team from './pages/team/Team';
import About from './pages/about/About';
import Join from './pages/join/Join';
import NotFound from './pages/notfound/NotFound';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomeBody />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/join" element={<Join />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}