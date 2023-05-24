import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Authenticated() {
  const router = useRouter();
  const [profile, setProfile] = useState();

  async function getProfile() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/test/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const data = res.data;

      if (res.status === 200) {
        setProfile(data);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      router.push("/login");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div>
      <div>
        <p>Signed in as: {profile && profile.username}</p>
        <p>
          <button onClick={logout}>Log out</button>
        </p>
      </div>
      {/* {props.children} */}
    </div>
  );
}
