import { useEffect, useState } from "react";

export default function UseProfile() {
  const [data, setData] = useState<{ admin: boolean } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return { data, loading };
}
