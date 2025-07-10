import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import 'react-datepicker/dist/react-datepicker.css';
import './styles/overrides/react-date-picker.override.scss';

import '@/styles/overrides/react-bootstrap.override.scss';

import '@/styles/main.scss';

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
