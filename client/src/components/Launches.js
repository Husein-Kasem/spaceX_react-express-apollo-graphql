import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import LaunchItem from "./LaunchItem";
import Spinner from "./Spinner";
import Error from "./Error";
import LaunchLegends from "./LaunchLegends";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export default function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <Spinner />;
  if (error)
    return (
      <Error
        message={"Something went wrong when fetching the launches data."}
      />
    );

  return (
    <React.Fragment>
      <h1 className="display-4 my-3">Launches</h1>
      <LaunchLegends />

      {data.launches.map(launch => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
    </React.Fragment>
  );
}
