import toast from "@/components/Toast";
import { useCallback } from "react";

function useNotify() {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  return { notify, dismiss };
}

export default useNotify;
