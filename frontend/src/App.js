import './App.css';
import NavBar from './NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AboutPage from './pages/AboutPage';
import Article from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <div id='page-body'>
        <Routes>
        <Route path='/' exact element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/articles' element={<ArticlesListPage/>}/>
        <Route path='/articles/:articleId' element={<Article/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
