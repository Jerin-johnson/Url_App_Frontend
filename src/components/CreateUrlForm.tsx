import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateUrl } from "../hooks/url/useCreateUrl";

export default function CreateUrlForm() {
  const [url, setUrl] = useState("");

  const createUrlMutation = useCreateUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createUrlMutation.mutateAsync({
        originalUrl: url,
      });

      toast.success("URL shortened successfully");

      console.log(response);

      setUrl("");
    } catch {
      toast.error("Failed to shorten URL");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Shorten URL</h2>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="
            flex-1
            border
            rounded-lg
            px-4
            py-3
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            px-6
            rounded-lg
          "
        >
          Shorten
        </button>
      </form>
    </div>
  );
}
