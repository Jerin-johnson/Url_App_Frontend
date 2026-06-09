import { Copy, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useUrls } from "../hooks/url/useUrls";

const truncateText = (text: string, maxLength = 50) => {
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength)}...`;
};

const URL_BASE = import.meta.env.VITE_APP_URL_BASE || "http://localhost:3000";

export default function UrlTable() {
  const { data, isLoading } = useUrls();

  const handleCopy = async (shortCode: string) => {
    const shortUrl = `${URL_BASE}/s/${shortCode}`;

    await navigator.clipboard.writeText(shortUrl);

    toast.success("Copied to clipboard");
  };

  if (isLoading) {
    return <div className="bg-white rounded-xl p-6">Loading URLs...</div>;
  }

  if (!data?.length) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <p className="text-slate-500">No URLs found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Desktop */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 text-left">Original URL</th>

              <th className="p-4 text-left">Short URL</th>

              <th className="p-4 text-left">Clicks</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((url) => {
              const shortUrl = `${URL_BASE}/s/${url.shortCode}`;

              return (
                <tr key={url.id} className="border-t">
                  <td className="p-4 max-w-xs" title={url.originalUrl}>
                    <span className="break-all">
                      {truncateText(url.originalUrl, 60)}
                    </span>
                  </td>

                  <td className="p-4">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {url.shortCode}
                    </a>
                  </td>

                  <td className="p-4">{url.clicks}</td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleCopy(url.shortCode)}
                        className="text-slate-600 hover:text-blue-600"
                      >
                        <Copy size={18} />
                      </button>

                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-green-600"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">
        {data.map((url) => {
          const shortUrl = `${URL_BASE}/s/${url.shortCode}`;

          return (
            <div key={url.id} className="border rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Original URL</p>

              <p className="break-all text-sm" title={url.originalUrl}>
                {truncateText(url.originalUrl, 70)}
              </p>

              <div className="mt-3">
                <p className="text-xs text-slate-500">Short URL</p>

                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  {url.shortCode}
                </a>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm">Clicks: {url.clicks}</span>

                <div className="flex gap-3">
                  <button onClick={() => handleCopy(url.shortCode)}>
                    <Copy size={18} />
                  </button>

                  <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
