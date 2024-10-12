export function Profile() {
  return (
    <main>
      <div className="row-span-1 w-[60%] h-[70%]  pb-10 m-auto pt-0 border-slate-500 rounded-3xl p-1  bg-[#DDF0F3] flex flew-cols-2  ">
        <div className=" col-span-1 p-3 border-slate items-center pt-10 w-full ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
            alt="profile"
            width="120px"
            height="120px"
            className="rounded-full"
          />
        </div>
        <div className="col-span-1 w-full items-start py-7 gap-6  text-indigo-950 font-serif">
          <div>
            <h1 className="font-serif text-3xl">name</h1>
            <h1>📍 country</h1>
          </div>

          <ul className="text-start text-lg  ">
            <li>⌛Age</li>
            <li>✉️Email</li>
            <li>👤Gender</li>
          </ul>
        </div>
      </div>
      <div className=" row-span-1 w-[60%] h-[100%]  m-auto pt-1 border-slate-500 rounded-3xl p-1  bg-[#DDF0F3] ">
        <div className="text-center m-6 text-2xl font-sans text-indigo-950">
          <p>About me</p>
        </div>
      </div>
    </main>
  );
}
