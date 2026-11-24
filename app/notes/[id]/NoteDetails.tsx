
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import styles from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetails({
  id,
}: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <p className={styles.message}>Loading note...</p>;
  }

  if (isError || !note) {
    return <p className={styles.message}>Note not found.</p>;
  }

  return (
    <main className={styles.container}>
      <Link href="/notes" className={styles.backLink}>
        ← Back to notes
      </Link>

      <article className={styles.card}>
        <h1 className={styles.title}>{note.title}</h1>

        <p className={styles.content}>{note.content}</p>

        <div className={styles.footer}>
          <span className={styles.tag}>{note.tag}</span>
        </div>
      </article>
    </main>
  );
}
