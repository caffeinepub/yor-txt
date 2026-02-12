import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Story = {
    author : Principal;
    content : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  // In-memory storage for stories
  var stories = List.empty<Story>();

  // User profiles storage
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Any caller (including anonymous users) can fetch another user's public profile
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Story management functions
  public shared ({ caller }) func addStory(content : Text) : async () {
    // Only authenticated users can create stories
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create stories");
    };

    // Check if the user has saved their display name
    switch (userProfiles.get(caller)) {
      case (?profile) {
        if (profile.name == "") {
          Runtime.trap("You must save your display name before posting stories.");
        };
      };
      case (null) {
        Runtime.trap("You must save your display name before posting stories.");
      };
    };

    let story : Story = {
      author = caller;
      content;
      timestamp = Time.now();
    };
    stories.add(story);
  };

  public query func getAllStories() : async [Story] {
    // All users including guests can browse stories
    stories.toArray();
  };

  // Upgrade hooks to persist stories
  system func preupgrade() {
    stories := stories;
  };

  system func postupgrade() {
    stories := stories;
  };
};
