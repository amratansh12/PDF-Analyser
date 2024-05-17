import { UploadButton } from "./upload-button";

const Navbar = () => {
  return (
    <div className="h-24 shadow-md shadow-slate-200 flex justify-between items-center w-full px-8 lg:px-20 fixed bg-[#FFFFFF]">
      <h1 className="text-2xl font-bold flex items-center justify-center gap-1">
        <div className="bg-[#0FA958] p-2 rounded-full text-white h-10 w-10 flex items-center justify-center">
          ai
        </div>
        <span className="text-black">planet</span>
      </h1>
      <UploadButton />
    </div>
  );
};

export default Navbar;
