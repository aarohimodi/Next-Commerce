const AuthService = {
  async register(name: string, email: string, password: string) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    return response.json();
  },

  async login(email: string, password: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return response.json();
  },

  async logout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    return response.json();
  },

  async getProfile() {
    const response = await fetch("/api/auth/profile");

    return response.json();
  },
};

export default AuthService;
