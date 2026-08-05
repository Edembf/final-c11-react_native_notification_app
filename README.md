
# PostifyMe — React Native Notification App

PostifyMe is a React Native sample app demonstrating user posts, Firebase-backed authentication, storage, and push/local notification integration. It was built as part of a mobile notifications and backend course and includes a ready structure for authentication, user profiles, posting images, and notification handling.

Key features
- Email/password authentication using Firebase Auth
- User profiles (avatar, display name) stored in Firestore/Realtime Database
- Create posts with title, text, optional image
- Push / local notifications for new posts or interactions (Firebase Cloud Messaging)
- Clean folder structure ready for Android and iOS builds

Table of contents
- Project status
- Requirements
- Setup / Installation
- Firebase configuration
- Running the app (Android / iOS)
- Testing notifications
- Project structure
- Contributing
- License
- Contact

Project status
- Prototype / course project. Basic UI and core flows implemented. Production hardening (security rules, error handling, testing) recommended before releasing.

Requirements
- Node.js (LTS)
- npm or yarn
- React Native CLI or Expo (depending on how the PostifyApp is set up)
- Android Studio (for Android) or Xcode (for iOS)
- A Firebase project with Auth, Firestore/Realtime DB, Storage, and Cloud Messaging enabled

Local setup & installation
1. Clone the repository
   git clone https://github.com/Edembf/final-c11-react_native_notification_app.git
   cd final-c11-react_native_notification_app/PostifyApp

2. Install dependencies
   npm install
   or
   yarn install

3. Link native modules (if using React Native CLI and not Expo)
   npx pod-install ios

Firebase configuration
1. Create a Firebase Project at https://console.firebase.google.com/
2. Enable:
   - Authentication (Email/Password)
   - Firestore (or Realtime Database) — used to store users and posts
   - Storage — to hold uploaded post images and avatars
   - Cloud Messaging — for push notifications
3. Add Android and/or iOS apps to Firebase and download the configuration files:
   - Android: google-services.json → copy to android/app/
   - iOS: GoogleService-Info.plist → copy to ios/{YourApp}/
4. Add Firebase config and initialize Firebase in the app. Typical initialization pattern (example):
   import { initializeApp } from 'firebase/app';
   const firebaseConfig = {
     apiKey: '...',
     authDomain: '...',
     projectId: '...',
     storageBucket: '...',
     messagingSenderId: '...',
     appId: '...'
   };
   const app = initializeApp(firebaseConfig);

Environment & secrets
- Do NOT commit your Firebase config files (google-services.json / GoogleService-Info.plist) to the repo.
- Use environment variables or a config file excluded by .gitignore for any keys or secrets.

Running the app
Android (React Native CLI)
- Start Metro: npx react-native start
- Install and run: npx react-native run-android

iOS (React Native CLI)
- Install pods: npx pod-install ios
- Start Metro: npx react-native start
- Run: npx react-native run-ios

Expo (if app uses Expo)
- Install Expo CLI and run: expo start

Testing notifications
- For local notifications, ensure permissions are requested at app startup.
- For push notifications (FCM), configure APNs (iOS) and FCM server key (Android).
- Use Firebase Console → Cloud Messaging to send a test message to a device token.

Suggested Firestore structure (example)
- users (collection)
  - {uid}
    - avatar: string (URL)
    - displayName: string
    - email: string
    - createdAt: timestamp

- posts (collection)
  - {postId}
    - title: string
    - text: string
    - imageUrl: string (optional)
    - createdAt: timestamp
    - authorId: string (uid)
    - private: boolean

Security rules
- Apply Firestore and Storage security rules to restrict writes to authenticated users and to enforce ownership checks.

Project structure (high-level)
- PostifyApp/
  - android/
  - ios/
  - src/
    - components/        # Reusable UI components
    - screens/           # App screens
    - navigation/        # Navigation setup
    - services/          # Firebase, notifications, API wrappers
    - assets/            # Images, icons
  - App.js

Contributing
- Open an issue or PR with a clear description.
- Follow the repository's code style and provide tests where appropriate.

License
- See LICENSE file in repo.

Contact
- Maintainer: Edembf
- Repo: https://github.com/Edembf/final-c11-react_native_notification_app