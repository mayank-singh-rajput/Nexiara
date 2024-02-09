import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Regsiter from './pages/Regsiter';
import Otp from './pages/otp';
import Start from './components/Start';
import TermCondition from './pages/term&Condition';
import Question from './pages/question';
import Result from './pages/result';

function App() {
  return (
    <div className="bg-[#F8F4EA]">
      <Router>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Regsiter />} />
          <Route exact path="/otp" element={<Otp />} />
          <Route exact path="/term-condition" element={<TermCondition />} />
          <Route exact path="/question" element={<Question />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
