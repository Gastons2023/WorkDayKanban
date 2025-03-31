import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
    // TODO: return a value that indicates if the user is logged in
  }
  
  isTokenExpired(token: string) {
    let decoded: JwtPayload | null = null;
    const currentTime = Math.floor(Date.now() / 1000);
    try {
    decoded = jwtDecode<JwtPayload>(token);
      if (!decoded || !decoded.exp) {
        return true; // If there's no expiration, consider it expired
      }
      return decoded !== null && typeof decoded.exp === 'number' && decoded.exp < currentTime; // Check if the token is expired
    } catch (error) {
      return true; // If decoding fails, consider the token expired
    }
   
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
    // TODO: return the token
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/'); // Redirect to the home page after login
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
  }
}

export default new AuthService();
