import React from 'react'
import Navbar from '../NonUser/Navbar';

export default function AccountBlockedBox() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border border-red-200 rounded-xl shadow-md p-6 text-center">
        
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-2xl">🚫</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Account Blocked
        </h2>

        <p className="text-gray-700 text-sm mb-4">
          Your account has been temporarily blocked due to repeated misuse of the platform.
        </p>

        <p className="text-gray-600 text-sm mb-4">
          Please wait for an administrator to review your account and remove the restriction.
          Please keep in mind that repeated violations of our terms of service may lead to permanent account suspension.
          Mail will be sent to your registered email address once the review is complete.
        </p>

        <p className="text-xs text-gray-500">
          If you believe this action was taken in error, you may contact support for clarification.
        </p>
      </div>
    </div>
    </>
  );
}


