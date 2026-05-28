import React, { Suspense, lazy, useEffect } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GoogleAnalytics from './components/SEO/GoogleAnalytics';
import PublicLayout from './components/Layout/PublicLayout';
import { trackMarketingPageVisit } from './utils/analytics';

const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'));
const Industries = lazy(() => import('./pages/Industries'));
const Resources = lazy(() => import('./pages/Resources'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const EducationAudit = lazy(() => import('./pages/EducationAudit'));
const FireSafety = lazy(() => import('./pages/FireSafety'));
const WorkflowsHub = lazy(() => import('./pages/workflows/WorkflowsHub'));
const WorkflowDetailPage = lazy(() => import('./pages/workflows/WorkflowDetailPage'));
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const Cookies = lazy(() => import('./pages/legal/Cookies'));
const Company = lazy(() => import('./pages/legal/Company'));
const Security = lazy(() => import('./pages/legal/Security'));

const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogCategory = lazy(() => import('./pages/BlogCategory'));
const BlogTag = lazy(() => import('./pages/BlogTag'));

const IntelligenceHub = lazy(() => import('./pages/IntelligenceHub'));
const IntelligenceCategory = lazy(() => import('./pages/IntelligenceCategory'));
const IntelligenceDetail = lazy(() => import('./pages/IntelligenceDetail'));

const MarketplaceHome = lazy(() => import('./pages/marketplace/MarketplaceHome'));
const CategoryPage = lazy(() => import('./pages/marketplace/CategoryPage'));
const ProductDetail = lazy(() => import('./pages/marketplace/ProductDetail'));
const VendorDirectory = lazy(() => import('./pages/marketplace/VendorDirectory'));
const CreateRFQ = lazy(() => import('./pages/marketplace/CreateRFQ'));
const ImportData = lazy(() => import('./pages/marketplace/admin/ImportData'));

const ManpowerHome = lazy(() => import('./pages/manpower/ManpowerHome'));
const ClientDashboard = lazy(() => import('./pages/manpower/client/ClientDashboard'));
const WorkerDashboard = lazy(() => import('./pages/manpower/worker/WorkerDashboard'));

const TrainingHome = lazy(() => import('./pages/training/TrainingHome'));
const CourseDetail = lazy(() => import('./pages/training/CourseDetail'));
const SessionsList = lazy(() => import('./pages/training/SessionsList'));
const CertificateVerify = lazy(() => import('./pages/training/CertificateVerify'));
const AffiliatePortal = lazy(() => import('./pages/training/AffiliatePortal'));
const ProviderPortal = lazy(() => import('./pages/training/ProviderPortal'));
const TrainingAdmin = lazy(() => import('./pages/training/admin/TrainingAdmin'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const IntelligenceAdmin = lazy(() => import('./pages/admin/IntelligenceAdmin'));
const IntelligenceEditor = lazy(() => import('./pages/admin/IntelligenceEditor'));
const NewsConverter = lazy(() => import('./pages/admin/NewsConverter'));
const NewsSourcesManager = lazy(() => import('./pages/admin/NewsSourcesManager'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Database = lazy(() => import('./pages/admin/Database'));

const RobotLayout = lazy(() => import('./components/Layout/RobotLayout'));
const RobotsHome = lazy(() => import('./pages/robots/RobotsHome'));
const WardenS = lazy(() => import('./pages/robots/WardenS'));
const WardenF = lazy(() => import('./pages/robots/WardenF'));
const Plans = lazy(() => import('./pages/robots/Plans'));
const HowItWorks = lazy(() => import('./pages/robots/HowItWorks'));
const FAQ = lazy(() => import('./pages/robots/FAQ'));
const BookDemo = lazy(() => import('./pages/robots/BookDemo'));

const AuthProviderModule = lazy(() =>
  import('./contexts/AuthContext').then((module) => ({ default: module.AuthProvider }))
);
const ProtectedRoute = lazy(() => import('./components/audit/ProtectedRoute'));
const AuditLayout = lazy(() => import('./components/audit/AuditLayout'));
const Dashboard = lazy(() => import('./pages/audit/Dashboard'));
const Sites = lazy(() => import('./pages/audit/Sites'));
const ChecklistLibrary = lazy(() => import('./pages/audit/ChecklistLibrary'));
const Audits = lazy(() => import('./pages/audit/Audits'));
const NewAudit = lazy(() => import('./pages/audit/NewAudit'));

const APP_LOGIN_URL = 'https://app.safetywarden.com';

function MarketingPage({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

function RobotPage({ children }: { children: React.ReactNode }) {
  return <RobotLayout>{children}</RobotLayout>;
}

function AuditApp() {
  return (
    <AuthProviderModule>
      <ProtectedRoute>
        <AuditLayout />
      </ProtectedRoute>
    </AuthProviderModule>
  );
}

function MarketingEventTracker() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/esg-brsr' || location.pathname === '/resources') {
      trackMarketingPageVisit('esg_brsr', location.pathname);
    }

    if (location.pathname === '/workflows') {
      trackMarketingPageVisit('workflow_hub', location.pathname);
    }

    if (location.pathname.startsWith('/workflows/')) {
      trackMarketingPageVisit('workflow_detail', location.pathname);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <VercelAnalytics />
      <SpeedInsights />
      <MarketingEventTracker />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MarketingPage><Home /></MarketingPage>} />
          <Route path="/solutions" element={<MarketingPage><Solutions /></MarketingPage>} />
          <Route path="/solutions/:id" element={<MarketingPage><SolutionDetail /></MarketingPage>} />
          <Route path="/industries" element={<MarketingPage><Industries /></MarketingPage>} />
          <Route path="/resources" element={<MarketingPage><Resources /></MarketingPage>} />
          <Route path="/pricing" element={<MarketingPage><Pricing /></MarketingPage>} />
          <Route path="/careers" element={<MarketingPage><Careers /></MarketingPage>} />
          <Route path="/about" element={<MarketingPage><About /></MarketingPage>} />
          <Route path="/features" element={<MarketingPage><Features /></MarketingPage>} />
          <Route path="/contact" element={<MarketingPage><Contact /></MarketingPage>} />
          <Route path="/esg-brsr" element={<MarketingPage><Resources /></MarketingPage>} />
          <Route path="/fire-safety" element={<MarketingPage><FireSafety /></MarketingPage>} />
          <Route path="/workflows" element={<MarketingPage><WorkflowsHub /></MarketingPage>} />
          <Route path="/workflows/:workflowKey" element={<MarketingPage><WorkflowDetailPage /></MarketingPage>} />
          <Route path="/education-audit" element={<MarketingPage><EducationAudit /></MarketingPage>} />
          <Route path="/privacy" element={<MarketingPage><Privacy /></MarketingPage>} />
          <Route path="/terms" element={<MarketingPage><Terms /></MarketingPage>} />
          <Route path="/cookies" element={<MarketingPage><Cookies /></MarketingPage>} />
          <Route path="/company" element={<MarketingPage><Company /></MarketingPage>} />
          <Route path="/security" element={<MarketingPage><Security /></MarketingPage>} />

          <Route path="/blog" element={<MarketingPage><Blog /></MarketingPage>} />
          <Route path="/blog/:slug" element={<MarketingPage><BlogPost /></MarketingPage>} />
          <Route path="/blog/category/:categorySlug" element={<MarketingPage><BlogCategory /></MarketingPage>} />
          <Route path="/blog/tag/:tagSlug" element={<MarketingPage><BlogTag /></MarketingPage>} />

          <Route path="/intelligence" element={<MarketingPage><IntelligenceHub /></MarketingPage>} />
          <Route path="/intelligence/:categorySlug" element={<MarketingPage><IntelligenceCategory /></MarketingPage>} />
          <Route path="/intelligence/:categorySlug/:slug" element={<MarketingPage><IntelligenceDetail /></MarketingPage>} />

          <Route path="/marketplace" element={<MarketingPage><MarketplaceHome /></MarketingPage>} />
          <Route path="/marketplace/category/:slug" element={<MarketingPage><CategoryPage /></MarketingPage>} />
          <Route path="/marketplace/product/:id" element={<MarketingPage><ProductDetail /></MarketingPage>} />
          <Route path="/marketplace/vendors" element={<MarketingPage><VendorDirectory /></MarketingPage>} />
          <Route path="/marketplace/rfq/create" element={<MarketingPage><CreateRFQ /></MarketingPage>} />
          <Route path="/marketplace/admin/import" element={<MarketingPage><ImportData /></MarketingPage>} />

          <Route path="/manpower" element={<MarketingPage><ManpowerHome /></MarketingPage>} />
          <Route path="/manpower/client/dashboard" element={<MarketingPage><ClientDashboard /></MarketingPage>} />
          <Route path="/manpower/worker/dashboard" element={<MarketingPage><WorkerDashboard /></MarketingPage>} />

          <Route path="/training" element={<MarketingPage><TrainingHome /></MarketingPage>} />
          <Route path="/training/course/:code" element={<MarketingPage><CourseDetail /></MarketingPage>} />
          <Route path="/training/sessions" element={<MarketingPage><SessionsList /></MarketingPage>} />
          <Route path="/training/verify/:certId" element={<MarketingPage><CertificateVerify /></MarketingPage>} />
          <Route path="/training/affiliate" element={<MarketingPage><AffiliatePortal /></MarketingPage>} />
          <Route path="/training/provider" element={<MarketingPage><ProviderPortal /></MarketingPage>} />
          <Route path="/training/admin" element={<MarketingPage><TrainingAdmin /></MarketingPage>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<IntelligenceAdmin />} />
          <Route path="/admin/intelligence" element={<IntelligenceAdmin />} />
          <Route path="/admin/intelligence/new" element={<IntelligenceEditor />} />
          <Route path="/admin/intelligence/edit/:id" element={<IntelligenceEditor />} />
          <Route path="/admin/news-converter" element={<NewsConverter />} />
          <Route path="/admin/news-sources" element={<NewsSourcesManager />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/database" element={<MarketingPage><Database /></MarketingPage>} />

          <Route path="/robots" element={<RobotPage><RobotsHome /></RobotPage>} />
          <Route path="/robots/warden-s" element={<RobotPage><WardenS /></RobotPage>} />
          <Route path="/robots/warden-f" element={<RobotPage><WardenF /></RobotPage>} />
          <Route path="/plans" element={<RobotPage><Plans /></RobotPage>} />
          <Route path="/how-it-works" element={<RobotPage><HowItWorks /></RobotPage>} />
          <Route path="/faq" element={<RobotPage><FAQ /></RobotPage>} />
          <Route path="/book-demo" element={<RobotPage><BookDemo /></RobotPage>} />

          <Route path="/app/auth/login" element={<ExternalRedirect to={APP_LOGIN_URL} />} />
          <Route path="/app" element={<ExternalRedirect to={APP_LOGIN_URL} />} />
          <Route path="/app/*" element={<ExternalRedirect to={APP_LOGIN_URL} />} />

          <Route path="/app/audit" element={<AuditApp />}>
            <Route index element={<Dashboard />} />
            <Route path="sites" element={<Sites />} />
            <Route path="checklist" element={<ChecklistLibrary />} />
            <Route path="audits" element={<Audits />} />
            <Route path="audits/new" element={<NewAudit />} />
            <Route path="actions" element={<div className="p-6">Actions - Coming Soon</div>} />
            <Route path="reports" element={<div className="p-6">Reports - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-6">Settings - Coming Soon</div>} />
          </Route>

          <Route path="*" element={<MarketingPage><Home /></MarketingPage>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return null;
}

export default App;
