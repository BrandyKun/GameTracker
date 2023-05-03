import React, { useState, useEffect } from "react";
import Column from "./ReUsable/Column";
import { getAsyncNoParams } from "./Service";

const HomeColumns = ({ recentGames, upcomingGames }) => {
  const [upcoming, setUpcoming] = useState();
  const [recent, setRecent] = useState();

  useEffect(() => {
    if (recentGames) setRecent(recentGames);
  }, [recent]);

  useEffect(() => {
    if (upcomingGames) setUpcoming(upcomingGames);
  }, [upcoming]);
  return (
    <section className="recently_view">
      <div className="others">
        <Column title="Recently Released" games={recent} />
        <Column title="Upcoming Releases" games={upcoming} />
      </div>
    </section>
  );
};

export default HomeColumns;
