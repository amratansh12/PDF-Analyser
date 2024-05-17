import { useRef, useState } from "react";
import fileIcon from "../assets/file.svg";
import { Loader2 } from "lucide-react";

export const UploadButton = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/fileUpload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      localStorage.setItem("document", data.document);
      setLoading(false);
      setFileName(file.name);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {loading && (
        <div className="text-green-400 flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="font-semibold">Loading</p>
        </div>
      )}
      {fileName && !loading && (
        <div className="text-green-400 flex items-center justify-center gap-2">
          <img src={fileIcon} alt="File" className="h-8 w-8 shadow-sm" />
          <p className="font-bold">{fileName}</p>
        </div>
      )}
      <button
        onClick={handleButtonClick}
        className="px-3 py-2 shadow-sm border border-black rounded-md font-bold hover:bg-slate-100 flex justify-center items-center lg:w-52 gap-2"
      >
        <div className="rounded-full p-1 border border-black shadow-sm h-6 w-6 flex items-center justify-center text-sm">
          +
        </div>
        <span className="hidden md:block">Upload file</span>
      </button>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept=".pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};
