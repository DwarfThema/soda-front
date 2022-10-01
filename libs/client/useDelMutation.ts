import { useState } from "react";

export default function useDelMutation<T = any>(url: string) {
  const [loading, setLoading] = useState(false);

  function mutation() {
    setLoading(true);
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json().catch(() => {}))
      .then((json) => {})
      .then(() => setLoading(false));
  }

  return [mutation];
}
