import axios from "axios";

export const getSpaceXData = async () => {
  try {
    const launchesRes = await axios.get("https://api.spacexdata.com/v4/launches");
    const rocketsRes = await axios.get("https://api.spacexdata.com/v4/rockets");
    const payloadsRes = await axios.get("https://api.spacexdata.com/v4/payloads");
    const launchpadsRes = await axios.get("https://api.spacexdata.com/v4/launchpads");
    const crewRes = await axios.get("https://api.spacexdata.com/v4/crew");

    const rockets = Object.fromEntries(rocketsRes.data.map(r => [r.id, r.name]));
    const payloads = Object.fromEntries(payloadsRes.data.map(p => [p.id, p.name]));
    const launchpads = Object.fromEntries(launchpadsRes.data.map(l => [l.id, l.name]));
    const crew = Object.fromEntries(crewRes.data.map(c => [c.id, c.name]));

    return launchesRes.data.map((launch) => ({
      id: launch.id,
      mission_name: launch.name,
      launch_year: launch.date_utc.split("-")[0],
      date_utc: launch.date_utc,
      success: launch.success,
      details: launch.details,
      rocket_name: rockets[launch.rocket] || "Unknown",
      payload_names: launch.payloads.map(id => payloads[id] || "Unknown"),
      launchpad_name: launchpads[launch.launchpad] || "Unknown",
      crew_members: launch.crew.map(id => crew[id] || "Unknown"),
      links: launch.links,
    }));
  } catch (error) {
    console.error("SpaceX API error:", error);
    return [];
  }
};
