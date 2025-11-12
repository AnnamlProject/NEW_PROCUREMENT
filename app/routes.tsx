
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PRListPage } from '../pages/pr/PRList';
import { Layout } from '../components/Layout';

export function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/pr" replace />} />
          <Route path="pr" element={<PRListPage />} />
          {/* Other routes like rfq, po, etc. will be added here */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
