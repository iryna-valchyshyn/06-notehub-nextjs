
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "../../lib/api";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import NoteForm from "../../components/NoteForm/NoteForm";

import styles from "./notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 10,
        search,
      }),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  if (isError) {
    return <p>Error loading notes.</p>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Notes</h1>

      <button
        type="button"
        onClick={() => setIsFormOpen(true)}
        style={{
          marginBottom: "20px",
          padding: "12px 20px",
          backgroundColor: "#5865e0",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        + Create note
      </button>

      {isFormOpen && (
        <NoteForm onCancel={() => setIsFormOpen(false)} />
      )}

      <div className={styles.search}>
        <SearchBox
          value={search}
          onSearch={handleSearch}
        />
      </div>

      <NoteList notes={data?.notes ?? []} />

      <Pagination
        pageCount={data?.totalPages ?? 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
