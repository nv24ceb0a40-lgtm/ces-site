import Header from './components/Header';
import HomeBody from './components/HomeBody';
import Footer from './components/footer';
import HelmetCursor from './components/HelmetCursor';

function App() {
  return (
    <div>
        <HelmetCursor />
      <Header />
     <HomeBody/>
      <Footer/>
    </div>
  );
}

export default App;