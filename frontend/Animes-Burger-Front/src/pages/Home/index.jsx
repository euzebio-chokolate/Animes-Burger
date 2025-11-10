import Navbar from './Navbar';
import Banner from './Banner';
import DestaquesSection from './Destaques';
import FaleConoscoSection from './FaleConosco';

function Home() {
    return (
        <main>
            <Navbar /> 
            <Banner />
            <DestaquesSection />
            <FaleConoscoSection />
        </main>
    );
}

export default Home;