import { initializeApp, applicationDefault } from 'firebase-admin/app';

const app = initializeApp();

initializeApp({
  credential: applicationDefault(),
  projectId: 'task-front-bee29'
});
