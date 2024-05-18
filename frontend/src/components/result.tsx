import { useEffect, useRef } from "react";
import { useUserPrompts } from "../store/user-prompts";

const Result = () => {
  const { userPrompts } = useUserPrompts((state) => state);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, [userPrompts]);

  return (
    <div className="flex-1 flex flex-col items-center space-y-4 pt-10 px-6 md:px-20 lg:px-80 overflow-y-scroll mb-32 mt-24">
      {userPrompts.length > 0 &&
        userPrompts.map((item) => (
          <div className="flex flex-col items-start space-y-2 max-w-screen-lg">
            <div className="flex gap-2 items-start justify-center">
              <div className="bg-indigo-500 aspect-square rounded-full h-10 flex items-center justify-center shadow-sm font-bold text-xl text-white">
                S
              </div>
              <div className="border border-slate-200 px-6 py-4 rounded-md shadow-sm tracking-wide">
                {item.query}
              </div>
            </div>
            <div className="flex gap-2 items-start justify-center">
              <div className="bg-green-500 aspect-square rounded-full h-10 flex items-center justify-center shadow-sm font-bold text-xl text-white">
                ai
              </div>
              <div className="border border-slate-200 px-6 py-4 rounded-md shadow-sm tracking-wide">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default Result;
