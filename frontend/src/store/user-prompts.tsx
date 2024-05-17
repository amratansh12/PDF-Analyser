import { create } from "zustand";

type Prompt = {
  query: string;
  answer: string;
};

type Props = {
  userPrompts: Array<Prompt>;
  addUserPrompt: (prompt: Prompt) => void;
};

export const useUserPrompts = create<Props>((set) => ({
  userPrompts: [],
  addUserPrompt: (prompt: Prompt) =>
    set((state: Props) => ({
      userPrompts: [
        ...state.userPrompts,
        {
          query: prompt.query,
          answer: prompt.answer,
        },
      ],
    })),
}));
