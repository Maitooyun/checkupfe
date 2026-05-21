import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ChatbotPage from './pages/ChatbotPage'
import ReportFormPage from './pages/ReportFormPage'
import ReportSuccessPage from './pages/ReportSuccessPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ChatbotPage />} />
          <Route path="report" element={<ReportFormPage />} />
          <Route path="report/success" element={<ReportSuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
