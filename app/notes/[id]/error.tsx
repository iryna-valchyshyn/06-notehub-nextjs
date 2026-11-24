
"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function NoteDetailsError({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Не вдалося завантажити нотатку</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Спробувати ще раз</button>
    </div>
  );
}