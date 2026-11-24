
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createNote } from "../../lib/api";
import type { CreateNoteData, NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required"),
  content: Yup.string(),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Category is required"),
});

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteData) => createNote(newNote),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      onCancel();
    },
  });

  const handleSubmit = (values: CreateNoteData) => {
    mutation.mutate({
      title: values.title.trim(),
      content: values.content.trim(),
      tag: values.tag,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h2 className={css.heading}>Create note</h2>

        <label className={css.label} htmlFor="note-title">
          Title
        </label>
        <Field
          id="note-title"
          name="title"
          type="text"
          className={css.input}
          placeholder="Enter note title"
        />
        <ErrorMessage
          name="title"
          component="p"
          className={css.error}
        />

        <label className={css.label} htmlFor="note-content">
          Content
        </label>
        <Field
          as="textarea"
          id="note-content"
          name="content"
          className={css.textarea}
          placeholder="Write your note..."
          rows={5}
        />
        <ErrorMessage
          name="content"
          component="p"
          className={css.error}
        />

        <label className={css.label} htmlFor="note-tag">
          Category
        </label>
        <Field
          as="select"
          id="note-tag"
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>
        <ErrorMessage
          name="tag"
          component="p"
          className={css.error}
        />

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
      </Form>
    </Formik>
  );
}
