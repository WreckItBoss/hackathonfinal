import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import DrawerAppBar from './DrawerAppBar';
import FlowerShop from './FlowerShop';
import Garden from './Garden';
import Bouquet from './Bouquet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/*"
          element={
            <>
              <DrawerAppBar />
              <Routes>
                <Route path="/flower-shop" element={<FlowerShop />} />
                <Route path="/garden" element={<Garden />} />
                <Route path="/bouquet" element={<Bouquet />} />
                <Route path="/" element={<Navigate to="/flower-shop" />} /> {/* Default route after login */}
              </Routes>
            </>
          }
        />
        <Route path="/" element={<Navigate to="/sign-in" />} /> {/* 初期ルートをログイン画面にリダイレクト */}
        <Route path="*" element={<Navigate to="/sign-in" />} /> {/* 未定義ルートもログイン画面にリダイレクト */}
      </Routes>
    </Router>
  );
}

export default App;
