//"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { Input } from "postcss";

// export async function handleRegister(formData) {
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const password = formData.get("password");
// }

export default function profile() {
  // const name = formData.get("name");
  // const password = formData.get("password");
  // const email = formData.get("email");

  return (
    <main>
      <section class="h-screen grid grid-cols-5 p-10">
        <div class="profile-page col-span-2">
          <div class="content">
            <div class="content__cover">
              <div class="content__avatar"></div>
            </div>

            <div class="mt-32 text-center fontsize">
              <h1>name</h1>
              <span>country</span>
            </div>

            <ul class="text-center m-6 text-lg ">
              <li>Nama</li>
              <li>Email</li>
              <li>Gender</li>
            </ul>

            <div class="text-center m-6 fontsize2">
              <p>about me</p>
            </div>
          </div>
          <div class="bg">
            <div></div>
          </div>
        </div>

        <div class="profile-page2 col-span-3 ">
          <div class="content space-y-2">
            <div class="text-start text-xl text-black">
              <h1>Edit Profile</h1>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="grid">
                <label>First name</label>
                <input />
              </div>
              <div class="grid">
                <label>Second name</label>
                <input />
              </div>
            </div>

            <div class="grid">
              <label>Email</label>
              <input />
            </div>

            <div class="grid">
              <label>Password</label>
              <input />
            </div>

            <div class="grid">
              <label>Gender</label>
              <select>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div class="grid">
              <label>Country</label>
              <select>
                <option>Indonesia</option>
                <option>Palestine</option>
                <option>Saudi Arabia</option>
              </select>
            </div>

            <div class="grid">
              <label>About Me</label>
              <textarea />
            </div>
            <div class="w-full bg-blue-600 text-white rounded-lg p-2 text-center">
              <button>Save</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
