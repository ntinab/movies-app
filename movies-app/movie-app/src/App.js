import { DownOutlined, SortAscendingOutlined, SortDescendingOutlined, FilterFilled, CaretDownFilled, CaretDownOutlined, HomeFilled, SearchOutlined, EditFilled, QuestionCircleFilled, CloseOutlined } from '@ant-design/icons'
import { Drawer, Dropdown, Input, Layout, Pagination, Row, Select, Space, message, Button, Popconfirm } from 'antd'
import { setFilters, setMoviesListRDX, setPage, setSearchInput, setTotalItems, setUserRDX } from './redux/reducer'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { MoviesModel } from './data'
import { toast } from 'react-toastify'
import { auth } from './firebase'
import Router from './router'
import './style.css'

const { Header, Footer, Content } = Layout;

function App() {
  const { bearerAccessToken, page, totalItems, genres, filters } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [openFilters, setOpenFilters] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onDrawerClose = () => {
    setOpenDrawer(false);
  };

  const pathName = window.location.pathname;

  const itemsPerPage = 20;

  const apiMaxPage = 500;

  const [user, setUser] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(setUserRDX(result.user));
      navigate("/");
      toast.success("Login successfully");
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  const { Search } = Input;

  useEffect(() => {
    filters &&
      (filters.sortBy || filters.genres) &&
      MoviesModel.searchMoviesWithFilters(
        bearerAccessToken,
        page,
        filters.genres.join(","),
        filters.sortBy
      )
        .then((res) => {
          dispatch(setMoviesListRDX(res.data.results));
          dispatch(setTotalItems(res.data.total_results));
        })
        .catch((err) => message.error(err.message));
  }, [filters]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 51]}>
        <Layout>
          {/* <div className="Header" style={{ width: "100%" }}> */}
          <Header
            style={{ backgroundColor: "black", color: "white", width: "100%" }}>
              
            {/* <Dropdown
          menu={{
            items,
          }}
          // placement="bottomRight"
          placement="bottomLeft"
          arrow
          style={{ width: "100%" }}
          onClick={onMenuClick}
        >
          <Button type="text" style={{ left: "3px", position: "absolute" }}>
            <Space>
              <HomeFilled style={{ color: "white" }} /> <Link to="/">Home</Link>{" "}
              <CaretDownOutlined style={{ color: "white" }} />
            </Space>
          </Button>
        </Dropdown> */}

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}>
              Movies App
            </span>
            {!(
              window.location.pathname === "/favourites" ||
              window.location.pathname === "/watchlist" ||
              window.location.pathname === "/tickets"
            ) && (
              <Select
                value={pathName}
                style={{
                  width: 175,
                  backgroundColor: "white",
                  marginLeft: 17,
                  marginRight: 17,
                }}
                bordered={false}
                options={[
                  { value: "/", label: "Home" },
                  { value: "/upcoming", label: "Upcoming Movies" },
                  { value: "/trending", label: "Trending Movies" },
                  { value: "/popular", label: "Popular Movies" },
                  { value: "/toprated", label: "Top Rated Movies" },
                  { value: "/nowplaying", label: "Now Playing Movies" },
                ]}
                onChange={(key) => {
                  dispatch(setPage(1));
                  navigate(key);
                }}
              />
            )}

            <Button
              type="text"
              style={{ color: "white" }}
              onClick={() => {
                navigate("/");
                setOpenFilters(!openFilters);
              }}>
              <FilterFilled style={{ color: "white" }} /> Filter
            </Button>

            <Search
              type="search"
              name="searchInput"
              id="searchInput"
              placeholder="Search for Movies"
              allowClear
              onChange={({ target: { value } }) => {
                dispatch(setPage(1));
                dispatch(setSearchInput(value));
              }}
              enterButton={
                <Button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "1px solid black",
                  }}>
                  <SearchOutlined />
                </Button>
              }
              style={{ width: "25%", marginLeft: "57%" }}
              className="custom-search-input"
            />

            {user ? (
              <>
                <Button
                  type="text"
                  style={{
                    color: "white",
                    marginTop: "2px",
                    fontWeight: "bold",
                  }}>
                  Hi, {user.displayName} !
                </Button>
                <Button
                  type="text"
                  onClick={showDrawer}
                  style={{
                    border: "none",
                    color: "white",
                    width: "auto",
                    marginTop: "2px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}>
                  My Profile <EditFilled />
                </Button>
                <Popconfirm
                  title="Logout"
                  description="Are you sure that you want to log out?"
                  placement="topRight"
                  icon={
                    <QuestionCircleFilled
                      style={{
                        color: "black",
                      }}
                    />
                  }
                  onConfirm={() => {
                    dispatch(setUserRDX(null));
                    auth.signOut(toast.success("Logout successfully"));
                  }}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{
                    style: {
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "0",
                    },
                  }}
                  cancelButtonProps={{
                    style: {
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "0",
                      borderColor: "lightgray",
                    },
                  }}>
                  <Button
                    type="text"
                    style={{
                      color: "white",
                      marginTop: "2px",
                      width: "auto",
                      fontWeight: "bold",
                    }}>
                    Log out
                  </Button>
                </Popconfirm>
              </>
            ) : (
              <Button
                type="text"
                onClick={GoogleLogin}
                style={{
                  color: "white",
                  width: "auto",
                  marginTop: "2px",
                  fontWeight: "bold",
                  marginLeft: "257px",
                }}>
                Log in
              </Button>
            )}

            <Drawer
              title={<div className="drawer-title">My Profile</div>}
              style={{
                backgroundColor: "black",
                color: "white",
              }}
              closeIcon={<CloseOutlined style={{ color: "white" }} />}
              placement="right"
              onClose={onDrawerClose}
              // onClose={() => setOpenDrawer(false)}
              open={openDrawer}>
              <hr />
              <Space direction="vertical" size="1px">
                <p>
                  <Link to={`/favourites`} style={{ color: "white" }}>
                    My Favourites
                  </Link>
                </p>
                <p>
                  <Link to={`/watchlist`} style={{ color: "white" }}>
                    My Watchlist
                  </Link>
                </p>
                <p>
                  <Link to={`/tickets`} style={{ color: "white" }}>
                    My Tickets
                  </Link>
                </p>
              </Space>
            </Drawer>

            <Drawer
              placement="top"
              style={{
                backgroundColor: "black",
                color: "white",
                height: "auto",
              }}
              open={openFilters}
              onClose={() => setOpenFilters(false)}
              // title={<div className="drawer-title">Filter by Genre</div>}
              // closeIcon={<CloseOutlined style={{ color: "white" }} />}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}>
                <h5>Genres</h5>
                <Select
                  defaultValue={filters?.genres}
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  options={genres?.map((gen) => ({
                    label: gen.name,
                    value: gen.id,
                  }))}
                  onChange={(value) => {
                    dispatch(setFilters({ ...filters, genres: value }));
                  }}
                />
                <br />
                <br />
                {/* <h5>Sort By <CaretDownFilled/></h5> */}
                <h5>Sort By</h5>
                <Select
                  allowClear
                  defaultValue={filters?.sortBy}
                  style={{
                    width: "100%",
                  }}
                  options={[
                    {
                      label: (
                        <>
                          Date <SortAscendingOutlined />
                        </>
                      ),
                      value: "primary_release_date.asc",
                    },
                    {
                      label: (
                        <>
                          Date <SortDescendingOutlined />
                        </>
                      ),
                      value: "primary_release_date.desc",
                    },
                    {
                      label: (
                        <>
                          Popularity <SortAscendingOutlined />
                        </>
                      ),
                      value: "popularity.asc",
                    },
                    {
                      label: (
                        <>
                          Popularity <SortDescendingOutlined />
                        </>
                      ),
                      value: "popularity.desc",
                    },
                  ]}
                  onChange={(value) => {
                    dispatch(setFilters({ ...filters, sortBy: value }));
                  }}
                />
              </div>
            </Drawer>
          </Header>
          <Content style={{ backgroundColor: "black", color: "white" }}>
            <Router user={user} />
          </Content>
          {!(
            window.location.pathname === "/favourites" ||
            window.location.pathname === "/watchlist" ||
            window.location.pathname === "/tickets"
          ) && (
            <Footer style={{ backgroundColor: "black" }}>
              <Pagination
                pageSize={itemsPerPage}
                current={Math.min(page, apiMaxPage)}
                total={
                  Math.min(Math.ceil(totalItems / itemsPerPage), apiMaxPage) *
                  itemsPerPage
                }
                showSizeChanger={false}
                onChange={(pg) => {
                  const restrictedPage = Math.min(pg, apiMaxPage);
                  dispatch(setPage(restrictedPage));
                }}
                style={{ backgroundColor: "#ccc", bottom: "11px" }}
              />
            </Footer>
          )}
        </Layout>
      </Space>
    </>
  );
}

export default App;