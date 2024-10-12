export function Profile() {
  return (
    <main>
      <div className="border-slate-500 w-[25rem] rounded-3xl px-8 py-5 bg-[#DDF0F3] flex items-center gap-6">
        <div className="p-3 border-slate items-center w-auto">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
            alt="profile"
            width="120px"
            height="120px"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col w-auto items-start gap-4 text-indigo-950 font-serif">
          <div>
            <h1 className="font-serif text-2xl font-bold">Name</h1>
            <h2 className="text-lg">📍 Country</h2>
          </div>

          <ul className="text-base space-y-1">
            <li>⌛ Age</li>
            <li>✉️ Email</li>
            <li>👤 Gender</li>
          </ul>
        </div>
      </div>
      <div className="row-span-1 py-6 w-full mt-4 border-slate-500 rounded-xl bg-[#DDF0F3]">
        <div className="text-center m-6 text-lg font-sans text-indigo-950">
          <p>About Me</p>
        </div>
      </div>
    </main>
  );
}
