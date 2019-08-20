import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Spinner from "./Spinner";
import Error from "./Error";
import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

const LAUNCHE_QUERY = gql`
  query LauncheQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export default function Launch(props) {
  const flight_number = parseInt(props.match.params.flight_number);
  const { loading, error, data } = useQuery(LAUNCHE_QUERY, {
    variables: { flight_number }
  });

  if (loading) return <Spinner />;
  if (error)
    return (
      <Error message={"Something went wrong when fetching the launche data."} />
    );

  const {
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type }
  } = data.launch;

  return (
    <React.Fragment>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span> {mission_name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Flight Number: {flight_number}</li>
        <li className="list-group-item">Laucnh Year: {launch_year}</li>
        <li className="list-group-item">
          Launch Successful:{" "}
          <span
            className={classnames({
              "text-success": launch_success,
              "text-danger": !launch_success
            })}
          >
            {launch_success ? "Yes" : "No"}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Flight ID: {rocket_id}</li>
        <li className="list-group-item">Rocket Name: {rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket_type}</li>
        
      </ul>
      <hr/>
      <Link to="/" className="btn btn-secondary">Back</Link>
    </React.Fragment>
  );
}
