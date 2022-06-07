const sublinks = [
  { 
    page: 'Movies',
    links: [
      { label: 'popular', url: '/popularMovies/' },
      { label: 'top-rated', url: '/topRatedMovies/' },
    ],
  },
  {
    page: 'TV Shows',
    links: [
        
        { label: 'popular', url: '/popularTV/' },
        { label: 'top-rated', url: '/topRatedTV' },
      ],
  },
  {
      page:'People',
      link:'/people/'
  },
  {
    page:'Profile',
    links:[
      {label:'favorite',url:'/favorite/'},
      {label:'watchlist', url:'/watchlist/'}
    ]
  },
  {
      page:'About',
      link:'/about'
  }
  

];

export default sublinks;