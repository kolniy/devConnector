import React, { useEffect } from "react"
import { connect } from "react-redux"
import Spinner from "../layouts/Spinner"
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem"

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return (<>
        {loading ? <Spinner /> : <>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
            <i className="fa fa-connectdevelop"></i> Browse and connect with Developers
        </p>
        <div className="profiles">
            {profiles.length > 0 ? (
                profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))
            ) : <h4>No profiles found...</h4> }
        </div>
        </>}
    </>)
}

const maptStateToProps = (state) => ({
    profile: state.profile
})

const mapDispatchToProps = (dispatch) => ({
    getProfiles: () => dispatch(getProfiles())
})

export default connect(maptStateToProps, mapDispatchToProps)(Profiles)