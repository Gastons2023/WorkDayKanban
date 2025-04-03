import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
}

class AuthService {
  getProfile(): CustomJwtPayload | null {
    const token = this.getToken();
    return token ? (jwtDecode(token) as CustomJwtPayload) : null;
  }


  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  getUserId(): number | null {
    const profile = this.getProfile();
    if (!profile) {
      throw new Error("User ID not found in token."); 
    }
    return profile ? profile.id : null; 
  }


  isTokenExpired(token: string) {
    const decoded = jwtDecode(token) as JwtPayload;
    if (decoded.exp) {
      return decoded.exp < Date.now() / 1000;
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  
  }

  logout() {
    localStorage.removeItem('id_token'); 
    window.location.assign('/');
   
  }
}

export default new AuthService();