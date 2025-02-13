import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./redux/slice/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./components/LoadingScreen";

// Lazy Loaded Components
const Admin = lazy(() => import("./pages/admin"));
const AddBlog = lazy(() => import("./pages/admin/addBlog/AddBlog"));
const LibraryTopicDetails = lazy(() =>
  import("./pages/admin/libraryTopicDetails/LibraryTopicDetails")
);
const Profile = lazy(() => import("./pages/admin/profile/Profile"));
const User = lazy(() => import("./pages/User"));
const Chat = lazy(() => import("./pages/user/chat&search/Chat"));
const Library = lazy(() => import("./pages/user/library/Library"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Home = lazy(() => import("./pages/screens/Home"));
const CompleteProfile = lazy(() =>
  import("./pages/screens/completeProfile/CompleteProfile")
);

// A separate component to handle routes and listen for location changes
function AppRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Start loading on route change
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 500); // Simulated delay

    return () => clearTimeout(timer);
  }, [location.pathname, dispatch]);

  return (
    <Routes>
      {/* Guest & Public Routes (Accessible if NOT logged in) */}
      <Route element={<ProtectedRoute allowedRoles={["guest"]} />}>
        <Route path="/auth" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Route>

      {/* User Routes */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/user" element={<User />}>
          <Route index element={<Library />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AddBlog />} />
          <Route
            path="library-topic-details"
            element={<LibraryTopicDetails />}
          />
        </Route>
      </Route>

      {/* Complete Profile (Accessible to both user and admin) */}
      <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Route>
    </Routes>
  );
}

function App() {
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <BrowserRouter>
      {/* Global Loading Screen */}
      {isLoading && <LoadingScreen />}
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </BrowserRouter>
  );
}

export default App;
