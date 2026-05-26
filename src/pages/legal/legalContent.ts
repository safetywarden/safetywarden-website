import type { LegalPageContent } from './LegalPage';

const updated = 'May 26, 2026';

export const privacyContent: LegalPageContent = {
  title: 'Privacy Policy',
  eyebrow: 'Privacy and data use',
  description: 'How SafetyWarden handles website inquiries, enterprise platform data, operational evidence and analytics information.',
  canonicalPath: '/privacy',
  updated,
  sections: [
    {
      title: 'Information We Collect',
      body: 'SafetyWarden collects information needed to respond to enterprise inquiries, operate the platform and improve the website experience.',
      items: [
        'Business contact details such as name, email address, phone number, company, role and message content shared through direct outreach channels.',
        'Website usage information including page visits, browser/device information, referrer, approximate location signals and interaction events where analytics are enabled.',
        'Operational platform information such as user accounts, organization details, site records, audit workflows, findings, CAPA actions, ESG/BRSR inputs and reporting activity.',
        'Evidence and files uploaded by authorized platform users, including inspection photos, documents, checklists and supporting records.'
      ]
    },
    {
      title: 'How We Use Information',
      items: [
        'To respond to demo, pilot, procurement and compliance digitization discussions.',
        'To provide platform access, audit workflows, evidence traceability, CAPA tracking and governance reporting.',
        'To maintain security, troubleshoot issues, measure product performance and improve the reliability of SafetyWarden services.',
        'To support lawful business administration, contractual obligations and regulatory or legal requirements.'
      ]
    },
    {
      title: 'Analytics and Cookies',
      body: 'SafetyWarden may use analytics and performance tools to understand website traffic and improve enterprise content, page performance and user experience. Analytics failures are designed not to affect website or platform usage.'
    },
    {
      title: 'Third-Party Services',
      body: 'SafetyWarden may use trusted cloud, analytics, communication, scheduling and infrastructure providers to operate the website and platform. These services are used for operational delivery and are not intended for unrelated consumer advertising.'
    },
    {
      title: 'Security and Retention',
      items: [
        'Access to operational data is limited to authorized users and service personnel based on business need.',
        'Data is retained for the period required to support platform operations, audit traceability, customer relationships, legal obligations and legitimate business records.',
        'Retention periods may differ depending on pilot scope, enterprise agreement, evidence type and regulatory requirements.'
      ]
    },
    {
      title: 'Your Rights and Contact',
      body: 'Enterprise customers and website visitors may request correction, deletion or access to personal information where applicable under law and contractual terms. Contact hello@safetywarden.com for privacy-related requests.'
    }
  ]
};

export const termsContent: LegalPageContent = {
  title: 'Terms of Use',
  eyebrow: 'Website and platform terms',
  description: 'Professional terms for using the SafetyWarden website, pilot discussions and enterprise compliance platform access.',
  canonicalPath: '/terms',
  updated,
  sections: [
    {
      title: 'Website Use',
      body: 'The SafetyWarden website provides information about enterprise compliance operations, audits, ESG/BRSR governance, inspection readiness and related platform capabilities. Website content is for business evaluation and informational use.'
    },
    {
      title: 'Platform Access',
      items: [
        'Access to the SafetyWarden platform may require an approved account, pilot scope, subscription, statement of work or enterprise agreement.',
        'Users are responsible for keeping account credentials confidential and for ensuring platform activity is authorized by their organization.',
        'Platform workflows, templates and reports should be reviewed by competent internal teams or advisors before relying on them for formal regulatory submissions.'
      ]
    },
    {
      title: 'Acceptable Use',
      items: [
        'Do not use SafetyWarden for unlawful, misleading, infringing or unauthorized activities.',
        'Do not upload malicious content, attempt unauthorized access, disrupt service operation or misuse evidence records.',
        'Do not represent generated outputs, reports or templates as official regulatory advice unless reviewed and approved through the appropriate professional or organizational process.'
      ]
    },
    {
      title: 'Intellectual Property',
      body: 'SafetyWarden content, platform design, workflows, software, documentation, visual assets and related materials are owned by or licensed to BCONZ International OPC Private Limited. Customer operational data remains subject to the applicable customer agreement.'
    },
    {
      title: 'Availability and Pilot Usage',
      body: 'SafetyWarden works to maintain reliable services, but website and platform availability may vary due to maintenance, infrastructure events or third-party service dependencies. Pilot and demo environments may be limited in scope and are used for evaluation.'
    },
    {
      title: 'Liability and Governing Law',
      body: 'To the maximum extent permitted by law, SafetyWarden is not liable for indirect, incidental or consequential losses arising from website use or pilot evaluation. These terms are governed by the laws of India, unless a separate written agreement states otherwise.'
    }
  ]
};

export const cookiesContent: LegalPageContent = {
  title: 'Cookie Policy',
  eyebrow: 'Cookies and analytics',
  description: 'How SafetyWarden uses limited cookies and browser technologies for website performance, analytics and session functionality.',
  canonicalPath: '/cookies',
  updated,
  sections: [
    {
      title: 'How Cookies Are Used',
      body: 'SafetyWarden uses cookies and similar browser technologies in a measured way to support website reliability, basic analytics, platform sessions and performance monitoring.'
    },
    {
      title: 'Cookie Categories',
      items: [
        'Essential cookies that support session functionality, security controls and platform login flows.',
        'Analytics cookies or scripts that help understand page performance, content engagement and traffic patterns.',
        'Performance monitoring tools that help identify errors, slow pages and service reliability issues.'
      ]
    },
    {
      title: 'Browser Controls',
      body: 'Most browsers allow users to block, delete or limit cookies. Blocking essential cookies may affect login, session continuity or platform features.'
    },
    {
      title: 'No Consumer Advertising Positioning',
      body: 'SafetyWarden is an enterprise B2B compliance platform. Cookie usage is intended for operational delivery, analytics and service improvement, not consumer-style advertising experiences.'
    }
  ]
};

export const companyContent: LegalPageContent = {
  title: 'Company Information and Legal Notice',
  eyebrow: 'Company information',
  description: 'Company and operating information for SafetyWarden, a compliance operations platform developed and operated by BCONZ International OPC Private Limited.',
  canonicalPath: '/company',
  updated,
  sections: [
    {
      title: 'SafetyWarden Overview',
      body: 'SafetyWarden is an enterprise compliance operations platform for audits, inspections, evidence management, CAPA governance, ESG/BRSR readiness and operational reporting across industrial and infrastructure environments.'
    },
    {
      title: 'Operating Entity',
      items: [
        'SafetyWarden is developed and operated by BCONZ International OPC Private Limited.',
        'Registered operating location: Bengaluru, Karnataka, India.',
        'Business contact: hello@safetywarden.com.',
        'SafetyWarden is positioned for founder-led pilot discussions and enterprise deployment planning.'
      ]
    },
    {
      title: 'Startup India Recognition',
      body: 'SafetyWarden is associated with DPIIT Startup India recognition. This statement is provided as a trust signal and should not be read as a government endorsement of specific product claims.'
    },
    {
      title: 'Operational Compliance Focus',
      body: 'The platform is built around inspection readiness, audit workflows, regulatory intelligence, site-level evidence, corrective action visibility and governance reporting for enterprise operating teams.'
    }
  ]
};

export const securityContent: LegalPageContent = {
  title: 'Security & Data Handling',
  eyebrow: 'Security posture',
  description: 'A practical overview of SafetyWarden security, access control, evidence handling and operational governance practices.',
  canonicalPath: '/security',
  updated,
  sections: [
    {
      title: 'Security Approach',
      body: 'SafetyWarden is designed as an operational governance platform where audit records, findings, CAPA actions and evidence require controlled access, traceability and accountable workflows.'
    },
    {
      title: 'Access and Traceability',
      items: [
        'Role-based access patterns are used to separate administrative, management and operational responsibilities where configured.',
        'Audit workflows are designed to preserve evidence linkage, action ownership, status history and reporting context.',
        'Enterprise pilots may define site, user and workflow boundaries before broader deployment.'
      ]
    },
    {
      title: 'Evidence and Files',
      body: 'Uploaded files and evidence records are handled as operational compliance material. Customers should avoid uploading unrelated personal, sensitive or confidential material unless it is required for the agreed workflow and authorized by their organization.'
    },
    {
      title: 'Cloud and Infrastructure',
      body: 'SafetyWarden uses cloud-hosted infrastructure and third-party service providers to deliver the website and platform. Security practices may include access controls, encrypted transport, environment separation and operational monitoring depending on deployment scope.'
    },
    {
      title: 'Responsible Disclosure',
      body: 'Security concerns, suspected vulnerabilities or data handling questions can be reported to hello@safetywarden.com. Please include enough technical detail to support responsible review.'
    },
    {
      title: 'Certification Notice',
      body: 'SafetyWarden does not claim ISO 27001, SOC 2 or similar certification unless explicitly stated in a signed enterprise document or official certification notice.'
    }
  ]
};
