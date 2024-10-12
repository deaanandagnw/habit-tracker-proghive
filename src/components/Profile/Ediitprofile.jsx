export function EditProfile() {
  return (
    <div className="w-[80%] h-[100%] m-auto pt-15 border-slate-500 rounded-3xl p-10  bg-[#DDF0F3]">
      <div className="w-[600px] space-y-2">
        <div className="flex flex-row pt-2 pb-5 items-center">
          <label className=" text-indigo-950 text-2xl">
            Edit Your Profile ✨
          </label>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row gap-1 p-2">
            <label>First Name</label>
            <input className=" border-blue-200 rounded-xl  " />
          </div>
          <div className="flex flex-row  gap-1 p-2">
            <label>Last Name</label>
            <input className=" border-slate-200 rounded-xl " />
          </div>
        </div>

        <div className="grid">
          <label>Email</label>
          <input className=" border-slate-200 rounded-xl p-2" />
        </div>

        <div className="grid">
          <label>Password</label>
          <input className=" border-slate-200 rounded-xl p-2" />
        </div>

        <div className="flex flex-row ">
          <div className="grid w-full">
            <label>Gender</label>
            <select className=" border-slate-200 rounded-xl p-2 gap-2">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="grid w-full pl-2 ">
            <label>Birth Date</label>
            <input className="p-2 rounded-xl" type="date" />
          </div>
        </div>

        <div className="grid ">
          <label>Country</label>
          <select className=" border-slate-200 rounded-xl p-2">
            <option>Indonesia</option>
            <option>Singapore</option>
            <option>malaysia</option>
            <option>Brunei</option>
          </select>
        </div>

        <div className="grid">
          <label>About Me</label>
          <textarea className="border-slate-200 rounded-xl p-2" />
        </div>

        <div className="grid">
          <button className="border-slate-200 rounded-xl p-2 hover:bg-green-400">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
