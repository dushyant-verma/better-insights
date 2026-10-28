import React from "react";
import { InnerPageHero } from "@/components/hero/InnerPageHero";
import { getPageBySlug } from "@/lib/wordpress/api";

export const metadata = {
  title: "Privacy Policy | Better Insights",
  description: "Better Insights privacy policy, data protection standards, and client confidentiality guidelines.",
};

export const revalidate = 60;

const FALLBACK_PRIVACY_CONTENT = `
  <p>At Better Insights, operated by Digispace Global Ventures Private Limited, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document details the types of information collected and recorded by Better Insights and how we use, safeguard, and disclose that information.</p>

  <div style="background: #F8F7F4; border: 1px solid rgba(0,0,0,0.1); border-radius: 1rem; padding: 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem 0;"><strong>Entity:</strong> Digispace Global Ventures Private Limited (operating Better Insights)</p>
    <p style="margin: 0 0 0.5rem 0;"><strong>Registered Address:</strong> Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa, Pune – 411048, Maharashtra, India</p>
    <p style="margin: 0;"><strong>Direct Inquiries:</strong> <a href="mailto:contact@betterinsights.in">contact@betterinsights.in</a> | Phone: <a href="tel:+919509996730">+91 950 999 6730</a></p>
  </div>

  <h2>1. Consent</h2>
  <p>By using our website, submitting an enquiry, or requesting a marketing plan, you hereby consent to our Privacy Policy and agree to its terms. If you do not agree with any part of this policy, please refrain from using our digital services.</p>

  <h2>2. Information We Collect</h2>
  <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we request it.</p>
  <ul>
    <li><strong>Direct Inquiries &amp; Contact Forms:</strong> When you submit an enquiry via our contact forms, footer lead form, or “Get Marketing Plan” request, we collect your name, business email address, phone number, company name, and the detailed contents of your message or strategic challenge.</li>
    <li><strong>Client Account &amp; Consultation Data:</strong> When engaging our consulting, engineering, or marketing services, we collect formal organization details, billing information, and project scope materials.</li>
    <li><strong>Guest Submissions &amp; Editorial Pitches:</strong> If you submit an editorial pitch or guest post via our “Write for Us” portal, we collect your author bio, editorial samples, and social attribution links.</li>
  </ul>

  <h2>3. How We Use Your Information</h2>
  <p>We use the information we collect across our operations to:</p>
  <ul>
    <li>Provide, operate, optimize, and maintain our website and digital services.</li>
    <li>Evaluate and prepare custom strategic marketing proposals, digital engineering audits, and client roadmaps.</li>
    <li>Communicate with you directly, including responding to inquiries, providing customer service updates, and delivering relevant company announcements.</li>
    <li>Analyze user trends, traffic sources, and website interaction metrics to enhance user experience and navigational architecture.</li>
    <li>Detect, investigate, and prevent fraudulent activity, spam submissions, or unauthorized platform interactions.</li>
    <li>Comply with applicable statutory and regulatory obligations.</li>
  </ul>

  <h2>4. Log Files &amp; Automated Data Collection</h2>
  <p>Better Insights follows standard industry procedures of using server log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and the number of clicks. These data points are not linked to any information that is personally identifiable and are used solely for analyzing operational trends, administering the site, and ensuring server security.</p>

  <h2>5. Cookies and Web Technologies</h2>
  <p>Better Insights utilizes standard web cookies to store visitor preferences, record user-specific session data, and customize web page content based on browser types. You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the respective browser support websites.</p>

  <h2>6. Third-Party Analytics and External Services</h2>
  <p>We may engage reputable third-party analytics and infrastructure providers (such as Google Analytics and Google Tag Manager) to help evaluate how visitors engage with our content. Third-party ad servers or networks may use technologies like cookies, JavaScript, or Web Beacons that are sent directly to users’ browsers. Better Insights has no access to or control over these cookies used by external third-party tools.</p>

  <h2>7. User Rights &amp; Data Protection</h2>
  <p>Depending on your geographic location, you may be entitled to specific statutory data protection rights, including:</p>
  <ul>
    <li><strong>The Right to Access:</strong> You have the right to request copies of your personal data held by us.</li>
    <li><strong>The Right to Rectification:</strong> You have the right to request correction of inaccurate data or completion of incomplete information.</li>
    <li><strong>The Right to Erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
    <li><strong>The Right to Restrict Processing:</strong> You have the right to request that we restrict processing of your personal data under certain circumstances.</li>
    <li><strong>The Right to Object:</strong> You have the right to object to our processing of your personal data for direct marketing or legitimate interests.</li>
    <li><strong>The Right to Data Portability:</strong> You have the right to request transfer of your collected data to another organization or directly to you.</li>
  </ul>
  <p>If you submit a privacy request, we will respond within 30 days. To exercise any of these rights, please contact our privacy desk at <a href="mailto:contact@betterinsights.in">contact@betterinsights.in</a>.</p>

  <h2>8. Protection of Children’s Privacy</h2>
  <p>Protecting children online is paramount. Better Insights does not knowingly collect any personally identifiable information from children under the age of 13. If you believe that your child has provided personal information on our website, please contact us immediately, and we will take prompt steps to remove such records.</p>

  <h2>9. Contact Information</h2>
  <p>If you have questions, feedback, or concerns regarding this Privacy Policy, please reach out to us at:</p>
  <p><strong>Digispace Global Ventures Private Limited</strong><br />Attn: Privacy &amp; Data Protection Desk<br />Email: <a href="mailto:contact@betterinsights.in">contact@betterinsights.in</a><br />Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa, Pune – 411048, Maharashtra, India</p>
`;

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy-policy");

  const title = page?.title?.rendered || "Privacy Policy";
  const content = page?.content?.rendered || FALLBACK_PRIVACY_CONTENT;

  return (
    <>
      <InnerPageHero
        eyebrow="Legal &amp; Compliance"
        title={title}
        description="Our commitment to client privacy, transparent data processing, and digital security."
        variant="light"
        breadcrumb={[{ label: "Privacy Policy" }]}
      />

      <section className="py-20 sm:py-28 bg-[#FAF5F0] select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="bg-white rounded-[1.75rem] p-8 sm:p-14 border border-black/10 shadow-2xs leading-relaxed text-sm sm:text-base text-[#1B1411]/80 font-normal space-y-6 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-[-0.03em] [&>h2]:[font-family:'Host_Grotesk',sans-serif] [&>h2]:text-[#1B1411] [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&_a]:text-[#1B1411] [&_a]:underline hover:[&_a]:text-[#33CC7A]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </>
  );
}
