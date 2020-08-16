import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import DashboardActions from './DashboardActions'
import Experience from "./Experience"
import Education from "./Education"
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth: { user },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user"></i> welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button onClick={e => deleteAccount()} className="btn btn-danger">
              <i className="fa fa-user-minus"></i>
               Delete My Account
            </button>
          </div>
         </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

const mapStateToProp = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProp = (dispatch) => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
  deleteAccount: () => dispatch(deleteAccount())
});

export default connect(mapStateToProp, mapDispatchToProp)(Dashboard);
