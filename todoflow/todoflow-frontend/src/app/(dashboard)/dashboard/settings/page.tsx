import AvatarUpload from "../../../../components/settings/AvatarUpload";
import ProfileSettings from "../../../../components/settings/ProfileSettings";
import ThemeSettings from "../../../../components/settings/ThemeSettings";
import PasswordSettings from "../../../../components/settings/PasswordSettings";
import DeleteAccount from "../../../../components/settings/DeleteAccount";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Settings</h1>
      <AvatarUpload />
      <ProfileSettings />
      <ThemeSettings />
      <PasswordSettings />
      <DeleteAccount />
    </div>
  );
}