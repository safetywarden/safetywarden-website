import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import GoogleAnalytics from './components/SEO/GoogleAnalytics';
import WhatsAppFloat from './components/WhatsAppFloat';
import PageTracker from './components/PageTracker';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/audit/ProtectedRoute';
import AuditLayout from './components/audit/AuditLayout';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import SolutionDetail from './pages/SolutionDetail';
import Industries from './pages/Industries';
import Resources from './pages/Resources';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import About from './pages/About';
import Features from './pages/Features';
import MarketplaceHome from './pages/marketplace/MarketplaceHome';
import CategoryPage from './pages/marketplace/CategoryPage';
import ProductDetail from './pages/marketplace/ProductDetail';
import VendorDirectory from './pages/marketplace/VendorDirectory';
import CreateRFQ from './pages/marketplace/CreateRFQ';
import ImportData from './pages/marketplace/admin/ImportData';
import ManpowerHome from './pages/manpower/ManpowerHome';
import ClientDashboard from './pages/manpower/client/ClientDashboard';
import WorkerDashboard from './pages/manpower/worker/WorkerDashboard';
import Login from './pages/audit/Login';
import Dashboard from './pages/audit/Dashboard';
import Sites from './pages/audit/Sites';
import ChecklistLibrary from './pages/audit/ChecklistLibrary';
import Audits from './pages/audit/Audits';
import NewAudit from './pages/audit/NewAudit';
import Database from './pages/admin/Database';
import AdminLogin from './pages/admin/AdminLogin';
import IntelligenceAdmin from './pages/admin/IntelligenceAdmin';
import IntelligenceEditor from './pages/admin/IntelligenceEditor';
import NewsConverter from './pages/admin/NewsConverter';
import NewsSourcesManager from './pages/admin/NewsSourcesManager';
import Analytics from './pages/admin/Analytics';
import TrainingHome from './pages/training/TrainingHome';
import CourseDetail from './pages/training/CourseDetail';
import SessionsList from './pages/training/SessionsList';
import CertificateVerify from './pages/training/CertificateVerify';
import AffiliatePortal from './pages/training/AffiliatePortal';
import ProviderPortal from './pages/training/ProviderPortal';
import TrainingAdmin from './pages/training/admin/TrainingAdmin';
import RobotLayout from './components/Layout/RobotLayout';
import RobotsHome from './pages/robots/RobotsHome';
import EducationAudit from './pages/EducationAudit';
import WardenS from './pages/robots/WardenS';
import WardenF from './pages/robots/WardenF';
import Plans from './pages/robots/Plans';
import HowItWorks from './pages/robots/HowItWorks';
import FAQ from './pages/robots/FAQ';
import BookDemo from './pages/robots/BookDemo';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogCategory from './pages/BlogCategory';
import BlogTag from './pages/BlogTag';
import IntelligenceHub from './pages/IntelligenceHub';
import IntelligenceCategory from './pages/IntelligenceCategory';
import IntelligenceDetail from './pages/IntelligenceDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GoogleAnalytics />
        <PageTracker />
        <WhatsAppFloat />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/solutions" element={
            <Layout>
              <Solutions />
            </Layout>
          } />
          <Route path="/solutions/:id" element={
            <Layout>
              <SolutionDetail />
            </Layout>
          } />
          <Route path="/industries" element={
            <Layout>
              <Industries />
            </Layout>
          } />
          <Route path="/resources" element={
            <Layout>
              <Resources />
            </Layout>
          } />
          <Route path="/pricing" element={
            <Layout>
              <Pricing />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout>
              <About />
            </Layout>
          } />
          <Route path="/features" element={
            <Layout>
              <Features />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <Contact />
            </Layout>
          } />
          <Route path="/education-audit" element={
            <Layout>
              <EducationAudit />
            </Layout>
          } />

          {/* Blog Routes */}
          <Route path="/blog" element={
            <Layout>
              <Blog />
            </Layout>
          } />
          <Route path="/blog/:slug" element={
            <Layout>
              <BlogPost />
            </Layout>
          } />
          <Route path="/blog/category/:categorySlug" element={
            <Layout>
              <BlogCategory />
            </Layout>
          } />
          <Route path="/blog/tag/:tagSlug" element={
            <Layout>
              <BlogTag />
            </Layout>
          } />

          {/* Intelligence Routes */}
          <Route path="/intelligence" element={
            <Layout>
              <IntelligenceHub />
            </Layout>
          } />
          <Route path="/intelligence/:categorySlug" element={
            <Layout>
              <IntelligenceCategory />
            </Layout>
          } />
          <Route path="/intelligence/:categorySlug/:slug" element={
            <Layout>
              <IntelligenceDetail />
            </Layout>
          } />

          <Route path="/marketplace" element={
            <Layout>
              <MarketplaceHome />
            </Layout>
          } />
          <Route path="/marketplace/category/:slug" element={
            <Layout>
              <CategoryPage />
            </Layout>
          } />
          <Route path="/marketplace/product/:id" element={
            <Layout>
              <ProductDetail />
            </Layout>
          } />
          <Route path="/marketplace/vendors" element={
            <Layout>
              <VendorDirectory />
            </Layout>
          } />
          <Route path="/marketplace/rfq/create" element={
            <Layout>
              <CreateRFQ />
            </Layout>
          } />
          <Route path="/marketplace/admin/import" element={
            <Layout>
              <ImportData />
            </Layout>
          } />
          <Route path="/manpower" element={
            <Layout>
              <ManpowerHome />
            </Layout>
          } />
          <Route path="/manpower/client/dashboard" element={
            <Layout>
              <ClientDashboard />
            </Layout>
          } />
          <Route path="/manpower/worker/dashboard" element={
            <Layout>
              <WorkerDashboard />
            </Layout>
          } />

          {/* Training Routes */}
          <Route path="/training" element={
            <Layout>
              <TrainingHome />
            </Layout>
          } />
          <Route path="/training/course/:code" element={
            <Layout>
              <CourseDetail />
            </Layout>
          } />
          <Route path="/training/sessions" element={
            <Layout>
              <SessionsList />
            </Layout>
          } />
          <Route path="/training/verify/:certId" element={
            <Layout>
              <CertificateVerify />
            </Layout>
          } />
          <Route path="/training/affiliate" element={
            <Layout>
              <AffiliatePortal />
            </Layout>
          } />
          <Route path="/training/provider" element={
            <Layout>
              <ProviderPortal />
            </Layout>
          } />
          <Route path="/training/admin" element={
            <Layout>
              <TrainingAdmin />
            </Layout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<IntelligenceAdmin />} />
          <Route path="/admin/intelligence" element={<IntelligenceAdmin />} />
          <Route path="/admin/intelligence/new" element={<IntelligenceEditor />} />
          <Route path="/admin/intelligence/edit/:id" element={<IntelligenceEditor />} />
          <Route path="/admin/news-converter" element={<NewsConverter />} />
          <Route path="/admin/news-sources" element={<NewsSourcesManager />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/database" element={
            <Layout>
              <Database />
            </Layout>
          } />

          {/* Robot Routes */}
          <Route path="/robots" element={
            <RobotLayout>
              <RobotsHome />
            </RobotLayout>
          } />
          <Route path="/robots/warden-s" element={
            <RobotLayout>
              <WardenS />
            </RobotLayout>
          } />
          <Route path="/robots/warden-f" element={
            <RobotLayout>
              <WardenF />
            </RobotLayout>
          } />
          <Route path="/plans" element={
            <RobotLayout>
              <Plans />
            </RobotLayout>
          } />
          <Route path="/how-it-works" element={
            <RobotLayout>
              <HowItWorks />
            </RobotLayout>
          } />
          <Route path="/faq" element={
            <RobotLayout>
              <FAQ />
            </RobotLayout>
          } />
          <Route path="/book-demo" element={
            <RobotLayout>
              <BookDemo />
            </RobotLayout>
          } />

          {/* Robot Routes */}
          <Route path="/robots" element={
            <RobotLayout>
              <RobotsHome />
            </RobotLayout>
          } />
          <Route path="/robots/warden-s" element={
            <RobotLayout>
              <WardenS />
            </RobotLayout>
          } />
          <Route path="/robots/warden-f" element={
            <RobotLayout>
              <WardenF />
            </RobotLayout>
          } />
          <Route path="/plans" element={
            <RobotLayout>
              <Plans />
            </RobotLayout>
          } />
          <Route path="/how-it-works" element={
            <RobotLayout>
              <HowItWorks />
            </RobotLayout>
          } />
          <Route path="/faq" element={
            <RobotLayout>
              <FAQ />
            </RobotLayout>
          } />
          <Route path="/book-demo" element={
            <RobotLayout>
              <BookDemo />
            </RobotLayout>
          } />

          {/* Auth Routes */}
          <Route path="/app/auth/login" element={<Login />} />

          {/* Protected Audit App Routes */}
          <Route path="/app/audit" element={
            <ProtectedRoute>
              <AuditLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="sites" element={<Sites />} />
            <Route path="checklist" element={<ChecklistLibrary />} />
            <Route path="audits" element={<Audits />} />
            <Route path="audits/new" element={<NewAudit />} />
            <Route path="actions" element={<div className="p-6">Actions - Coming Soon</div>} />
            <Route path="reports" element={<div className="p-6">Reports - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-6">Settings - Coming Soon</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={
            <Layout>
              <Home />
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;