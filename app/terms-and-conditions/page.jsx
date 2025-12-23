"use client";
import Link from "next/link";
import Section from "../Components/Others/Section";
import { Button } from "@/components/ui/button";
import Navbar from "../Components/NonUser/Navbar";
export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 ">
      <Navbar/>
      <div className="max-w-4xl mx-auto my-5 bg-white border rounded-xl shadow-sm p-6 sm:p-10 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to the Lost & Found platform. By accessing or using this
          application, you agree to comply with and be bound by the following
          terms and conditions. Please read them carefully.
        </p>

        <Section
          title="1. Purpose of the Platform"
          content="This platform is intended to help users report, locate, and return lost or found items within the community. It is built on trust, honesty, and responsible usage."
        />

        <Section
          title="2. Account Registration"
          content={
            <>
              <p>
                To use most features of this platform, you must create an
                account and provide accurate information.
              </p>
              <p className="mt-2">
                Users are <strong>strongly encouraged</strong> to register using
                their official <strong>vit.edu email address</strong>. This
                helps maintain a verified and trustworthy community and allows
                faster identification and communication between users.
              </p>
              <p className="mt-2">
                While other email addresses may be allowed, accounts using
                non-institutional emails may have limited trust or visibility
                in certain cases.
              </p>
            </>
          }
        />

        <Section
          title="3. User Responsibilities"
          content={
            <ul className="list-disc list-inside space-y-2">
              <li>Provide truthful and accurate details when posting items.</li>
              <li>Do not post false, misleading, or fraudulent information.</li>
              <li>Upload images only if they genuinely belong to the item.</li>
              <li>Communicate respectfully with other users.</li>
            </ul>
          }
        />

        <Section
          title="4. Item Verification & Moderation"
          content="All lost and found requests may be reviewed by administrators. The platform reserves the right to verify, reject, or remove any request that violates guidelines or appears suspicious."
        />

        <Section
          title="5. Prohibited Activities"
          content={
            <ul className="list-disc list-inside space-y-2">
              <li>Posting fake lost or found requests.</li>
              <li>Impersonating another individual.</li>
              <li>Using the platform for harassment or spam.</li>
              <li>Attempting to misuse user contact information.</li>
            </ul>
          }
        />

        <Section
          title="6. Meetings & Item Exchange"
          content="When returning or collecting items, users are advised to meet in safe, public locations. The platform is not responsible for any incidents occurring during personal meetups."
        />

        <Section
          title="7. Account Actions"
          content="The platform reserves the right to warn, suspend, or permanently block users who violate these terms, misuse the system, or act against the interest of the community."
        />

        <Section
          title="8. Limitation of Liability"
          content="The platform acts only as an intermediary for communication. We do not guarantee the recovery of items and are not liable for losses, damages, or disputes between users."
        />

        <Section
          title="9. Changes to Terms"
          content="These terms may be updated from time to time. Continued use of the platform after changes implies acceptance of the revised terms."
        />

        <p className="mt-10 text-sm text-gray-500">
          By using this platform, you acknowledge that you have read,
          understood, and agreed to these Terms & Conditions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 text-center text-gray-500 text-sm flex items-center justify-center gap-3">
        <Link href="/register">
          <Button >
           Register
          </Button>
        </Link>
        <Link href="/login">
          <Button >
           Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

