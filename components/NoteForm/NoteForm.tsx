"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { createNote } from "../../lib/api";
import type { CreateNoteData, NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteData) => createNote(newNote),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      setTitle("");
      setContent("");
      setTag("Todo");
      onCancel();
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote: CreateNoteData = {
      title: title.trim(),
      content: content.trim(),
      tag,
    };

    mutation.mutate(newNote);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.heading}>Create note</h2>

      <label className={css.label} htmlFor="note-title">
        Title
      </label>
      <input
        id="note-title"
        className={css.input}
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label className={css.label} htmlFor="note-content">
        Content
      </label>
      <textarea
        id="note-content"
        className={css.textarea}
        placeholder="Write your note..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
        rows={5}
      />

      <label className={css.label} htmlFor="note-tag">
        Category
      </label>
      <select
        id="note-tag"
        className={css.select}
        value={tag}
        onChange={(event) => setTag(event.target.value as NoteTag)}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      {mutation.isError && (
        <p className={css.error}>
          Failed to create note. Please try again.
        </p>
      )}

      <div className={css.actions}>
        <button
          className={css.cancelButton}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className={css.submitButton}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}