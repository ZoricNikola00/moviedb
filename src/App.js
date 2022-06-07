import React from 'react'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import SingleItem from './pages/SingleItem'
import About from './pages/About'
import Navbar from './components/Navbar'
import Search from './pages/Search'
import Person from './pages/Person'
import PopularMovies from './pages/PopularMovies'
import TRMovies from './pages/TopRatedMovies'
import TopTvShows from './pages/TopRateTVShows'
import PopularTVShows from './pages/PopularTVShows'
import People from './pages/People'
import Cast from './pages/Cast'
import Favorite from './pages/Favorite'
import Watchlist from './pages/Watchlist'
function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='SingleItem/:t/:id/' element={<SingleItem/>}/>
          <Route path='SingleItem/:t/:id/cast' element={<Cast/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='search/:q' element={<Search/>}/>
          <Route path='person/:id' element={<Person/>}/>
          <Route path='popularMovies/' element={<PopularMovies/>}/>
          <Route path='topRatedMovies/' element={<TRMovies/>}/>
          <Route path='topRatedTV/' element={<TopTvShows/>}/>
          <Route path='popularTV/' element={<PopularTVShows/>}/>
          <Route path='people/' element={<People/>}/>
          <Route path='favorite/' element={<Favorite/>}/>
          <Route path='watchlist/' element={<Watchlist/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App