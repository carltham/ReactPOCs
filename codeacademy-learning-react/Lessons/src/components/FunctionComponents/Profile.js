import React from "react";
import { fetchUserData, cancelFetch } from "./dataFetcher";
import { Userlist } from "./Userlist";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null };
    this.loadUserData = this.loadUserData.bind(this);
    this.cancelFetch = this.cancelFetch.bind(this);
  }

  componentDidMount() {
    this.loadUserData();
  }
  componentDidUpdate(prevProps, prevState) {
    this.cancelFetch(this.fetchID);
    this.loadUserData();
  }
  componentWillUnmount() {
    this.cancelFetch(this.fetchID);
  }

  cancelFetch() {}

  loadUserData() {
    this.setState({ userData: null });
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({ userData });
    });
  }
  render() {
    const isLoading = this.state.userData === null;

    let name;
    let bio;
    let friends = [];
    let className = "Profile";
    let profilePictureUrl;
    if (isLoading) {
      name = "Loading...";
      bio = "Loading...";
      profilePictureUrl = "";
      className += " loading";
    } else {
      name = this.state.userData.name;
      bio = this.state.userData.bio;
      friends = this.state.userData.friends;
      profilePictureUrl = this.state.userData.profilePictureUrl;
    }

    return (
      <div className={className}>
        <div className="profile-picture">
          <img src={profilePictureUrl} alt="" />
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}

export default Profile;
