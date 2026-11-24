import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const handleDelete = (id: string): void => {
  deleteMutation.mutate(id);
};

  return (
    <>
      {deleteMutation.isError && (
        <p role="alert">
          Не вдалося видалити нотатку. Спробуйте ще раз.
        </p>
      )}

      <ul className={css.list}>
        {notes.map((note) => (
          <li className={css.listItem} key={note.id}>
           <h2 className={css.title}>
  <Link href={`/notes/${note.id}`} className={css.titleLink}>
    {note.title}
  </Link>
</h2>

            <p className={css.content}>{note.content}</p>

            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>

              <button
                className={css.button}
                type="button"
                onClick={() => handleDelete(note.id)}
                disabled={
                  deleteMutation.isPending &&
                  deleteMutation.variables === note.id
                }
              >
                {deleteMutation.isPending &&
                deleteMutation.variables === note.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}