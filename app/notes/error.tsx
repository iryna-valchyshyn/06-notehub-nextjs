
"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function NotesError({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Не вдалося завантажити нотатки</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Спробувати ще раз</button>
    </div>
  );
}