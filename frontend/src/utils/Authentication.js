class Authentication {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  postRegister(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    }).then(this._checkResponse)
  }

  postLogin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'password': password,
        'email': email
      }),
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  postLogout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  checkCookie() {
    return fetch(`${this._baseUrl}/checkCookie`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => res.json())
  }
}

const authentication = new Authentication({
  baseUrl: 'https://api.mesto-ger.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authentication