import { BACKEND_URL } from 'config/appConfig';

export const apiBaseUrl = BACKEND_URL;

export const apiRoutes = {
  getCategories: 'api_category.php',
  getQuestionCountByCategory: 'api_count.php?category=',
  getQuestions: 'api.php?amount=',
};
