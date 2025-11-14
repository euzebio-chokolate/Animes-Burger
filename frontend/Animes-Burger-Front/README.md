# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


.env exemple: 
DATABASE_URL="postgresql://postgres:admin@localhost:5432/animes_burguer?schema=public"
PORT=3000

LOCATIONIQ_TOKEN=pk.3070aa06c97aa0b2de7e042aae18d20f

CLOUDINARY_CLOUD_NAME=dfiklwc5s
CLOUDINARY_API_KEY=985573858431545
CLOUDINARY_API_SECRET=k8XcK1E3QHJR9COMQotj7EGZ_ig

JWT_SECRET=asduifadauidfgoafdg
JWT_REFRESH_SECRET=djlsidlfisdfgs