import auth from './auth.service';

/**
 * Validates if user is logged In and triggers specific routes
 * @param {route.to} to
 * @param {route.from} from
 * @param {route.next} next
 */
export default function (to, from, next) {
  if (to.name !== 'login') {
    // When user is askign for login
    if (auth.isLoggedIn) next();
    else next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (auth.isLoggedIn) {
    // Otherwise check if is logged in
    next({ name: 'dashboard' });
  } else next();
}
