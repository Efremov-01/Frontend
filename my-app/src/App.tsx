import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';


export default function App() {
  return (
<Router>
  <Navbar />
  <Container style={{ marginTop: '80px' }}>
    <Breadcrumbs />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
    </Routes>
  </Container>
</Router>
  );
}