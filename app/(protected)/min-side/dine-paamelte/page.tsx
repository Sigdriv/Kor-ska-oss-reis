// // "use client";
// import React, { useEffect, useState } from "react";
// import DinePaamelte from "./DinePaamelte";
// import { auth } from "@/auth";
// import { getTeamsByUser } from "@/actions";
// import { teamsByUser } from "@/types/types";

// export default function MinSide() {
//   const [temasByUser, setTemasByUser] = useState<teamsByUser[]>();

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("fetchData");
//       try {
//         const session = await auth();
//         console.log("session", session);
//         if (!!session?.user?.email) {
//           const data = await getTeamsByUser(session?.user?.email);
//           console.log("data", data);
//           setTemasByUser(data);
//         }
//         console.log("temasByUser", temasByUser);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       }
//     };
//     fetchData();
//   });

//   return (
//     <main className="w-screen p-20">
//       <h1>Dine påmelte lag:</h1>
//       <div className=" grid grid-cols-3">
//         {!temasByUser ? (
//           <div>Loading...</div>
//         ) : (
//           temasByUser.map((team: teamsByUser) => (
//             <DinePaamelte {...team} key={team.id} />
//           ))
//         )}
//       </div>
//     </main>
//   );
// }

import React from "react";
import DinePaamelte from "./DinePaamelte";
import { auth } from "@/auth";
import { getTeamsByUser } from "@/actions";
import { teamsByUser } from "@/types/types";

export default async function MinSide() {
  const session = await auth();
  let temasByUser = [];
  if (!!session?.user?.email) {
    temasByUser = await getTeamsByUser(session?.user?.email);
  }

  return (
    <main className="w-screen p-20">
      <h1>Dine påmelte lag:</h1>
      <div className=" grid grid-cols-3">
        {temasByUser.map((team: teamsByUser) => (
          <DinePaamelte {...team} key={team.id}/>
        ))}
      </div>
    </main>
  );
}