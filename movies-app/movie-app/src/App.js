import { DownOutlined, SortAscendingOutlined, SortDescendingOutlined, FilterFilled, CaretDownFilled, CaretDownOutlined, HomeFilled, SearchOutlined, EditFilled, QuestionCircleFilled, CloseOutlined, HomeOutlined } from '@ant-design/icons'
import { setFilters, setMoviesRDX, setPage, setSearchInput, setTotalItems, setUserRDX } from './redux/reducer'
import { Drawer, Dropdown, Input, Pagination, Select, Space, message, Button, Popconfirm } from 'antd'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { MoviesModel } from './data'
import { auth } from './firebase'
import Router from './router'
import './style.css'

function App() {
  const { bearerAccessToken, page, totalItems, genres, filters } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [openFilters, setOpenFilters] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

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

  // const items = [
  //   {
  //     label: (
  //       <>
  //         Popularity <SortAscendingOutlined />
  //       </>
  //     ),      value: "popularity asc",
  //   },
  //   {
  //     label: (
  //       <>
  //         Popularity <SortDescendingOutlined />
  //       </>
  //     ),      value: "popularity desc",
  //   },
  //   {
  //     label: (
  //       <>
  //         Date <SortAscendingOutlined />
  //       </>
  //     ),      value: "date asc",
  //   },
  //   {
  //     label: (
  //       <>
  //         Date <SortDescendingOutlined />
  //       </>
  //     ),      value: "date desc",
  //   },
  // ];

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
          dispatch(setMoviesRDX(res.data.results));
          dispatch(setTotalItems(res.data.total_results));
        })
        .catch((err) => message.error(err.message));
  }, [filters]);

  return (
    <>
      <div>
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
        <div className="Header" style={{ backgroundColor: "black", color: "white", width: "100%" }}>

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

          <Button
            type="text"
            style={{
              backgroundColor: "black",
              color: "white",
              left: "3px",
              position: "absolute",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Movies App
          </Button>
          {!(
            window.location.pathname === "/favourites" ||
            window.location.pathname === "/watchlist"
          ) && (
            <Select
              value={pathName}
              style={{
                width: 175,
                backgroundColor: "white",
                marginLeft: 91,
                marginTop: "5px",
                position: "absolute",
              }}
              bordered={false}
              options={[
                // { value: "/", label: ( <> <HomeFilled /> Home </>)},
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

          <Input
            style={{
              width: "25%",
              marginLeft: "57%",
              borderRadius: 0,
              height: "25px",
              top: "3px",
              fontSize: "small",
            }}
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
                }}
              >
                <SearchOutlined />
              </Button>
            }
          />

          {user ? (
            <>
              <Button
                type="text"
                style={{
                  color: "white",
                  marginTop: "7px",
                  fontWeight: "bold",
                }}
              >
                Hi, {user.displayName} !
              </Button>
              <Button
                type="text"
                onClick={() => setOpenDrawer(true)}
                style={{
                  border: "none",
                  color: "white",
                  width: "auto",
                  marginTop: "7px",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
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
                }}
              >
                <Button
                  type="text"
                  style={{
                    color: "white",
                    marginTop: "7px",
                    width: "auto",
                    fontWeight: "bold",
                  }}
                >
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
                marginTop: "7px",
                fontWeight: "bold",
                marginLeft: "257px",
              }}
            >
              Log in
            </Button>
          )}
        </div>
        <div className="Subheader">
          <Button
            type="text"
            style={{
              position: "absolute",
              color: "white",
              top: "95px",
              right: "17px",
            }}
            onClick={() => {
              navigate("/");
              setOpenFilters(!openFilters);
            }}
          >
            <FilterFilled style={{ color: "white" }} /> Filter
          </Button>

          {/* <Select
            allowClear
            defaultValue={filters?.sortBy}
            options={[
              {
                label: (
                  <>
                    Popularity <SortAscendingOutlined />
                  </>
                ),      value: "popularity asc",
              },
              {
                label: (
                  <>
                    Popularity <SortDescendingOutlined />
                  </>
                ),      value: "popularity desc",
              },
              {
                label: (
                  <>
                    Date <SortAscendingOutlined />
                  </>
                ),      value: "date asc",
              },
              {
                label: (
                  <>
                    Date <SortDescendingOutlined />
                  </>
                ),      value: "date desc",
              },
            ]}
            onChange={(value) => {
              dispatch(setFilters({ ...filters, sortBy: value }));
            }}
          /// placement="bottomRight"
          // arrow
        />
          <Button
            type="text"
            style={{
              right: "0px",
              position: "absolute",
              color: "white",
              top: "75px",
            }}
          >
            Sort By <CaretDownFilled style={{ color: "white" }} />
          </Button> */}
          {/* /> */}

          <Drawer
            title={<div className="drawer-title">My Profile</div>}
            style={{
              backgroundColor: "black",
              color: "white",
            }}
            closeIcon={<CloseOutlined style={{ color: "white" }} />}
            placement="right"
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
          >
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
            </Space>
          </Drawer>

          <Drawer
            placement="right"
            style={{
              backgroundColor: "black",
              color: "white",
              height: "100%",
            }}
            open={openFilters}
            onClose={() => setOpenFilters(false)}
            // title={<div className="drawer-title">Filter by Genre</div>}
            closeIcon={<CloseOutlined style={{ color: "white" }} />}
          >
            <div>
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
        </div>
        <div
          className="Movies"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <Router user={user} />
        </div>
        {!(
          window.location.pathname === "/favourites" ||
          window.location.pathname === "/watchlist"
        ) && (
          <div className="Footer" style={{ backgroundColor: "black" }}>
            <div
              className="Pagination"
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                display: "flex",
                position: "fixed",
                bottom: 0,
              }}
            >
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
                style={{ backgroundColor: "#ccc" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;