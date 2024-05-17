import { useState } from "react";
import sendLogo from "../assets/send.svg";
import { Loader2 } from "lucide-react";
import { useUserPrompts } from "../store/user-prompts";

const InputBar = () => {
  const { addUserPrompt } = useUserPrompts((state) => state);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          query: value,
          document: localStorage.getItem("document"),
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log(data);
      setValue("");
      addUserPrompt({
        query: value,
        answer: data.answer,
      });
      setLoading(false);
    } catch (error) {
      window.alert(error);
    }

    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-32 flex justify-center items-center space-x-4 px-12 lg:px-32 w-full fixed bottom-0 bg-[#FFFFFF]"
    >
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          disabled={loading}
          className="ring-0 outline-none border border-[#E4E8EE] shadow-md bg-[#FFFFFF] h-16 w-[300px] md:w-[600px] lg:w-[1000px] px-4 py-2 rounded-md text-lg tracking-wide disabled:cursor-not-allowed disabled:bg-slate-100"
          placeholder="Enter your query"
        />
        <button
          type="submit"
          className="h-12 px-6 absolute right-2 top-2 cursor-pointer hover:bg-slate-50 rounded-lg"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          {!loading && <img src={sendLogo} alt="send" />}
        </button>
      </div>
    </form>
  );
};

export default InputBar;
