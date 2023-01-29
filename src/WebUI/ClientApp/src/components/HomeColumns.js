import React, { useState, useEffect } from "react";
import Column from "./ReUsable/Column";
import { getAsyncNoParams } from "./Service";


const HomeColumns = () => {
    const [upcoming, setUpcoming] = useState();
    const [recent, setRecent] = useState();


    useEffect(() => {
        async function fetchUpcoming() {
            const response = await getAsyncNoParams('game/awaiting');
            setUpcoming(response);
        }
        fetchUpcoming();
    }, []);
    useEffect(() => {
        async function fetchRecent() {
            const response = await getAsyncNoParams('game/justReleased'); //change endpoint
            setRecent(response);
        }
        fetchRecent();
    }, []);
  return (
    <section className="recently_view">
      <div className="others">
        <Column title="Recently Released" games={recent} />
        <Column title="Upcoming Releases" games={upcoming}/>
      </div>
    </section>
  );
};

export default HomeColumns;
