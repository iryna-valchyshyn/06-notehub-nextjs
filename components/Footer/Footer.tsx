
"use client";

import { useEffect, useState } from "react";
import css from "./Footer.module.css";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>
          © {year ?? ""} NoteHub. All rights reserved.
        </p>

        <div className={css.wrap}>
          <p>Developer: Iryna Valchyshyn</p>
          <p>
            Contact us:{" "}
            <a href="mailto:student@notehub.app">
              student@notehub.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

