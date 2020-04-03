import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";

const Profile = ({
  getProfileById,
  match,
  auth,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);

  return (
    <div>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuth &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  auth: state.authReducer
});

export default connect(mapStateToProps, { getProfileById })(Profile);
