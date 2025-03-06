import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Expert from "../../pages/Expert";
import { Discover } from "../../pages/Discover";
import { Community } from "../../pages/Community";
import { PageNotFound } from "../../pages/PagesNotFound";
import { Conversation } from "../../pages/Conversation";
import { ListConversation } from "../../pages/Conversation/components/ListConversation/ListConversation";
import { InCall } from "../../pages/Conversation/components/InCall/InCall";
import Explorer from "../../pages/Conversation/components/Explorer/Explorer";
import WebRTC from "../../pages/Conversation/components/ListConversation/WebRTC";
import Login from "../../pages/Login/Login";
import Premium from "../../pages/Premium/Premium";
import PrivateRoute from "./PrivateRoute";
import Register from "../../pages/Register/Register";
import VerifyOtp from "../../pages/Register/VerifyOtp";
import Blog from "../../pages/Blog";
import Booking from "../../pages/Booking";

const AppRouting = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route exact path="/" element={<Home />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/expert" element={<Expert />} />

      <Route path="/blog" element={<Blog />} />
      {/* <Route
        path="/experts"
        element={<PrivateRoute element={<Expert />} allowedRoles="Customer" />}
      /> */}
      <Route path="/about" element={<Premium />} />

      <Route exact path="/discover" element={<Discover />}></Route>
      <Route exact path="/community" element={<Community />}></Route>
      <Route exact path="/friends" element={<Conversation />}>
        <Route path="" element={<ListConversation />} />
      </Route>
      {/* Route Private */}
      <Route
        path="/expert/:id"
        element={
          <PrivateRoute element={<Booking />} allowedRoles={["Customer"]} />
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute
            element={<Conversation />}
            allowedRoles={["Customer"]}
          />
        }
      />

      {/* Nếu bạn muốn WebRTC nằm trong Conversation */}
      <Route path="/chat/webrtc" element={<WebRTC />} />
      <Route path="call" element={<InCall />} />
      <Route path="/callTest" element={<Explorer />} />

      {/* NOT FOUND 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default AppRouting;
