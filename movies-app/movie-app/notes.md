Movies App:



Build a movie catalog application where users can browse and search for movies.

You can use an API that provides movie data (such as the TMDB API) and use Axios for fetching movie details.
Use @redux/toolkit for state management, react-query for data fetching and caching, ant Ant Design for UI components.

The TMDB API (The Movie Database) offers a vast collection of movie information.
You can search for movies, retrieve details, and fetch ratings using this API.


- npm i antd
- npm i axios
- npm i firebase
- npm i react-query
- npm i @reduxjs/toolkit
- npm i @ant-design/icons
- npm i redux-persist
- npm i react-toastify
- npm i react-firebase-hooks
- npm i react-query-devtools -


.

- css !
  
- cards !
- header !
  
- menu !
- movies app left !
- add home icon in menu !
- change dropdown icon !
- color in selected menu item !

- breadcrumbs | filters | sort by below header !

- search input width | height & icon !

- pagination color !
- float button !


!

- book ticket modal !
- tickets view !

- drawers !
- notifications !
  
- trailers !
  
- comments !
  
- clone !
- delete cinema !


?

- footer ?
- error page ?

- sort by title x2 ?

- movieslist -> movies !  
- setmovieslistrdx -> setmoviesrdx !

- filters & sort by : 2 icons !
  
- pagination in favourites & watchlist !
  
- breadcrumbs & separator & hover color !



useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearch(searchInput, searchPage);
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
    };
}, [searchInput, searchPage]);


// subheader.js

const items = [
    {
      label: (
        <>
          Title <SortAscendingOutlined />
        </>
      ),
      key: "title a-z",
    },
    {
      label: (
        <>
          Title <SortDescendingOutlined />
        </>
      ),      key: "title z-a",
    },
    {
      label: (
        <>
          Popularity <SortAscendingOutlined />
        </>
      ),      key: "popularity asc",
    },
    {
      label: (
        <>
          Popularity <SortDescendingOutlined />
        </>
      ),      key: "popularity desc",
    },
    {
      label: (
        <>
          Date <SortAscendingOutlined />
        </>
      ),      key: "date asc",
    },
    {
      label: (
        <>
          Date <SortDescendingOutlined />
        </>
      ),      key: "date desc",
    },
  ];

   <Button
          type="text"
          onClick={showDrawer}
          style={{
            right: "75px",
            position: "absolute",
            color: "white",
            top: "75px",
          }}
        >
          <FilterFilled style={{ color: "white" }} /> Filter
   </Button>

  <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow
        >
          <Button
            type="text"
            style={{
              right: "0px",
              position: "absolute",
              color: "white",
              top: "75px",
            }}
          >
            Sort by <CaretDownFilled style={{ color: "white" }} />
          </Button>
  </Dropdown>


// header.js

const items = [
    {
      label: <a href="/upcoming">Upcoming Movies</a>,
      key: 'upcoming',
    },
    {
      label: <a href="/trending">Trending Movies</a>,
      key: 'trending',
    },
    {
      label: <a href="/popular">Popular Movies</a>,
      key: 'popular',
    },
    {
      label: <a href="/top-rated">Top Rated Movies</a>,
      key: 'top-rated',
    },
    {
      label: <a href="/now-playing">Now Playing Movies</a>,
      key: 'now-playing',
    },
  ];

   const onMenuClick = ({ item }) => {
    dispatch(setResetPage(true));
  };
  

// movieCard.js

if (movie.genres && movie.genres.length > 0) {
    var firstTwoGenres = movie.genres.slice(0, 2).map((genre) => genre.name);
  } else {
    firstTwoGenres = movie.genre_ids.slice(0, 2).map((genreId) => genres.find((genre) => genre.id === genreId)?.name);
}
