import { useState } from "react";

interface UserMutationState<T> {
  loading: boolean;
  data?: T;
  message?: object;
}

type UserMutationResult<T> = [(data: any) => void, UserMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UserMutationResult<T> {
  const [state, setState] = useState<UserMutationState<T>>({
    loading: false,
    data: undefined,
    message: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [message, setMessage] = useState<undefined | any>(undefined);

  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then((json) => {
        setData(json);
        setMessage(json.message);
      })
      .then(() => setLoading(false));
  }

  return [mutation, { loading, data, message }];
}
