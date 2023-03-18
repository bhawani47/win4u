import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Search from './Components/Search.js';
import Account from './Components/Account';
import Game from './Components/Game';
import ProductPage from './Components/ProductPage';
import Promotion from './Components/Promotion';
import Recharge from './Components/Recharge';
import Withdrawal from './Components/Withdrawal';
import {Bank, AddBank, AddUpi, EditUpi, EditBank} from './Components/Bank';
import ResetPass from './Components/ResetPass';
import Transaction from './Components/Transaction';
import RechargeTransaction from './Components/RechargeTransaction';
import WithdrawalTransaction from './Components/WithdrawalTransaction';
import Suggestion from './Components/Suggestion';
import AddSuggestion from './Components/AddSuggestion';
import Privacy from './Components/Privacy';
import Agreement from './Components/Agreement';
import BetRecord from './Components/BetRecord';
import Forgotpass from './Components/Forgotpass';
import Report from './Components/Report';

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Signup/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/forgot' element={<Forgotpass/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/search' element={<Search/>}></Route>
    <Route path='/game' element={<Game />}></Route>
    <Route path='/account' element={<Account />}></Route>
    <Route path='/promotion' element={<Promotion />}></Route>
    <Route path='/recharge' element={<Recharge />}></Route>
    <Route path='/bank' element={<Bank />}></Route>
    <Route path='/addbank' element={<AddBank />}></Route>
    <Route path='/editbank' element={<EditBank />}></Route>
    <Route path='/addupi' element={<AddUpi />}></Route>
    <Route path='/editupi' element={<EditUpi />}></Route>
    <Route path='/reset' element={<ResetPass />}></Route>
    <Route path='/transaction' element={<Transaction />}></Route>
    <Route path='/withdrawal' element={<Withdrawal />}></Route>
    <Route path='/recharge_record' element={<RechargeTransaction />}></Route>
    <Route path='/withdraw_record' element={<WithdrawalTransaction />}></Route>
    <Route path='/suggestion' element={<Suggestion />}></Route>
    <Route path='/report' element={<Report />}></Route>
    <Route path='/privacy' element={<Privacy />}></Route>
    <Route path='/agree' element={<Agreement />}></Route>
    <Route path='/bet_record' element={<BetRecord />}></Route>
    <Route path='/addsuggestion' element={<AddSuggestion />}></Route>
    <Route path='/product/:productId/:center' element={<ProductPage />}></Route>
   </Routes>
    </>
  );
}

export default App;