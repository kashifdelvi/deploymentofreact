import { Routes, Route } from 'react-router-dom'
import QuickSearchContainer from '../components/QuickSearchContainer';
import RestuarantList from '../components/RestuarantList';
import RestuarantDetail from '../components/RestuarantDetail';

function ZomatoRoutes() {
    return (
        <Routes>
            <Route path="/" element={<QuickSearchContainer />} />
            <Route path="/resturant/list/:timingFilter" element={<RestuarantList />} />
            <Route path="/resturant/:code" element={<RestuarantDetail />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
  }
  export default ZomatoRoutes;