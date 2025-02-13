import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { Home } from '../../pages/HomePage/components/Home';
import { Expert } from '../../pages/Expert';
import { Discover } from '../../pages/Discover';
import { Community } from '../../pages/Community';
import { PageNotFound } from '../../pages/PagesNotFound';
import { Conversation } from '../../pages/Conversation';
import { ListConversation } from '../../pages/Conversation/components/ListConversation/ListConversation';
import { InCall } from '../../pages/Conversation/components/InCall/InCall';
import WebRTC from '../../pages/Conversation/components/ListConversation/WebRTC';



const AppRouting = () => {
  return (
    <Routes>
      {/* <Route path='/login' element={<Login />} /> */}
      {/* <Route path='/register' element={<Register />} /> */}
      <Route exact path='/' element={<HomePage />}>
        <Route path='' element={<Home />} />
      </Route>
      <Route exact path='/experts' element={<Expert />}></Route>
      <Route exact path='/discover' element={<Discover />}></Route>
      <Route exact path='/community' element={<Community />}></Route>
      <Route exact path='/chat' element={<Conversation />}>
        <Route path='' element={<ListConversation />} />
      </Route>
      <Route path='call' element={<InCall />} />
      <Route path='*' element={<PageNotFound />} />
      <Route path='/callTest' element={<WebRTC />} />
    </Routes>
  );
};

export default AppRouting;