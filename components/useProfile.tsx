import { useEffect, useState } from "react";

export interface ProfileData {
  admin: boolean;
  city: string;
  country: string;
  phone: string;
  postalCode: string;
  streetAddress: string;
}
export default function useProfile() {
  const [data, setData] = useState<ProfileData | null>(null);

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
