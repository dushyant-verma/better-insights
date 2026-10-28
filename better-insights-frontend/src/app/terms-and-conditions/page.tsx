import React from "react";
import { InnerPageHero } from "@/components/hero/InnerPageHero";
import { getPageBySlug } from "@/lib/wordpress/api";

export const metadata = {
  title: "Terms and Conditions | Better Insights",
  description: "Terms and conditions governing the use of Better Insights consulting services, platforms, and website.",
};

export const revalidate = 60;

const FALLBACK_TERMS_CONTENT = `
  <p>These Terms and Conditions govern your access to and use of the Better Insights website (accessible at betterinsights.in), operated by Digispace Global Ventures Private Limited. By browsing or utilizing this website, you agree to comply with and be bound by these terms.</p>

  <div style="background: #F8F7F4; border: 1px solid rgba(0,0,0,0.1); border-radius: 1rem; padding: 1.5rem; margin: 1.5rem 0;">
    <p style="margin: 0 0 0.5rem 0;"><strong>Entity:</strong> Digispace Global Ventures Private Limited, an incorporated entity under the laws of India, trading as Better Insights.</p>
    <p style="margin: 0 0 0.5rem 0;"><strong>Registered Address:</strong> Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa, Pune – 411048, Maharashtra, India</p>
    <p style="margin: 0;"><strong>Legal Inquiries:</strong> <a href="mailto:contact@betterinsights.in">contact@betterinsights.in</a></p>
  </div>

  <h2>1. Website Use and Acceptable Conduct</h2>
  <p>You agree to use this website only for legitimate, lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit the use and enjoyment of this site by any third party. Prohibited conduct includes, without limitation:</p>
  <ul>
    <li>Attempting to interfere with the proper working of the website or circumventing network security measures.</li>
    <li>Using automated data-gathering, scraping, crawling, or extraction tools without express prior written consent.</li>
    <li>Submitting false, deceptive, or spam information through any contact form, lead form, or application interface.</li>
    <li>Introducing malicious software, viruses, trojans, or harmful code to the website infrastructure.</li>
  </ul>

  <h2>2. Intellectual Property Rights</h2>
  <p>All content, branding, visual designs, typography, illustrations, case study narratives, graphics, trademarks, and custom software code published on this website are the intellectual property of Digispace Global Ventures Private Limited or its respective licensors. No portion of this site may be reproduced, copied, republished, distributed, or commercially exploited without our explicit prior written authorization.</p>

  <h2>3. Service Inquiries &amp; Marketing Plan Requests</h2>
  <p>Submitting an enquiry, contact form, or “Get Marketing Plan” request through this website does not constitute a binding contract or guarantee the provision of services. Any prospective client engagement, scope of work, timeline, or deliverable is subject to a formal, mutually executed Master Services Agreement (MSA) and Statement of Work (SOW) between Digispace Global Ventures Private Limited and the client organization.</p>

  <h2>4. Third-Party Links and External Resources</h2>
  <p>This website may contain links to external third-party websites, calculators (such as the Cost Per Result tool), or platforms that are not operated or controlled by Better Insights. We do not endorse and assume no responsibility for the content, privacy practices, or availability of third-party sites or external tools.</p>

  <h2>5. Disclaimers and Limitation of Liability</h2>
  <p>The materials and information on this website are provided on an “as is” and “as available” basis for general informational and marketing purposes only. While we endeavor to keep all information current and accurate, Better Insights makes no warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or availability of the website.</p>
  <p>To the fullest extent permitted by applicable law, Digispace Global Ventures Private Limited and its directors, officers, and employees shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your access to, use of, or inability to use this website.</p>

  <h2>6. Changes to These Terms</h2>
  <p>We reserve the right to revise and amend these Terms and Conditions at any time. When changes are made, the “Last Updated” date at the top of this document will be revised accordingly. Your continued use of the website following the posting of updated terms constitutes acceptance of those changes.</p>

  <h2>7. Contact Information</h2>
  <p>If you have any questions or require legal clarification concerning these Terms and Conditions, please contact us at:</p>
  <p><strong>Digispace Global Ventures Private Limited</strong><br />Legal &amp; Compliance Desk<br />Email: <a href="mailto:contact@betterinsights.in">contact@betterinsights.in</a><br />Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa, Pune – 411048, Maharashtra, India</p>

  <div style="margin-top: 2rem; padding: 1.25rem; border-left: 4px solid #111111; background: #F8F7F4; font-size: 0.875rem; color: #555;">
    <strong>Owner / Counsel Notice:</strong> The terms presented on this page govern general website visitation and introductory communications. Formal commercial partnerships and client projects are governed by bespoke commercial contracts executed directly with Digispace Global Ventures Private Limited.
  </div>
`;

export default async function TermsAndConditionsPage() {
  const page = await getPageBySlug("terms-and-conditions");

  const title = page?.title?.rendered || "Terms & Conditions";
  const content = page?.content?.rendered || FALLBACK_TERMS_CONTENT;

  return (
    <>
      <InnerPageHero
        eyebrow="Legal &amp; Compliance"
        title={title}
        description="Terms and conditions governing the use of our website, materials, and digital services."
        variant="light"
        breadcrumb={[{ label: "Terms & Conditions" }]}
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
