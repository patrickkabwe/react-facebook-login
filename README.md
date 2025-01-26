# @kazion/react-facebook-login

This is a React package that provides a simple way to add Facebook login to your React application.

[![Release](https://github.com/patrickkabwe/react-facebook-login/actions/workflows/release.yml/badge.svg)](https://github.com/patrickkabwe/react-facebook-login/actions/workflows/release.yml)
[![Coverage](https://github.com/patrickkabwe/react-facebook-login/actions/workflows/test.yml/badge.svg)](https://github.com/patrickkabwe/react-facebook-login/actions/workflows/test.yml)
<br>
[![mit licence](https://img.shields.io/dub/l/vibe-d.svg?style=for-the-badge)](https://github.com/patrickkabwe/react-facebook-login/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@kazion/react-facebook-login?style=for-the-badge)](https://www.npmjs.com/package/@kazion/react-facebook-login)

### Installation

To install this package, run the following command in your terminal:

```bash
pnpm install @kazion/react-facebook-login
```

### Usage

To use this package in your React application, import it as follows:

#### Wrap your app with FacebookProvider

```javascript
import { FacebookProvider } from "@kazion/react-facebook-login";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FacebookProvider
      appId="your-app-id"
      version="v19.0"
    >
      <App />
    </FacebookProvider>
  </React.StrictMode>
);

```

#### Login Button

```javascript
import FacebookLogin from "@kazion/react-facebook-login";
```

Then, you can use the `FacebookLogin` component in your application as follows:

```javascript
const App = () => {
  const handleResponse = (response) => {
    console.log(response);
  };

  return (
    <FacebookLogin onSuccess={handleResponse} className="login-button" {...anyOtherButtonProps}>
        Login
    </FacebookLogin>
);
};

export default App;
```
OR

```javascript
const App = () => {
  const handleResponse = (response) => {
    console.log(response);
  };

  return (
    <FacebookLogin onSuccess={handleResponse} className="login-button" {...anyOtherButtonProps}>
        <span>Login</span>
    </FacebookLogin>
);
};

export default App;
```

#### Login using Hook

```javascript
import { useFacebookLogin } from "@kazion/react-facebook-login";

const App = () => {
  const login = useFacebookLogin({
    onSuccess: (response) => {
      console.log(response);
    },
  });

  return <button onClick={() => login()}>Login</button>;
};

export default App;
```

### Testing

To run the tests for this package, use the following command:

```bash
pnpm test
```

### Contributing

If you want to contribute to this project, please follow the steps below:

1. Fork this repository.
2. Create a new branch: `git checkout -b your-branch-name`.
3. Make your changes and commit them: `git commit -m 'your message'`.
4. Push to the original branch: `git push origin your-branch-name`.
5. Create a pull request.

### License

This project is licensed under the MIT license.
