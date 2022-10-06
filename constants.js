export const API = {
  URL: "https://api.mymiralls.com/",
  Headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const Navigation = {
  Login: "LoginScreen",
  Register: "RegisterScreen",
  RestorePassword: "RestorePasswordScreen",
  EditProfile: "EditProfileScreen",
  Archive: "ArchiveScreen",
  ChangePassword: "ChangePasswordScreen",
  Post: "PostScreen",
  Search: "SearchScreen",
  User: "UserScreen",
  Wallet: "WalletScreen",
  Settings: "SettingsScreen",

  Dialogs: "DialogsScreen",
  Dialog: "DialogScreen",

  TabNavigation: "TabNavigation",

  Tabs: {
    Profile: "ProfileScreen",
    Feed: "FeedScreen",
    AddPost: "AddPostScreen",
    Notifications: "NotificationsScreen",
  },
};

export const DEFAULT_USER_PICTURE = API.URL + "media/user_pictures/default.jpg";
export const SMS_CODE_LENGTH = 4;

export const NEW_POST_LOAD_IMAGES_COUNT = 100;

export const DefaultColors = {
  White: "#FFFFFF",
  Gray: "#AFAFAF",
  Black: "#000000",

  Red: "#DA4453",
  Green: "#7bc043",
  Yellow: "#F2D041",
  Blue: "#5C7DF6",

  BG: "#000000",
  SubText: "#AFAFAF",
  Primary: "#FFFFFF",

  Border: "rgba(255,255,255,.1)",
};

export const Colors = {
  BG: DefaultColors.BG,
  SubText: DefaultColors.SubText,
  Primary: DefaultColors.Primary,
  White: DefaultColors.White,
  Black: DefaultColors.Black,

  PopUpMenuIcon: DefaultColors.Primary,

  Input: {
    BackgroundColor: "#121212",
    Color: DefaultColors.Primary,
    BorderColor: DefaultColors.Border,
    PlaceholderTextColor: "#9F9F9F",

    ValidationError: {
      Color: DefaultColors.Red,
      BorderColor: DefaultColors.Red,
      PlaceholderTextColor: "#792830",
    },
  },
  InputLabel: {
    Color: DefaultColors.Primary,

    ValidationError: {
      Color: DefaultColors.Red,
    },
  },

  Button: {
    BackgroundColor: DefaultColors.Primary,
    Color: DefaultColors.Black,
    BorderColor: DefaultColors.Border,

    Inactive: {
      BackgroundColor: "rgba(255,255,255,.7)",
      Color: DefaultColors.Black,
      BorderColor: DefaultColors.Border,
    },
  },
  FormText: {},
  Form: {
    Text: {
      Color: DefaultColors.Primary,
    },
    SubText: {
      Color: DefaultColors.SubText,
    },
  },

  Link: {
    Color: DefaultColors.Blue,
  },
};

export const Sizes = {
  Input: {
    MarginTop: 10,
    BorderRadius: 10,
    BorderWidth: 1,
    PaddingVertical: 12,
    PaddingHorizontal: 15,
    FontSize: 16,
  },
  FeedHeader: {
    Height: 60,
    LogoSize: 45,
  },
  Button: {
    BorderRadius: 10,
    BorderWidth: 0,
    PaddingVertical: 12,
    PaddingHorizontal: 15,
    FontSize: 16,
  },
  Form: {
    Text: {
      FontSize: 22,
      FontFamily: "SF-Medium",
    },
    SubText: {
      FontSize: 16,
      FontFamily: "SF-Regular",
    },
  },
  Screen: {
    Padding: 16,
  },
  Menu: {
    Height: 55,
  },
  Header: {
    Height: 55,
    BackButtonSize: 18,
    Padding: 8,
  },
  CommentInput: {
    Height: 56,
  },
};

export const Styles = {
  ProfileButton: {
    Wrapper: {
      width: "49%",
      marginTop: Sizes.Input.MarginTop,
    },
    ButtonStyle: {
      backgroundColor: Colors.BG,
      borderColor: Colors.Primary,
      borderWidth: 1,
      paddingTop: 3,
      paddingBottom: 3,
      borderRadius: 5,
    },
    TextStyle: {
      color: Colors.Primary,
    },
  },
};
