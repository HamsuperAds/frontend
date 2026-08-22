<template>
    <div class="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
            <!-- Header Banner -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Data Privacy & Protection Standards
                        </div>
                        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Privacy Policy</h1>
                        <p class="mt-2 text-base text-gray-600">
                            Learn how Hamsuper collects, uses, protects, and manages your personal information.
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center text-sm text-gray-500 gap-1 bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl">
                        <span class="font-medium text-gray-700">Effective Date: January 1, 2026</span>
                        <span>Last Updated: August 21, 2026</span>
                    </div>
                </div>

                <!-- Quick Highlights -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
                    <div class="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50">
                        <div class="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider">Payment Security</h4>
                            <p class="text-xs text-gray-600 mt-0.5">Cards processed via Paystack. We never store card details.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50">
                        <div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider">Account Deletion</h4>
                            <p class="text-xs text-gray-600 mt-0.5">Full self-service deletion available anytime in-app.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 p-3 rounded-xl bg-purple-50/50">
                        <div class="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider">KYC Protection</h4>
                            <p class="text-xs text-gray-600 mt-0.5">Verification documents encrypted and restricted to compliance.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Table of Contents (Sticky on desktop) -->
                <aside class="lg:col-span-1">
                    <div class="sticky top-24 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Table of Contents</h3>
                        <nav class="space-y-1.5 text-sm">
                            <a v-for="(item, idx) in tocItems" :key="idx" :href="item.href"
                                class="block px-2.5 py-1.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-xs font-medium truncate">
                                {{ item.title }}
                            </a>
                        </nav>
                        <div class="mt-6 pt-4 border-t border-gray-100">
                            <NuxtLink to="/contact-us" class="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Contact Privacy Team
                            </NuxtLink>
                        </div>
                    </div>
                </aside>

                <!-- Policy Content -->
                <main class="lg:col-span-3 space-y-8">
                    <!-- Section 1 -->
                    <section id="introduction" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">1</span>
                            Introduction & Scope
                        </h2>
                        <div class="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                Welcome to <strong>Hamsuper</strong> ("we," "our," or "us"). Hamsuper operates the Hamsuper online marketplace platform, accessible via our web application (<a href="https://hamsuper.com" class="text-blue-600 hover:underline">hamsuper.com</a>), mobile applications, and related services (collectively, the "Platform").
                            </p>
                            <p>
                                We are committed to safeguarding your privacy and ensuring transparency regarding how your data is collected, processed, and protected. This Privacy Policy explains our practices under applicable data protection laws, including the Nigeria Data Protection Act (NDPA), General Data Protection Regulation (GDPR), and global data protection standards.
                            </p>
                            <p>
                                By accessing or using our Platform, you acknowledge that you have read, understood, and agree to the terms outlined in this Privacy Policy. If you do not agree, please discontinue using the Platform.
                            </p>
                        </div>
                    </section>

                    <!-- Section 2 -->
                    <section id="information-collected" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">2</span>
                            Information We Collect
                        </h2>
                        <div class="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                We collect information that you directly provide to us, information collected automatically through your device, and information generated during interactions on our Platform:
                            </p>

                            <!-- Subsection: Account Info -->
                            <div class="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <h3 class="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    A. Personal & Account Information
                                </h3>
                                <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                                    <li><strong>Registration Details:</strong> Full Name (First Name, Last Name, Middle Name), Email Address, Phone Number, Gender, and Date of Birth.</li>
                                    <li><strong>Profile Data:</strong> Avatar/profile photos, bio, residential State, Local Government Area (LGA), and Town/City.</li>
                                    <li><strong>Credentials & Security:</strong> Passwords (securely hashed via bcrypt), One-Time Passwords (OTP) for phone/email verification, and Google OAuth unique identifier tokens when signing in with Google.</li>
                                </ul>
                            </div>

                            <!-- Subsection: KYC Documents -->
                            <div class="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <h3 class="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    B. Seller Verification & KYC (Know Your Customer) Data
                                </h3>
                                <p class="text-sm text-gray-600">
                                    To maintain a safe marketplace and prevent fraud, sellers who apply for verification provide:
                                </p>
                                <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                                    <li>Government-issued identification documents (e.g., National Identification Number / NIN slip, Driver's License, International Passport, or Voter's Card).</li>
                                    <li>Corporate Affairs Commission (CAC) business registration certificates (for registered business accounts).</li>
                                    <li>Proof of address documentation, business physical address, and dedicated business contact numbers.</li>
                                </ul>
                            </div>

                            <!-- Subsection: Listings & Media -->
                            <div class="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <h3 class="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    C. Listings, Media & Activity
                                </h3>
                                <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                                    <li><strong>Ad Postings:</strong> Product/service titles, detailed descriptions, category, price, negotiable status, item condition, and uploaded item photographs.</li>
                                    <li><strong>User Activity:</strong> Saved/favorited ads, search queries, filter preferences, and ad views/impressions.</li>
                                </ul>
                            </div>

                            <!-- Subsection: Communications -->
                            <div class="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <h3 class="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    D. In-App Communications & Reviews
                                </h3>
                                <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                                    <li><strong>Buyer-Seller Messaging:</strong> Direct chat messages transmitted between buyers and sellers, including message contents, timestamps, and delivery/read receipts.</li>
                                    <li><strong>Feedback & Ratings:</strong> Seller reviews, numerical ratings, written feedback, and user reports/moderation flags.</li>
                                </ul>
                            </div>

                            <!-- Subsection: Financial & Payments -->
                            <div class="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <h3 class="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    E. Financial & Transaction Data
                                </h3>
                                <p class="text-sm text-gray-600">
                                    When you purchase ad promotions, featured badges, or premium subscriptions on Hamsuper:
                                </p>
                                <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                                    <li>We store transaction audit records: payment references, plan names, amounts paid, currency, timestamp, and payment status (success, pending, failed).</li>
                                    <li><strong>Card Data Handling:</strong> All payment card numbers, CVVs, and banking credentials are processed directly by our PCI-DSS certified payment partner (<strong>Paystack</strong>). Hamsuper <em>never</em> captures, views, or stores your credit/debit card details on our servers.</li>
                                </ul>
                            </div>

                            <!-- Subsection: Technical & Device Data -->
                            <div class="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <h3 class="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    F. Technical, Device & Location Data
                                </h3>
                                <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                                    <li><strong>Push Notification Tokens:</strong> Firebase Cloud Messaging (FCM) device registration tokens used to route transactional and message alerts to your device.</li>
                                    <li><strong>Log Data:</strong> Internet Protocol (IP) address, browser type, device operating system, request timestamps, and last-seen activity timestamps.</li>
                                    <li><strong>Location Information:</strong> User-selected State and Local Government Area (LGA) utilized for geographic ad filtering and localized buyer-seller discovery.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Section 3 -->
                    <section id="how-we-use" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">3</span>
                            How We Use Your Information
                        </h2>
                        <div class="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>We process your data strictly for legitimate business purposes and to deliver a secure marketplace experience:</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div class="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <h4 class="font-bold text-gray-900 text-sm mb-1">Service Delivery & Marketplace Operations</h4>
                                    <p class="text-xs text-gray-600">Facilitating account creation, managing ad listings, processing promotion orders, and connecting buyers with sellers.</p>
                                </div>
                                <div class="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <h4 class="font-bold text-gray-900 text-sm mb-1">Identity & Trust Verification</h4>
                                    <p class="text-xs text-gray-600">Reviewing KYC submissions and verifying seller credentials to prevent fraud, impersonation, and illicit trade.</p>
                                </div>
                                <div class="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <h4 class="font-bold text-gray-900 text-sm mb-1">Real-Time Messaging & Notifications</h4>
                                    <p class="text-xs text-gray-600">Powering in-app buyer-seller chat and delivering transactional alerts, message updates, and security notices via Firebase FCM.</p>
                                </div>
                                <div class="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <h4 class="font-bold text-gray-900 text-sm mb-1">Platform Security & Abuse Prevention</h4>
                                    <p class="text-xs text-gray-600">Monitoring suspicious activities, enforcing community standards, resolving disputes, and ensuring system stability.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Section 4 -->
                    <section id="data-sharing" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">4</span>
                            Data Sharing & Third-Party Service Providers
                        </h2>
                        <div class="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                <strong>We do not sell, rent, or trade your personal data to third parties.</strong> We only disclose information under the following limited circumstances:
                            </p>

                            <div class="space-y-3">
                                <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-gray-100">
                                    <div class="font-bold text-blue-600 text-sm min-w-[130px]">Paystack:</div>
                                    <div class="text-xs sm:text-sm text-gray-600">For secure checkout, payment processing, transaction verification, and billing settlement.</div>
                                </div>
                                <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-gray-100">
                                    <div class="font-bold text-blue-600 text-sm min-w-[130px]">Google & Firebase:</div>
                                    <div class="text-xs sm:text-sm text-gray-600">Google OAuth for secure single-sign-on (SSO) and Firebase Cloud Messaging (FCM) for push notification delivery.</div>
                                </div>
                                <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-gray-100">
                                    <div class="font-bold text-blue-600 text-sm min-w-[130px]">Public Listings:</div>
                                    <div class="text-xs sm:text-sm text-gray-600">Information you intentionally publish in your public listings (seller name, verified badge status, phone number if enabled, item photos, price, and location) is visible to other marketplace users.</div>
                                </div>
                                <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-gray-100">
                                    <div class="font-bold text-blue-600 text-sm min-w-[130px]">Legal & Safety:</div>
                                    <div class="text-xs sm:text-sm text-gray-600">When required by law, subpoena, court order, or when necessary to protect user safety, investigate fraud, or enforce our Terms of Service.</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Section 5 -->
                    <section id="data-security" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">5</span>
                            Data Security & Storage
                        </h2>
                        <div class="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                We employ robust technical and organizational security controls to protect your data against unauthorized access, alteration, disclosure, or destruction:
                            </p>
                            <ul class="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-600 pl-2">
                                <li><strong>Encryption in Transit:</strong> All web and mobile network traffic is encrypted using modern TLS (Transport Layer Security) protocols via HTTPS.</li>
                                <li><strong>Credential Hashing:</strong> Passwords are irreversibly hashed using industry-standard bcrypt algorithms with salted rounds.</li>
                                <li><strong>API Authentication:</strong> Secure token-based session management (Laravel Sanctum) with expiration and revocation capabilities.</li>
                                <li><strong>KYC Document Protection:</strong> Sensitive identity verification documents are stored in protected storage buckets accessible strictly by authorized compliance personnel.</li>
                            </ul>
                        </div>
                    </section>

                    <!-- Section 6 -->
                    <section id="account-deletion" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <div class="flex items-center justify-between gap-4 mb-4">
                            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span class="flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-xs font-extrabold">6</span>
                                Data Retention & Account Deletion Policy
                            </h2>
                            <span class="px-2.5 py-1 rounded text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                                Data Control & User Rights
                            </span>
                        </div>
                        
                        <div class="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                In accordance with applicable privacy regulations and platform standards, Hamsuper provides transparent and easily accessible self-service account deletion mechanisms.
                            </p>

                            <div class="bg-red-50/60 border border-red-100 rounded-xl p-5 space-y-3">
                                <h3 class="font-bold text-red-950 text-sm sm:text-base">How to Delete Your Account (In-App & Web)</h3>
                                <p class="text-sm text-red-900">
                                    You can initiate the complete deletion of your account and all associated personal data at any time through our self-service deletion workflow:
                                </p>
                                <ol class="list-decimal list-inside space-y-1.5 text-sm text-red-900 font-medium pl-2">
                                    <li>Sign in to your Hamsuper account on the mobile app or web platform.</li>
                                    <li>Navigate to <strong>Account Dashboard</strong> &rarr; <strong>Settings</strong>.</li>
                                    <li>Select <NuxtLink to="/account/delete" class="text-blue-700 underline font-semibold">Delete Account</NuxtLink>.</li>
                                    <li>Enter your password to confirm verification and submit the deletion request.</li>
                                </ol>
                                <p class="text-xs text-red-800 pt-1">
                                    Alternatively, you may submit a formal account deletion request via email to <a href="mailto:privacy@hamsuper.com" class="font-semibold underline">privacy@hamsuper.com</a> or <a href="mailto:support@hamsuper.com" class="font-semibold underline">support@hamsuper.com</a> from your registered email address.
                                </p>
                            </div>

                            <div class="space-y-2 pt-2">
                                <h4 class="font-bold text-gray-900 text-sm sm:text-base">Data Retention & Purging Lifecycle:</h4>
                                <ul class="list-disc list-inside space-y-1.5 text-sm text-gray-600 pl-2">
                                    <li><strong>Immediate Deactivation (Soft Delete):</strong> Upon submitting deletion, your account is immediately deactivated, all active ad listings are removed from public search, and your public profile is hidden.</li>
                                    <li><strong>30-Day Retention Window:</strong> Your account enters a 30-day recovery grace period. During this time, you may contact support if the deletion was accidental.</li>
                                    <li><strong>Permanent Data Purge:</strong> After 30 days, your account details, profile data, uploaded photos, chat history, saved items, and identity verification documents are permanently erased from our primary active databases.</li>
                                    <li><strong>Statutory Exceptions:</strong> Minimal financial transaction records (e.g., Paystack reference codes and payment tax summaries) may be retained for the minimum period legally required for accounting, taxation, and fraud auditing compliance under Nigerian law.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Section 7 -->
                    <section id="children-privacy" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">7</span>
                            Children's Privacy (Age Limitation)
                        </h2>
                        <div class="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                The Hamsuper Platform is strictly intended for individuals who are at least <strong>18 years of age</strong> (or the legal age of majority in your jurisdiction).
                            </p>
                            <p>
                                We do not knowingly collect or solicit personal data from children under the age of 18. If we learn that we have inadvertently collected personal data from a child under 18 without verifiable parental consent, we will promptly delete that information and terminate the associated account. If you believe a minor has created an account, please contact us immediately at <a href="mailto:privacy@hamsuper.com" class="text-blue-600 hover:underline">privacy@hamsuper.com</a>.
                            </p>
                        </div>
                    </section>

                    <!-- Section 8 -->
                    <section id="your-rights" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">8</span>
                            Your Privacy Rights & Choices
                        </h2>
                        <div class="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>Under applicable data privacy regulations, you are entitled to exercise the following rights regarding your personal data:</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div class="p-3.5 rounded-xl bg-slate-50 border border-gray-100">
                                    <span class="font-bold text-gray-900 text-sm block">Right to Access:</span>
                                    <span class="text-xs text-gray-600">Request a copy of the personal data we hold about you.</span>
                                </div>
                                <div class="p-3.5 rounded-xl bg-slate-50 border border-gray-100">
                                    <span class="font-bold text-gray-900 text-sm block">Right to Rectification:</span>
                                    <span class="text-xs text-gray-600">Update or correct inaccurate or incomplete profile details directly via account settings.</span>
                                </div>
                                <div class="p-3.5 rounded-xl bg-slate-50 border border-gray-100">
                                    <span class="font-bold text-gray-900 text-sm block">Right to Erasure ("To be Forgotten"):</span>
                                    <span class="text-xs text-gray-600">Request complete deletion of your personal data using our in-app delete feature.</span>
                                </div>
                                <div class="p-3.5 rounded-xl bg-slate-50 border border-gray-100">
                                    <span class="font-bold text-gray-900 text-sm block">Notification Preferences:</span>
                                    <span class="text-xs text-gray-600">Customize push and email alert preferences anytime in <NuxtLink to="/account/notification_pref" class="text-blue-600 underline">Notification Settings</NuxtLink>.</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Section 9 -->
                    <section id="policy-updates" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">9</span>
                            Updates to This Privacy Policy
                        </h2>
                        <div class="space-y-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                We may update or modify this Privacy Policy periodically to reflect changes in our platform features, legal obligations, or regulatory guidelines.
                            </p>
                            <p>
                                When revisions occur, we will update the "Last Updated" date at the top of this page. For significant modifications that impact your rights, we will provide prominent notice via email or through an in-app banner prior to the changes taking effect.
                            </p>
                        </div>
                    </section>

                    <!-- Section 10 -->
                    <section id="contact-us" class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">10</span>
                            Contact Us & Privacy Inquiries
                        </h2>
                        <div class="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                            <p>
                                If you have questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact our Data Protection and Privacy team:
                            </p>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-gray-100">
                                    <div class="p-2.5 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xs font-semibold text-gray-500">Privacy & Support Email</div>
                                        <a href="mailto:privacy@hamsuper.com" class="text-sm font-bold text-blue-600 hover:underline">privacy@hamsuper.com</a>
                                        <div class="text-xs text-gray-500">or <a href="mailto:support@hamsuper.com" class="text-blue-600 hover:underline">support@hamsuper.com</a></div>
                                    </div>
                                </div>

                                <div class="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-gray-100">
                                    <div class="p-2.5 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xs font-semibold text-gray-500">Physical Address</div>
                                        <div class="text-sm font-bold text-gray-900">Hamsuper Marketplace</div>
                                        <div class="text-xs text-gray-500">Lagos, Nigeria</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const tocItems = [
    { title: '1. Introduction & Scope', href: '#introduction' },
    { title: '2. Information We Collect', href: '#information-collected' },
    { title: '3. How We Use Information', href: '#how-we-use' },
    { title: '4. Data Sharing & Third Parties', href: '#data-sharing' },
    { title: '5. Data Security & Storage', href: '#data-security' },
    { title: '6. Account Deletion Policy', href: '#account-deletion' },
    { title: '7. Children\'s Privacy', href: '#children-privacy' },
    { title: '8. Your Privacy Rights', href: '#your-rights' },
    { title: '9. Updates to Policy', href: '#policy-updates' },
    { title: '10. Contact Us', href: '#contact-us' },
];

useSeoMeta({
    title: 'Privacy Policy - Hamsuper',
    description: 'Read the privacy policy of Hamsuper and understand how we collect, protect, and manage your personal data and account deletion rights.',
    ogTitle: 'Privacy Policy - Hamsuper',
    ogDescription: 'Hamsuper Privacy Policy and User Data Protection Standards in compliance with applicable data protection regulations.',
});

definePageMeta({
    auth: false,
});
</script>
