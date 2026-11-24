
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "../../lib/api";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";

import styles from "./notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 10,
        search: debouncedSearch,
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
        <Modal onClose={() => setIsFormOpen(false)}>
          <NoteForm onCancel={() => setIsFormOpen(false)} />
        </Modal>
      )}

      <div className={styles.search}>
        <SearchBox
          value={search}
          onSearch={handleSearch}
        />
      </div>

      <NoteList notes={data?.notes ?? []} />

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
