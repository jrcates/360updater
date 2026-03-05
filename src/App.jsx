import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import CompaniesContent from './components/CompaniesContent'
import CompanyAddContent from './components/CompanyAddContent'
import CompanyDetailContent from './components/CompanyDetailContent'
import ContactsContent from './components/ContactsContent'
import ContactDetailContent from './components/ContactDetailContent'
import QuotesContent from './components/QuotesContent'
import QuoteDetailContent from './components/QuoteDetailContent'
import OrdersContent from './components/OrdersContent'
import OrderDetailContent from './components/OrderDetailContent'
import DesignSystemContent from './components/DesignSystemContent'
import RightSidebar from './components/RightSidebar'

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contacts" element={<ContactsContent />} />
        <Route path="/contacts/:contactId" element={<ContactDetailContent />} />
        <Route path="/companies" element={<CompaniesContent />} />
        <Route path="/companies/new" element={<CompanyAddContent />} />
        <Route path="/companies/:companyId" element={<CompanyDetailContent />} />
        <Route path="/quotes" element={<QuotesContent />} />
        <Route path="/quotes/:quoteId" element={<QuoteDetailContent />} />
        <Route path="/orders" element={<OrdersContent />} />
        <Route path="/orders/:orderId" element={<OrderDetailContent />} />
        <Route path="/design-system" element={<DesignSystemContent />} />
      </Routes>
      <RightSidebar />
    </div>
  )
}

export default App
