export  function EditProfile() {
  return (
    <div class="w-[80%] h-[100%] m-auto pt-15 border-slate-500 rounded-3xl p-10  bg-[#DDF0F3]">
      <div class="w-[600px] space-y-2">
        <div class="flex flex-row pt-2 pb-5 items-center">
          <label class=" text-indigo-950 text-2xl">Edit Your Profile ✨</label>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-row gap-1 p-2">
            <label>First Name</label>
            <input class=" border-blue-200 rounded-xl  " />
          </div>
          <div class="flex flex-row  gap-1 p-2">
            <label>Last Name</label>
            <input class=" border-slate-200 rounded-xl " />
          </div>
        </div>

        <div class="grid">
          <label>Email</label>
          <input class=" border-slate-200 rounded-xl p-2" />
        </div>

        <div class="grid">
          <label>Password</label>
          <input class=" border-slate-200 rounded-xl p-2" />
        </div>

        <div class="flex flex-row ">
          <div class="grid w-full">
            <label>Gender</label>
            <select class=" border-slate-200 rounded-xl p-2 gap-2">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="grid w-full pl-2 ">
            <label>Birth Date</label>
            <input class="p-2 rounded-xl" type="date" />
          </div>
        </div>

        <div class="grid ">
          <label>Country</label>
          <select class=" border-slate-200 rounded-xl p-2">
            <option>Indonesia</option>
            <option>Singapore</option>
            <option>malaysia</option>
            <option>Brunei</option>
          </select>
        </div>

        <div class="grid">
          <label>About Me</label>
          <textarea class="border-slate-200 rounded-xl p-2" />
        </div>

        <div class="grid">
          <button class="border-slate-200 rounded-xl p-2 hover:bg-green-400">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
