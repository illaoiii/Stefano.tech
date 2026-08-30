import { useEffect, useState } from "react";

// Lightweight existence check for static files (e.g. /resume.pdf) so the UI
// can hide or disable a button instead of linking to a broken file.
export default function useFileExists(path) {
  const [exists, setExists] = useState(null);

  useEffect(() => {
    if (!path) {
      setExists(false);
      return;
    }
    let cancelled = false;
    fetch(path, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setExists(res.ok);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return exists;
}
